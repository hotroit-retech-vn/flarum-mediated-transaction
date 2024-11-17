<?php

namespace RetechVN\MediatedTransaction\Api\Serializer;

use Flarum\Api\Serializer\AbstractSerializer;

class CustomerSerializer extends AbstractSerializer
{

    protected $type = 'customder';


    protected function getDefaultAttributes($model)
    {
        return $model;
    }


}
