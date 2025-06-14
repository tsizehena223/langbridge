<?php

namespace App\Entity;

use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\UserRepository;
use ApiPlatform\Metadata\ApiResource;
use App\Controller\SecurityController;
use App\Controller\GetUsersController;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Validator\Constraints as Assert;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ApiResource(
    operations: [
        new Post(
            denormalizationContext: ["groups" => ["login:User"]],
            routeName: "app_login",
            controller: SecurityController::class,
            openapiContext: ["summary" => "Login"]
        ),
        new Post(
            denormalizationContext: ["groups" => ["register:User"]],
            routeName: "app_register",
            controller: RegistrationController::class,
            openapiContext: ["summary" => "Registration"]
        ),
        new Get(
            normalizationContext: ["groups" => ["search:User"]],
            routeName: "search_users",
            controller: GetUsersController::class,
            openapiContext: ["summary" => "Search users"]
        )
        // new Post(
        //     deserialize: false,
        //     uriTemplate: "/user/{id}/pdp",
        //     controller: UserPdpController::class
        // )
    ]
)]
#[UniqueEntity(fields: ["email"], message: "This email is already used!")]
#[Vich\Uploadable]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["search:User"])]
    private ?int $id = null;

    #[ORM\Column(length: 180, unique: true)]
    #[Groups(["login:User", "register:User"])]
    #[Assert\NotNull(message: 'Email should not be null')]
    #[Assert\NotBlank(message: 'Email should not be blank')]
    #[Assert\Email(message: 'This value is not a valid email address')]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    #[Groups(["register:User", "search:User"])]
    #[Assert\NotNull(message: 'Username should not be null')]
    #[Assert\NotBlank(message: 'Username should not be blank')]
    #[Assert\Length(min: 4, minMessage: "Username should have at least 4 characters")]
    private ?string $username = null;

    #[ORM\Column]
    #[Groups(["search:User"])]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    #[Groups(["login:User", "register:User"])]
    #[Assert\NotNull(message: 'Password should not be null')]
    #[Assert\NotBlank(message: 'Password should not be blank')]
    #[Assert\Length(min: 6, minMessage: "Password should have at least 6 characters")]
    #[Assert\EqualTo(propertyPath: "confirmPassword", message: 'Password should be equal to confirmPassword', groups: ["add:User"])]
    private ?string $password = null;

    #[Groups(["register:User"])]
    #[Assert\NotBlank(message: 'ConfirmPassword should not be blank', groups: ["add:User"])]
    #[Assert\EqualTo(propertyPath: "password", message: 'Password should be equal to confirmPassword')]
    private ?string $confirmPassword = null;

    #[Vich\UploadableField(mapping: "users", fileNameProperty: "pdpName")]
    private ?File $pdpFile = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $pdpName = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $updatedAt = null;

    #[ORM\OneToMany(mappedBy: 'authorId', targetEntity: Article::class)]
    private Collection $articles;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(["register:User", "search:User"])]
    #[Assert\NotBlank(message: 'Country should not be blank')]
    private ?string $nationality = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(["register:User", "search:User"])]
    #[Assert\NotBlank(message: 'Language should not be blank')]
    private ?string $language = null;

    #[ORM\OneToMany(mappedBy: 'commentator', targetEntity: Comment::class)]
    private Collection $comments;

    #[ORM\OneToMany(mappedBy: 'sender', targetEntity: Message::class, orphanRemoval: true)]
    private Collection $messages;

    #[ORM\OneToMany(mappedBy: 'sender', targetEntity: Discussion::class, orphanRemoval: true)]
    private Collection $discussions;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $createdAt = null;

    public function __construct()
    {
        $this->articles = new ArrayCollection();
        $this->comments = new ArrayCollection();
        $this->messages = new ArrayCollection();
        $this->discussions = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    public function getConfirmPassword(): ?string
    {
        return $this->confirmPassword;
    }

    public function setConfirmPassword(string $confirmPassword): static
    {
        $this->confirmPassword = $confirmPassword;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): static
    {
        $this->username = $username;

        return $this;
    }

    public function getPdpName(): ?string
    {
        return $this->pdpName;
    }

    public function setPdpName(?string $pdpName): static
    {
        $this->pdpName = $pdpName;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt($updatedAt)
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    /**
     * Get the value of pdpFile
     */
    public function getPdpFile()
    {
        return $this->pdpFile;
    }

    public function setPdpFile(?File $pdpFile = null): void
    {
        $this->pdpFile = $pdpFile;

        if ($pdpFile !== null) {
            $this->updatedAt = new \DateTimeImmutable();
        }
    }

    /**
     * @return Collection<int, Article>
     */
    public function getArticles(): Collection
    {
        return $this->articles;
    }

    // public function addArticle(Article $article): static
    // {
    //     if (!$this->articles->contains($article)) {
    //         $this->articles->add($article);
    //         $article->setAuthorId($this);
    //     }

    //     return $this;
    // }

    // public function removeArticle(Article $article): static
    // {
    //     if ($this->articles->removeElement($article)) {
    //         // set the owning side to null (unless already changed)
    //         if ($article->getAuthorId() === $this) {
    //             $article->setAuthorId(null);
    //         }
    //     }

    //     return $this;
    // }

    public function getNationality(): ?string
    {
        return $this->nationality;
    }

    public function setNationality(?string $nationality): static
    {
        $this->nationality = $nationality;

        return $this;
    }

    public function getLanguage(): ?string
    {
        return $this->language;
    }

    public function setLanguage(?string $language): static
    {
        $this->language = $language;

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
            $comment->setCommentator($this);
        }

        return $this;
    }

    public function removeComment(Comment $comment): static
    {
        if ($this->comments->removeElement($comment)) {
            // set the owning side to null (unless already changed)
            if ($comment->getCommentator() === $this) {
                $comment->setCommentator(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Message>
     */
    public function getMessages(): Collection
    {
        return $this->messages;
    }

    public function addMessage(Message $message): static
    {
        if (!$this->messages->contains($message)) {
            $this->messages->add($message);
            $message->setSender($this);
        }

        return $this;
    }

    public function removeMessage(Message $message): static
    {
        if ($this->messages->removeElement($message)) {
            // set the owning side to null (unless already changed)
            if ($message->getSender() === $this) {
                $message->setSender(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Discussion>
     */
    public function getDiscussions(): Collection
    {
        return $this->discussions;
    }

    public function addDiscussion(Discussion $discussion): static
    {
        if (!$this->discussions->contains($discussion)) {
            $this->discussions->add($discussion);
            $discussion->setSender($this);
        }

        return $this;
    }

    public function removeDiscussion(Discussion $discussion): static
    {
        if ($this->discussions->removeElement($discussion)) {
            // set the owning side to null (unless already changed)
            if ($discussion->getSender() === $this) {
                $discussion->setSender(null);
            }
        }

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(?\DateTimeInterface $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }
}
