<?php

namespace App\Entity;

use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Delete;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\UserRepository;
use ApiPlatform\Metadata\ApiResource;
use App\Controller\SecurityController;
use ApiPlatform\Metadata\GetCollection;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(
            normalizationContext: ["groups" => ["read:collection"]]
        ),
        new Get(
            normalizationContext: ["groups" => ["read:item"]]
        ),
        new Post(
            routeName: "app_login",
            controller: SecurityController::class,
            openapiContext: [
                "summary" => "Login"
            ],
            denormalizationContext: ["groups" => ["login:User"]]
        ),
        new Post(
            denormalizationContext: ["groups" => ["add:User"]],
            routeName: "app_register",
            controller: RegistrationController::class,
            openapiContext: [
                "summary" => "Registration"
            ]
        ),
        new Delete(),
        new Patch(
            denormalizationContext: ["groups" => ["update:User"]]
        )
    ]
)]
#[UniqueEntity(fields: ["email"], message: "This email is already used!")]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["read:collection", "read:item", "read:item:Info"])]
    private ?int $id = null;

    #[ORM\Column(length: 180, unique: true)]
    #[Groups(["read:item", "add:User", "update:User", "login:User", "read:item:Info"])]
    #[Assert\NotNull(message: 'Email should not be null')]
    #[Assert\NotBlank(message: 'Email should not be blank')]
    #[Assert\Email(message: 'This value is not a valid email address')]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    #[Groups(["read:collection", "read:item", "add:User", "update:User", "read:item:Info"])]
    #[Assert\NotNull(message: 'Username should not be null')]
    #[Assert\NotBlank(message: 'Username should not be blank')]
    #[Assert\Length(min: 4, minMessage: "Username should have at least 4 characters")]
    private ?string $username = null;

    #[ORM\Column]
    #[Groups(["read:item"])]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    #[Groups(["add:User", "login:User"])]
    #[Assert\NotNull(message: 'Password should not be null')]
    #[Assert\NotBlank(message: 'Password should not be blank')]
    #[Assert\Length(min: 4, minMessage: "Password should have at least 4 characters")]
    #[Assert\EqualTo(propertyPath: "confirmPassword", message: 'Password should be equal to confirmPassword')]
    private ?string $password = null;

    #[Groups(["add:User"])]
    #[Assert\NotNull(message: 'ConfirmPassword should not be null')]
    #[Assert\NotBlank(message: 'ConfirmPassword should not be blank')]
    #[Assert\EqualTo(propertyPath: "password", message: 'Password should be equal to confirmPassword')]
    private ?string $confirmPassword = null;

    #[ORM\OneToOne(mappedBy: 'user', cascade: ['persist', 'remove'])]
    #[Groups(["read:item"])]
    private ?UserInfos $userInfos = null;

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

    public function getConfirmPassword(): string
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

    public function getUserInfos(): ?UserInfos
    {
        return $this->userInfos;
    }

    public function setUserInfos(?UserInfos $userInfos): static
    {
        // unset the owning side of the relation if necessary
        if ($userInfos === null && $this->userInfos !== null) {
            $this->userInfos->setUser(null);
        }

        // set the owning side of the relation if necessary
        if ($userInfos !== null && $userInfos->getUser() !== $this) {
            $userInfos->setUser($this);
        }

        $this->userInfos = $userInfos;

        return $this;
    }
}
