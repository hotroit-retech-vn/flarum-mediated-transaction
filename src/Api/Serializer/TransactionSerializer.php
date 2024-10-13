<?php

namespace RetechVN\MediatedTransaction\Api\Serializer;

use Flarum\Api\Serializer\AbstractSerializer;
use Flarum\Api\Serializer\BasicUserSerializer;
use RetechVN\MediatedTransaction\Transaction;
use InvalidArgumentException;

class TransactionSerializer extends AbstractSerializer
{

    protected $type = 'transactions';


    protected function getDefaultAttributes($model)
    {
        $attributes = [
            'id' => $model->id,
            'rvn_creator_id' => $model->rvn_creator_id,
            'rvn_receiver_id' => $model->rvn_receiver_id,
            'rvn_amount' => $model->rvn_amount,
            'rvn_fee' => $model->rvn_fee,
            'rvn_payer_id' => $model->rvn_payer_id,
            'rvn_note' => $model->rvn_note
        ];
        
        return $model;
    }

    protected function creator($transactionHistory) {
        return $this->hasOne($transactionHistory, BasicUserSerializer::class);
    }
    protected function receiver($transactionHistory) {
        return $this->hasOne($transactionHistory, BasicUserSerializer::class);
    }
}
