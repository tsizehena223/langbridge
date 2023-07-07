<?php

namespace App\Entity;

use ApiPlatform\Metadata\Get;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use App\Repository\ArticleRepository;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Controller\CreateArticleController;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: ArticleRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(
            normalizationContext: ["groups" => ["read:collection:Article"]]
        ),
        new Get(
            normalizationContext: ["groups" => ["read:item:Article"]]
        ),
        new Post(
            routeName: "create_article",
            controller: CreateArticleController::class,
            denormalizationContext: ["groups" => ["add:Article"]]
        ),
        new Patch(
            denormalizationContext: ["groups" => ["update:Article"]]
        ),
        new Delete()
    ]
)]
class Article
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["read:collection:Article", "read:item:Article"])]
    private ?int $id = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(["read:collection:Article", "read:item:Article", "add:Article", "update:Article"])]
    #[Assert\NotBlank(message: 'Content should not be blank')]
    private ?string $content = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(["read:collection:Article", "read:item:Article"])]
    private ?\DateTimeInterface $createdAt = null;

    #[ORM\ManyToOne(inversedBy: 'articles')]
    #[Groups(["read:collection:Article", "read:item:Article"])]
    #[Assert\NotBlank(message: 'Author should not be blank')]
    #[Assert\NotNull(message: 'Author should not be null')]
    private ?User $author = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): static
    {
        $this->content = $content;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getAuthor(): ?User
    {
        return $this->author;
    }

    public function setAuthor(?User $authorId): static
    {
        $this->author = $authorId;

        return $this;
    }
}
