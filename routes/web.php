<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ShortUrlController;
use Illuminate\Support\Facades\Route;

Route::get('/', [ShortUrlController::class, 'homepage'])->name('shortUrls.homepage');

Route::middleware('auth')->group(function () {
    # URL Redirect Functionality
    Route::get('/go/{shortUrlPath}', [ShortUrlController::class, 'go'])->name('shortUrls.go');

    # URL Management endpoints
    Route::get('/urls', [ShortUrlController::class, 'index'])->name('shortUrls.index');
    Route::post('/urls', [ShortUrlController::class, 'generate'])->name('shortUrls.generate');
    Route::get('/urls/new', [ShortUrlController::class, 'create'])->name('shortUrls.create');
    Route::get('/urls/{shortUrlPath}', [ShortUrlController::class, 'analytics'])->name('shortUrls.analytics');

    # Premade User routes from Breeze
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
