<?php

namespace App\Repository;

use App\Entity\Discussion;
use App\Entity\Message;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Message>
 *
 * @method Message|null find($id, $lockMode = null, $lockVersion = null)
 * @method Message|null findOneBy(array $criteria, array $orderBy = null)
 * @method Message[]    findAll()
 * @method Message[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MessageRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Message::class);
    }

    public function findBySenderOrRecipientOnDiscussion(?User $user, ?Discussion $discussion)
    {
        return $this->createQueryBuilder("m")
            ->select("m.id", "m.content", "m.createdAt", "sender.id as senderId", "recipient.id as recipientId")
            ->leftJoin("m.sender", "sender")
            ->leftJoin("m.recipient", "recipient")
            ->where("sender.id = :sender OR recipient.id = :sender")
            ->andWhere("m.discussion = :discussionId")
            ->setParameters(["sender" => $user, "discussionId" => $discussion->getId()])
            ->orderBy("m.createdAt", "ASC")
            ->getQuery()
            ->getResult();
    }
}
