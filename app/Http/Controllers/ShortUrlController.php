<?php

namespace App\Http\Controllers;

use App\Models\ShortUrl;
use App\Models\UrlVisit;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ShortUrlController extends Controller
{
    /*
     *  The rerouting route (say that ten times fast)
     */
    public function go()
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

        return Inertia::render('ShortUrls/All', [
            'urls' => $urls
        ]);
    }

    /*
     *  The details/analytics page of a particular URL
     */
    public function analytics()
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
     *  The page in which you create a shortened URL
     */
    public function create(): Response
    {
        return Inertia::render('ShortUrls/Create');
    }

    /*
     *  The backend functionality of creating a URL
     */
    public function generate(Request $request): RedirectResponse
    {
        $shortUrl = new ShortUrl;
        $shortUrlPath = substr(md5(microtime()), rand(0,26), 5);

        // Ensures a unique path
        $duplicate = true;
        while($duplicate) {
            $duplicatePath = ShortUrl::where('short_url_path', $shortUrlPath)->first();
            if (!$duplicatePath) {
                $duplicate = false;
            }
        }

        $shortUrl->short_url_path = $shortUrlPath;
        $shortUrl->original_url = $request->longUrl;
        $shortUrl->user_id = Auth::user()->id;

        $shortUrl->save();

        return redirect('/go/' . $shortUrlPath . '/analytics');
    }

}
