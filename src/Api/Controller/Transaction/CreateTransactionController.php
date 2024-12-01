<?php

namespace RetechVN\MediatedTransaction\Api\Controller\Transaction;

use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Http\RequestUtil;
use Flarum\User\Exception\NotAuthenticatedException;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use RetechVN\MediatedTransaction\Notification\TransactionBlueprint;
use RetechVN\MediatedTransaction\Transaction;
use RetechVN\MediatedTransaction\TransactionLogs;
use Tobscure\JsonApi\Document;
use RetechVN\MediatedTransaction\Api\Serializer\TransactionSerializer;
use Flarum\Notification\NotificationSyncer;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\Foundation\ValidationException;
use Flarum\User\User;
class CreateTransactionController extends AbstractCreateController
{
    public $serializer = TransactionSerializer::class;
    protected $settings;
    protected $notifications;

    public function __construct(NotificationSyncer $notifications, SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
        $this->notifications = $notifications;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        if ($actor->isGuest()) {
            throw new NotAuthenticatedException();
        }
        $userId = $actor->id;
        $requestData = Arr::get($request->getParsedBody(), 'data');
        $rvnCreatorID = intval($requestData['rvn_creator_id']);
        $rvnReceiverID = intval($requestData['rvn_receiver_id']);
        $rvnAmount = intval($requestData['rvn_amount']);
        $rvnFee = trim($requestData['rvn_fee']);
        $rvnPayerID = intval($requestData['rvn_payer_id']);
        $rvnNote = trim($requestData['rvn_note']);
        $errorMessage = "";

        try {
            $transaction = new Transaction();
            $transaction->rvn_creator_id = $rvnCreatorID;
            $transaction->rvn_receiver_id = $rvnReceiverID;
            $transaction->rvn_amount = $rvnAmount;
            $transaction->rvn_fee = $rvnFee;
            $transaction->rvn_payer_id = $rvnPayerID;
            $transaction->rvn_note = $rvnNote;
            $transaction->save();

            $transactionLog = new TransactionLogs();
            $transactionLog->rvn_transaction_id = $transaction->id;
            $transactionLog->rvn_user_id = $transaction->rvn_creator_id;
            $transactionLog->save();

            // $this->notifications->sync(new TransactionBlueprint($transaction), [$targetUserData]);

            return [$transaction, $transactionLog];
        } catch (\Exception $th) {
            $errorMessage = $th;
        }

        if ($errorMessage !== "") {
            throw new ValidationException(['message' => $errorMessage]);
        }
    }
}
