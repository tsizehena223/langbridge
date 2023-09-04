<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class GetFileUrlController extends AbstractController
{
   public function getFileUrl($filename)
   {
      $fileUrl = $this->generateUrl('articles', ['filename' => $filename], UrlGeneratorInterface::ABSOLUTE_URL);
      // OUTPUT : http://localhost:8000/images/articles?filename=challenge-64f30887cb802888248634.png
      // -> Change the "?filename" to "/"
      $fileUrlChanged = str_replace("?filename=", "/", $fileUrl);
      return $fileUrlChanged;
   }
}
