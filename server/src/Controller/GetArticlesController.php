<?php

namespace App\Controller;

use App\Entity\Article;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class GetArticlesController extends AbstractController
{
    #[Route(path: "/api/posts", name: "get_collection_article", methods: ["GET"])]
    public function getArticle(ManagerRegistry $objectRepository): JsonResponse
    {
        $repo = $objectRepository->getRepository(persistentObject: Article::class);
        $articles = $repo->findAll();
        if (count($articles) < 1) {
            return new JsonResponse(["message" => "There is no Article"], 404);
        }

        $data = [];

        foreach ($articles as $article) {
            $data[] = [
                "id" => $article->getId(),
                "content" => $article->getContent(),
                "createdAt" => $article->getCreatedAt()->format("d M Y H:i"),
                "author" => [
                    "id" => $article->getAuthor()->getId(),
                    "name" => $article->getAuthor()->getUsername(),
                    "country" => $article->getAuthor()->getNationality()
                ]
            ];
        }
        return new JsonResponse(["data" => $data], 200);
    }
}
