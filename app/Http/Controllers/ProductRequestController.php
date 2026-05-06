<?php

namespace App\Http\Controllers;

use App\Models\ProductRequest;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductRequestController extends Controller
{
    public function store(Request $request, int $id)
    {
        $post = Post::findOrFail($id);

        ProductRequest::create([
            'user_id' => $request->user()->id,
            'post_id' => $post->id,
            'status'  => 'pending',
        ]);

        return redirect()->back()->with('success', 'Request sent successfully');
    }

    public function adminIndex()
    {
        $requests = ProductRequest::with(['user', 'post'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($req) {
                return [
                    'id'         => $req->id,
                    'user_name'  => $req->user->name,
                    'user_email' => $req->user->email,
                    'post_title' => $req->post->title,
                    'status'     => $req->status,
                    'created_at' => $req->created_at->format('Y-m-d H:i'),
                ];
            });

        return Inertia::render('Admin/Requests/Index', [
            'requests' => $requests,
        ]);
    }

    public function updateStatus(Request $request, int $id)
    {
        $request->validate([
            'status' => 'required|in:approved,rejected,pending',
        ]);

        $productRequest = ProductRequest::findOrFail($id);
        $productRequest->update([
            'status' => $request->status,
        ]);

        return redirect()->back()->with('success', 'Status updated successfully');
    }
}
