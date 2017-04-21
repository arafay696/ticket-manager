<!DOCTYPE html>
<html ng-app="myApp">
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Starter Codeigniter & Angularjs</title>
    <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/css/app.css">
</head>
<body ng-cloak>
<div id="wrapper" ng-cloak="">
    <div class="view page page-fade-in" ng-view ng-cloak=""></div>
</div>

<!-- Angular Init Here -->
<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/jquery-1.11.1.min.js"></script>
<script src="<?php echo base_url(); ?>build/js/components.js"></script>

<!-- App JS Files
<script src="<?php echo base_url(); ?>angular/js/application.js"></script>
<script src="<?php echo base_url(); ?>angular/js/controller.js"></script>
<script src="<?php echo base_url(); ?>angular/js/directive.js"></script>
<script src="<?php echo base_url(); ?>angular/js/services.js"></script>
<script src="<?php echo base_url(); ?>angular/js/filters.js"></script>-->
</body>
</html>
