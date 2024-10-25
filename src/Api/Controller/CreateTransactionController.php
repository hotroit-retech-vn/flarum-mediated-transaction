<?php

namespace RetechVN\MediatedTransaction\Api\Controller;

use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Http\RequestUtil;
use Illuminate\Contracts\Bus\Dispatcher;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use RetechVN\MediatedTransaction\Notification\TransactionBlueprint;
use RetechVN\MediatedTransaction\Transaction;
use RetechVN\MediatedTransaction\TransactionLogs;
use Tobscure\JsonApi\Document;
use RetechVN\MediatedTransaction\Command\CreateTransaction;
use RetechVN\MediatedTransaction\Api\Serializer\TransactionSerializer;
use Flarum\Notification\NotificationSyncer;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\Foundation\ValidationException;
use Flarum\User\User;
use Illuminate\Support\Facades\Log;
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

        $requestData = Arr::get($request->getParsedBody(), 'data');
        $rvnCreatorID = intval($requestData['rvn_creator_id']);
        $rvnReceiverID = intval($requestData['rvn_receiver_id']);
        $rvnAmount = intval($requestData['rvn_amount']);
        $rvnFee = trim($requestData['rvn_fee']);
        $rvnPayerID = intval($requestData['rvn_payer_id']);
        $rvnNote = trim($requestData['rvn_note']);
        $currentUserID = $request->getAttribute('actor')->id;
        $actor = RequestUtil::getActor($request);
        $errorMessage = "";

        $currentUserData = User::find($currentUserID);
        // $allowUsePoint = $currentUserData

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

            $targetUserData = User::find($transaction->rvn_creator_id);
            $targetUserData->rvn_point -= $transaction->rvn_amount;
            $targetUserData->save();

            $this->notifications->sync(new TransactionBlueprint($transaction), [$targetUserData]);

            return [$transaction, $transactionLog];
        } catch (\Exception $th) {
            // var_dump($th);
            return false;
        }



        if ($errorMessage !== "") {
            throw new ValidationException(['message' => $this->translator->trans($errorMessage)]);
        }
    }
}
