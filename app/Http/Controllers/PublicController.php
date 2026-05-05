<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Category;
use Inertia\Inertia;

class PublicController extends Controller
{
    public function products()
    {
        $posts = Post::with('category')
            ->where('is_published', true)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(fn($post) => [
                'id'             => $post->id,
                'title'          => $post->title,
                'slug'           => $post->slug,
                'excerpt'        => $post->excerpt,
                'featured_image' => $post->featured_image,
                'category'       => $post->category ? [
                    'id'   => $post->category->id,
                    'name' => $post->category->name,
                ] : null,
                'created_at'     => $post->created_at->format('Y-m-d'),
            ]);

        $categories = Category::withCount('posts')
            ->get()
            ->map(fn($c) => [
                'id'          => $c->id,
                'name'        => $c->name,
                'slug'        => $c->slug,
                'posts_count' => $c->posts_count,
            ]);

        return Inertia::render('Products', [
            'posts'      => $posts,
            'categories' => $categories,
        ]);
    }

    public function solutions()
    {
        return Inertia::render('Solutions');
    }

    public function pricing()
    {
        return Inertia::render('Pricing');
    }

    public function postShow(string $slug)
    {
        $post = Post::with('category')
            ->where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();

        $relatedPosts = Post::with('category')
            ->where('category_id', $post->category_id)
            ->where('id', '!=', $post->id)
            ->where('is_published', true)
            ->limit(3)
            ->get()
            ->map(fn($p) => [
                'id'             => $p->id,
                'title'          => $p->title,
                'slug'           => $p->slug,
                'excerpt'        => $p->excerpt,
                'featured_image' => $p->featured_image,
                'created_at'     => $p->created_at->format('Y-m-d'),
            ]);

        return Inertia::render('PostShow', [
            'post' => [
                'id'             => $post->id,
                'title'          => $post->title,
                'slug'           => $post->slug,
                'content'        => $post->content,
                'excerpt'        => $post->excerpt,
                'featured_image' => $post->featured_image,
                'category'       => $post->category ? [
                    'id'   => $post->category->id,
                    'name' => $post->category->name,
                ] : null,
                'created_at'     => $post->created_at->format('Y-m-d'),
            ],
            'relatedPosts' => $relatedPosts,
        ]);
    }
}
