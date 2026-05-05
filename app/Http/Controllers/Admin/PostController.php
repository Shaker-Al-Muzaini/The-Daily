<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::with('category')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($post) {
                return [
                    'id'             => $post->id,
                    'title'          => $post->title,
                    'slug'           => $post->slug,
                    'excerpt'        => $post->excerpt,
                    'featured_image' => $post->featured_image,
                    'is_published'   => $post->is_published,
                    'category'       => $post->category ? [
                        'id'   => $post->category->id,
                        'name' => $post->category->name,
                    ] : null,
                    'created_at'     => $post->created_at->format('Y-m-d'),
                ];
            });

        return Inertia::render('Admin/Posts/Index', [
            'posts' => $posts,
        ]);
    }

    public function create()
    {
        $categories = Category::all()->map(fn($c) => [
            'id'   => $c->id,
            'name' => $c->name,
        ]);

        return Inertia::render('Admin/Posts/Create', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title.en'    => 'required|string',
            'title.ar'    => 'required|string',
            'content.en'  => 'required|string',
            'content.ar'  => 'required|string',
            'excerpt.en'  => 'nullable|string',
            'excerpt.ar'  => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
        ]);

        $data = $request->all();
        $data['slug'] = Str::slug($data['title']['en']);
        $data['is_published'] = $request->boolean('is_published', false);

        if ($request->hasFile('featured_image')) {
            $data['featured_image'] = $request->file('featured_image')->store('posts', 'public');
        }

        Post::create($data);

        return redirect()->route('admin.posts.index')->with('success', 'Post created successfully');
    }

    public function edit(int $id)
    {
        $post = Post::findOrFail($id);
        $categories = Category::all()->map(fn($c) => [
            'id'   => $c->id,
            'name' => $c->name,
        ]);

        return Inertia::render('Admin/Posts/Edit', [
            'post' => [
                'id'             => $post->id,
                'title'          => $post->title,
                'slug'           => $post->slug,
                'content'        => $post->content,
                'excerpt'        => $post->excerpt,
                'featured_image' => $post->featured_image,
                'is_published'   => $post->is_published,
                'category_id'    => $post->category_id,
            ],
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, int $id)
    {
        $request->validate([
            'title.en'    => 'required|string',
            'title.ar'    => 'required|string',
            'content.en'  => 'required|string',
            'content.ar'  => 'required|string',
            'excerpt.en'  => 'nullable|string',
            'excerpt.ar'  => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
        ]);

        $post = Post::findOrFail($id);
        $data = $request->all();
        $data['slug'] = Str::slug($data['title']['en']);
        $data['is_published'] = $request->boolean('is_published', false);

        if ($request->hasFile('featured_image')) {
            $data['featured_image'] = $request->file('featured_image')->store('posts', 'public');
        }

        $post->update($data);

        return redirect()->route('admin.posts.index')->with('success', 'Post updated successfully');
    }

    public function destroy(int $id)
    {
        Post::findOrFail($id)->delete();
        return redirect()->route('admin.posts.index')->with('success', 'Post deleted successfully');
    }
}
