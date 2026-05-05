<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Post extends Model
{
    protected $fillable = [
        'category_id',
        'title',
        'content',
        'excerpt',
        'slug',
        'featured_image',
        'is_published',
    ];

    protected $casts = [
        'title'        => 'array',
        'content'      => 'array',
        'excerpt'      => 'array',
        'is_published' => 'boolean',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function getLocalizedTitle(string $locale = 'en'): string
    {
        $title = $this->title;
        return $title[$locale] ?? $title['en'] ?? '';
    }

    public function getLocalizedExcerpt(string $locale = 'en'): string
    {
        $excerpt = $this->excerpt;
        if (!$excerpt) return '';
        return $excerpt[$locale] ?? $excerpt['en'] ?? '';
    }
}
