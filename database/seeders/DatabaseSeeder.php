<?php

namespace Database\Seeders;

use App\Models\ShortUrl;
use App\Models\UrlVisit;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(10)->create();
        ShortUrl::factory(35)->create();
        User::factory(1, [
            'id' => 888,
            'name' => 'Hiyre Mei',
            'email' => 'meep@moop.mop',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            'remember_token' => Str::random(10),
        ])->create();
        ShortUrl::factory(13, [
            'user_id' => 888,
        ])->create();
        UrlVisit::factory(300)->create();
    }
}
