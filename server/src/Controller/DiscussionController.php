<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\DiscussionRepository;
use App\Repository\UserRepository;
use App\Service\DecodeJwt;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class DiscussionController extends AbstractController
{
    #[Route('/api/discussions', name: 'app_discussion', methods: ["GET"])]
    public function index(Request $request, DecodeJwt $decodeJwt, UserRepository $userRepository, DiscussionRepository $discussionRepository): JsonResponse
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

        $discussions = $discussionRepository->findBySenderOrRecipient($currentUser);

        $data = [];
        foreach ($discussions as $discussion) {
            $data[] = [
                "id" => $discussion["id"],
                "sender" => $discussion["senderId"],
                "recipient" => $discussion["recipientId"],
                "lastMessage" => $discussion["lastMessage"],
                "createdAt" => $discussion["createdAt"]->format("d M Y H:i"),
            ];
        }

        return new JsonResponse($data);
    }
}
