<?php

namespace App\Message;

class SendMessage
{
    private int $sender;
    private int $recipient;
    private $content;

    public function __construct(?int $sender, ?int $recipient, string $content)
    {
        $this->sender = $sender;
        $this->recipient = $recipient;
        $this->content = $content;
    }

    public function getSender(): ?int
    {
        return $this->sender;
    }

    public function getRecipient(): ?int
    {
        return $this->recipient;
    }

    public function getContent(): string
    {
        return $this->content;
    }
}
