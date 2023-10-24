<?php

namespace App\Controller;

use App\Service\DecodeJwt;
use App\Repository\ArticleRepository;
use App\Repository\CommentRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class GetArticlesController extends AbstractController
{
    #[Route(path: "/api/articles", name: "get_articles", methods: ["GET"])]
    public function getArticle(
        Request $request,
        ArticleRepository $articleRepository,
        CommentRepository $commentRepository,
        DecodeJwt $decodeJwt,
        GetFileUrlController $getFileUrl
    ): JsonResponse {
        $author = (int)$request->query->get("author");
        $num = $request->query->get("number");
        $jwt = $request->headers->get("Authorization");
        $isAuthenticated = $decodeJwt->getIdToken($jwt);

        if ($isAuthenticated == null) {
            return new JsonResponse(["message" => "User not authentified"], 401);
        }

        $maxResult = ($num == null) ? "100" : $num;

        $articles = ($author != null) ? $articleRepository->getArticlesByAuthor($author, $maxResult) : $articleRepository->getArticles($maxResult);

        $data = [];

        foreach ($articles as $article) {
            $numberComments = count($commentRepository->getNumberComments($article["id"]));
            $linkImagePdp = ($article["imagePdp"]) ? $getFileUrl->getFileUrl($article["imagePdp"], 'users') : null;
            // $linkImagePdp = "http://localhost:8000/images/users/" . $article["imagePdp"]; // Noob 
            $linkImage = $article["imageName"] ? $getFileUrl->getFileUrl($article["imageName"], 'articles') : null;
            $data[] = [
                'id' => $article["id"],
                'content' => $article["content"],
                'createdAt' => $article["createdAt"]->format("d M Y H:i"),
                'author' => [
                    'id' => $article["authorId"],
                    'name' => $article["authorName"],
                    'country' => $article["authorCountry"],
                    'image' => $linkImagePdp
                ],
                'likes' => $article["likes"],
                'comments' => $numberComments,
                'image' => $linkImage
            ];
        }

        return new JsonResponse($data);
    }
}
