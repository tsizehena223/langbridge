<?php

namespace App\Command;

use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use App\WebSocket\MessageHandler;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Messenger\MessageBusInterface;

class WebSocketServerCommand extends Command
{
    protected static $defaultName = 'websocket:server';

    public function __construct(private MessageBusInterface $messageBus)
    {
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $server = IoServer::factory(
            new HttpServer(
                new WsServer(
                    new MessageHandler($this->messageBus)
                )
            ),
            8080 // Port on which the WebSocket server will run
        );

        $output->writeln('WebSocket server started on port 8080');

        $server->run();
    }
}
