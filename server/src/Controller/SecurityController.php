<?php

namespace App\Controller;

use Lcobucci\JWT\Configuration;
use App\Repository\UserRepository;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use Lcobucci\JWT\Signer\Key\InMemory;
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

    #[Route('/api/login', name: 'app_login', methods: ["POST"])]
    public function index(Request $request, UserRepository $repo): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $user = $repo->findOneBy(['email' => $data["email"]]);

        if (!$user) {
            return new JsonResponse(["message" => "This email doesn't have an account"], 401);
        }

        $password = ($this->hasher->isPasswordValid($user, $data["password"])) ? true : false;

        if (!$password) {
            return new JsonResponse(["message" => "Incorrect password"], 401);
        }

        function generateToken($userId, $username, $userCountry, $language)
        {
            $key = 'hiG8DlOKvtih6AxlZn5XKImZ06yu8I3mkOzaJrEuW8yAv8Jnkw330uMt8AEqQ5LB';

            $configuration = Configuration::forSymmetricSigner(
                new Sha256(),
                InMemory::plainText($key)
            );

            $issuedAt = new \DateTimeImmutable("now", new \DateTimeZone("Indian/Antananarivo"));
            $builder = $configuration->builder()
                ->issuedBy('http://localhost:8000')
                ->permittedFor('http://localhost:5173')
                ->expiresAt($issuedAt->modify('+2 days'))
                ->withClaim('id', $userId)
                ->withClaim('username', $username)
                ->withClaim('language', $language)
                ->withClaim('country', $userCountry);

            $token = $builder->getToken($configuration->signer(), $configuration->signingKey());

            return $token->toString();
        }

        $token = generateToken($user->getId(), $user->getUsername(), $user->getNationality(), $user->getLanguage());

        $response = new JsonResponse(["token" => $token], 200);
        return $response;
    }
}
