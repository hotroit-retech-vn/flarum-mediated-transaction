<?php

namespace RetechVN\MediatedTransaction\Api\Serializer;

use Flarum\Api\Serializer\AbstractSerializer;
use Flarum\Api\Serializer\BasicUserSerializer;
use RetechVN\MediatedTransaction\TransactionLogs;
use InvalidArgumentException;

class TransactionLogsSerializer extends AbstractSerializer
{
    /**
     * {@inheritdoc}
     */
    protected $type = 'transaction-logs';

    /**
     * {@inheritdoc}
     *
     * @param TransactionLogs $model
     * @throws InvalidArgumentException
     */
    protected function getDefaultAttributes($model)
    {
        if (! ($model instanceof TransactionLogs)) {
            throw new InvalidArgumentException(
                get_class($this).' can only serialize instances of '.TransactionLogs::class
            );
        }

        return $model;
    }

    protected function user($transactionHistory) {
        return $this->hasOne($transactionHistory, BasicUserSerializer::class);
    }
}
