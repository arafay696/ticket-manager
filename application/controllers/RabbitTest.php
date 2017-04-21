<?php

/**
 * Created by PhpStorm.
 * User: Abdul Rafay
 * Date: 3/14/2017
 * Time: 8:52 AM
 */
require_once PATH_DIR.'/vendor/autoload.php';

use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;

class RabbitTest extends CI_Controller
{
    private $connection;
    private $channel;

    public function __construct()
    {
        parent::__construct();
        $this->connection = new AMQPStreamConnection('localhost', 5672, 'guest', 'guest');
        $this->channel = $this->connection->channel();
    }

    public function queueSend()
    {
        $this->channel->queue_declare('hello', false, false, false, false);
        $msg = new AMQPMessage('Hello World');
        $this->channel->basic_publish($msg, '', 'hello');
        echo "Sent 'Hello World!' \n";

        $this->channel->close();
        $this->connection->close();
    }

    public function queueReceive()
    {
        $this->channel->queue_declare('hello', false, false, false, false);
        echo ' [*] Waiting for messages. To exit press CTRL+C', "\n";

        $callback = function ($msg) {
            echo " [x] Received ", $msg->body, "\n";
            echo $this->getData();
        };

        $this->channel->basic_consume('hello', '', false, true, false, false, $callback);

        while (count($this->channel->callbacks)) {
            $this->channel->wait();
        }

        $this->channel->close();
        $this->connection->close();
    }

    //------------------------ Work Queue Example ----------------------------//

    public function queueSendWorkQ($argv = "Hello World!")
    {
        $taskName = 'task_queue';
        $this->channel->queue_declare($taskName, false, true, false, false);

        $msg = new AMQPMessage($argv,
            array('delivery_mode' => 2) # make message persistent
        );

        $this->channel->basic_publish($msg, '', $taskName);
        echo " [x] Sent ", $argv, "\n";

        $this->channel->close();
        $this->connection->close();
    }

    public function queueReceiveWorkQ()
    {
        $taskName = 'task_queue';
        $this->channel->queue_declare($taskName, false, true, false, false);
        echo ' [*] Waiting for messages. To exit press CTRL+C', "\n";
        $callback = function ($msg) {
            echo " [x] Received ", $msg->body, "\n";
            sleep(5);
            echo " [x] Done", "\n";
            $this->queueSendWorkTwoQ();
            $msg->delivery_info['channel']->basic_ack($msg->delivery_info['delivery_tag']);
        };
        $this->channel->basic_qos(null, 1, null);
        $this->channel->basic_consume($taskName, '', false, false, false, false, $callback);
        while (count($this->channel->callbacks)) {
            $this->channel->wait();
        }
        $this->channel->close();
        $this->connection->close();
    }

    public function queueSendWorkTwoQ($argv = "Hello World!")
    {
        $connection = new AMQPStreamConnection('localhost', 5672, 'guest', 'guest');
        $channel = $connection->channel();

        $taskName = 'task_queue_two';
        $channel->queue_declare($taskName, false, true, false, false);

        $msg = new AMQPMessage($argv,
            array('delivery_mode' => 2) # make message persistent
        );

        $channel->basic_publish($msg, '', $taskName);
        echo " [x] Sent ", $argv, "\n";

        $channel->close();
        $connection->close();
    }

    public function queueReceiveWorkTwoQ()
    {
        $taskName = 'task_queue_two';
        $this->channel->queue_declare($taskName, false, true, false, false);
        echo ' [*] Waiting for messages. To exit press CTRL+C', "\n";
        $callback = function ($msg) {
            echo " [x] Received Method Two", $msg->body, "\n";
            sleep(5);
            echo " [x] Done Method Two", "\n";
            $msg->delivery_info['channel']->basic_ack($msg->delivery_info['delivery_tag']);
        };
        $this->channel->basic_qos(null, 1, null);
        $this->channel->basic_consume($taskName, '', false, false, false, false, $callback);
        while (count($this->channel->callbacks)) {
            $this->channel->wait();
        }
        $this->channel->close();
        $this->connection->close();
    }


    //------------------------------Publish/Subscribe----------------------------//

    public function queueSendPublishQ($data = 'Hello World')
    {
        $this->channel->exchange_declare('logs', 'fanout', false, false, false);
        $msg = new AMQPMessage($data);

        $this->channel->basic_publish($msg, 'logs');
        echo " [x] Sent ", $data, "\n";

        $this->channel->close();
        $this->connection->close();
    }

    public function queueReceivePublishQ()
    {
        $this->channel->exchange_declare('logs', 'fanout', false, false, false);
        list($queue_name, ,) = $this->channel->queue_declare("", false, false, true, false);

        $this->channel->queue_bind($queue_name, 'logs');
        echo ' [*] Waiting for logs. To exit press CTRL+C', "\n";

        $callback = function ($msg) {
            echo ' [x] ', $msg->body, "\n";
        };

        $this->channel->basic_consume($queue_name, '', false, true, false, false, $callback);
        while (count($this->channel->callbacks)) {
            $this->channel->wait();
        }

        $this->channel->close();
        $this->connection->close();
    }


    //--------------------------- Routing ------------------------------//

    public function queueSendRouting($argv = array("Hello World!", 'error'))
    {
        $this->channel->exchange_declare('direct_logs', 'direct', false, false, false);

        $severity = isset($argv[1]) && !empty($argv[1]) ? $argv[1] : 'info';
        $data = $argv[0];

        $msg = new AMQPMessage($data);
        $this->channel->basic_publish($msg, 'direct_logs', $severity);

        echo " [x] Sent ", $severity, ':', $data, " \n";
        $this->channel->close();
        $this->connection->close();
    }

    public function queueReceiveRouting($severities = array('info', 'error'))
    {
        $this->channel->exchange_declare('direct_logs', 'direct', false, false, false);

        list($queue_name, ,) = $this->channel->queue_declare("", false, false, true, false);
        if (empty($severities)) {
            file_put_contents('php://stderr', "Usage: $severities[0] [info] [warning] [error]\n");
            exit(1);
        }

        foreach ($severities as $severity) {
            $this->channel->queue_bind($queue_name, 'direct_logs', $severity);
        }

        echo ' [*] Waiting for logs. To exit press CTRL+C', "\n";
        $callback = function ($msg) {
            echo ' [x] ', $msg->delivery_info['routing_key'], ':', $msg->body, "\n";
        };

        $this->channel->basic_consume($queue_name, '', false, true, false, false, $callback);
        while (count($this->channel->callbacks)) {
            $this->channel->wait();
        }

        $this->channel->close();
        $this->connection->close();
    }

    //---------------------------------Topic -------------

    public function queueSendTopic()
    {
        $this->channel->exchange_declare('topic_logs', 'topic', false, false, false);

        $argv = func_get_args();
        $routing_key = isset($argv[1]) && !empty($argv[1]) ? $argv[1] : 'info';

        $data = implode(' ', array_slice($argv, 2));
        if (empty($data)) $data = "Hello World!";

        $msg = new AMQPMessage($data);
        $this->channel->basic_publish($msg, 'topic_logs', $routing_key);

        echo " [x] Sent ", $routing_key, ':', $data, " \n";
        $this->channel->close();
        $this->connection->close();
    }

    public function queueReceiveTopic()
    {
        $this->channel->exchange_declare('topic_logs', 'topic', false, false, false);

        $argv = func_get_args();
        list($queue_name, ,) = $this->channel->queue_declare("", false, false, true, false);
        $binding_keys = $argv;
        if (empty($binding_keys)) {
            file_put_contents('php://stderr', "Usage: $argv[0] [binding_key]\n");
            exit(1);
        }

        foreach ($binding_keys as $binding_key) {
            $this->channel->queue_bind($queue_name, 'topic_logs', $binding_key);
        }
        echo ' [*] Waiting for logs. To exit press CTRL+C', "\n";

        $callback = function ($msg) {
            echo ' [x] ', $msg->delivery_info['routing_key'], ':', $msg->body, "\n";

        };
        $this->channel->basic_consume($queue_name, '', false, true, false, false, $callback);

        while (count($this->channel->callbacks)) {
            $this->channel->wait();
        }
        $this->channel->close();
        $this->connection->close();
    }


    //--------------------------------------RPC---------------

    public function fib($n)
    {
        if ($n == 0)
            return 0;
        if ($n == 1)
            return 1;
        return $this->fib($n - 1) + $this->fib($n - 2);
    }

    public function RPCWorkReceiveQ()
    {
        $connection = new AMQPStreamConnection('localhost', 5672, 'guest', 'guest');
        $channel = $connection->channel();
        $channel->queue_declare('rpc_queue', false, false, false, false);


        echo " [x] Awaiting RPC requests\n";
        $callback = function ($req) {
            $n = intval($req->body);
            echo " [.] " . $this->fib($n) . "\n";
            $msg = new AMQPMessage(
                (string)$this->fib($n),
                array('correlation_id' => $req->get('correlation_id'))
            );
            $req->delivery_info['channel']->basic_publish(
                $msg, '', $req->get('reply_to'));
            $req->delivery_info['channel']->basic_ack($req->delivery_info['delivery_tag']);
        };
        $channel->basic_qos(null, 1, null);
        $channel->basic_consume('rpc_queue', '', false, false, false, false, $callback);
        while (count($channel->callbacks)) {
            $channel->wait();
        }
        $channel->close();
        $connection->close();
    }

    public function getData()
    {
        //sleep(5);
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => "http://ip.jsontest.com/",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET"
        ));

        $getResponse = curl_exec($curl);
        $err = curl_error($curl);
        curl_close($curl);

        return $getResponse;
    }

    function imagePurify($image_url = '')
    {
        $api_key = '58a8da069719a6f274ba2e3a8e21f158';
        $firebase_image_url = $image_url;
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_HTTPHEADER, Array());
        curl_setopt($ch, CURLOPT_URL, "http://im-api1.webpurify.com/services/rest/?method=webpurify.live.imgcheck&api_key=" . $api_key . "&format=json&imgurl=" . $firebase_image_url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $fire_response = curl_exec($ch);
        curl_close($ch);

        //$foi = json_decode($fire_response);
        return $fire_response;
    }

    public function queueRPCReceiveTest()
    {
        $this->channel->queue_declare('rpc_queue', false, false, false, false);

        echo " [x] Awaiting RPC requests\n";
        $callback = function ($req) {
            $n = intval($req->body);
            $data = $this->imagePurify('https://try.adglare.net/cdn/img/w3dqw_wpv8su8yyt5ubcrkxrxe_3a15bb21996f83eb84d2cc02cf95b177.jpg');
            echo " [.] Data Received $n " . $data . "\n";
            $msg = new AMQPMessage(
                $data,
                array('correlation_id' => $req->get('correlation_id'))
            );
            $req->delivery_info['channel']->basic_publish(
                $msg, '', $req->get('reply_to'));
            $req->delivery_info['channel']->basic_ack($req->delivery_info['delivery_tag']);
        };
        $this->channel->basic_qos(null, 1, null);
        $this->channel->basic_consume('rpc_queue', '', false, false, false, false, $callback);
        while (count($this->channel->callbacks)) {
            $this->channel->wait();
        }
        $this->channel->close();
        $this->connection->close();
    }
}