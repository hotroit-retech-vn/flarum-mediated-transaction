<?php

namespace RetechVN\MediatedTransaction;

use Flarum\User\User;
use Illuminate\Database\Eloquent\Builder;
use RetechVN\MediatedTransaction\Transaction;

class TransactionRepository
{
    /**
     * @return Builder
     */
    public function query()
    {
        return Transaction::query();
    }

    /**
     * @param int $id
     * @param User $actor
     * @return Transaction
     */
    public function findOrFail($id, User $actor = null): Transaction
    {
        return Transaction::findOrFail($id);
    }
}
