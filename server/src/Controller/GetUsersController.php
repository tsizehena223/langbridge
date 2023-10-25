<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\DiscussionRepository;
use App\Repository\UserRepository;
use App\Service\CalculDate;
use App\Service\DecodeJwt;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class GetUsersController extends AbstractController
{
    #[Route(path: "/api/users", name: "search_users", methods: ["GET"])]
    public function index(Request $request, DecodeJwt $decodeJwt, UserRepository $userRepository, GetFileUrlController $getFileUrl, CalculDate $calculDate): JsonResponse
    {
        $userName = $request->query->get("name");
        $countries = $request->query->get("countries");
        $language = $request->query->get("language");
        $number = $request->query->get("number");
        $id = (int)$request->query->get("id");

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

        $userName = ($userName == "") ? null : $userName;

        if ($id > 0) {
            if ($userRepository->find($id) instanceof User) {
                $user = $userRepository->find($id);

                $linkImage = $user->getPdpName() ? $getFileUrl->getFileUrl($user->getPdpName(), 'users') : null;
                $formatedDate = $calculDate->formatDate($user->getCreatedAt()->format("Y-m-d H:i:s"));

                $data = [
                    'id' => $user->getId(),
                    'name' => $user->getUsername(),
                    'country' => $user->getNationality(),
                    'language' => $user->getLanguage(),
                    'image' => $linkImage,
                    'createdAt' => $formatedDate
                ];
                return new JsonResponse($data);
            } else {
                return new JsonResponse(["message" => "User not found"], 404);
            }
        }

        if ($userName != null && isset($language) && isset($array_countries)) {
            $users = $userRepository->getUsersByLanguageAndCountry($currentUserId, $language, $array_countries, $userName);
        } elseif ($userName != null && !$language && isset($array_countries)) {
            $users = $userRepository->getUsersByCountry($currentUserId, $array_countries, $userName);
        } elseif ($userName != null && !$array_countries && isset($language)) {
            $users = $userRepository->getUsersByLanguage($currentUserId, $language, $userName);
        } elseif ($userName != null && !$array_countries && !$language) {
            $users = $userRepository->getUserByName($userName, $number, $currentUserId);
        } elseif ($userName == null && isset($array_countries) && isset($language)) {
            $users = $userRepository->getUserByContryAndLanguage($currentUserId, $language, $array_countries);
        } elseif ($userName == null && isset($array_countries) && !$language) {
            $users = $userRepository->getUserByContryOnly($currentUserId, $array_countries);
        } elseif ($userName == null && !$array_countries && isset($language)) {
            $users = $userRepository->getUserByLanguageOnly($currentUserId, $language);
        } else {
            $users = $userRepository->getUsersByCountries($array_countries, $currentUserId, $number);
        }

        $data = [];

        foreach ($users as $user) {
            $linkImage = $user["image"] ? $getFileUrl->getFileUrl($user["image"], 'users') : null;
            $formatedDate = $calculDate->formatDate($user["createdAt"]->format("Y-m-d H:i:s"));
            $data[] = [
                'id' => $user["id"],
                'name' => $user["name"],
                'country' => $user["country"],
                'language' => $user["language"],
                'image' => $linkImage,
                'createdAt' => $formatedDate
            ];
        }

        return new JsonResponse($data);
    }

    #[Route("/api/users/discussions", name: "users.in.discussions", methods: ["GET"])]
    public function getUsersByDiscussions(Request $request, CalculDate $calculDate, GetFileUrlController $getFileUrl, DecodeJwt $decodeJwt, DiscussionRepository $discussionRepository, UserRepository $userRepository): JsonResponse
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

        $userIds = [];
        $lastMessages = [];
        $dates = [];
        foreach ($discussions as $discussion) {
            $userIds = array_merge($userIds, $discussion['users']);
            $lastMessages[] = $discussion["lastMessage"];
            $dates[] = $discussion["createdAt"]->format("d M Y H:i");
        }

        $userIds = array_unique($userIds);
        $users = $userRepository->findById($userIds);

        $data = [];
        $counter = 0;
        foreach ($users as $user) {
            if ($user->getId() == $userId) continue;
            $linkImage = $user->getPdpName() ? $getFileUrl->getFileUrl($user->getPdpName(), 'users') : null;
            $formatedDate = $calculDate->formatDate($user->getCreatedAt()->format("Y-m-d H:i:s"));
            $data[] = [
                'id' => $user->getId(),
                'name' => $user->getUsername(),
                'country' => $user->getNationality(),
                'language' => $user->getLanguage(),
                'image' => $linkImage,
                'createdAt' => $formatedDate,
                'discussion' => [
                    'lastMessage' => $lastMessages[$counter],
                    'createdAt' => $dates[$counter]
                ]
            ];
            $counter++;
        }

        return new JsonResponse($data);
    }
}
