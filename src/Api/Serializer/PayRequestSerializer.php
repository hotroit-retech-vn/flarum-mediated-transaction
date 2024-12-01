<?php

namespace RetechVN\MediatedTransaction\Api\Serializer;

use Flarum\Api\Serializer\AbstractSerializer;
use RetechVN\MediatedTransaction\PayRequest;
use InvalidArgumentException;

class PayRequestSerializer extends AbstractSerializer
{
    /**
     * {@inheritdoc}
     */
    protected $type = 'pay-requests';

    /**
     * {@inheritdoc}
     *
     * @param PayRequest $model
     * @throws InvalidArgumentException
     */
    protected function getDefaultAttributes($model)
    {
        if (! ($model instanceof PayRequest)) {
            throw new InvalidArgumentException(
                get_class($this).' can only serialize instances of '.PayRequest::class
            );
        }

        // See https://docs.flarum.org/extend/api.html#serializers for more information.

        return $model;
    }
}
