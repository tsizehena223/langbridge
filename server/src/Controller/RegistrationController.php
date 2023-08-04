<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\Persistence\ObjectManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class RegistrationController extends AbstractController
{
    public function __construct(private UserPasswordHasherInterface $hasher)
    {
    }

    #[Route('/api/users', name: 'app_register', methods: ["POST"])]
    public function index(Request $request, ValidatorInterface $validatorInterface, ObjectManager $objectManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $user = new User();

        if (!isset($data["email"]) || !isset($data["username"]) || !isset($data["password"]) || !isset($data["passwordConfirm"]) || !isset($data["country"]) || !isset($data["language"])) {
            return new JsonResponse(["message" => "All field should be completed"], 400);
        }

        $user->setEmail($data["email"])
            ->setUsername($data["username"])
            ->setRoles(["ROLE_USER"])
            ->setLanguage($data["language"])
            ->setNationality($data["country"])
            ->setPassword($data["password"])
            ->setConfirmPassword($data["passwordConfirm"]);

        $errors = [];
        $errors = $validatorInterface->validate($user);

        if (count($errors) > 0) {
            foreach ($errors as $error) {
                $error_Message[] = $error->getMessage();
            }
            return new JsonResponse(["message" => $error_Message], 400);
        }

        $hashedPassword = $this->hasher->hashPassword($user, $data["password"]);
        $user->setPassword($hashedPassword);

        $objectManager->persist($user);
        $objectManager->flush();

        return new JsonResponse(["message" => "Registered successfully"], 200);
    }
}
