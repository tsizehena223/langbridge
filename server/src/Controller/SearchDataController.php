<?php

namespace App\Controller;

use App\Entity\User;
use App\Service\DecodeJwt;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class SearchDataController extends AbstractController
{
    #[Route(path: "/api/search", name: "app_search", methods: ["GET"])]
    public function search(Request $request, EntityManagerInterface $em, DecodeJwt $decodeJwt): JsonResponse
    {
        $nationality = $request->query->get("nationality");
        $number = $request->query->get("number");
        $number = (null === $number) ? "5" : $number;

        if (null === $nationality) {
            return new JsonResponse();
        }

        $userThatShouldNotBeSent = $request->headers->get("authorization");
        $userThatShouldNotBeSentId = $decodeJwt->getIdToken($userThatShouldNotBeSent);

        if (!$userThatShouldNotBeSentId) {
            return new JsonResponse(["message" => "User not authentified"], 403);
        }

        $qb = $em->createQueryBuilder();
        $users = $qb->select("user.id", "user.username as name", "user.nationality as country")
            ->from(User::class, "user")
            ->where($qb->expr()->not($qb->expr()->eq("user.id", $userThatShouldNotBeSentId)))
            ->andWhere($qb->expr()->eq("user.nationality", "'$nationality'"))
            ->setMaxResults($number)
            ->getQuery()
            ->getResult();

        return new JsonResponse($users);
    }
}
