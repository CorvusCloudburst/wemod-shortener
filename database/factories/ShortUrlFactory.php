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
            'original_url' => [
                'https://corvus.rip', 'https://corvus.rip', 'https://corvus.rip', 'https://corvus.rip', 'https://corvus.rip',
                'https://cloudburst.ink/art/ride-or-die',
                'https://cloudburst.ink/art/men-like-us',
                'https://cloudburst.ink/art/smile',
                'https://cloudburst.ink/art/saturn-window',
                'https://cloudburst.ink/art/ever-after',
                'https://cloudburst.ink/art/lux-mea',
                'https://cloudburst.ink/art/if-i-am-doomed',
            ],
            'short_url_path' => substr(md5(microtime()),rand(0,26), 5)
        ];
    }
}
