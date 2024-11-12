<?php

namespace RetechVN\MediatedTransaction\Api\Serializer;

use Flarum\Api\Serializer\AbstractSerializer;
use Flarum\Api\Serializer\BasicUserSerializer;
use InvalidArgumentException;
use RetechVN\MediatedTransaction\BankTransaction;

class BankTransactionsSerializer extends AbstractSerializer
{
    /**
     * {@inheritdoc}
     */
    protected $type = 'bank-transactions';

    /**
     * {@inheritdoc}
     *
     * @param BankTransaction $model
     * @throws InvalidArgumentException
     */
    protected function getDefaultAttributes($model)
    {
        return $model;
    }
    protected function transaction($transLog) {
        return $this->hasOne($transLog, TransactionSerializer::class);
    }

}
