<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

class UserPdpController extends AbstractController
{
    public function __invoke(Request $request)
    {
        $user = $request->attributes->get('data');
        if (!($user instanceof User)) {
            throw new \RuntimeException(message: "User attendu");
        }
        $file = $request->files->get('file');
        $user->setPdpFile($file);
        $user->setUpdatedAt(new \DateTime("NOW", new \DateTimeZone("Indian/Antananarivo")));

        return $user;
    }
}
