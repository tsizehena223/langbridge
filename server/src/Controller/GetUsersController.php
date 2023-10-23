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
    public function searchUserByNationality(Request $request, DecodeJwt $decodeJwt, UserRepository $userRepository, GetFileUrlController $getFileUrl): JsonResponse
    {
        $userName = $request->query->get("name");
        $countries = $request->query->get("countries");
        $country = $request->query->get("country");
        $language = $request->query->get("language");
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

        if ($userName != null && isset($language) && isset($country)) {
            $users = $userRepository->getUsersByLanguageAndCountry($currentUserId, $language, $country, $userName);
        } elseif ($userName != null && !$language && isset($country)) {
            $users = $userRepository->getUsersByCountry($currentUserId, $country, $userName);
        } elseif ($userName != null && !$country && isset($language)) {
            $users = $userRepository->getUsersByLanguage($currentUserId, $language, $userName);
        } elseif ($userName != null && !$countries && !$language) {
            $users = $userRepository->getUserByName($userName, $number, $currentUserId);
        } else {
            $users = $userRepository->getUsersByCountries($array_countries, $currentUserId, $number);
        }

        $data = [];

        foreach ($users as $user) {
            $linkImage = $user["image"] ? $getFileUrl->getFileUrl($user["image"]) : null;
            $data[] = [
                'id' => $user["id"],
                'name' => $user["name"],
                'country' => $user["country"],
                'language' => $user["language"],
                'image' => $linkImage
            ];
        }

        return new JsonResponse($data);
    }
}
