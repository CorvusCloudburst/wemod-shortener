<?php

namespace Database\Factories;

use App\Models\ShortUrl;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UrlVisit>
 */
class UrlVisitFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'short_url_id' => rand(1, 35),
            'ip' => rand(100, 199) . '.' . rand(10, 99) . '.' . rand(10, 99) . '.' . rand(100, 200),
        ];
    }
}
