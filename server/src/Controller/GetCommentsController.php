<?php

namespace App\Controller;

use App\Repository\CommentRepository;
use App\Service\DecodeJwt;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class GetCommentsController extends AbstractController
{
  #[Route(path: "/api/articles/comments", name: "get_comments", methods: ["GET"])]
  public function getComments(Request $request, GetFileUrlController $getFileUrl, CommentRepository $commentRepository, DecodeJwt $decodeJwt): JsonResponse
  {
    $article = (int)$request->query->get("article");
    $number = $request->query->get("number");
    $maxResult = ($number == null) ? "100" : $number;
    $jwt = $request->headers->get("Authorization");
    $isAuthenticated = $decodeJwt->getIdToken($jwt);

    if ($isAuthenticated == null) {
      return new JsonResponse(["message" => "User not authentified"], 401);
    }

    if ($article == null || !isset($article)) {
      return new JsonResponse(["message" => "Article expected"], 400);
    }

    $comments = $commentRepository->getComments($article, $maxResult);

    $data = [];

    foreach ($comments as $comment) {
      $imageAuthor = ($comment["image"]) ? $getFileUrl->getFileUrl($comment["image"], "users") : null;
      $data[] = [
        "id" => $comment["id"],
        "content" => $comment["content"],
        "createdAt" => $comment["createdAt"]->format("d M Y H:i"),
        "author" => [
          "id" => $comment["authorId"],
          "name" => $comment["authorName"],
          "country" => $comment["authorCountry"],
          "image" => $imageAuthor
        ]
      ];
    }

    return new JsonResponse($data);
  }
}
