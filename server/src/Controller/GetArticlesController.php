<?php

namespace App\Controller;

use App\Repository\ArticleRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class GetArticlesController extends AbstractController
{
    #[Route(path: "/api/articles", name: "get_articles", methods: ["GET"])]
    public function getArticle(Request $request, ArticleRepository $articleRepository): JsonResponse
    {
        $author = (int)$request->query->get("author");

        $articles = ($author != null) ? $articleRepository->getArticlesByAuthor($author) : $articleRepository->getArticles();
        $data = [];

        foreach ($articles as $article) {
            $data[] = [
                'id' => $article["id"],
                'content' => $article["content"],
                'created' => $article["createdAt"]->format("d M Y H:i"),
                'author' => [
                    'id' => $article["authorId"],
                    'name' => $article["authorName"],
                    'country' => $article["authorCountry"]
                ],
            ];
        }

        return new JsonResponse($data);
    }
}
