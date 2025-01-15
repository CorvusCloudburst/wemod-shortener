<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ShortUrl>
 */
class ShortUrlFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => rand(1, 10),
            'original_url' => 'https://cloudburst.ink/art/' . Arr::random(['ride-or-die', 'smile', 'chokehold', 'crushed', 'ever-after', 'lux-mea']),
            'short_url_path' => substr(md5(microtime()),rand(0,26), 5)
        ];
    }
}
