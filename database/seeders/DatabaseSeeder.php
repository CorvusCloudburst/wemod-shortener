<?php

namespace Database\Seeders;

use App\Models\ShortUrl;
use App\Models\UrlVisit;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(10)->create();
        ShortUrl::factory(35)->create();
        UrlVisit::factory(100)->create();
    }
}
