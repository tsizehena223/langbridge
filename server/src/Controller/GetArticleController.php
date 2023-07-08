<?php

namespace App\Controller;

use App\Entity\Article;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class GetArticleController extends AbstractController
{
    #[Route(path: "/api/post/{id}", name: "get_item_article", methods: ["GET"])]
    public function getArticle(Request $request, ManagerRegistry $objectRepository): JsonResponse
    {
        $id = $request->attributes->get("id");
        $repo = $objectRepository->getRepository(persistentObject: Article::class);
        $article = $repo->find($id);
        if (!$article || !($article instanceof Article)) {
            return new JsonResponse(["message" => "Article not found"], 404);
        }

        $data = [
            "id" => $article->getId(),
            "content" => $article->getContent(),
            "createdAt" => $article->getCreatedAt()->format("d M Y H:i"),
            "author" => [
                "id" => $article->getAuthor()->getId(),
                "name" => $article->getAuthor()->getUsername(),
                "country" => $article->getAuthor()->getNationality()
            ]
        ];
        return new JsonResponse(["post" => $data], 200);
    }
}
