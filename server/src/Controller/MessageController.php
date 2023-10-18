<?php

namespace App\Controller;

use App\Message\SendMessage;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Messenger\MessageBusInterface;

class MessageController extends AbstractController
{
    #[Route('/api/message/{idSender}/{idRecipient}', name: 'app_message', methods: ["POST"])]
    public function sendMessage(Request $request, MessageBusInterface $messageBus, int $idSender, int $idRecipient, UserRepository $userRepository): JsonResponse
    {
        $sender = $userRepository->find($idSender);
        $recipient = $userRepository->find($idRecipient);

        if (!$sender || !$recipient || ($sender == $recipient)) {
            return new JsonResponse(["message" => "Error"], 400);
        }

        $content = json_decode($request->getContent(), true);

        if (!isset($content["content"])) {
            return new JsonResponse(["message" => "Content can't be null"], 400);
        }

        $messageBus->dispatch(new SendMessage($sender, $recipient, $content["content"]));

        return new JsonResponse(["message" => "Send successfully"]);
    }
}
