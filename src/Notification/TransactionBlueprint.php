<?php
namespace RetechVN\MediatedTransaction\Notification;

use Flarum\Notification\Blueprint\BlueprintInterface;
use Flarum\User\User;
use RetechVN\MediatedTransaction\Transaction;

class TransactionBlueprint implements BlueprintInterface
{
    public $transaction;

    public function __construct(Transaction $transaction)
    {
        $this->transaction = $transaction;
    }

    public function getSubject()
    {
        return $this->transaction;
    }

    public function getFromUser()
    {
        return $this->transaction->receiver;
    }
    public function getData()
    {
        return null;
    }

    public static function getType()
    {
        return 'transactions';
    }

    public static function getSubjectModel()
    {
        return Transaction::class;
    }
}
