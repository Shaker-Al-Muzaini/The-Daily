<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    protected $fillable = ['name', 'slug'];

    protected $casts = [
        'name' => 'array',
    ];

    public function posts(): HasMany
    {
        return $this->hasMany(Post::class);
    }

    public function getLocalizedName(string $locale = 'en'): string
    {
        $name = $this->name;
        return $name[$locale] ?? $name['en'] ?? '';
    }
}
