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

    public function categories()
    {
        $getIssueCategories = $this->common_model->select_all('*', 'issues_category');
        $getIssueCategories = $getIssueCategories->result_array();
        $response = array(
            'status' => true,
            'categories' => $getIssueCategories
        );
        echo json_encode($response);
    }

    public function save()
    {
        $data = array(
            'name' => $this->input->post('name'),
            'email' => $this->input->post('email'),
            'description' => $this->input->post('description'),
            'category_id' => (int)$this->input->post('category')
        );

        $save = $this->common_model->insert_array('issue', $data);
        $response = array(
            'status' => false,
            'message' => 'Data could not be saved.'
        );
        if ($save) {
            $response['status'] = true;
            $response['message'] = 'Data saved';
        }

        echo json_encode($response);
    }

    public function sendPush()
    {
        $options = array(
            'cluster' => 'ap2',
            'encrypted' => true
        );
        $pusher = new Pusher(
            'de53a31726fcf8b0cc37',
            'c38a8ef0732ba5af7963',
            '324527',
            $options
        );

        $data['message'] = 'hello world';
        $pusher->trigger('my-channel', 'my-event', $data);
    }
}