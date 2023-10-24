<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\MessageRepository;
use App\Repository\UserRepository;
use App\Service\DecodeJwt;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class MessageController extends AbstractController
{
    #[Route('/api/messages', name: 'app_message', methods: ['GET'])]
    public function index(Request $request, UserRepository $userRepository, MessageRepository $messageRepository, DecodeJwt $decodeJwt): JsonResponse
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

        $messages = $messageRepository->findBySender($currentUser);

        $data = [];

        foreach ($messages as $message) {
            $data[] = [
                "id" => $message["id"],
                "content" => $message["content"],
                // "role" => 
            ];
        }

        return new JsonResponse($data);
    }
}
