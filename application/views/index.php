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
    <script>

        // Enable pusher logging - don't include this in production
        Pusher.logToConsole = true;

        var pusher = new Pusher('de53a31726fcf8b0cc37', {
            cluster: 'ap2',
            encrypted: true
        });

        var channel = pusher.subscribe('my-channel');
        channel.bind('my-event', function(data) {
            alert(data.message);
        });
    </script>
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
