<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class SearchDataController extends AbstractController
{
    #[Route(path: "/api/users/search/{keywords? }", name: "app_search", methods: ["GET"])]
    public function search(Request $request, UserRepository $userRepository = null): JsonResponse
    {
        $keywords = $request->attributes->get("keywords");
        if (!$keywords) return new JsonResponse(["Message" => "No keywords"], 404);
        $user = $userRepository->findBy(["username" => $keywords]);
        if (!$user) return new JsonResponse(["Message" => "No user with the username * $keywords *"], 404);

        $data = [
            "id" => $user[0]->getId(),
            "username" => $user[0]->getUsername(),
            "email" => $user[0]->getEmail()
        ];

        $response = json_encode($data);
        return new JsonResponse(["user" => $response]);
    }
}
