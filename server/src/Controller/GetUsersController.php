<?php

namespace App\Controller;

use App\Repository\UserRepository;
use App\Service\DecodeJwt;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class GetUsersController extends AbstractController
{
    #[Route(path: "/api/users", name: "search_users", methods: ["GET"])]
    public function searchUserByNationality(Request $request, DecodeJwt $decodeJwt, UserRepository $userRepository): JsonResponse
    {
        $userName = $request->query->get("name");
        $countries = $request->query->get("countries");
        $number = $request->query->get("number");

        $number = ($number != null) ? $number : "5";

        $array_countries = explode(",", $countries);
        $array_countries = implode("' OR user.nationality = '", $array_countries);

        $currentUser = $request->headers->get("Authorization");

        if ($currentUser === null) {
            return new JsonResponse(["message" => "User not authentified"], 401);
        }

        $currentUserId = $decodeJwt->getIdToken($currentUser);

        if ($currentUserId == null) {
            return new JsonResponse(["message" => "User not authentified"], 401);
        }

        $users = ($userName != null) ? $userRepository->getUserByName($userName, $number) : $userRepository->getUsersByCountry($array_countries, $currentUserId, $number);

        return new JsonResponse($users);
    }
}
