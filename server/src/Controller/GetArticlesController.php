<?php

namespace App\Controller;

use App\Repository\ArticleRepository;
use App\Repository\CommentRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class GetArticlesController extends AbstractController
{
    #[Route(path: "/api/articles", name: "get_articles", methods: ["GET"])]
    public function getArticle(Request $request, ArticleRepository $articleRepository, CommentRepository $commentRepository): JsonResponse
    {
        $author = (int)$request->query->get("author");
        $num = $request->query->get("number");

        $maxResult = ($num == null) ? "100" : $num;

        $articles = ($author != null) ? $articleRepository->getArticlesByAuthor($author, $maxResult) : $articleRepository->getArticles($maxResult);

        $data = [];

        foreach ($articles as $article) {
            $numberComments = count($commentRepository->getNumberComments($article["id"]));
            $data[] = [
                'id' => $article["id"],
                'content' => $article["content"],
                'createdAt' => $article["createdAt"]->format("d M Y H:i"),
                'author' => [
                    'id' => $article["authorId"],
                    'name' => $article["authorName"],
                    'country' => $article["authorCountry"]
                ],
                'likes' => $article["likes"],
                'comments' => $numberComments
            ];
        }

        return new JsonResponse($data);
    }
}
