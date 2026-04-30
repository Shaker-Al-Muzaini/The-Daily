<?php

namespace App\Contracts;

use App\Models\Page;

interface PageRepositoryInterface extends RepositoryInterface
{
    public function findBySlug(string $slug): ?Page;
}
