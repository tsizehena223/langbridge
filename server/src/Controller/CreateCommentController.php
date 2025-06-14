<?php

namespace App\Controller;

use App\Entity\Article;
use App\Entity\Comment;
use App\Entity\User;
use App\Repository\ArticleRepository;
use App\Repository\UserRepository;
use App\Service\DecodeJwt;
use Doctrine\Persistence\ObjectManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class CreateCommentController extends AbstractController
{
    #[Route(path: "api/articles/comments", name: "create_comment", methods: ["POST"])]
    public function createComment(
        Request $request,
        ObjectManager $manager,
        DecodeJwt $decodeJwt,
        ValidatorInterface $validator,
        UserRepository $userRepository,
        ArticleRepository $articleRepository
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        if ($data === null) {
            return new JsonResponse(["message" => "No sent content"], 400);
        }

        $commentator = $request->headers->get("Authorization");
        $commentatorId = $decodeJwt->getIdToken($commentator);

        if ($commentatorId === null) {
            return new JsonResponse(["message" => "User not authentified"], 400);
        }

        $author = $userRepository->find($commentatorId);
        if (!($author instanceof User)) {
            return new JsonResponse(["message" => "User not authentified"], 400);
        }

        if (!isset($data["postId"]) || !isset($data["content"])) {
            return new JsonResponse(["message" => "postId and content should not be null"], 404);
        }
        $postId = (int)$data["postId"];
        if ($postId === null) {
            return new JsonResponse(["message" => "Article not found"], 404);
        }
        $article = $articleRepository->find($postId);

        if (!($article instanceof Article)) {
            return new JsonResponse(["message" => "Article expected"], 400);
        }

        $comment = new Comment();
        $comment->setContent($data["content"])
            ->setCommentator($author)
            ->setArticle($article)
            ->setCreatedAt(new \DateTime("now", new \DateTimeZone("Indian/Antananarivo")));

        $errors = [];
        $errors = $validator->validate($comment);

        if (count($errors) > 0) {
            foreach ($errors as $error) {
                $error_Message[] = $error->getMessage();
            }
            return new JsonResponse(["message" => $error_Message], 400);
        }

        $manager->persist($comment);
        $manager->flush();

        return new JsonResponse(["message" => "Comment sent successfully"]);
    }
}
