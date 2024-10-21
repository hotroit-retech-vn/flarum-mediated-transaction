<?php

namespace RetechVN\MediatedTransaction\Api\Controller;

use Flarum\Api\Controller\AbstractListController;
use Flarum\Http\RequestUtil;
use Flarum\Http\UrlGenerator;
use Psr\Http\Message\ServerRequestInterface;
use RetechVN\MediatedTransaction\Transaction;
use Tobscure\JsonApi\Document;
use RetechVN\MediatedTransaction\Api\Serializer\TransactionSerializer;

class ListTransactionsController extends AbstractListController
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
        $limit = $this->extractLimit($request);
        $offset = $this->extractOffset($request);

        $userID = $actor->id;
        $transactionQuery = Transaction::with(['creator', 'receiver', 'logs'])
            ->where('rvn_creator_id', $userID)
            ->orWhere('rvn_receiver_id', $userID);
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
            $this->url->to('api')->route('transactions.index'),
            $request->getQueryParams(),
            $offset,
            $limit,
            $results ? null : 0
        );

        return $transactionResult;
    }
}
