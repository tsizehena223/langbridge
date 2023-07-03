<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

class SecurityController extends AbstractController
{
    public function __construct(private UserPasswordHasherInterface $hasher)
    {
    }

    #[Route('/api/login', name: 'app_login', methods: ["POST"])]
    public function index(Request $request, UserRepository $repo): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $user = $repo->findOneBy(['email' => $data["email"]]);

        if (!$user) {
            return new JsonResponse(["Message" => "Email inexist"], 204);
        }

        $password = ($this->hasher->isPasswordValid($user, $data["password"])) ? true : false;

        if (!$password) {
            return new JsonResponse(["Message" => "Incorrect password"], 204);
        }

        $userData = [
            "email" => $user->getEmail(),
            "ROLES" => $user->getRoles()
        ];

        // COOKIES

        $cookie = Cookie::create(name: "langbridge-cookie", value: json_encode($userData))
            ->withExpires(time() + 180)
            // ->withSecure(true) // Uniquement envoyé sur une connexion HTTPS
            ->withHttpOnly(true); // Le cookie ne peut être accédé que par HTTP et non par JavaScript

        // dd($cookie->getValue());
        $response = new JsonResponse(["message" => "Connected successfully"], 200);
        $response->headers->setCookie($cookie);
        return $response;

        /* LIRE LE COOKIE (SERVER)
        $request = Request::createFromGlobals();

        if ($request->cookies->has('mon_cookie_auth')) {
            $userData = json_decode($request->cookies->get('mon_cookie_auth'), true);
            // Vérification de l'authenticité de $userData et exécution des actions appropriées
        } else {
            // L'utilisateur n'est pas authentifié
        } */
    }
}
