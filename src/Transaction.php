<?php

namespace RetechVN\MediatedTransaction;

use Flarum\Database\AbstractModel;
use Flarum\Database\ScopeVisibilityTrait;
use Flarum\Foundation\EventGeneratorTrait;
use Flarum\User\User;

class Transaction extends AbstractModel
{
    use ScopeVisibilityTrait;
    // See https://docs.flarum.org/extend/models.html#backend-models for more information.

    protected $table = 'rvn_transactions';
    public $timestamps = true;
    protected $fillable = ['rvn_creator_id', 'rvn_receiver_id', 'rvn_amount', 'rvn_fee', 'rvn_payer_id', 'rvn_note'];
    public function creator()
    {
        return $this->belongsTo(User::class, 'rvn_creator_id');
    }

    public function receiver()
    {
        return $this->belongsTo(User::class, 'rvn_receiver_id');
    }

    public function logs()
    {
        return $this->hasMany(TransactionLogs::class, 'rvn_transaction_id');
    }

    public function latestLog()
    {
        return $this->hasOne(TransactionLogs::class, 'rvn_transaction_id')->latest();
    }

    public function banks()
    {
        return $this->hasMany(BankTransaction::class, 'rvn_transaction_id');
    }

}
