<?php

namespace App\DataFixtures;

use Faker\Factory;
use App\Entity\User;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixtures extends Fixture
{
    public function __construct(private UserPasswordHasherInterface $hasher)
    {
    }

    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create(locale: "fr_Fr");

        for ($i = 1; $i <= 50; $i++) {
            $user = new User();
            $user->setUsername($faker->lastName)
                ->setEmail($faker->email)
                ->setPassword($this->hasher->hashPassword($user, "useruser"))
                ->setRoles(["ROLE_USER"])
                ->setNationality($faker->randomElement($array = array('Madagascar', 'Canada', 'France', 'Japan', 'China', 'Belgium', 'Australia', 'Germany', 'Egypt', 'Ireland', 'India', 'Philippines', 'Jamaica', 'Switzerland', 'Mali', 'Senegal', 'Cameroon', 'Thailand', 'Brazil', 'Indonesia', 'Peru')))
                ->setLanguage($faker->randomElement($array = array('German', 'English', 'Malagasy', 'French', 'Chinese', 'Japanese')));
            $manager->persist($user);
        }

        $manager->flush();
    }
}
