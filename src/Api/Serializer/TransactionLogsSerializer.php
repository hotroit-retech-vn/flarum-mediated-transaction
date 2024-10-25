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
        $attributes = [
            'id' => $model->id,
            'rvn_transaction_id' => $model->rvn_transaction_id,
            'rvn_user_id' => $model->rvn_user_id,
            'rvn_status' => $model->rvn_status,
            'rvn_reason' => $model->rvn_reason,
            'created_at' => date("Y-m-d H:i:s", strtotime($model->created_at)),
            'updated_at' => date("Y-m-d H:i:s", strtotime($model->updated_at)),
            'creator' => $model->creator,
            'transaction' =>  $model->transaction
        ];
        
        return $attributes;
    }
    protected function transaction($transLog) {
        return $this->hasOne($transLog, TransactionSerializer::class);
    }

    protected function creator($transLog) {
        return $this->hasOne($transLog, BasicUserSerializer::class);
    }
}
