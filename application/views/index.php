<!DOCTYPE html>
<html ng-app="myApp" ng-controller="RootCtrl">
<head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <title ng-cloak="">{{title}}</title>

    <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/client/css/app.css">
    <!-- Fonts -->
    <link
        href="https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800"
        rel="stylesheet" type="text/css">
    <link
        href="https://fonts.googleapis.com/css?family=Josefin+Slab:100,300,400,600,700,100italic,300italic,400italic,600italic,700italic"
        rel="stylesheet" type="text/css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

    <script src="https://js.pusher.com/4.0/pusher.min.js"></script>
</head>
<body ng-cloak>
<p class="flashMsg"></p>
<div class="brand">TMS</div>
<div class="address-bar">3481 Melrose Place | Beverly Hills, CA 90210 | 123.456.7890</div>

<!-- Navigation -->
<nav class="navbar navbar-default" role="navigation">
    <div class="container">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <!-- navbar-brand is hidden on larger screens, but visible when the menu is collapsed -->
            <a class="navbar-brand" href="index.html">Business Casual</a>
        </div>
        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
                <li>
                    <a href="#!/dashboard">Home</a>
                </li>
                <li>
                    <a href="#!/about-us">About</a>
                </li>
                <li>
                    <a href="#!/issue">Issue</a>
                </li>
                <li>
                    <a href="#!/contact-us">Contact</a>
                </li>
            </ul>
        </div>
        <!-- /.navbar-collapse -->
    </div>
    <!-- /.container -->
</nav>

<div class="view page page-fade-in" ng-view ng-cloak=""></div>
<!-- /.container -->

<!-- Chat Content -->
<div class="chat-panel panel panel-default col-lg-3 chat_sidebar hide-">
    <div class="panel-heading">
        <i class="fa fa-comments fa-fw"></i> Chat
        <div class="btn-group pull-right">
            <button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown">
                <i class="fa fa-chevron-down"></i>
            </button>
            <ul class="dropdown-menu slidedown">
                <li>
                    <a href="#">
                        <i class="fa fa-refresh fa-fw"></i> Refresh
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i class="fa fa-check-circle fa-fw"></i> Available
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i class="fa fa-times fa-fw"></i> Busy
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i class="fa fa-clock-o fa-fw"></i> Away
                    </a>
                </li>
                <li class="divider"></li>
                <li>
                    <a href="#">
                        <i class="fa fa-sign-out fa-fw"></i> Sign Out
                    </a>
                </li>
            </ul>
            <button toggle-chat-box style="margin-left: 4px;" type="button" class="btn btn-default btn-xs">
                <i class="fa fa-window-minimize"></i>
            </button>
        </div>
    </div>
    <!-- /.panel-heading -->
    <div id="chatItemsParent" class="panel-body">
        <ul id="chatItems" class="chat chat-body chatBody">
        </ul>
    </div>
    <!-- /.panel-body -->
    <div id="chatBoxFooter" class="panel-footer">
        <div class="input-group">
            <input id="btn-input" ng-model="msg" class="form-control input-sm textMsg"
                   placeholder="Type your message here..." type="text">
            <span class="input-group-btn">
                    <button ng-click="sendMsg()" class="btn btn-warning btn-sm" id="btn-chat">Send</button>
            </span>
        </div>
    </div>
    <!-- /.panel-footer -->
</div>
<!-- Chat Content End -->

<footer>
    <div class="container">
        <div class="row">
            <div class="col-lg-12 text-center">
                <p>Copyright &copy; TMS <?= date('Y'); ?></p>
            </div>
        </div>
    </div>
</footer>

<!-- Angular Init Here -->
<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/jquery-1.11.1.min.js"></script>

<!-- Angular Minify Files - All JS -->
<script src="<?php echo base_url(); ?>build/js/components.js"></script>

<!-- App JS Files-->
<?php if (ENVIRONMENT == 'development') { ?>
    <script src="<?php echo base_url(); ?>angular/js/application.js"></script>
    <script src="<?php echo base_url(); ?>angular/js/controller.js"></script>
    <script src="<?php echo base_url(); ?>angular/js/directive.js"></script>
    <script src="<?php echo base_url(); ?>angular/js/services.js"></script>
    <script src="<?php echo base_url(); ?>angular/js/filters.js"></script>
<?php } ?>
<!-- Bootstrap Core JavaScript -->
<script src="assets/client/js/bootstrap.min.js"></script>

<!-- Script to Activate the Carousel -->
<script>
    $('.carousel').carousel({
        interval: 5000 //changes the speed
    })
</script>

</body>
</html>
