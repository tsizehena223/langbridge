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
        $language = $request->query->get("language");
        $number = $request->query->get("number");

        $number = ($number != null || $number != "") ? $number : "5";

        $array_countries = explode(",", $countries);
        if (count($array_countries) > 1) {
            $array_countries = implode("' OR user.nationality = '", $array_countries);
        } else {
            $array_countries = $countries;
            if ($array_countries == "") {
                $array_countries = null;
            }
        }

        if ($language == "") $language = null;

        $currentUser = $request->headers->get("Authorization");

        if ($currentUser === null) {
            return new JsonResponse(["message" => "User not authentified"], 401);
        }

        $currentUserId = $decodeJwt->getIdToken($currentUser);

        if ($currentUserId == null) {
            return new JsonResponse(["message" => "User not authentified"], 401);
        }

        if ($userName != null && isset($language) && isset($array_countries)) {
            $users = $userRepository->getUsersByLanguageAndCountry($currentUserId, $language, $array_countries, $userName);
        } elseif ($userName != null && !$language && isset($array_countries)) {
            $users = $userRepository->getUsersByCountry($currentUserId, $array_countries, $userName);
        } elseif ($userName != null && !$array_countries && isset($language)) {
            $users = $userRepository->getUsersByLanguage($currentUserId, $language, $userName);
        } elseif ($userName != null && !$array_countries && !$language) {
            $users = $userRepository->getUserByName($userName, $number, $currentUserId);
        } elseif ($userName == "" && isset($array_countries) && isset($language)) {
            $users = $userRepository->getUserByContryAndLanguage($currentUserId, $language, $array_countries);
        } elseif ($userName == "" && isset($array_countries) && !$language) {
            $users = $userRepository->getUserByContryOnly($currentUserId, $array_countries);
        } elseif ($userName == "" && !$array_countries && isset($language)) {
            $users = $userRepository->getUserByLanguageOnly($currentUserId, $language);
        } else {
            $users = $userRepository->getUsersByCountries($array_countries, $currentUserId, $number);
        }

        $data = [];

        foreach ($users as $user) {
            $linkImage = $user["image"] ? $getFileUrl->getFileUrl($user["image"], 'users') : null;
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
