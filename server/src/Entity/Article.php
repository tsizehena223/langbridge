<?php

namespace App\Entity;

use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Delete;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\ArticleRepository;
use ApiPlatform\Metadata\GetCollection;
use App\Controller\ArticleCreateController;
use App\Controller\GetArticleController;
use App\Controller\GetArticlesController;
use App\Controller\LikePostController;
use App\Repository\CommentRepository;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: ArticleRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(
            routeName: "get_articles",
            controller: GetArticlesController::class,
            normalizationContext: ["groups" => ["get:Article"]]
        ),
        new Post(
            routeName: "create_article",
            controller: ArticleCreateController::class,
            denormalizationContext: ["groups" => ["add:Article"]]
        ),
        new Get(
            routeName: "like_post",
            controller: LikePostController::class
        )
    ]
)]
class Article
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["get:Article"])]
    private ?int $id = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(["get:Article", "add:Article"])]
    #[Assert\NotBlank(message: 'Content should not be blank')]
    private ?string $content = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(["get:Article"])]
    private ?\DateTimeInterface $createdAt = null;

    #[ORM\ManyToOne(inversedBy: 'articles')]
    #[Groups(["get:Article"])]
    #[Assert\NotBlank(message: 'Author should not be blank')]
    #[Assert\NotNull(message: 'Author should not be null')]
    private ?User $author = null;

    #[ORM\Column(type: Types::JSON, nullable: true)]
    private array $likes = [];

    #[ORM\OneToMany(mappedBy: 'article', targetEntity: Comment::class)]
    private Collection $comments;

    public function __construct()
    {
        $this->comments = new ArrayCollection();
    }

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

    public function getLikes(): array
    {
        return $this->likes;
    }

    public function setLikes(?array $likes): static
    {
        $this->likes = $likes;

        return $this;
    }

    /**
     * @return Collection<int, Comment>
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    public function addComment(Comment $comment): static
    {
        if (!$this->comments->contains($comment)) {
            $this->comments->add($comment);
            $comment->setArticle($this);
        }

        return $this;
    }

    public function removeComment(Comment $comment): static
    {
        if ($this->comments->removeElement($comment)) {
            // set the owning side to null (unless already changed)
            if ($comment->getArticle() === $this) {
                $comment->setArticle(null);
            }
        }

        return $this;
    }
}
