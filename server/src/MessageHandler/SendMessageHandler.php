<?php

namespace App\MessageHandler;

use App\Entity\Message;
use App\Message\SendMessage;
use Doctrine\ORM\EntityManagerInterface;

class SendMessageHandler
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function __invoke(SendMessage $message)
    {
        $newMessage = new Message();
        $newMessage->setSender($message->getSender());
        $newMessage->setRecipient($message->getRecipient());
        $newMessage->setContent($message->getContent());
        $newMessage->setCreatedAt(new \DateTime());

        $this->entityManager->persist($newMessage);
        $this->entityManager->flush();

        // Additional logic, such as sending notifications
    }
}
