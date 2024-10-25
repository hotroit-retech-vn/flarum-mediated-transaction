<?php

namespace RetechVN\MediatedTransaction;

use Flarum\Database\AbstractModel;
use Flarum\Database\ScopeVisibilityTrait;
use Flarum\User\User;

class TransactionLogs extends AbstractModel
{
    use ScopeVisibilityTrait;
    // See https://docs.flarum.org/extend/models.html#backend-models for more information.
    
    protected $table = 'rvn_transaction_logs';
    public $timestamps = true; 

    protected $fillable = ['rvn_transaction_id', 'rvn_user_id', 'rvn_status', 'rvn_reason'];
    public function creator(){
        return $this->belongsTo(User::class, 'rvn_user_id');
    }

    public function transaction(){
        return $this->belongsTo(Transaction::class, 'rvn_transaction_id');
    }
}
