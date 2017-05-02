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
            $where = 'id = ' . $save;
            $getDetail = $this->common_model->select_where('*', 'issue', $where);
            $response['status'] = true;
            $response['message'] = 'Data saved';
            $response['user_detail'] = $save;
            $this->sendPush($getDetail->row_array());
        }

        echo json_encode($response);
    }

    public function sendPush($userDetail = array('id' => 1, 'name' => 'Test'))
    {
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

        $data['message'] = 'New request received. Do you want to continue?';
        $data['user_detail'] = $userDetail;
        $pusher->trigger(config_item('channelName'), config_item('issueRequestEvent'), $data);
    }
}