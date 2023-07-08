<?php

namespace App\Controller;

use App\Entity\Article;
use App\Repository\UserRepository;
use Doctrine\Persistence\ObjectManager;
use Lcobucci\JWT\Encoding\JoseEncoder;
use Lcobucci\JWT\Token\Parser;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class CreateArticleController extends AbstractController
{
    #[Route(path: "/api/post/create", name: "create_article")]
    public function index(Request $request, ValidatorInterface $validator, ObjectManager $objectManager, UserRepository $userRepository): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $article = new Article();

        $jwtToken = $request->headers->get("Authorization");
        if (!$jwtToken) {
            return new JsonResponse(["Message" => "User not authentified"], 401);
        }

        // Décoder le token
        function getIdToken($jwt)
        {
            $parser = new Parser(new JoseEncoder());
            $token = $parser->parse($jwt);
            $id = $token->claims()->get("id");

            return $id;
        }

        $userId = getIdToken($jwtToken);
        $author = $userRepository->findOneBy(["id" => $userId]);

        if (!$author) {
            return new JsonResponse(["Message" => "User not authentified"], 401);
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
            return new JsonResponse(["Message" => $error_Message], 400);
        }

        $objectManager->persist($article);
        $objectManager->flush();

        return new JsonResponse(["Message" => "Created successfully"], 200);
    }
}
