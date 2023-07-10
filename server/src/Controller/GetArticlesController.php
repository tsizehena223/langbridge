<?php

namespace App\Controller;

use App\Entity\Article;
use App\Repository\CommentRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class GetArticlesController extends AbstractController
{
    #[Route(path: "/api/posts", name: "get_collection_article", methods: ["GET"])]
    public function getArticle(ManagerRegistry $objectRepository, CommentRepository $commentRepository): JsonResponse
    {
        $repo = $objectRepository->getRepository(persistentObject: Article::class);
        $articles = $repo->findAll();

        $data = [];

        foreach ($articles as $article) {
            $comments = $comments = $commentRepository->findBy(["article" => $article->getId()]);
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
                        "name" => $commentAuthor->getUsername(),
                        "country" => $commentAuthor->getNationality()
                    ],
                    "createdAt" => $commentCreatedAt
                ];
            }
            $data[] = [
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
        }
        return new JsonResponse(["posts" => $data], 200);
    }
}
