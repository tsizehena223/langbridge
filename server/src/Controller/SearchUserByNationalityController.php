<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class SearchUserByNationalityController extends AbstractController
{
    #[Route(path: "/api/usersby/{country}", name: "get_user_by_nationality", methods: ["GET"])]
    public function searchUserByNationality(Request $request, UserRepository $userRepository): JsonResponse
    {
        $country = $request->attributes->get("country");

        $users = $userRepository->findBy(["nationality" => $country]);
        $array_users = [];
        foreach ($users as $user) {
            $userId = $user->getId();
            $userName = $user->getUsername();
            $array_users[] = [
                "id" => $userId,
                "name" => $userName
            ];
        }
        return new JsonResponse($array_users);
    }
}
