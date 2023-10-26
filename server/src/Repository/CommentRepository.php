<?php

namespace App\Repository;

use App\Entity\Comment;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Comment>
 *
 * @method Comment|null find($id, $lockMode = null, $lockVersion = null)
 * @method Comment|null findOneBy(array $criteria, array $orderBy = null)
 * @method Comment[]    findAll()
 * @method Comment[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CommentRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Comment::class);
    }

    public function save(Comment $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Comment $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function getComments(?int $article, $maxResult)
    {
        return $this->createQueryBuilder("comment")
            ->select("comment.id", "comment.content", "comment.createdAt", "article.id as articleId", "user.id as authorId", "user.username as authorName", "user.nationality as authorCountry", "user.pdpName as image")
            ->leftJoin("comment.article", "article")
            ->leftJoin("comment.commentator", "user")
            ->where($this->createQueryBuilder("comment")->expr()->eq("comment.article", $article))
            ->setMaxResults($maxResult)
            ->getQuery()->getResult();
    }

    public function getNumberComments(?int $article)
    {
        return $this->createQueryBuilder("comment")
            ->select("comment.id")
            ->where($this->createQueryBuilder("comment")->expr()->eq("comment.article", $article))
            ->getQuery()->getResult();
    }
}
