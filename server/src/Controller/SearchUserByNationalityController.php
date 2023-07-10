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
    #[Route(path: "/api/usersby", name: "get_user_by_nationality", methods: ["GET"])]
    public function searchUserByNationality(
        Request $request,
        DecodeJwt $decodeJwt,
        EntityManagerInterface $em
    ): JsonResponse {
        $countries = $request->query->get("countries");
        $number = $request->query->get("number");

        $array_countries = explode(",", $countries);
        $array_countries = implode("' OR user.nationality = '", $array_countries);

        $userThatShouldNotBeSent = $request->headers->get("authorization");
        $userThatShouldNotBeSentId = $decodeJwt->getIdToken($userThatShouldNotBeSent);

        if (!$userThatShouldNotBeSentId) {
            return new JsonResponse(["message" => "User not authentified"], 403);
        }

        $qb = $em->createQueryBuilder();
        $users = $qb->select("user.id", "user.username as name", "user.nationality as country")
            ->from(User::class, "user")
            ->where($qb->expr()->not($qb->expr()->eq("user.id", $userThatShouldNotBeSentId)))
            ->andWhere($qb->expr()->eq("user.nationality", "'$array_countries'"))
            ->setMaxResults($number)
            ->getQuery()
            ->getResult();

        return new JsonResponse($users);
    }
}
