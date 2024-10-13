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

    public function creator(){
        return $this->hasOne(User::class, 'id', 'rvn_creator_id');
    }

    public function receiver(){
        return $this->hasOne(User::class, 'id', 'rvn_receiver_id');
    }
}
