<?php

namespace App\Controller;

use App\Entity\Article;
use App\Repository\CommentRepository;
use App\Repository\UserRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class GetPostByUserController extends AbstractController
{
    #[Route(path: "/api/postsbyuser", name: "get_post_by_user", methods: ["GET"])]
    public function getArticle(Request $request, UserRepository $userRepository, ManagerRegistry $objectRepository, CommentRepository $commentRepository): JsonResponse
    {
        $userId = ($request->query->get("user")) ? $request->query->get("user") : 0;

        $user = $userRepository->find($userId);

        $repo = $objectRepository->getRepository(persistentObject: Article::class);
        $articles = $repo->findBy(["author" => $user]);

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
        return new JsonResponse($data);
    }
}
