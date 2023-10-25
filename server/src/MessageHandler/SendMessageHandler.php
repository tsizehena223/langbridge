<?php

namespace App\MessageHandler;

use App\Entity\Discussion;
use App\Entity\Message;
use App\Message\SendMessage;
use App\Repository\DiscussionRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;

class SendMessageHandler
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager, private UserRepository $userRepository, private DiscussionRepository $discussionRepository)
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

        $discussion = $this->discussionRepository->findOneBy(["sender" => $sender, "recipient" => $recipient]);
        if ($discussion == null) {
            $discussion = $this->discussionRepository->findOneBy(["sender" => $recipient, "recipient" => $sender]);
            if ($discussion == null) {
                $discussion = new Discussion();
                $discussion->setSender($sender);
                $discussion->setRecipient($recipient);
                $discussion->setCreatedAt(new \DateTime());
                $discussion->setUsers([$sender->getId(), $recipient->getId()]);
            } else {
                $discussion->setUpdatedAt(new \DateTime());
            }
        } else {
            $discussion->setUpdatedAt(new \DateTime());
        }
        $newMessage->setDiscussion($discussion);
        $discussion->setLastMessage($newMessage->getContent());

        $this->entityManager->persist($newMessage);
        $this->entityManager->persist($discussion);
        $this->entityManager->flush();

        // Additional logic, such as sending notifications
    }
}
