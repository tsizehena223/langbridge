<?php

namespace App\Controller;

use App\Entity\Article;
use App\Repository\UserRepository;
use App\Service\DecodeJwt;
use Doctrine\Persistence\ObjectManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ArticleCreateController extends AbstractController
{
    #[Route(path: "/api/articles", name: "create_article", methods: ["POST"])]
    public function index(
        Request $request,
        ValidatorInterface $validator,
        ObjectManager $objectManager,
        UserRepository $userRepository,
        DecodeJwt $decodeJwt
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);
        $article = new Article();

        $jwtToken = $request->headers->get("Authorization");
        if (!$jwtToken) {
            return new JsonResponse(["message" => "User not authentified (token)"], 401);
        }

        $userId = $decodeJwt->getIdToken($jwtToken);
        if ($userId == null) {
            return new JsonResponse(["message" => "User not authentified (token)"], 401);
        }
        $author = $userRepository->findOneBy(["id" => $userId]);

        if (!$author) {
            return new JsonResponse(["message" => "User not authentified (author)"], 401);
        }

        if (!isset($data["content"])) {
            return new JsonResponse(["message" => "Content should not be null"], 400);
        }

        $article->setContent($data["content"])
            ->setCreatedAt(new \DateTime("now", new \DateTimeZone("Indian/Antananarivo")))
            ->setAuthor($author);

        $errors = [];
        $errors = $validator->validate($article);

        if (count($errors) > 0) {
            foreach ($errors as $error) {
                $error_Message[] = $error->getMessage();
            }
            return new JsonResponse(["message" => $error_Message], 400);
        }

        $objectManager->persist($article);
        $objectManager->flush();

        return new JsonResponse(["message" => "Created successfully"], 200);
    }
}
