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
        ->route('/giao-dich-trung-gian', 'retechvn/mediated-transaction'),
    new Extend\Locales(__DIR__ . '/locale'),
    (new Extend\Routes('api'))
        ->get('/admin/transactions', 'transactions.admin.index', Api\Controller\ListTransactionsController::class)

        ->get('/transactions', 'transactions.index', Api\Controller\ListTransactionsController::class)
        ->get('/get-all-transactions', 'transactions.show', Api\Controller\ShowTransactionController::class)
        ->post('/transactions', 'transactions.create', Api\Controller\CreateTransactionController::class)
        ->patch('/transactions/{id}', 'transactions.update', Api\Controller\UpdateTransactionController::class)
        ->delete('/transactions/{id}', 'transactions.delete', Api\Controller\DeleteTransactionController::class)
        ->get('/transaction-logs', 'transactionlogs.index', Api\Controller\ListTransactionLogsController::class)
        ->post('/transaction-logs', 'transactionlogs.create', Api\Controller\CreateTransactionLogsController::class),
    (new Extend\Notification())
        ->type(TransactionBlueprint::class, TransactionSerializer::class, ['alert']),
];
