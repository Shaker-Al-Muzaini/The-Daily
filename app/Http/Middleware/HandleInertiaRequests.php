<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'locale' => app()->getLocale(),
            'translations' => cache()->rememberForever('translations_all', function() {
                $en = file_exists(base_path('lang/en.json')) ? json_decode(file_get_contents(base_path('lang/en.json')), true) : [];
                $ar = file_exists(base_path('lang/ar.json')) ? json_decode(file_get_contents(base_path('lang/ar.json')), true) : [];
                return [
                    'en' => $en,
                    'ar' => $ar,
                ];
            }),
            'pending_requests_count' => cache()->remember('pending_requests_count', 60, function() {
                return \App\Models\ProductRequest::where('status', 'pending')->count();
            }),
            'latest_pending_requests' => \App\Models\ProductRequest::with('post:id,title')
                ->where('status', 'pending')
                ->latest()
                ->take(5)
                ->get()
                ->map(fn($r) => [
                    'id' => $r->id,
                    'user_name' => $r->user->name,
                    'post_title' => $r->post->title,
                    'created_at' => $r->created_at->diffForHumans(),
                ]),
            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}
