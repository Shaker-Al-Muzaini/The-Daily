<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::withCount('posts')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(fn($c) => [
                'id'          => $c->id,
                'name'        => $c->name,
                'slug'        => $c->slug,
                'posts_count' => $c->posts_count,
                'created_at'  => $c->created_at->format('Y-m-d'),
            ]);

        return Inertia::render('Admin/Categories/Index', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name.en' => 'required|string',
            'name.ar' => 'required|string',
        ]);

        $data = $request->all();
        $data['slug'] = Str::slug($data['name']['en']);

        Category::create($data);

        return redirect()->route('admin.categories.index')->with('success', 'Category created successfully');
    }

    public function update(Request $request, int $id)
    {
        $request->validate([
            'name.en' => 'required|string',
            'name.ar' => 'required|string',
        ]);

        $category = Category::findOrFail($id);
        $data = $request->all();
        $data['slug'] = Str::slug($data['name']['en']);

        $category->update($data);

        return redirect()->route('admin.categories.index')->with('success', 'Category updated successfully');
    }

    public function destroy(int $id)
    {
        Category::findOrFail($id)->delete();
        return redirect()->route('admin.categories.index')->with('success', 'Category deleted successfully');
    }
}
