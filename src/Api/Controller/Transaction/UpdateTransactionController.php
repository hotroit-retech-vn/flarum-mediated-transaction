<?php

namespace RetechVN\MediatedTransaction\Api\Controller\Transaction;

use Flarum\Api\Controller\AbstractShowController;
use Flarum\Http\RequestUtil;
use Illuminate\Contracts\Bus\Dispatcher;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use RetechVN\MediatedTransaction\Api\Serializer\TransactionSerializer;
use Flarum\Foundation\ValidationException;
use RetechVN\MediatedTransaction\Transaction;
use RetechVN\MediatedTransaction\TransactionLogs;

class UpdateTransactionController extends AbstractShowController
{
    /**
     * {@inheritdoc}
     */
    public $serializer = TransactionSerializer::class;

    /**
     * @var Dispatcher
     */
    protected $bus;

    /**
     * @param Dispatcher $bus
     */
    public function __construct(Dispatcher $bus)
    {
        $this->bus = $bus;
    }


    /**
     * {@inheritdoc}
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $modelId = Arr::get($request->getQueryParams(), 'id');
        $data = Arr::get($request->getParsedBody(), 'data', []);

        $requestData = Arr::get($request->getParsedBody(), 'data');
        $rvnCreatorID = intval($requestData['rvn_status']);
        $actor = RequestUtil::getActor($request);
        $errorMessage = "";

        $currentUserData = Transaction::find($currentUserID);
        // $allowUsePoint = $currentUserData

        try {
            $transactionLog = new TransactionLogs();
            $transactionLog->rvn_status = $transaction->id;
            $transactionLog->save();

            return $transactionLog;
        } catch (\Exception $th) {
            $errorMessage = $th;
        }



        if ($errorMessage !== "") {
            throw new ValidationException(['message' => $errorMessage]);
        }
    }
}
