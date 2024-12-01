<?php

namespace RetechVN\MediatedTransaction\Api\Controller;

use Flarum\Api\Controller\AbstractShowController;
use Flarum\Http\RequestUtil;
use Flarum\User\Exception\NotAuthenticatedException;
use Illuminate\Support\Arr;
use Illuminate\Validation\UnauthorizedException;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use RetechVN\MediatedTransaction\Api\Serializer\BankInfoSerializer;
use RetechVN\MediatedTransaction\PayRequest;

class UpdateBankInfoController extends AbstractShowController
{
    /**
     * {@inheritdoc}
     */
    public $serializer = BankInfoSerializer::class;

    /**
     * {@inheritdoc}
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        // See https://docs.flarum.org/extend/api.html#api-endpoints for more information.

        $actor = RequestUtil::getActor($request);
        $modelId = Arr::get($request->getParsedBody(), 'id');

        if ($actor->isGuest())
            throw new NotAuthenticatedException();
        if ($actor->isAdmin())
            throw new UnauthorizedException();

        $model = PayRequest::find($modelId);
        if ($model->rvn_create_by != $actor->id())
            throw new UnauthorizedException();

        return $model;
    }
}
