<?php

namespace App\WebSocket;

use App\Service\SendMessageService;
use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use Symfony\Component\Messenger\MessageBusInterface;

class MessageHandler implements MessageComponentInterface
{
    protected $connections = [];

    public function __construct(private MessageBusInterface $messageBus)
    {
    }

    public function onOpen(ConnectionInterface $conn)
    {
        // Store the connection object
        // $this->connections[$conn->resourceId] = $conn;
        // echo "Connection {$conn->resourceId} has connected\n";
    }

    public function onMessage(ConnectionInterface $from, $msg)
    {
        $data = json_decode($msg, true);

        switch ($data["kind"]) {
            case 'connection':
                $from->resourceId = $data["id"];
                $this->connections[$data["id"]] = $from;
                echo $data["id"] . " connected! \n";
                break;
            case 'message':
                echo $data["sender"] . " and " . $data["recipient"] . "\n";
                $this->storeToDB($data["sender"], $data["recipient"], $data["content"]);
                $this->sendManually($data["recipient"], $data["sender"], $msg);
                break;
        }
    }

    public function onClose(ConnectionInterface $conn)
    {
        unset($this->connections[$conn->resourceId]);
        echo "Connection {$conn->resourceId} has disconnected\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e)
    {
        echo "An error occurred: {$e->getMessage()}\n";
        $conn->close();
    }

    private function sendManually($recipient, $sender, $msg)
    {
        $arrayMsg = json_decode($msg, true);
        $date = new \DateTime();
        $arrayMsg["createdAt"] = $date->format("d M Y H:i");
        $msgWithDate = json_encode($arrayMsg);

        foreach ($this->connections as $connection) {
            if ($connection->resourceId == $recipient || $connection->resourceId == $sender) {
                $connection->send($msgWithDate);
            }
        }
    }

    private function storeToDB($senderId, $recipientId, $content)
    {
        $messageService = new SendMessageService($this->messageBus);
        $messageService->sendMessageService($senderId, $recipientId, $content);
    }
}
