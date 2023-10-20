<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\PasswordUpgraderInterface;

/**
 * @extends ServiceEntityRepository<User>
 *
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRepository extends ServiceEntityRepository implements PasswordUpgraderInterface
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

    public function save(User $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(User $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * Used to upgrade (rehash) the user's password automatically over time.
     */
    public function upgradePassword(PasswordAuthenticatedUserInterface $user, string $newHashedPassword): void
    {
        if (!$user instanceof User) {
            throw new UnsupportedUserException(sprintf('Instances of "%s" are not supported.', $user::class));
        }

        $user->setPassword($newHashedPassword);

        $this->save($user, true);
    }

    public function getUserByName(?string $name, $number, $currentUserId)
    {
        return $this->createQueryBuilder("user")
            ->select("user.id", "user.username as name", "user.nationality as country", "user.language")
            ->where($this->createQueryBuilder("user")->expr()->like("user.username", "'%$name%'"))
            ->andWhere($this->createQueryBuilder("user")->expr()->not($this->createQueryBuilder("user")->expr()->eq("user.id", $currentUserId)))
            ->setMaxResults($number)
            ->getQuery()->getResult();
    }

    public function getUsersByCountries($countries, ?int $currentUserId, $number)
    {
        return $this->createQueryBuilder("user")
            ->select("user.id", "user.username as name", "user.nationality as country", "user.language")
            ->where($this->createQueryBuilder("user")->expr()->not($this->createQueryBuilder("user")->expr()->eq("user.id", $currentUserId)))
            ->andWhere($this->createQueryBuilder("user")->expr()->eq("user.nationality", "'$countries'"))
            ->setMaxResults($number)
            ->getQuery()->getResult();
    }

    public function getUsersByLanguageAndCountry($currentUserId, $language, $country, $name)
    {
        return $this->createQueryBuilder("user")
            ->select("user.id", "user.username as name", "user.nationality as country", "user.language")
            ->where($this->createQueryBuilder("user")->expr()->not($this->createQueryBuilder("user")->expr()->eq("user.id", $currentUserId)))
            ->andWhere($this->createQueryBuilder("user")->expr()->like("user.username", "'%$name%'"))
            ->andWhere($this->createQueryBuilder("user")->expr()->eq("user.nationality", "'$country'"))
            ->andWhere($this->createQueryBuilder("user")->expr()->eq("user.language", "'$language'"))
            ->getQuery()->getResult();
    }

    public function getUsersByCountry($currentUserId, $country, $name)
    {
        return $this->createQueryBuilder("user")
            ->select("user.id", "user.username as name", "user.nationality as country", "user.language")
            ->where($this->createQueryBuilder("user")->expr()->not($this->createQueryBuilder("user")->expr()->eq("user.id", $currentUserId)))
            ->andWhere($this->createQueryBuilder("user")->expr()->like("user.username", "'%$name%'"))
            ->andWhere($this->createQueryBuilder("user")->expr()->eq("user.nationality", "'$country'"))
            ->getQuery()->getResult();
    }

    public function getUsersByLanguage($currentUserId, $language, $name)
    {
        return $this->createQueryBuilder("user")
            ->select("user.id", "user.username as name", "user.nationality as country", "user.language")
            ->where($this->createQueryBuilder("user")->expr()->not($this->createQueryBuilder("user")->expr()->eq("user.id", $currentUserId)))
            ->andWhere($this->createQueryBuilder("user")->expr()->like("user.username", "'%$name%'"))
            ->andWhere($this->createQueryBuilder("user")->expr()->eq("user.language", "'$language'"))
            ->getQuery()->getResult();
    }
}
