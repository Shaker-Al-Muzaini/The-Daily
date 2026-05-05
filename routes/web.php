<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Session;

Route::get('/language/{locale}', function ($locale) {
    if (in_array($locale, ['en', 'ar'])) {
        Session::put('locale', $locale);
    }
    return redirect()->back();
})->name('language.switch');

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Public pages
Route::get('/products', [PublicController::class, 'products'])->name('products');
Route::get('/solutions', [PublicController::class, 'solutions'])->name('solutions');
Route::get('/pricing', [PublicController::class, 'pricing'])->name('pricing');
Route::get('/post/{slug}', [PublicController::class, 'postShow'])->name('post.show');

Route::get('/dashboard', function () {
    $stats = [
        'total_posts'      => \App\Models\Post::count(),
        'published_posts'  => \App\Models\Post::where('is_published', true)->count(),
        'total_categories' => \App\Models\Category::count(),
        'recent_posts'     => \App\Models\Post::with('category')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(fn($p) => [
                'id'           => $p->id,
                'title'        => $p->title,
                'slug'         => $p->slug,
                'is_published' => $p->is_published,
                'category'     => $p->category ? ['name' => $p->category->name] : null,
                'created_at'   => $p->created_at->format('Y-m-d'),
            ]),
    ];
    return Inertia::render('Dashboard', ['stats' => $stats]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    // Pages
    Route::get('/pages', [App\Http\Controllers\Admin\PageController::class, 'index'])->name('pages.index');
    Route::get('/pages/create', [App\Http\Controllers\Admin\PageController::class, 'create'])->name('pages.create');
    Route::post('/pages', [App\Http\Controllers\Admin\PageController::class, 'store'])->name('pages.store');
    Route::get('/pages/{id}/edit', [App\Http\Controllers\Admin\PageController::class, 'edit'])->name('pages.edit');
    Route::put('/pages/{id}', [App\Http\Controllers\Admin\PageController::class, 'update'])->name('pages.update');

    // Posts
    Route::get('/posts', [App\Http\Controllers\Admin\PostController::class, 'index'])->name('posts.index');
    Route::get('/posts/create', [App\Http\Controllers\Admin\PostController::class, 'create'])->name('posts.create');
    Route::post('/posts', [App\Http\Controllers\Admin\PostController::class, 'store'])->name('posts.store');
    Route::get('/posts/{id}/edit', [App\Http\Controllers\Admin\PostController::class, 'edit'])->name('posts.edit');
    Route::put('/posts/{id}', [App\Http\Controllers\Admin\PostController::class, 'update'])->name('posts.update');
    Route::delete('/posts/{id}', [App\Http\Controllers\Admin\PostController::class, 'destroy'])->name('posts.destroy');

    // Categories
    Route::get('/categories', [App\Http\Controllers\Admin\CategoryController::class, 'index'])->name('categories.index');
    Route::post('/categories', [App\Http\Controllers\Admin\CategoryController::class, 'store'])->name('categories.store');
    Route::put('/categories/{id}', [App\Http\Controllers\Admin\CategoryController::class, 'update'])->name('categories.update');
    Route::delete('/categories/{id}', [App\Http\Controllers\Admin\CategoryController::class, 'destroy'])->name('categories.destroy');
});

require __DIR__.'/auth.php';
