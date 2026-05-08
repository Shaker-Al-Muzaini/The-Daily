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

    // الإحصائيات الأساسية
    $total_posts = \App\Models\Post::count();
    $published_posts = \App\Models\Post::where('is_published', true)->count();
    $total_categories = \App\Models\Category::count();

    // آخر 5 posts
    $recent_posts = \App\Models\Post::with('category')
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
        ]);

    // الطلبات المعلقة
    $pending_requests = \App\Models\ProductRequest::where('status', 'pending')->count();

    // توزيع الـ Categories
    $categories_breakdown = \App\Models\Category::withCount('posts')
        ->get()
        ->map(fn($c) => [
            'name' => $c->name,
            'count' => $c->posts_count,
        ]);

    // عدد الـ Posts شهرياً - يعمل على SQLite و MySQL
    if (DB::getDriverName() === 'sqlite') {
        // SQLite - استخدم strftime
        $monthly_posts = \App\Models\Post::selectRaw("strftime('%m', created_at) as month, COUNT(*) as count")
            ->whereRaw("strftime('%Y', created_at) = ?", [date('Y')])
            ->groupByRaw("strftime('%m', created_at)")
            ->orderByRaw("strftime('%m', created_at)")
            ->get()
            ->map(fn($m) => [
                'month' => date('F', mktime(0, 0, 0, (int)$m->month, 1)),
                'count' => $m->count,
            ]);
    } else {
        // MySQL - استخدم MONTH
        $monthly_posts = \App\Models\Post::selectRaw('MONTH(created_at) as month, COUNT(*) as count')
            ->whereYear('created_at', date('Y'))
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->map(fn($m) => [
                'month' => date('F', mktime(0, 0, 0, (int)$m->month, 1)),
                'count' => $m->count,
            ]);
    }

    // جمع جميع الإحصائيات
    $stats = [
        'total_posts'             => $total_posts,
        'published_posts'         => $published_posts,
        'total_categories'        => $total_categories,
        'recent_posts'            => $recent_posts,
        'pending_requests'        => $pending_requests,
        'categories_breakdown'    => $categories_breakdown,
        'monthly_posts'           => $monthly_posts,
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

    // Product Requests
    Route::get('/requests', [App\Http\Controllers\ProductRequestController::class, 'adminIndex'])->name('requests.index');
    Route::patch('/requests/{id}/status', [App\Http\Controllers\ProductRequestController::class, 'updateStatus'])->name('requests.update_status');
});

Route::middleware('auth')->group(function () {
    Route::post('/product/{id}/request', [App\Http\Controllers\ProductRequestController::class, 'store'])->name('product.request');
});

require __DIR__.'/auth.php';
