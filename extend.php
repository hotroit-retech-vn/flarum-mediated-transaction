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
    (new Extend\ApiSerializer(UserSerializer::class))
        ->attribute('rvn_point', function (UserSerializer $serializer, $user, $attributes) {
            return $user->rvn_point;
        }),
    (new Extend\Routes('api'))
        ->get('/transactions', 'transactions.index', Api\Controller\ListTransactionsController::class)
        ->get('/transactions/{id}', 'transactions.show', Api\Controller\ShowTransactionController::class)
        ->post('/transactions', 'transactions.create', Api\Controller\CreateTransactionController::class)
        ->patch('/transactions/{id}', 'transactions.update', Api\Controller\UpdateTransactionController::class)
        ->delete('/transactions/{id}', 'transactions.delete', Api\Controller\DeleteTransactionController::class),
];
