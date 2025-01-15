<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ShortUrl extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $hidden = [
        'user',
    ];

    protected $appends = [
        'owner',
        // 'visits',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function urlVisits(): HasMany
    {
        return $this->hasMany(UrlVisit::class);
    }

    public function getOwnerAttribute()
    {
        return $this->user->name;
    }

    // public function getVisitsAttribute()
    // {
    //     return $this->url_visits->count();
    // }
}
