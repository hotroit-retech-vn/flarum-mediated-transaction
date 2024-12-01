<?php
namespace RetechVN\MediatedTransaction\Api\Controller\PayResquest;

use Flarum\Api\Controller\AbstractShowController;
use Flarum\Foundation\ValidationException;
use Flarum\Http\RequestUtil;
use Flarum\User\Exception\NotAuthenticatedException;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use RetechVN\MediatedTransaction\Api\Serializer\PayRequestSerializer;
use RetechVN\MediatedTransaction\BankInfo;
use RetechVN\MediatedTransaction\PayRequest;

class CreatePayRequestController extends AbstractShowController
{
    public $serializer = PayRequestSerializer::class;

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        if ($actor->isGuest()) {
            throw new NotAuthenticatedException();
        }

        $requestData = Arr::get($request->getParsedBody(), 'data', []);
        if (!$requestData || !isset($requestData['rvn_monney'], $requestData['rvn_bankacc_name'], $requestData['rvn_bankacc_number'], $requestData['rvn_bank_name'])) {
            throw new ValidationException(['message' => 'Dữ liệu thiếu.']);
        }

        $rvnMoney = intval($requestData['rvn_monney']);
        $rvnBankAccountName = trim($requestData['rvn_bankacc_name']);
        $rvnBankAccountNumber = intval($requestData['rvn_bankacc_number']);
        $rvnBankName = trim($requestData['rvn_bank_name']);
        $rvnNote = trim($requestData['rvn_note']);

        try {
            $bankInfo = BankInfo::firstOrCreate(
                ['rvn_bankacc_number' => $rvnBankAccountNumber, 'rvn_create_by' => $actor->id],
                ['rvn_bankacc_name' => $rvnBankAccountName, 'rvn_bank_name' => $rvnBankName]
            );

            $payRequest = new PayRequest();
            $payRequest->rvn_bank_id = $bankInfo->id;
            $payRequest->rvn_note = $rvnNote;
            $payRequest->rvn_monney = $rvnMoney;
            $payRequest->rvn_create_by = $actor->id;
            $payRequest->save();

            return [
                'status' => 201,
                'data' => $payRequest
            ];
        } catch (\Throwable $th) {
            throw new ValidationException(['message' => $th->getMessage()]);
        }
    }
}
