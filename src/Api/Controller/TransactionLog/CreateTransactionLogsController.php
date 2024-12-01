<?php

namespace RetechVN\MediatedTransaction\Api\Controller\TransactionLog;

use Flarum\Api\Controller\AbstractShowController;
use Flarum\Http\RequestUtil;
use Flarum\User\Exception\NotAuthenticatedException;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use RetechVN\MediatedTransaction\Api\Serializer\TransactionLogsSerializer;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use RetechVN\MediatedTransaction\Transaction;
use RetechVN\MediatedTransaction\TransactionLogs;

class CreateTransactionLogsController extends AbstractShowController
{
    /**
     * {@inheritdoc}
     */
    public $serializer = TransactionLogsSerializer::class;

    /**
     * {@inheritdoc}
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {

        $actor = RequestUtil::getActor($request);
        if ($actor->isGuest()) {
            throw new NotAuthenticatedException();
        }
        $userId = $actor->id;
        $requestData = Arr::get($request->getParsedBody(), 'data');

        $transId = intval($requestData['transId']);
        $userId = intval($requestData['userId']);
        $reason = trim($requestData['reason']);
        $status_old = intval($requestData['status_old']);
        $status = intval($requestData['status']);

        try {

            $gen = true;
            if ($status === 3) {
                $transaction = Transaction::select('rvn_creator_id', 'rvn_receiver_id')
                    ->where('id', $transId)
                    ->firstOrFail();

                $creatorLog = TransactionLogs::where('rvn_transaction_id', $transId)
                    ->where('rvn_user_id', $transaction->rvn_creator_id)
                    ->latest()
                    ->first();

                $receiverLog = TransactionLogs::where('rvn_transaction_id', $transId)
                    ->where('rvn_user_id', $transaction->rvn_receiver_id)
                    ->latest()
                    ->first();

                if (
                    (!$creatorLog || $creatorLog->rvn_status !== 3) ||
                    (!$receiverLog || $receiverLog->rvn_status !== 3)
                ) {
                    $gen = false;
                }
            }
            $transaction = Transaction::findOrFail($transId);
            if ($gen)
                $transaction->rvn_status = $status;
            $transaction->save();

            $transactionLog = new TransactionLogs();
            $transactionLog->rvn_transaction_id = $transId;
            $transactionLog->rvn_user_id = $userId;
            $transactionLog->rvn_status = $status;
            $transactionLog->rvn_reason = $reason;
            $transactionLog->rvn_status_old = $status_old;
            $transactionLog->save();

            return $transactionLog;
        } catch (ModelNotFoundException $e) {
            throw new \Flarum\Http\Exception\RouteNotFoundException('Transaction not found');
        } catch (\Exception $e) {
            throw new \Exception('Unable to update transaction log');
        }
    }
}
