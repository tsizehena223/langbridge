<?php

namespace App\Controller;

use App\Entity\Article;
use App\Repository\CommentRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class GetArticleController extends AbstractController
{
    #[Route(path: "/api/post/{id}", name: "get_item_article", methods: ["GET"])]
    public function getArticle(Request $request, ManagerRegistry $objectRepository, CommentRepository $commentRepository): JsonResponse
    {
        $id = $request->attributes->get("id");
        $repo = $objectRepository->getRepository(persistentObject: Article::class);
        $article = $repo->find($id);
        if (!$article || !($article instanceof Article)) {
            return new JsonResponse(["message" => "Article not found"], 404);
        }

        $comments = $commentRepository->findBy(["article" => $article->getId()]);
        $array_comments = [];
        foreach ($comments as $comment) {
            $commentId = $comment->getId();
            $commentContent = $comment->getContent();
            $commentAuthor = $comment->getCommentator();
            $commentCreatedAt = $comment->getCreatedAt()->format("d M Y H:i");
            $array_comments[] = [
                "id" => $commentId,
                "content" => $commentContent,
                "author" => $commentAuthor = [
                    "id" => $commentAuthor->getId(),
                    "username" => $commentAuthor->getUsername(),
                    "country" => $commentAuthor->getNationality()
                ],
                "createdAt" => $commentCreatedAt
            ];
        }

        $data = [
            "id" => $article->getId(),
            "content" => $article->getContent(),
            "createdAt" => $article->getCreatedAt()->format("d M Y H:i"),
            "author" => [
                "id" => $article->getAuthor()->getId(),
                "name" => $article->getAuthor()->getUsername(),
                "country" => $article->getAuthor()->getNationality()
            ],
            "likes" => $article->getLikes(),
            "comments" => $array_comments
        ];
        return new JsonResponse(["post" => $data], 200);
    }
}
