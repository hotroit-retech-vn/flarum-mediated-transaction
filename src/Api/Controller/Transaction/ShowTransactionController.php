<?php

namespace RetechVN\MediatedTransaction\Api\Controller\Transaction;

use Flarum\Api\Controller\AbstractShowController;
use Flarum\Http\RequestUtil;
use Flarum\User\Exception\NotAuthenticatedException;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Psr\Http\Message\ServerRequestInterface;
use RetechVN\MediatedTransaction\Api\Serializer\CustomerSerializer;
use RetechVN\MediatedTransaction\BankTransaction;
use Tobscure\JsonApi\Document;
use RetechVN\MediatedTransaction\Transaction;

class ShowTransactionController extends AbstractShowController
{
    /**
     * {@inheritdoc}
     */
    public $serializer = CustomerSerializer::class;

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

        $totalDeposit = BankTransaction::whereIn('rvn_transaction_id', function ($query) use ($userId) {
            $query->select('id')
                ->from('rvn_transactions')
                ->where('rvn_creator_id', $userId);
        })->sum('rvn_amount');

        $totalToPay = 0;
        $totalToReceive = 0;

        // Trường hợp 1: Tổng tiền phải trả nếu user là creator và payer
        $case1ToPay = Transaction::where('rvn_creator_id', $userId)
            ->where('rvn_payer_id', $userId)
            ->selectRaw('SUM(rvn_amount + (rvn_fee * rvn_amount)) as total')
            ->value('total');

        // Trường hợp 2: Tổng tiền phải trả nếu user là creator nhưng không phải payer
        $case2ToPay = Transaction::where('rvn_creator_id', $userId)
            ->where('rvn_payer_id', '!=', $userId)
            ->selectRaw('SUM(rvn_amount) as total')
            ->value('total');

        // Trường hợp 3: Tổng tiền được nhận nếu user là receiver và payer
        $case1ToReceive = Transaction::where('rvn_receiver_id', $userId)
            ->where('rvn_payer_id', $userId)
            ->selectRaw('SUM(rvn_amount - (rvn_fee * rvn_amount)) as total')
            ->value('total');

        // Trường hợp 4: Tổng tiền được nhận nếu user là receiver nhưng không phải payer
        $case2ToReceive = Transaction::where('rvn_receiver_id', $userId)
            ->where('rvn_payer_id', '!=', $userId)
            ->selectRaw('SUM(rvn_amount) as total')
            ->value('total');

        // Tính tổng
        $totalToPay = ($case1ToPay ?? 0) + ($case2ToPay ?? 0);
        $totalToReceive = ($case1ToReceive ?? 0) + ($case2ToReceive ?? 0);

        $results =  ['total_monney_bank' => (int) $totalDeposit, 'total_to_pay' => (int) $totalToPay, 'total_to_receive' => (int) $totalToReceive];
        return $results;
    }
}
