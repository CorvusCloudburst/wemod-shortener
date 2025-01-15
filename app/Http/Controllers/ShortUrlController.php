<?php

namespace App\Http\Controllers;

use App\Models\ShortUrl;
use App\Models\UrlVisit;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ShortUrlController extends Controller
{

    /*
     *  Homepage
     */
    public function homepage(): Response
    {
        $urls = ShortUrl::all();

        return Inertia::render('Homepage', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'urls' => $urls
        ]);
    }

    /*
     *  The rerouting route (say that ten times fast)
     */
    public function go(): RedirectResponse
    {
        $shortUrlPath = request('shortUrlPath');
        $shortUrl = ShortUrl::where('short_url_path', $shortUrlPath)->firstOrFail();

        $urlVisit = new UrlVisit;
        $urlVisit->ip = request()->ip();
        $urlVisit->short_url_id = $shortUrl->id;

        $urlVisit->save();

        return redirect($shortUrl->original_url);
    }
    
    /*
     *  See all shortened URLs
     */
    public function index(): Response
    {
        $urls = ShortUrl::all();

        return Inertia::render('ShortUrls/MyUrls', [
            'urls' => $urls
        ]);
    }

    /*
     *  The details/analytics page of a particular URL
     */
    public function analytics(): Response
    {
        $shortUrlPath = request('shortUrlPath');

        $shortUrl = ShortUrl::where('short_url_path', $shortUrlPath)->firstOrFail();
        $visits = UrlVisit::where('short_url_id', $shortUrl->id)->get();

        return Inertia::render('ShortUrls/Analytics', [
            'shortUrl' => $shortUrl,
            'visits' => $visits,
        ]);
    }

    /*
     *  A page in which the user can create shortened URLs
     */
    public function create(): Response
    {
        return Inertia::render('ShortUrls/Create');
    }

    /*
     *  Create a single URL
     */
    public function generate(Request $request): RedirectResponse
    {
        if ($request->csv_file) {
            return $this->generateMany($request);
        } else {
            $shortUrlPath = $this->generateNewUrl($request->longUrl);
            return redirect('/go/' . $shortUrlPath . '/analytics');
        }
    }

    /*
     *  Create many URLs from a CSV
     */
    public function generateMany(Request $request): RedirectResponse
    {
        $request->validate([
            'csv_file' => 'required|mimes:csv,txt|max:2048',
        ]);

        if ($request->hasFile('csv_file')) {
            $file = $request->file('csv_file');
            $filePath = $file->getPathName();
            $csvData = str_getcsv(file($filePath)[0], ",", "'", "\\");

            foreach ($csvData as $originalUrl) {
                $this->generateNewUrl($originalUrl);
            }
        }
        return redirect('/urls');
    }

    /*
     * Saves a URL to the DB and and returns the short url path
     * Could probably be better placed in a service layer but eh.
     */
    private function generateNewUrl($longUrl): string
    {
        // Generate a random set of leters
        $shortUrlPath = substr(md5(microtime()), rand(0,26), 5);

        // Ensures a unique path
        $duplicate = true;
        while($duplicate) {
            $duplicatePath = ShortUrl::where('short_url_path', $shortUrlPath)->first();
            if (!$duplicatePath) {
                $duplicate = false;
            }
        }

        // Save to the DB
        $shortUrl = new ShortUrl;
        $shortUrl->short_url_path = $shortUrlPath;
        $shortUrl->original_url = $longUrl;
        $shortUrl->user_id = Auth::user()->id;

        $shortUrl->save();

        return $shortUrlPath;
    }

}
