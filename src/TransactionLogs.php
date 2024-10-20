<?php

namespace RetechVN\MediatedTransaction;

use Flarum\Database\AbstractModel;
use Flarum\Database\ScopeVisibilityTrait;
use Flarum\Extend\User;
use Flarum\Foundation\EventGeneratorTrait;

class TransactionLogs extends AbstractModel
{
    use ScopeVisibilityTrait;
    // See https://docs.flarum.org/extend/models.html#backend-models for more information.
    
    protected $table = 'rvn_transaction_logs';
    public $timestamps = true; 
    public function user(){
        return $this->hasOne(User::class, 'id', 'rvn_user_id');
    }

    public function transaction(){
        return $this->belongsTo(Transaction::class, 'rvn_transaction_id');
    }
}
