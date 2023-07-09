<?php

namespace App\Controller;

use App\Entity\Article;
use App\Service\DecodeJwt;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Persistence\ObjectManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class LikePostController extends AbstractController
{
    #[Route(path: "/api/post/like/{postId}", name: "like_post", methods: ["GET"])]
    public function likePost(
        Request $request,
        ManagerRegistry $managerRegistry,
        ObjectManager $objectManager,
        DecodeJwt $decodeJwt,
        int $postId
    ): JsonResponse {
        $article = $managerRegistry->getRepository(persistentObject: Article::class)->find($postId);
        if ($article === null) {
            return new JsonResponse(["message" => "No post found"], 404);
        }

        $jwtToken = $request->headers->get("Authorization");
        if (!$jwtToken) return new JsonResponse(["message" => "User not authentified"], 401);

        $likerId = $decodeJwt->getIdToken($jwtToken);

        $articleLikes = $article->getLikes();

        $isLiked = in_array($likerId, $articleLikes);

        if ($isLiked) {
            $articleLikes = array_filter($articleLikes, function ($id) use ($likerId) {
                return $id != $likerId;
            });
            $message = "Disliked";
        } else {
            array_push($articleLikes, $likerId);
            $message = "Liked";
        }

        $article->setLikes($articleLikes);
        $objectManager->persist($article);
        $objectManager->flush();

        return new JsonResponse(["message" => $message . " successfully"]);
    }
}
