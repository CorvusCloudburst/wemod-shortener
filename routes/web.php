<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ShortUrlController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    # URL Redirect Functionality
    Route::get('/go/{shortUrlPath}', [ShortUrlController::class, 'go'])->name('shortUrls.go');
    Route::get('/go/{shortUrlPath}/analytics', [ShortUrlController::class, 'analytics'])->name('shortUrls.analytics');

    # URL Management endpoints
    Route::get('/urls', [ShortUrlController::class, 'index'])->name('shortUrls.index');
    Route::post('/urls', [ShortUrlController::class, 'generate'])->name('shortUrls.generate');
    Route::get('/urls/new', [ShortUrlController::class, 'create'])->name('shortUrls.create');

    # Premade User routes from Breeze
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
