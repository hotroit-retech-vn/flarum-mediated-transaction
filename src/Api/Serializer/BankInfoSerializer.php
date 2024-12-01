<?php

namespace RetechVN\MediatedTransaction\Api\Serializer;

use Flarum\Api\Serializer\AbstractSerializer;
use InvalidArgumentException;
use RetechVN\MediatedTransaction\BankInfo;

class BankInfoSerializer extends AbstractSerializer
{
    /**
     * {@inheritdoc}
     */
    protected $type = 'pay-requests';

    /**
     * {@inheritdoc}
     *
     * @param BankInfo $model
     * @throws InvalidArgumentException
     */
    protected function getDefaultAttributes($model)
    {
        if (! ($model instanceof BankInfo)) {
            throw new InvalidArgumentException(
                get_class($this).' can only serialize instances of '.BankInfo::class
            );
        }

        // See https://docs.flarum.org/extend/api.html#serializers for more information.

        return $model;
    }
}
