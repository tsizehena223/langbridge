<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class UserPdpController extends AbstractController
{
    public function __invoke(Request $request)
    {
        $user = $request->attributes->get('data');
        if (!($user instanceof User)) {
            return new JsonResponse(["message" => "User expected"], 400);
        }

        $file = $request->files->get('pdp');
        if ($file !== null) {
            $user->setPdpFile($file);
            $user->setUpdatedAt(new \DateTime("NOW", new \DateTimeZone("Indian/Antananarivo")));
        }

        return $user;
    }
}
