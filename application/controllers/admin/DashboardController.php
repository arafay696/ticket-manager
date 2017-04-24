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
}