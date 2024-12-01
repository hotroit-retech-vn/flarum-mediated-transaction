<?php

namespace RetechVN\MediatedTransaction\Api\Controller;

use Flarum\Api\Controller\AbstractListController;
use Flarum\Http\RequestUtil;
use Flarum\Http\UrlGenerator;
use Flarum\User\Exception\NotAuthenticatedException;
use Intervention\Image\Exception\NotFoundException;
use Psr\Http\Message\ServerRequestInterface;
use RetechVN\MediatedTransaction\Transaction;
use Tobscure\JsonApi\Document;
use RetechVN\MediatedTransaction\Api\Serializer\TransactionSerializer;

class ListTransactionsAdminController extends AbstractListController
{

    public $serializer = TransactionSerializer::class;

    protected $url;

    public function __construct(UrlGenerator $url)
    {
        $this->url = $url;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        if ($actor->isGuest()) throw new NotAuthenticatedException();
        if (!$actor->isAdmin()) throw new NotFoundException();

        $limit = $this->extractLimit($request);
        $offset = $this->extractOffset($request);

        $transactionQuery = Transaction::with(['creator', 'receiver', 'banks', 'logs']);
        $transactionResult = $transactionQuery
            ->skip($offset)
            ->take($limit + 1)
            ->orderBy('created_at', 'desc')
            ->get();

        $results = $limit > 0 && $transactionResult->count() > $limit;

        if ($results) {
            $transactionResult->pop();
        }
        $document->addPaginationLinks(
            $this->url->to('api')->route('transactions.admin.index'),
            $request->getQueryParams(),
            $offset,
            $limit,
            $results ? null : 0
        );
        return $transactionResult;
    }
}
