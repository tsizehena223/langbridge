<?php

namespace App\Repository;

use App\Entity\Article;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Article>
 *
 * @method Article|null find($id, $lockMode = null, $lockVersion = null)
 * @method Article|null findOneBy(array $criteria, array $orderBy = null)
 * @method Article[]    findAll()
 * @method Article[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ArticleRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Article::class);
    }

    public function save(Article $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Article $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function getArticles($maxResult)
    {
        return $this->createQueryBuilder("article")
            ->select("article.id", "article.content", "article.createdAt", "user.id as authorId", "user.username as authorName", "user.nationality as authorCountry", "article.likes")
            ->leftJoin("article.author", "user")
            ->setMaxResults($maxResult)
            ->getQuery()->getResult();
    }

    public function getArticlesByAuthor(int $author, $maxResult)
    {
        return $this->createQueryBuilder("article")
            ->select("article.id", "article.content", "article.createdAt", "user.id as authorId", "user.username as authorName", "user.nationality as authorCountry", "article.likes")
            ->leftJoin("article.author", "user")
            ->where($this->createQueryBuilder("article")->expr()->eq("article.author", $author))
            ->setMaxResults($maxResult)
            ->getQuery()->getResult();
    }
}
