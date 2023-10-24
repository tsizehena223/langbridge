<?php

namespace App\MessageHandler;

use App\Entity\Message;
use App\Message\SendMessage;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;

class SendMessageHandler
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager, private UserRepository $userRepository)
    {
        $this->entityManager = $entityManager;
    }

    public function __invoke(SendMessage $message)
    {
        $newMessage = new Message();
        $sender = $this->userRepository->find($message->getSender());
        $recipient = $this->userRepository->find($message->getRecipient());
        $newMessage->setSender($sender);
        $newMessage->setRecipient($recipient);
        $newMessage->setContent($message->getContent());
        $newMessage->setCreatedAt(new \DateTime());

        $this->entityManager->persist($newMessage);
        $this->entityManager->flush();

        // Additional logic, such as sending notifications
    }
}
