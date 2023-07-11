<?php

namespace App\Service;

use Lcobucci\JWT\Encoding\JoseEncoder;
use Lcobucci\JWT\Token\Parser;

class DecodeJwt
{
    public function getIdToken($jwt): int
    {
        $parser = new Parser(new JoseEncoder());
        $token = $parser->parse($jwt);
        $id = $token->claims()->get("id");

        return $id;
    }
}
