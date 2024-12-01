<?php

namespace RetechVN\MediatedTransaction\Api\Controller;

use Flarum\Api\Controller\AbstractShowController;
use Flarum\Foundation\ValidationException;
use Flarum\Http\RequestUtil;
use Flarum\User\Exception\NotAuthenticatedException;
use Illuminate\Support\Arr;
use Illuminate\Validation\UnauthorizedException;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use RetechVN\MediatedTransaction\Api\Serializer\PayRequestSerializer;
use RetechVN\MediatedTransaction\PayRequest;

class CreatePayRequestController extends AbstractShowController
{
    /**
     * {@inheritdoc}
     */
    public $serializer = PayRequestSerializer::class;

    /**
     * {@inheritdoc}
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        // See https://docs.flarum.org/extend/api.html#api-endpoints for more information.

        $actor = RequestUtil::getActor($request);
        $requestData = Arr::get($request->getParsedBody(), 'data');
        $rvnMonney = intval($requestData['rvn_monney']);
        $rvnBankaccName = intval($requestData['rvn_bankacc_name']);
        $rvnBankaccNumber = trim($requestData['rvn_bankacc_number']);
        $rvnBankName = intval($requestData['rvn_bank_name']);
        $rvnNote = trim($requestData['rvn_note']);
        $errorMessage = "";
        if ($actor->isGuest())
            throw new NotAuthenticatedException();

        try {
            $payRequest = new PayRequest();
            $payRequest->rvn_bankacc_name = $rvnBankaccName;
            $payRequest->rvn_bankacc_number = $rvnBankaccNumber;
            $payRequest->rvn_bank_name = $rvnBankName;
            $payRequest->rvn_note = $rvnNote;
            $payRequest->rvn_monney = $rvnMonney;
            $payRequest->rvn_create_by = $actor->id();
            $payRequest->save();

            return $payRequest;
        } catch (\Throwable $th) {
            $errorMessage = $th;
        }

        if ($errorMessage !== "") {
            throw new ValidationException(['message' => $errorMessage]);
        }
    }
}
