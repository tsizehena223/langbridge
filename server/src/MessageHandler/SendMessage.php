<?php

namespace App\Message;

use App\Entity\User;

class SendMessage
{
    private User $sender;
    private User $recipient;
    private $content;

    public function __construct(?User $sender, ?User $recipient, string $content)
    {
        $this->sender = $sender;
        $this->recipient = $recipient;
        $this->content = $content;
    }

    public function getSender(): ?User
    {
        return $this->sender;
    }

    public function getRecipient(): ?User
    {
        return $this->recipient;
    }

    public function getContent(): string
    {
        return $this->content;
    }
}
