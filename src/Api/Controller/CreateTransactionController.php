<?php

namespace RetechVN\MediatedTransaction\Api\Controller;

use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Http\RequestUtil;
use Illuminate\Contracts\Bus\Dispatcher;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use RetechVN\MediatedTransaction\Command\CreateTransaction;
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

        $requestData = $request->getParsedBody()['data']['attributes'];
        $rvnTitle = intval($requestData['rvn_title']);
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



        return [];


        if ($errorMessage !== "") {
            throw new ValidationException(['message' => $this->translator->trans($errorMessage)]);
        }
    }
}
