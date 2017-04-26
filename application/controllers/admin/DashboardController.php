<?php

/**
 * Created by PhpStorm.
 * User: Abdul Rafay
 * Date: 4/21/2017
 * Time: 3:12 PM
 */

defined('BASEPATH') OR exit('No direct script access allowed');

class DashboardController extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        $this->load->view("admin/index");
    }

    public function sendMsg()
    {
        $channelName = $this->input->post('channelName');
        $userMsg = $this->input->post('message');
        $eventName = $this->input->post('eventName');
        $options = array(
            'cluster' => config_item('cluster'),
            'encrypted' => config_item('encrypted')
        );
        $pusher = new Pusher(
            config_item('pusher_api_key'),
            config_item('pusher_api_secret'),
            config_item('pusher_app_id'),
            $options
        );

        $data['message'] = $userMsg;
        $pusher->trigger($channelName, $eventName, $data);
    }
}