<?php

namespace RetechVN\MediatedTransaction\Api\Controller;

use Flarum\Api\Controller\AbstractShowController;
use Flarum\Http\RequestUtil;
use Illuminate\Contracts\Bus\Dispatcher;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use RetechVN\MediatedTransaction\Command\EditTransaction;
use RetechVN\MediatedTransaction\Api\Serializer\TransactionSerializer;

class UpdateTransactionController extends AbstractShowController
{
    /**
     * {@inheritdoc}
     */
    public $serializer = TransactionSerializer::class;

    /**
     * @var Dispatcher
     */
    protected $bus;

    /**
     * @param Dispatcher $bus
     */
    public function __construct(Dispatcher $bus)
    {
        $this->bus = $bus;
    }


    /**
     * {@inheritdoc}
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $modelId = Arr::get($request->getQueryParams(), 'id');
        $data = Arr::get($request->getParsedBody(), 'data', []);
        
        $model = $this->bus->dispatch(
            new EditTransaction($modelId, $actor, $data)
        );
        
        return $model;
    }
}
