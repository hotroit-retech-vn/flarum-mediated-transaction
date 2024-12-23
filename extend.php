<?php

/*
 * This file is part of retechvn/mediated-transaction.
 *
 * Copyright (c) 2024 LuongHoa.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace RetechVN\MediatedTransaction;

use Flarum\Extend;
use Flarum\Api\Serializer\UserSerializer;
use RetechVN\MediatedTransaction\Api\Serializer\TransactionSerializer;
use RetechVN\MediatedTransaction\Notification\TransactionBlueprint;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/less/forum.less')
        ->route('/giao-dich-trung-gian', 'retechvn/mediated-transaction'),
    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js')
        ->css(__DIR__ . '/less/admin.less')
        ->route('/giao-dich-trung-gian', 'retechvn/transaction-list')
        ->route('/yeu-cau-rut-tien', 'retechvn/pay-request-list'),
    new Extend\Locales(__DIR__ . '/locale'),
    (new Extend\Routes('api'))
        ->get('/admin/transactions', 'transactions.admin.index', Api\Controller\Transaction\ListTransactionsController::class)

        ->get('/transactions', 'transactions.index', Api\Controller\Transaction\ListTransactionsController::class)
        ->get('/get-all-transactions', 'transactions.show', Api\Controller\Transaction\ShowTransactionController::class)
        ->post('/transactions', 'transactions.create', Api\Controller\Transaction\CreateTransactionController::class)
        ->patch('/transactions/{id}', 'transactions.update', Api\Controller\Transaction\UpdateTransactionController::class)
        ->delete('/transactions/{id}', 'transactions.delete', Api\Controller\Transaction\DeleteTransactionController::class)

        ->get('/transaction-logs', 'transactionlogs.index', Api\Controller\TransactionLog\ListTransactionLogsController::class)
        ->post('/transaction-logs', 'transactionlogs.create', Api\Controller\TransactionLog\CreateTransactionLogsController::class)

        ->get('/pay-requests', 'pay-requests.index', Api\Controller\PayResquest\ListPayRequestsController::class)
        ->post('/pay-requests', 'pay-requests.create', Api\Controller\PayResquest\CreatePayRequestController::class),
    (new Extend\Notification())
        ->type(TransactionBlueprint::class, TransactionSerializer::class, ['alert']),
];
