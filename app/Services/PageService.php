<?php

namespace App\Services;

use App\Contracts\PageRepositoryInterface;
use App\Models\Page;

class PageService extends BaseService
{
    protected $pageRepository;

    public function __construct(PageRepositoryInterface $pageRepository)
    {
        $this->pageRepository = $pageRepository;
    }

    public function createPage(array $data): Page
    {
        return $this->handleTransaction(function () use ($data) {
            return $this->pageRepository->create($data);
        });
    }

    public function updatePage(int $id, array $data): bool
    {
        return $this->handleTransaction(function () use ($id, $data) {
            return $this->pageRepository->update($id, $data);
        });
    }

    public function getAllPages()
    {
        return $this->pageRepository->all();
    }

    public function getPageBySlug(string $slug)
    {
        return $this->pageRepository->findBySlug($slug);
    }
}
