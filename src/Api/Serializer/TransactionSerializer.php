<?php

namespace RetechVN\MediatedTransaction\Api\Serializer;

use Flarum\Api\Serializer\AbstractSerializer;
use Flarum\Api\Serializer\BasicUserSerializer;

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
            'rvn_note' => $model->rvn_note,
            'created_at' => date("Y-m-d H:i:s", strtotime($model->created_at)),
            'updated_at' => date("Y-m-d H:i:s", strtotime($model->updated_at)),
            'creator' => $model->creator,
            'receiver' => $model->receiver,
            'latest_log_status' => $model->latestLog ? $model->latestLog->rvn_status : null,
        ];
        
        return $attributes;
    }

    protected function creator($transactionHistory) {
        return $this->hasOne($transactionHistory, BasicUserSerializer::class);
    }
    protected function receiver($transactionHistory) {
        return $this->hasOne($transactionHistory, BasicUserSerializer::class);
    }

    protected function logs($transactionHistory) {
        return $this->hasMany($transactionHistory, TransactionLogsSerializer::class);
    }
    
}
