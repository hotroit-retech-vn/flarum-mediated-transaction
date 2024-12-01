<?php

namespace RetechVN\MediatedTransaction\Api\Serializer;

use Flarum\Api\Serializer\AbstractSerializer;

class PayRequestSerializer extends AbstractSerializer
{

    protected $type = 'pay-requests';

    protected function getDefaultAttributes($model)
    {
        return $model;
    }
}
