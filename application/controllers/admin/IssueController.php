<?php

/**
 * Created by PhpStorm.
 * User: Abdul Rafay
 * Date: 4/21/2017
 * Time: 3:12 PM
 */

defined('BASEPATH') OR exit('No direct script access allowed');

class IssueController extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
    }

    public function requestReceived()
    {
        $userId = $this->input->post('user_id');
        $userName = $this->input->post('user_name');
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

        $data['message'] = 'Welcome ' . $userName . ": Let's chat..!";
        $pusher->trigger("userchannel-" . "-test" . $userId, 'requestProcessed', $data);
    }
}