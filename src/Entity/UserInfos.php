<?php

namespace App\Entity;

use ApiPlatform\Metadata\Get;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Repository\UserInfosRepository;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: UserInfosRepository::class)]
#[ApiResource(
    operations: [
        new Get(
            normalizationContext: ["groups" => ["read:item:Info"]]
        ),
        new Patch(
            denormalizationContext: ["groups" => ["update:Info"]]
        ),
        new Post(
            denormalizationContext: ["groups" => ["add:Info"]]
        )
    ]
)]
class UserInfos
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 50, nullable: true)]
    #[Groups(["read:item:Info", "update:Info", "add:Info", "read:item"])]
    #[Assert\NotBlank(message: 'This value should not be blank')]
    private ?string $fonction = null;

    #[ORM\Column(length: 50, nullable: true)]
    #[Groups(["read:item:Info", "update:Info", "add:Info", "read:item"])]
    #[Assert\NotBlank(message: 'This value should not be blank')]
    private ?string $nationality = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(["read:item:Info", "update:Info", "add:Info", "read:item"])]
    #[Assert\NotBlank(message: 'This value should not be blank')]
    private ?string $language = null;

    #[ORM\OneToOne(inversedBy: 'userInfos', cascade: ['persist', 'remove'])]
    #[Groups(["read:item:Info", "add:Info"])]
    #[Assert\NotBlank(message: 'This value should not be blank')]
    private ?User $user = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFonction(): ?string
    {
        return $this->fonction;
    }

    public function setFonction(?string $fonction): static
    {
        $this->fonction = $fonction;

        return $this;
    }

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

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }
}
