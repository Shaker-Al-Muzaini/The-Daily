<?php

namespace App\Repositories;

use App\Contracts\PageRepositoryInterface;
use App\Models\Page;

class PageRepository extends BaseRepository implements PageRepositoryInterface
{
    public function __construct(Page $model)
    {
        parent::__construct($model);
    }

    public function findBySlug(string $slug): ?Page
    {
        return $this->model->where('slug', $slug)->first();
    }
}
