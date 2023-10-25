<?php

namespace App\Controller;

use App\Entity\Discussion;
use App\Entity\Message;
use App\Entity\User;
use App\Repository\DiscussionRepository;
use App\Repository\MessageRepository;
use App\Repository\UserRepository;
use App\Service\DecodeJwt;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class MessageController extends AbstractController
{
    #[Route('/api/messages', name: 'message.send', methods: ['POST'])]
    public function sendMessage(Request $request, UserRepository $userRepository, DiscussionRepository $discussionRepository, DecodeJwt $decodeJwt, EntityManagerInterface $em): JsonResponse
    {
        $jwt = $request->headers->get("Authorization");
        $userId = $decodeJwt->getIdToken($jwt);

        if ($userId == null) {
            return new JsonResponse(["message" => "User not authentified"], 401);
        }

        $currentUser = $userRepository->find($userId);

        if (!$currentUser instanceof User) {
            return new JsonResponse(["message" => "User not authentified"], 401);
        }

        $messages = json_decode($request->getContent(), true);

        if (!isset($messages["recipient"]) || !isset($messages["content"])) {
            return new JsonResponse(["message" => "Content and Recipient should be completed"], 400);
        }

        $recipientId = (int)$messages["recipient"];
        $recipientUser = $userRepository->find($recipientId);

        if (!$recipientUser instanceof User) {
            return new JsonResponse(["message" => "Recipient not found"], 400);
        }

        $message = new Message();
        $message->setSender($currentUser);
        $message->setRecipient($recipientUser);
        $message->setCreatedAt(new \DateTime());
        $message->setContent($messages["content"]);

        $discussion = $discussionRepository->findOneBy(["sender" => $currentUser, "recipient" => $recipientUser]);
        if ($discussion == null) {
            $discussion = new Discussion();
            $discussion->setSender($currentUser);
            $discussion->setRecipient($recipientUser);
            $discussion->setUsers([$currentUser->getId(), $recipientId]);
            $discussion->setCreatedAt(new \DateTime());
        }

        $discussion->setLastMessage($message->getContent());
        $message->setDiscussion($discussion);

        $em->persist($message);
        $em->persist($discussion);
        $em->flush();

        $m = [
            "id" => $message->getId(),
            "sender" => $message->getSender()->getId(),
            "recipient" => $message->getRecipient()->getId(),
            "createdAt" => $message->getCreatedAt()->format("d M Y H:i"),
            "content" => $message->getContent()
        ];

        $d = [
            "id" => $discussion->getId(),
            "sender" => $discussion->getSender()->getId(),
            "recipient" => $discussion->getRecipient()->getId(),
            "users" => $discussion->getUsers(),
            "lastMessage" => $discussion->getLastMessage()
        ];

        return new JsonResponse(["message" => $m, "discussion" => $d], 201);
    }

    #[Route('/api/messages', name: 'message.get', methods: ['GET'])]
    public function getMessages(Request $request, MessageRepository $messageRepository, UserRepository $userRepository, DecodeJwt $decodeJwt, DiscussionRepository $discussionRepository): JsonResponse
    {
        $jwt = $request->headers->get("Authorization");
        $userId = $decodeJwt->getIdToken($jwt);

        if ($userId == null) {
            return new JsonResponse(["message" => "User not authentified"], 401);
        }

        $currentUser = $userRepository->find($userId);

        if (!$currentUser instanceof User) {
            return new JsonResponse(["message" => "User not authentified"], 401);
        }

        $recipientId = (int)$request->query->get("recipientId");
        $recipientUser = $userRepository->find($recipientId);

        if (!$recipientUser instanceof User) {
            return new JsonResponse(["message" => "Recipient not found"], 400);
        }

        $discussion = $discussionRepository->findOneBy(["sender" => $currentUser, "recipient" => $recipientUser]);
        if ($discussion == null) {
            $discussion = $discussionRepository->findOneBy(["sender" => $recipientUser, "recipient" => $currentUser]);
            if ($discussion == null) {
                $discussion = new Discussion();
                $discussion->setSender($currentUser);
                $discussion->setRecipient($recipientUser);
                $discussion->setUsers([$currentUser->getId(), $recipientUser->getId()]);
                $discussion->setCreatedAt(new \DateTime());
            } else {
                $discussion->setUpdatedAt(new \DateTime());
            }
        } else {
            $discussion->setUpdatedAt(new \DateTime());
        }

        $messages = $messageRepository->findBySenderOrRecipientOnDiscussion($currentUser, $discussion);

        $data = [];
        foreach ($messages as $message) {
            $data[] = [
                "id" => $message["id"],
                "content" => $message["content"],
                "sender" => $message["senderId"],
                "recipient" => $message["recipientId"],
                "createdAt" => $message["createdAt"]->format("d M Y H:i")
            ];
        }

        return new JsonResponse($data);
    }
}
