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
    public function creator(){
        return $this->belongsTo(User::class, 'rvn_creator_id');
    }

    public function receiver(){
        return $this->belongsTo(User::class, 'rvn_receiver_id');
    }

    public function logs(){
        return $this->hasMany(TransactionLogs::class, 'rvn_transaction_id');
    }
}
