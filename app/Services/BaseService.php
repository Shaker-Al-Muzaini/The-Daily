<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Exception;

abstract class BaseService
{
    /**
     * Wrap database operations in a transaction.
     *
     * @param callable $callback
     * @return mixed
     * @throws Exception
     */
    protected function handleTransaction(callable $callback)
    {
        DB::beginTransaction();
        try {
            $result = $callback();
            DB::commit();
            return $result;
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
