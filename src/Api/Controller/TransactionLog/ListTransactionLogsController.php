<?php

namespace RetechVN\MediatedTransaction\Api\Controller\TransactionLog;

use Flarum\Api\Controller\AbstractListController;
use Flarum\Http\RequestUtil;
use Flarum\Http\UrlGenerator;
use Flarum\User\Exception\NotAuthenticatedException;
use Psr\Http\Message\ServerRequestInterface;
use RetechVN\MediatedTransaction\TransactionLogs;
use Tobscure\JsonApi\Document;
use RetechVN\MediatedTransaction\Api\Serializer\TransactionLogsSerializer;
use Illuminate\Support\Arr;
use Illuminate\Validation\UnauthorizedException;

class ListTransactionLogsController extends AbstractListController
{
    /**
     * {@inheritdoc}
     */
    public $serializer = TransactionLogsSerializer::class;

    /**
     * @var UrlGenerator
     */
    protected $url;

    /**
     * @param UrlGenerator $url
     */
    public function __construct(UrlGenerator $url)
    {
        $this->url = $url;
    }

    /**
     * {@inheritdoc}
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {

        $actor = RequestUtil::getActor($request);
        if ($actor->isGuest())  throw new NotAuthenticatedException();
        if (!$actor->isAdmin())  throw new UnauthorizedException();

        $userId = $actor->id;
        $limit = $this->extractLimit($request);
        $offset = $this->extractOffset($request);

        $modelId = Arr::get($this->extractFilter($request), 'transactionId');

        $transactionQuery = TransactionLogs::with(['creator', 'transaction'])->where('rvn_transaction_id', $modelId);

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
            $this->url->to('api')->route('transactionlogs.index'),
            $request->getQueryParams(),
            $offset,
            $limit,
            $results ? null : 0
        );

        return $transactionResult;
    }
}
