<?php

namespace App\Controller;

use App\Repository\CommentRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class GetCommentsController extends AbstractController
{
  #[Route(path: "/api/comments", name: "get_comments")]
  public function getComments(Request $request, CommentRepository $commentRepository): JsonResponse
  {
    $article = (int)$request->query->get("article");
    $number = $request->query->get("number");
    $maxResult = ($number == null) ? "100" : $number;

    if ($article == null || !isset($article)) {
      return new JsonResponse(["message" => "Article expected"], 400);
    }

    $comments = $commentRepository->getComments($article, $maxResult);

    $data = [];

    foreach ($comments as $comment) {
      $data[] = [
        "id" => $comment["id"],
        "content" => $comment["content"],
        "createdAt" => $comment["createdAt"]->format("d M Y H:i"),
        "articleId" => $comment["articleId"],
        "author" => [
          "id" => $comment["authorId"],
          "name" => $comment["authorName"],
          "nationality" => $comment["authorCountry"]
        ]
      ];
    }

    return new JsonResponse($data);
  }
}
