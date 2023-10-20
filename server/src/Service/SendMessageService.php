<?php

namespace App\Service;

use App\Message\SendMessage;
use Symfony\Component\Messenger\MessageBusInterface;

class SendMessageService
{
    private MessageBusInterface $messageBus;

    public function __construct(MessageBusInterface $messageBus)
    {
        $this->messageBus = $messageBus;
    }

    public function sendMessageService($senderId, $recipientId, $content)
    {
        $this->messageBus->dispatch(new SendMessage($senderId, $recipientId, $content));
    }
}
