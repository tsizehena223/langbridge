<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use App\Service\DecodeJwt;
use Doctrine\Persistence\ObjectManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class UserUpdateController extends AbstractController
{
    #[Route('/api/users/update', name: 'app_user_update')]
    public function index(Request $request, DecodeJwt $decodeJwt, UserRepository $userRepository, ObjectManager $em): JsonResponse
    {
        $jwtToken = $request->headers->get("Authorization");
        if (!$jwtToken) {
            return new JsonResponse(["message" => "User not authentified (token)"], 401);
        }

        $userId = $decodeJwt->getIdToken($jwtToken);
        if ($userId == null) {
            return new JsonResponse(["message" => "User not authentified (token)"], 401);
        }

        $user = $userRepository->findOneBy(["id" => $userId]);

        if (!$user instanceof User) {
            return new JsonResponse(["message" => "User not authentified (token)"], 401);
        }

        $name = $request->request->get("name");
        $pdp = $request->files->get("image");

        if ($name && $pdp) {
            $user->setUsername($name);
            $user->setPdpFile($pdp);
        } else {
            return new JsonResponse(["message" => "Image and Name should not be blank"], 400);
        }

        $em->persist($user);
        $em->flush();

        return new JsonResponse(["message" => "Updated successfully"]);
    }
}
