<?php

namespace App\Controller;

use App\Repository\UserRepository;
use App\Service\CalculDate;
use App\Service\GenerateToken;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class SecurityController extends AbstractController
{
    public function __construct(private UserPasswordHasherInterface $hasher)
    {
    }

    #[Route('/api/users/login', name: 'app_login', methods: ["POST"])]
    public function index(Request $request, CalculDate $calculDate, UserRepository $repo, GenerateToken $generateToken, GetFileUrlController $getFileUrl): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        if (!isset($data["email"]) || !isset($data["password"])) {
            return new JsonResponse(["message" => "Email and password should be completed"], 400);
        }

        $user = $repo->findOneBy(['email' => $data["email"]]);

        if (!$user) {
            return new JsonResponse(["message" => "This email doesn't have an account"], 401);
        }

        $password = ($this->hasher->isPasswordValid($user, $data["password"])) ? true : false;

        if (!$password) {
            return new JsonResponse(["message" => "Incorrect password"], 401);
        }

        $token = $generateToken->generateToken($user->getId());

        $linkImage = $user->getPdpName() ? $getFileUrl->getFileUrl($user->getPdpName(), 'users') : null;

        $formatedDate = $calculDate->formatDate($user->getCreatedAt()->format("Y-m-d H:i:s"));
        return new JsonResponse([
            "token" => $token,
            "id" => $user->getId(),
            "name" => $user->getUsername(),
            "country" => $user->getNationality(),
            "language" => $user->getLanguage(),
            "image" => $linkImage,
            "createdAt" => $formatedDate
        ], 200);
    }
}
