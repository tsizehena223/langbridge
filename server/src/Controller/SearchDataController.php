<?php

namespace App\Controller;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class SearchDataController extends AbstractController
{
    #[Route(path: "/api/search", name: "app_search", methods: ["GET"])]
    public function search(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $keywords = $request->query->get("keywords");

        return new JsonResponse();
    }
}
