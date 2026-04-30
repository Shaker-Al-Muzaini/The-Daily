<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\PageService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    protected $pageService;

    public function __construct(PageService $pageService)
    {
        $this->pageService = $pageService;
    }

    public function index()
    {
        $pages = $this->pageService->getAllPages();
        return Inertia::render('Admin/Pages/Index', [
            'pages' => $pages
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Pages/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'slug' => 'required|unique:pages,slug',
            'title.en' => 'required|string',
            'title.ar' => 'required|string',
            'content.en' => 'required|string',
            'content.ar' => 'required|string',
        ]);

        $this->pageService->createPage($request->all());

        return redirect()->route('admin.pages.index')->with('success', 'Page created successfully');
    }

    public function edit(int $id)
    {
        $page = $this->pageService->getAllPages()->find($id);
        return Inertia::render('Admin/Pages/Edit', [
            'page' => $page
        ]);
    }

    public function update(Request $request, int $id)
    {
        $request->validate([
            'slug' => 'required|unique:pages,slug,'.$id,
            'title.en' => 'required|string',
            'title.ar' => 'required|string',
            'content.en' => 'required|string',
            'content.ar' => 'required|string',
        ]);

        $this->pageService->updatePage($id, $request->all());

        return redirect()->route('admin.pages.index')->with('success', 'Page updated successfully');
    }
}
