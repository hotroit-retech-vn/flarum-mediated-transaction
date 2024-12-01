<?php

namespace RetechVN\MediatedTransaction\Api\Controller;

use Flarum\Api\Controller\AbstractListController;
use Flarum\Http\RequestUtil;
use Flarum\Http\UrlGenerator;
use Flarum\User\Exception\NotAuthenticatedException;
use Illuminate\Validation\UnauthorizedException;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use RetechVN\MediatedTransaction\Api\Serializer\BankInfoSerializer;
use RetechVN\MediatedTransaction\PayRequest;

class ListBankInfoController extends AbstractListController
{
    /**
     * {@inheritdoc}
     */
    public $serializer = BankInfoSerializer::class;

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
        // See https://docs.flarum.org/extend/api.html#api-endpoints for more information.

        $actor = RequestUtil::getActor($request);

        if ($actor->isGuest())
            throw new NotAuthenticatedException();
        if (!$actor->isAdmin())
            throw new UnauthorizedException();

        $filters = $this->extractFilter($request);
        $sort = $this->extractSort($request);

        $limit = $this->extractLimit($request);
        $offset = $this->extractOffset($request);
        $include = $this->extractInclude($request);

        $payResquest = PayRequest::skip($offset)
            ->take($limit + 1)
            ->orderBy('created_at', 'desc')
            ->get();

        $results = $limit > 0 && $payResquest->count() > $limit;

        if ($results) {
            $payResquest->pop();
        }

        $document->addPaginationLinks(
            $this->url->to('api')->route('pay-requests.index'),
            $request->getQueryParams(),
            $offset,
            $limit,
            $results ? null : 0
        );

        return $results;
    }
}
