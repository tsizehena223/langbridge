<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use App\Service\DecodeJwt;
use Doctrine\Persistence\ObjectManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

class UserUpdateController extends AbstractController
{
    #[Route('/api/users/update', name: 'app_user_update')]
    public function index(Request $request, DecodeJwt $decodeJwt, UserRepository $userRepository, ObjectManager $em, UserPasswordHasherInterface $hash): JsonResponse
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

        $data = json_decode($request->getContent(), true);

        $userName = $data['userName'] ?? $user->getUsername();
        $email = $data['email'] ?? $user->getEmail();
        $newPassword = $data['newPassword'] ?? $user->getPassword();
        $nationality = $data['country'] ?? $user->getNationality();
        $language = $data['language'] ?? $user->getLanguage();

        $pdp = $request->files->get("image");

        $user->setUsername($userName);
        $user->setEmail($email);
        $user->setPassword($hash->hashPassword($user, $newPassword));
        $user->setNationality($nationality);
        $user->setLanguage($language);

        if ($pdp instanceof File) {
            $user->setPdpFile($pdp);
        }

        $em->persist($user);
        $em->flush();

        return new JsonResponse(["message" => "Updated successfully"]);
    }
}
