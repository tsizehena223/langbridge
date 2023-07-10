<?php

namespace App\Controller;

use App\Entity\User;
use App\Service\DecodeJwt;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class SearchUserByNationalityController extends AbstractController
{
    #[Route(path: "/api/usersby/{country}", name: "get_user_by_nationality", methods: ["GET"])]
    public function searchUserByNationality(
        Request $request,
        DecodeJwt $decodeJwt,
        EntityManagerInterface $em
    ): JsonResponse {
        $country = $request->attributes->get("country");

        $userThatShouldNotBeSent = $request->headers->get("authorization");
        $userThatShouldNotBeSentId = $decodeJwt->getIdToken($userThatShouldNotBeSent);

        $qb = $em->createQueryBuilder();
        $users = $qb->select("a.id", "a.username")
            ->from(User::class, "a")
            ->where($qb->expr()->not($qb->expr()->eq("a.id", $userThatShouldNotBeSentId)))
            ->andWhere($qb->expr()->eq("a.nationality", "'$country'"))
            ->getQuery()
            ->getResult();
        return new JsonResponse($users);
    }
}
