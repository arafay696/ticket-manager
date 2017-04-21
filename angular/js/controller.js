wifiportal.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.headers.common['Accept'] = 'application/json, text/javascript';
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
    $httpProvider.defaults.headers.common['X-API-KEY'] = 'PulSCqMnXGchW0pC0s5o9ngHVTWMeLqk';
}]);

wifiportal.controller('DashboardCtrl', ['$scope', function ($scope) {
    $scope.welcome = "Codeigniter with Angularjs";
}]);

wifiportal.controller('UpdateCampaignCtrl',['$scope', 'common', '$filter', 'sharedProperties', '$routeParams', '$timeout', 'AdPortalConfig', '$location', function ($scope, common, $filter, sharedProperties, $routeParams, $timeout, AdPortalConfig, $location) {

    //for encrypting and descrypting campaign id
    $scope.encryptValue = function (str) {
        return common.encryptUrlParameter(str);
    };

    $scope.decryptValue = function (str) {
        return common.decryptUrlParameter(str);
    };


    $scope.CampId = $scope.decryptValue($routeParams.id);
    var idvar = $scope.CampId;
    $('#editCampId').val(idvar);
    ///alert('hasdfasdffere');
    $scope.targeting = {
        languages: [],
        continent: [],
        browsers: [],
        devices: [],
        os: [],
        urlwhite: [],
        ipwhite: [],
        region: [],
        ipblack: [],
        domainblack: [],
        ipblack: [],
        country: [],
        city: [],
        domainwhite: [],
        domainblack: [],
        age: [],
        gender: [],
        urlblack: []

    };
    $scope.AllTargetRules = function () {
        $scope.data = {id: $scope.CampId};
        var AllTargetRules = common.http.post('editCampaign/targetingrules', $scope.data);
        AllTargetRules.then(
            function (response) {
                response = response.data;


                if (response.status) {
                    $scope.data = response.data.target;
                    //console.log($scope.data);
                    angular.forEach($scope.data, function (value, key) {
                        if (value.targeting_channel == '1') {
                            $scope.targetLangs = [];
                            $scope.targetLangs.push(value);
                            angular.forEach($scope.targetLangs, function (value, key) {
                                $scope.targeting.languages.push(value.tgc_value);

                            });


                        } else if (value.targeting_channel == '2') {
                            $scope.targeting.continent.push(value);
                        } else if (value.targeting_channel == '3') {
                            $scope.targetbrows = [];
                            $scope.targetbrows.push(value);
                            angular.forEach($scope.targetbrows, function (value, key) {
                                $scope.targeting.browsers.push(value.tgc_value);
                            });
                        } else if (value.targeting_channel == '4') {
                            $scope.targetdevics = [];
                            $scope.targetdevics.push(value);
                            angular.forEach($scope.targetdevics, function (value, key) {
                                $scope.targeting.devices.push(value.tgc_value);
                            });

                        } else if (value.targeting_channel == '5') {
                            $scope.targetoss = [];
                            $scope.targetoss.push(value);
                            angular.forEach($scope.targetoss, function (value, key) {
                                $scope.targeting.os.push(value.tgc_value);
                            });

                        } else if (value.targeting_channel == '6') {

                            $scope.targeurlsw = [];
                            $scope.targeurlsw.push(value);
                            angular.forEach($scope.targeurlsw, function (value, key) {
                                $scope.targeting.urlwhite.push(value.tgc_value);
                            });
                        } else if (value.targeting_channel == '7') {

                            $scope.targetipw = [];
                            $scope.targetipw.push(value);
                            angular.forEach($scope.targetipw, function (value, key) {
                                $scope.targeting.ipwhite.push(value.tgc_value);
                            });

                        } else if (value.targeting_channel == '8') {
                            $scope.targeting.region.push(value);
                        } else if (value.targeting_channel == '9') {

                            $scope.targetipb = [];
                            $scope.targetipb.push(value);
                            angular.forEach($scope.targetipb, function (value, key) {
                                $scope.targeting.ipblack.push(value.tgc_value);
                            });
                        } else if (value.targeting_channel == '10') {
                            $scope.targeting.country.push(value);
                        } else if (value.targeting_channel == '11') {
                            $scope.targeting.city.push(value);
                        } else if (value.targeting_channel == '12') {

                            $scope.targetdomainw = [];
                            $scope.targetdomainw.push(value);
                            angular.forEach($scope.targetdomainw, function (value, key) {
                                $scope.targeting.domainwhite.push(value.tgc_value);
                            });
                        } else if (value.targeting_channel == '13') {

                            $scope.targetdomainb = [];
                            $scope.targetdomainb.push(value);
                            angular.forEach($scope.targetdomainb, function (value, key) {
                                $scope.targeting.domainblack.push(value.tgc_value);
                            });

                        } else if (value.targeting_channel == '14') {
                            $scope.targetager = [];
                            $scope.targetager.push(value);
                            angular.forEach($scope.targetager, function (value, key) {
                                $scope.targeting.age.push(value.tgc_value);
                            });


                            var age_vars = $scope.targeting.age[0].split('-');

                            if($scope.targeting.age[0]){
                                var age_var_min = age_vars[0];
                                var age_var_max = age_vars[1];
                            }else{
                                var age_var_min = '20';
                                var age_var_max = '36';
                            }
                            //alert(age_var_min +'second'+ age_var_max);
                            $scope.ages = [];
                            for (var i = 1; i <= 100; i++) {
                                $scope.ages.push({
                                    age: 1 * i, count: Math.floor((Math.random() * 100) + 1)
                                });
                            }
                            $scope.slider = {
                                min: age_var_min,
                                max: age_var_max,
                                options: {
                                    floor: 0,
                                    ceil: 100,
                                    showTicks: true,
                                    //showTicksValues :10,
                                    onStart: function (sliderId, modelValue, highValue, pointerType) {
                                    },
                                    onChange: function (sliderId, modelValue, highValue, pointerType) {
                                        var from = modelValue;
                                        var to = highValue;
                                        var i;
                                        $('div').removeClass('importantRule');
                                        for (i = from; i <= to; i++) {
                                            $("#" + i).addClass('importantRule');
                                        }
                                    },
                                    onEnd: function (sliderId, modelValue, highValue, pointerType) {
                                        //console.log(sliderId+'--'+modelValue+'--'+highValue+'--'+pointerType+'on end ');// logs 'on end slider-id'
                                    }
                                }
                            };
                            //lefthand-ranger


                        } else if (value.targeting_channel == '15') {
                            $scope.targetGender = [];
                            $scope.targetGender.push(value);
                            angular.forEach($scope.targetGender, function (value, key) {
                                $scope.targeting.gender.push(value.tgc_value);
                            });

                        } else if (value.targeting_channel == '16') {

                            $scope.targeurlsb = [];
                            $scope.targeurlsb.push(value);
                            angular.forEach($scope.targeurlsb, function (value, key) {
                                $scope.targeting.urlblack.push(value.tgc_value);
                            });
                        }
                    });

                    console.log($scope.targeting);
                }
            },
            function (data) {
                // Handle error here
                common.flashMsg('error', 'Targeting rules not found.Please reload page to retry.');
            }
        );
    };

    $scope.AllTargetRules();
    //

    /*for getting all languages*/
    $scope.get_all_languages = function () {
        var all_langs = common.http.get('languages/showall');
        all_langs.then(
            function (response) {
                response = response.data;
                if (response.status) {
                    $scope.total_languages = response.data.langs;
                }
            },
            function (data) {
                // Handle error here
                common.flashMsg('error', 'Languages not found.Please reload page to retry.');
            }
        );
    };
    $scope.get_all_languages();


    //for geting language Name

    $scope.getLangName = function(id){
        var langName = 'Not Found';
        angular.forEach($scope.total_languages, function (value, key) {
            if (value['id'] == id) {
                langName = value['language'];
            }

        });
        return langName;
    }


    // Geo Chart
    $scope.initGeoChart = function () {
        var chart1 = {};
        chart1.type = "GeoChart";
        chart1.data = [
            ['Country', 'Popularity'],
            ['Germany', 200],
            ['United States', 300],
            ['Brazil', 400],
            ['Canada', 500],
            ['France', 600],
            ['RU', 700]
        ];

        // Continent Example
        chart1.data = [
            ['Region Code', 'Continent', 'Popularity'],
            ['142', 'Pakistan', 200],
            ['150', 'Europe', 300],
            ['019', 'Americas', 400],
            ['009', 'Oceania', 600],
            ['002', 'Africa', 700]
        ];

        chart1.options = {
            height: 300,
            chartArea: {left: 10, top: 10, bottom: 0, height: "100%"},
            colorAxis: {colors: ['#aec7e8', '#1f77b4']},
            //resolution: 'continents', // For Continents
            displayMode: 'regions'
        };

        chart1.formatters = {
            number: [{
                columnNum: 1,
                pattern: "$ #,##0.00"
            }]
        };

        $scope.chart = chart1;
    }

    // Init Geo Chart
    //$scope.initGeoChart();

    // Reset Session Values
    common.resetSessionValues(['new_campaign_id', 'new_creative_id']);

    // Init End Campaign Options
    $scope.endCampaign = [
        {
            end_type: 'never',
            end_value: "",
            end_condition: "or",
            end_type_1: 'impressions',
            end_value_1: 0
        }
    ];

    // Init Visitor Capping
    $scope.visitorCapping = [
        {
            impression: 0,
            duration: 'hour',
            value: 0
        },
        {
            impression: 0,
            duration: 'minute',
            value: 0
        }
    ];

    // Init Campaign Capping
    $scope.campaignCapping = {
        value: 0,
        duration: 'hour'
    };

    //function to manage life stage value
    $scope.lifecyle_val = [];
    $scope.lifecycle_value = function (value) {

        //var lifecycle_value = common.http.get('languages/showall');
        if ($scope.lifecyle_val.indexOf(value) == -1) {
            $scope.lifecyle_val.push(value);
        } else {
            $scope.lifecyle_val.splice($scope.lifecyle_val.indexOf(value), 1);
        }
        console.log($scope.lifecyle_val);

    }

    $scope.show_lifestage = function (value) {

        if ($scope.lifecyle_val.indexOf(value) == -1) {
            //console.log('0'+value);
            return false;
        } else {
            //console.log('1'+value);
            return true;
        }
        //console.log($scope.lifecyle_val);

    }
    //function to manage gender value
    $scope.gender_val = $scope.targeting.gender;
    $scope.gendervalue = function (value) {

        if ($scope.gender_val.indexOf(value) == -1) {
            $scope.gender_val.push(value);
        } else {
            $scope.gender_val.splice($scope.gender_val.indexOf(value), 1);
        }
        console.log($scope.gender_val);


        ///posting here
        $scope.data = [];
        $scope.data = {tgc_value: $scope.gender_val, targeting_channel: '15', id: $scope.CampId};
        var saveAsTemplate = common.http.post('AdServer/AdCampaign/updateTargetRules', $scope.data);
        saveAsTemplate.then(
            function (response) {
                response = response.data;
                if (response.status) {
                    common.flashMsg('success', response.message);
                } else {
                    common.flashMsg('error', response.message);
                }
            }, function (reason) {
                common.flashMsg('error', 'Gender Target insertion failed.');
            }
        );


    }


    $scope.showGender_val = function (value) {

        if ($scope.gender_val.indexOf(value) == -1) {
            //console.log('0'+value);
            return false;
        } else {
            //console.log('1'+value);
            return true;
        }
        //console.log($scope.lifecyle_val);

    }


    //function to manage device types value
    $scope.devicetype_val = $scope.targeting.devices;
    $scope.devicetype = function (value) {

        if ($scope.devicetype_val.indexOf(value) == -1) {
            $scope.devicetype_val.push(value);
        } else {
            $scope.devicetype_val.splice($scope.devicetype_val.indexOf(value), 1);
        }
        ///posting here
        $scope.data = [];
        $scope.data = {tgc_value: $scope.devicetype_val, targeting_channel: '4', id: $scope.CampId};
        var saveAsTemplate = common.http.post('AdServer/AdCampaign/updateTargetRules', $scope.data);
        saveAsTemplate.then(
            function (response) {
                response = response.data;
                if (response.status) {
                    common.flashMsg('success', response.message);
                } else {
                    common.flashMsg('error', response.message);
                }
            }, function (reason) {
                common.flashMsg('error', 'Device Target insertion failed.');
            }
        );

        console.log($scope.devicetype_val);

    }
    //function to manage operating system value
    $scope.os_val = $scope.targeting.os;
    $scope.ostype = function (value) {

        if ($scope.os_val.indexOf(value) == -1) {
            $scope.os_val.push(value);
        } else {
            $scope.os_val.splice($scope.os_val.indexOf(value), 1);
        }
        ///posting here
        $scope.data = [];
        $scope.data = {tgc_value: $scope.os_val, targeting_channel: '5', id: $scope.CampId};
        var saveAsTemplate = common.http.post('AdServer/AdCampaign/updateTargetRules', $scope.data);
        saveAsTemplate.then(
            function (response) {
                response = response.data;
                if (response.status) {
                    common.flashMsg('success', response.message);
                } else {
                    common.flashMsg('error', response.message);
                }
            }, function (reason) {
                common.flashMsg('error', 'OS Target insertion failed.');
            }
        );

        console.log($scope.os_val);
    }
    //show selected os values
    $scope.show_os = function (value) {

        if ($scope.os_val.indexOf(value) == -1) {
            //console.log('0'+value);
            return false;
        } else {
            //console.log('1'+value);
            return true;
        }
        //console.log($scope.lifecyle_val);

    }

    //function to manage browsers value
    $scope.browser_val = $scope.targeting.browsers;
    $scope.selectBrowser = function (value) {

        if ($scope.browser_val.indexOf(value) == -1) {
            $scope.browser_val.push(value);
        } else {
            $scope.browser_val.splice($scope.browser_val.indexOf(value), 1);
        }
        ///posting here
        $scope.data = [];
        $scope.data = {tgc_value: $scope.browser_val, targeting_channel: '3', id: $scope.CampId};
        var saveAsTemplate = common.http.post('AdServer/AdCampaign/updateTargetRules', $scope.data);
        saveAsTemplate.then(
            function (response) {
                response = response.data;
                if (response.status) {
                    common.flashMsg('success', response.message);
                } else {
                    common.flashMsg('error', response.message);
                }
            }, function (reason) {
                common.flashMsg('error', 'Browser Target insertion failed.');
            }
        );


        console.log($scope.browser_val);

    }

    $scope.showBrowser_val = function (value) {

        if ($scope.browser_val.indexOf(value) == -1) {
            //console.log('0'+value);
            return false;
        } else {
            //console.log('1'+value);
            return true;
        }
        //console.log($scope.lifecyle_val);

    }


    //function to manage selected languages value
    $scope.lang_val = [];
    $scope.lang_id_val = $scope.targeting.languages;
    $scope.Language_sel = function (value, id) {

        if ($scope.lang_id_val.indexOf(id) == -1) {
            //$scope.lang_val.push(value);
            $scope.lang_id_val.push(id);
        } else {
            // $scope.lang_val.splice($scope.lang_val.indexOf(value), 1);
            $scope.lang_id_val.splice($scope.lang_id_val.indexOf(id), 1);
        }
        $scope.data = [];

        $scope.data = {tgc_value: $scope.lang_id_val, targeting_channel: '1', id: $scope.CampId};
        var saveAsTemplate = common.http.post('AdServer/AdCampaign/updateTargetRules', $scope.data);
        saveAsTemplate.then(
            function (response) {
                response = response.data;
                if (response.status) {
                    common.flashMsg('success', response.message);
                } else {
                    common.flashMsg('error', response.message);
                }
            }, function (reason) {
                common.flashMsg('error', 'Language Target Updation failed.');
            }
        );


        console.log($scope.lang_val);
        console.log($scope.lang_id_val);

    }
    // function to set age sliders
    $scope.setSlider = function (ts, min, max) {
        //alert(min+'=min ||| max=='+max);
        //alert($scope.targeting.age);
        $scope.slider.min = min;
        $scope.slider.max = max;
        var from = min;
        var to = max;
        var i;
        $('div').removeClass('importantRule');
        for (i = from; i <= to; i++) {
            $("#" + i).addClass('importantRule');
        }
        //$scope.filteriseSegment(from+'-'+to,'demographic','age');
        ///posting here
        $scope.data = [];
        $scope.data = {tgc_value: min + '-' + max, targeting_channel: '14',id: $scope.CampId};
        var saveAsTemplate = common.http.post('AdServer/AdCampaign/updateTargetRules', $scope.data);
        saveAsTemplate.then(
            function (response) {
                response = response.data;
                if (response.status) {
                    common.flashMsg('success', response.message);
                } else {
                    common.flashMsg('error', response.message);
                }
            }, function (reason) {
                common.flashMsg('error', 'Age Target Updation failed.');
            }
        );

    };


    ///function to post ip targetting

    $scope.post_ip_targetting = function (channel) {

        $scope.data = [];
        var tgc_var;
        if (channel == '7') {
            var tgc_var = $scope.addCampaign.ip_targeting_area_white;
            ;
        } else if (channel == '9') {
            var tgc_var = $scope.addCampaign.ip_targeting_area_black;
        }
        $scope.data = {tgc_value: tgc_var, targeting_channel: channel,id: $scope.CampId};
        var saveAsTemplate = common.http.post('AdServer/AdCampaign/updateTargetRules', $scope.data);
        saveAsTemplate.then(
            function (response) {
                response = response.data;
                if (response.status) {
                    common.flashMsg('success', response.message);
                } else {
                    common.flashMsg('error', response.message);
                }
            }, function (reason) {
                common.flashMsg('error', 'IP Target Updation failed.');
            }
        );


    };

    ///function to post domain targetting

    $scope.post_domain_targetting = function (channel) {

        $scope.data = [];
        var tgc_var;
        if (channel == '12') {
            var tgc_var = $scope.addCampaign.domain_targeting_area_white;
            ;
        } else if (channel == '13') {
            var tgc_var = $scope.addCampaign.domain_targeting_area_black;
        }
        $scope.data = {tgc_value: tgc_var, targeting_channel: channel,id: $scope.CampId};
        var saveAsTemplate = common.http.post('AdServer/AdCampaign/updateTargetRules', $scope.data);
        saveAsTemplate.then(
            function (response) {
                response = response.data;
                if (response.status) {
                    common.flashMsg('success', response.message);
                } else {
                    common.flashMsg('error', response.message);
                }
            }, function (reason) {
                common.flashMsg('error', 'Domain Target Updation failed.');
            }
        );


    };
    ///function to post url targetting

    $scope.post_url_targetting = function (channel) {

        $scope.data = [];
        var tgc_var;
        if (channel == '6') {
            var tgc_var = $scope.addCampaign.url_targeting_area_white;

        } else if (channel == '16') {
            var tgc_var = $scope.addCampaign.url_targeting_area_black;
        }


        $scope.data = {tgc_value: tgc_var, targeting_channel: channel, id: $scope.CampId};
        var saveAsTemplate = common.http.post('AdServer/AdCampaign/updateTargetRules', $scope.data);
        saveAsTemplate.then(
            function (response) {
                response = response.data;
                if (response.status) {
                    common.flashMsg('success', response.message);
                } else {
                    common.flashMsg('error', response.message);
                }
            }, function (reason) {
                common.flashMsg('error', 'URL Target Updation failed.');
            }
        );


    };


    // Add New Campaign Object
    $scope.addCampaign = {
        name: '',
        view_type: 1,
        campaign_type: 'Normal Campaign',
        campaign_weight: 60,
        duplicate: false,
        status: 1,
        finance_type: 'Select Option',
        // cpm
        cpm_finance_rate: 0,
        cpm_finance_budget: 0,
        // cpc
        cpc_finance_rate: 0,
        cpc_finance_budget: 0,
        // cpa
        cpa_finance_rate: 0,
        cpa_finance_budget: 0,
        // cpl
        cpl_finance_rate: 0,
        cpl_finance_budget: 0,
        // fixed
        budget_finance_rate: 0,
        budget_finance_budget: 0,

        // Schedule Tab --- Options
        start_date_type: "now",
        start_date: $filter('date')(new Date(), 'MM/dd/yyyy'),
        start_date_init: $filter('date')(new Date(), 'MM/dd/yyyy'),

        //end_campaign: [],
        end_campaign_type: "Please Select",
        end_campaign_value: 0,
        end_campaign_andor: 'AND',
        end_campaign_option: 'Please Select',


        end_campaign_date: $filter('date')(new Date(), 'MM/dd/yyyy'),
        end_date_init: $filter('date')(new Date(), 'MM/dd/yyyy'),

        visitor_capping: false,
        visitor_capping_value: [],
        visitor_capping_amount: 0,

        campaign_capping: false,
        campaign_capping_value: 'Please Select',
        campaign_capping_amount: 0,
        day_parting_name: "",
        day_parting: false,
        day_parting_type: "new",
        day_parting_value: "",
        gender: $scope.targeting.gender,
        selected_langs: $scope.targeting.languages,
        devices: $scope.targeting.devices,
        browsers: $scope.targeting.browsers,
        lifecycle: $scope.lifecyle_val,
        os: $scope.targeting.os,
        ip_targeting_area_white: $scope.targeting.ipwhite,
        ip_targeting_area_black: $scope.targeting.ipblack,
        url_targeting_area_black: $scope.targeting.urlblack,
        url_targeting_area_white: $scope.targeting.urlwhite,
        domain_targeting_area_white: $scope.targeting.domainwhite,
        domain_targeting_area_black: $scope.targeting.domainblack

    };

    $scope.checkExist = function (index, value) {
        if (index < 0) {
            return true;
        }

        if ($scope.endDate_counts[index].select_endDate == value) {
            return false;
        } else {
            return true;
        }
    }

    $scope.editMode = true;

    //$rafiq ---//add more End date row
    $scope.capaignperpage = 5;
    $scope.endDate_counts = [
        {value: 0, select_endDate: 'Please Select', andor: 'AND', date_val: ''}
    ];

    $scope.addMoreEnDate = function () {
        if ($scope.endDate_counts.length > 1) {
            return false;

        } else {
            $scope.endDate_counts.push(
                {value: 0, select_endDate: 'Please Select', andor: 'AND', date_val: ''}
            );
        }
    }

    $scope.RemoveMoreEnDate = function (index) {
        $scope.endDate_counts.splice(index, 1);
    }

    //------//add more Visitor Cap
    $scope.visitorcap_counts = [
        {value: 0, option: 'Please Select', andor: 'AND', amount: '0', impamount: '0'}
    ];

    $scope.addVisitorCap = function () {
        if ($scope.visitorcap_counts.length > 2) {
            return false;
        } else {
            $scope.visitorcap_counts.push(
                {value: 0, option: 'Please Select', andor: 'AND', amount: '0', impamount: '0'}
            );
        }
    }

    $scope.RemoveVisitorCap = function (index) {
        $scope.visitorcap_counts.splice(index, 1);
    }

    // Generate random color
    $scope.getRandomcolor = function () {
        $scope.randomcolor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
        if ($scope.randomColors.indexOf($scope.randomcolor) >= 0) {
            $scope.getRandomcolor();
        }
        return $scope.randomcolor;
    }

    // Init Day Parting Module
    $scope.initDayParting = function () {
        // Unique Colors Array
        $scope.randomColors = [];
        // Maximum Color limit
        $scope.dayPartLimit = 5;
        $scope.uniqIdentifyId = $scope.activeObjectIndex = 0;

        // INIT Day Parting Object
        $scope.daypartinput_counts = [
            {
                name: '',
                newcolor: $scope.getRandomcolor(),
                selected: true,
                identity: 100
            }
        ];

        /* Day Parting Init */
        $scope.dayMonday = [
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},

            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},

            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},

            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},

            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},

            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor}
        ];
        $scope.dayTuesday = [
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},

            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},

            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},

            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},

            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},

            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
        ];

        $scope.dayWednesday = [
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},

            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},

            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},

            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},

            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},

            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
        ];
        $scope.dayThursday = [
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},

            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},

            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},

            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},

            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},

            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
        ];

        $scope.dayFriday = [
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},

            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},

            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},

            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},

            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},

            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
        ];
        $scope.daySaturday = [
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},

            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},

            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},

            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},

            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},

            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
        ];

        $scope.daySunday = [
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},

            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},

            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},

            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},

            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},

            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
            {dayPartIdentifier: 0, value: 0, colorIs: $scope.daypartinput_counts[0].newcolor},
        ];
    }

    // Intialize Day Partings
    $scope.initDayParting();

    $scope.initDayPartingWithNew = function () {
        if ($scope.addCampaign.day_parting_type !== 'new') {
            $scope.addCampaign.day_parting_type = 'new';
            $scope.initDayParting();
        }
    }

    // Update Day Parting by Index & Day Name like (dayMonday)
    $scope.updateDayPartingByIndex = function (index, dayName) {
        $scope[dayName][index].colorIs = $scope.daypartinput_counts[$scope.activeObjectIndex].newcolor;
        if ($scope[dayName][index].value === 1) {
            $scope[dayName][index].value = 0;
            $scope[dayName][index].dayPartIdentifier = 0;
            return;
        }
        $scope[dayName][index].dayPartIdentifier = $scope.daypartinput_counts[$scope.activeObjectIndex].identity;
        $scope[dayName][index].value = 1;
    };

    // Add New Object
    $scope.addDaypartinput = function () {

        if ($scope.daypartinput_counts.length >= $scope.dayPartLimit) {
            return false;
        } else {
            var newId = $scope.daypartinput_counts[$scope.daypartinput_counts.length - 1].identity + 1;
            $scope.daypartinput_counts.push(
                {
                    name: '',
                    newcolor: $scope.getRandomcolor(),
                    selected: false,
                    identity: newId
                }
            );
        }
    }

    // Remove Content
    $scope.RemoveDaypartinput = function (index, identity) {
        $scope.daypartinput_counts.splice(index, 1);
        var allDays = ["dayMonday", "dayTuesday", "dayWednesday", "dayThursday", "dayFriday", "daySaturday", "daySunday"];
        angular.forEach(allDays, function (val, keyIs) {
            angular.forEach($scope[val], function (value, key) {
                if (parseInt(value['dayPartIdentifier']) == parseInt(identity)) {
                    $scope[val][key].dayPartIdentifier = 0;
                    $scope[val][key].value = 0;
                    $scope[val][key].colorIs = '#ffffff';
                }
            });
        });
    }

    // Active Color/Day Part
    $scope.activeDayPartIt = function (index) {
        angular.forEach($scope.daypartinput_counts, function (value, key) {
            value['selected'] = false;
        });

        $scope.daypartinput_counts[index].selected = true;
        $scope.activeObjectIndex = index;
    }

    // Save Day Parting as Template
    $scope.saveAsTemplate = function () {
        var multipleArrays = [
            $scope.dayMonday, $scope.dayTuesday, $scope.dayWednesday,
            $scope.dayThursday, $scope.dayFriday, $scope.daySaturday,
            $scope.daySunday
        ];
        var day_parting = [].concat.apply([], multipleArrays);
        //console.log(day_parting);
        //day_parting = day_parting.join();

        var data = {
            inputs: null,
            dayParting: angular.toJson(day_parting),
            parent_name: $scope.addCampaign.day_parting_name
        };
        data.input = angular.toJson($scope.daypartinput_counts);

        var saveAsTemplate = common.http.post('save/dayparting/template', data);
        saveAsTemplate.then(
            function (response) {
                response = response.data;
                if (response.status) {
                    common.flashMsg('success', response.message);
                } else {
                    common.flashMsg('error', response.message);
                }
            }, function (reason) {
                common.flashMsg('error', 'Day Parting insertion failed.');
            }
        );
    }

    // Choose Day Parting Template
    $scope.chooseTemplate = function (id) {
        var chooseTemp = common.http.get('dayparting/template/' + id);
        chooseTemp.then(
            function (result) {
                result = result.data;
                if (result.status) {
                    $scope.initDayParting();
                    var rules = result.data.rules;
                    $scope.daypartinput_counts = result.data.groups;
                    $scope.addCampaign.day_parting_name = result.data.template_name;
                    //rules = rules.split(",");
                    var arrays = [], size = (rules.length) / 7;
                    while (rules.length > 0)
                        arrays.push(rules.splice(0, size));

                    var allDays = ["dayMonday", "dayTuesday", "dayWednesday", "dayThursday", "dayFriday", "daySaturday", "daySunday"];
                    angular.forEach(allDays, function (val, keyIs) {
                        $scope[val] = arrays[keyIs];
                    });

                } else {
                    common.flashMsg('error', response.message);
                }

            }, function (err) {
                common.flashMsg('error', 'Template not found.');
            }
        );
    }

    // Use to Show Selected Values - According to type
    $scope.showSelectedValue = function (type) {
        if ($scope.editMode) {
            return false;
        }

        if (type == 'CampaignType') {
            angular.element('.selectedCTypeIs').addClass('showContent').prev('p.nc_campaignType_boxText').addClass('hideContent');
        } else if (type == 'CampaignTier') {
            angular.element('.selectedCampaignTierIs').addClass('showContent').prev('p.nc_campaignType_boxText').addClass('hideContent');
        } else if (type == 'ContentTypeCrtv') {
            angular.element('.selectedContentTypeCrtvIs').addClass('showContent').prev('p.nc_campaignType_boxText').addClass('hideContent');
        }
    }

    // Get Day Parting Groups for Current Campaign
    $scope.dayPartGroups = [];
    $scope.getDayPartingGroupsByID = function () {
        common.http.get('latest/dayparting').then(
            function (response) {
                response = response.data;
                if (response.status) {
                    $scope.dayPartGroups = response.data.dayParts;
                    console.log($scope.dayPartGroups);
                }
            },
            function (data) {
                // Handle error here
                $scope.loadingData = false;
            }
        );
    };

    // If User clicked on 'Check' Sign
    $scope.saveChangesMsg = 'Save Changes';
    $scope.saveChanges = function (whichContent, event) {

        if (!angular.element('.' + whichContent).hasClass('editing')) {
            return false;
        }

        var element = angular.element(event.currentTarget);
        if (element.hasClass('fa-pencil')) {
            // If User is already in Edit Mode
            if ($scope.editMode) {
                return false;
            }

            element.addClass('fa-check').removeClass('fa-pencil');
            $scope.editMode = true;
            //$rafiq
            if (whichContent == 'StartDate') {
                angular.element('.setStartDateHere').removeClass('disableContent');
                angular.element('.sch_startDate_immediately_radiosOut').removeClass('hideContent');
                angular.element('.sch_startDate_immediately_radiosOut').addClass('showContent');

                angular.element('.sch_startDate_after_slct_date').removeClass('showContent');
                angular.element('.sch_startDate_after_slct_date').addClass('hideContent');
            }
            if (whichContent == 'EndDate') {
                angular.element('.endDateHere').removeClass('disableContent');
                angular.element('.sch_endDate_opsAmount_apended').removeClass('hideContent');
                angular.element('.sch_endDate_opsAmount_apended').addClass('showContent');

                angular.element('.sch_endDate_after_slct_data').removeClass('showContent');
                angular.element('.sch_endDate_after_slct_data').addClass('hideContent');
            }
            if (whichContent == 'VisitorCapping') {
                angular.element('.cappingView').removeClass('disableContent');
                angular.element('.cappingCheck').removeClass('disableContent');
                angular.element('.cappingEdit').removeClass('disableContent');

                angular.element('.cappingCheck').removeClass('hideContent');
                angular.element('.cappingCheck').addClass('showContent');

                angular.element('.cappingEdit').removeClass('hideContent');
                angular.element('.cappingEdit').addClass('showContent');


                angular.element('.cappingView').removeClass('showContent');
                angular.element('.cappingView').addClass('hideContent');
            }

            if (whichContent == 'CampaignCapping') {
                angular.element('.CampCappingEdit').removeClass('disableContent');
                angular.element('.CampCappingCheck').removeClass('disableContent');
                angular.element('.CampCappingView').removeClass('disableContent');


                angular.element('.CampCappingCheck').removeClass('hideContent');
                angular.element('.CampCappingCheck').addClass('showContent');

                angular.element('.CampCappingEdit').removeClass('hideContent');
                angular.element('.CampCappingEdit').addClass('showContent');


                angular.element('.CampCappingView').removeClass('showContent');
                angular.element('.CampCappingView').addClass('hideContent');
            }

            //shahidrafiqhere77
            if (whichContent == 'TargetGender') {
                angular.element('.target_gender_popShow_out').removeClass('hideContent');
                angular.element('.target_gender_popShow_out').addClass('showContent');
                angular.element('.showAftrSelected').addClass('showContent').removeClass('hideContent');
                angular.element('.targetGenderText').removeClass('hideContent').addClass('showContent');
            }
            if (whichContent == 'LifestageTarget') {
                angular.element('.target_lifeStage_popShow_out').addClass('showContent');
                angular.element('.trgtLifestage_afterSlctd').removeClass('showContent').addClass('hideContent');
                angular.element('.LifestageText').removeClass('hideContent').addClass('showContent');

            }
            if (whichContent == 'browserTarget') {
                angular.element('.targetbrowsers').removeClass('hideContent');
                angular.element('.targetbrowsers').addClass('showContent');
                // angular.element('.show_selected_browsers').removeClass('showContent').addClass('hideContent');
                angular.element('.browserText').removeClass('hideContent').addClass('showContent');

            }
            if (whichContent == 'deviceTarget') {
                angular.element('.devicebox').removeClass('disableContent');

            }
            if (whichContent == 'domainTarget') {
                angular.element('.domainbox').removeClass('disableContent');

            }
            if (whichContent == 'ipTarget') {
                angular.element('.ipbox').removeClass('disableContent');

            }
            if (whichContent == 'urlTarget') {
                angular.element('.urlbox').removeClass('disableContent');

            }
            if (whichContent == 'osTarget') {
                angular.element('.trgt_optngSystm_popShow_out').removeClass('hideContent');
                angular.element('.trgt_optngSystm_popShow_out').addClass('showContent');
                //angular.element('.os_after_selected').removeClass('showContent').addClass('hideContent');
                angular.element('.os_Text').removeClass('hideContent').addClass('showContent');

            }
            if (whichContent == 'geoTarget') {
                angular.element('.geoLoc').removeClass('disableContent');

            }
            if (whichContent == 'ageTarget') {

                angular.element('.ageBox').removeClass('disableContent');
            }


            // Enable Campaign Weight - if Edit Clicked
            if (whichContent == 'CampaignWeight') {
                angular.element('.setWeightHere').removeClass('disableContent');
            } else if (whichContent == 'CampaignFinance') {
                angular.element('.setFinanceHere').removeClass('disableContent');
            } else if (whichContent == 'DayParting') {
                angular.element('.setDayPartingHere').removeClass('disableContent');
            } else if (whichContent == 'CreativeDimension') {
                angular.element('.aftrDimensionSelected').removeClass('showContent').addClass('hideContent');
                angular.element('.selectDimensionCrtv').removeClass('hideContent').removeClass('disableContent');
            } else if (whichContent == 'RunCreative') {
                angular.element('.aftrSlctDayParting').removeClass('showContent').addClass('hideContent');
                angular.element('.slctDayPrting').removeClass('hideContent').removeClass('disableContent');
                $scope.getDayPartingGroupsByID();
            } else if (whichContent == 'LandingPageUrl' || whichContent == 'CreativeName' || whichContent == 'CampaignName') {
                angular.element('.' + whichContent).find('input[type="text"]').removeClass('disableContent');
            } else if (whichContent == 'CustomParamsCrtv') {
                angular.element('.putCustomParams').removeClass('disableContent');
            } else if (whichContent == 'TargetLang') {

                angular.element('.slectLang').removeClass('disableContent').removeClass('hideContent');
                angular.element('.showSlectedLang').addClass('hideContent').removeClass('showContent');
            } else if (whichContent == 'UploadArtWork') {
                angular.element('.uploadCrtv').removeClass('hideContent').addClass('showContent');
                angular.element('.aftrUploadCrtv').addClass('hideContent').removeClass('showContent');
            }
        } else {

            element.addClass('fa-pencil').removeClass('fa-check');
            $scope.editMode = false;

            // Show Selected Content Here By type
            if (whichContent == 'CampaignType' || whichContent == 'ContentTypeCrtv') {
                $scope.showSelectedValue(whichContent);
            } else if (whichContent == 'CampaignTier') {
                $scope.showSelectedValue('CampaignTier');
            } else if (whichContent == 'CampaignWeight') {
                // Disabled Campaign Weight - if Checked Clicked
                angular.element('.setWeightHere').addClass('disableContent');
            } else if (whichContent == 'CampaignFinance') {
                angular.element('.setFinanceHere').addClass('disableContent');
            } else if (whichContent == 'DayParting') {
                angular.element('.setDayPartingHere').addClass('disableContent');
            }



            ///$rafiq ---schedule data showing
            //if(whichContent == 'StartDate')
            //if(whichContent == 'EndDate')
            //if(whichContent == 'VisitorCapping')
            //if(whichContent == 'CampaignCapping')
            //if(whichContent == 'DayParting')
            else if (whichContent == 'StartDate') {
                angular.element('.setStartDateHere').addClass('disableContent');
                angular.element('.sch_startDate_immediately_radiosOut').removeClass('showContent');
                //angular.element('.sch_startDate_immediately_radiosOut').removeClass('disableContent');
                angular.element('.sch_startDate_immediately_radiosOut').addClass('hideContent');

                angular.element('.sch_startDate_after_slct_date').removeClass('hideContent');
                angular.element('.sch_startDate_after_slct_date').addClass('showContent');

                //alert($scope.addCampaign.start_date_type);
                if ($scope.addCampaign.start_date_type != 'now') {
                    $scope.addCampaign.start_date = $('#datepicker_radio_hidden').val();
                }
                //alert($scope.addCampaign.start_date);
                //   $scope.day =  $filter('formatDateWithTime')($scope.addCampaign.start_date, 'day')
                $scope.day_start = $filter('date')(new Date($scope.addCampaign.start_date), 'dd');
                $scope.month_start = $filter('date')(new Date($scope.addCampaign.start_date), 'MMM');
                $scope.year_start = $filter('date')(new Date($scope.addCampaign.start_date), 'yyyy');


            }
            else if (whichContent == 'EndDate') {
                angular.element('.endDateHere').addClass('disableContent');
                angular.element('.sch_endDate_opsAmount_apended').removeClass('showContent');
                angular.element('.sch_endDate_opsAmount_apended').addClass('hideContent');
                angular.element('.sch_endDate_after_slct_data').removeClass('hideContent');
                angular.element('.sch_endDate_after_slct_data').addClass('showContent');
                var length_counts = $scope.endDate_counts.length;
                $scope.first_date = $('.sch_endDate_opsAmount_apended').find('.dating').val();
                /*if(length_counts== 1){
                 $scope.first_date =  $('.sch_endDate_opsAmount_apended').find('.dating').val();
                 }else{
                 // $scope.first_date =  $('.sch_endDate_opsAmount_apended').closest('input').find('.dating').val();
                 $scope.first_date =  $('.sch_endDate_opsAmount_apended').find('.dating').val();
                 //$scope.second_date =  $('.sch_endDate_opsAmount_apended').find('.dating:last').val();
                 }*/

            }

            else if (whichContent == 'VisitorCapping') {
                angular.element('.cappingEdit').addClass('disableContent');
                angular.element('.cappingCheck').addClass('disableContent');
                angular.element('.cappingView').addClass('disableContent');

                angular.element('.cappingCheck').removeClass('showContent');
                angular.element('.cappingCheck').addClass('hideContent');

                angular.element('.cappingEdit').removeClass('showContent');
                angular.element('.cappingEdit').addClass('hideContent');


                angular.element('.cappingView').removeClass('hideContent');
                angular.element('.cappingView').addClass('showContent');

            }

            else if (whichContent == 'CampaignCapping') {
                angular.element('.CampCappingEdit').addClass('disableContent');
                angular.element('.CampCappingCheck').addClass('disableContent');
                angular.element('.CampCappingView').addClass('disableContent');

                angular.element('.CampCappingCheck').removeClass('showContent');
                angular.element('.CampCappingCheck').addClass('hideContent');

                angular.element('.CampCappingEdit').removeClass('showContent');
                angular.element('.CampCappingEdit').addClass('hideContent');

                angular.element('.CampCappingView').removeClass('hideContent');
                angular.element('.CampCappingView').addClass('showContent');
            } else if (whichContent == 'TargetGender') {
                angular.element('.target_gender_popShow_out').removeClass('showContent');
                angular.element('.target_gender_popShow_out').addClass('hideContent');
                angular.element('.showAftrSelected').removeClass('hideContent').addClass('showContent');
                angular.element('.targetGenderText').addClass('hideContent').removeClass('showContent');
            }
            else if (whichContent == 'LifestageTarget') {
                angular.element('.target_lifeStage_popShow_out').removeClass('showContent');
                angular.element('.target_lifeStage_popShow_out').addClass('hideContent');
                angular.element('.trgtLifestage_afterSlctd').removeClass('hideContent').addClass('showContent');
                angular.element('.LifestageText').addClass('hideContent').removeClass('showContent');
            } else if (whichContent == 'CreativeDimension') {
                angular.element('.aftrDimensionSelected').removeClass('hideContent').addClass('showContent');
                angular.element('.selectDimensionCrtv').addClass('hideContent');
            } else if (whichContent == 'RunCreative') {
                angular.element('.aftrSlctDayParting').removeClass('hideContent').addClass('showContent');
                angular.element('.slctDayPrting').addClass('hideContent');
            } else if (whichContent == 'LandingPageUrl' || whichContent == 'CreativeName' || whichContent == 'CampaignName') {
                angular.element('.' + whichContent).find('input[type="text"]').addClass('disableContent');
            } else if (whichContent == 'CustomParamsCrtv') {
                angular.element('.putCustomParams').addClass('disableContent');
            } else if (whichContent == 'deviceTarget') {
                angular.element('.devicebox').addClass('disableContent');
            } else if (whichContent == 'domainTarget') {
                angular.element('.domainbox').addClass('disableContent');

            } else if (whichContent == 'ipTarget') {
                angular.element('.ipbox').addClass('disableContent');

            } else if (whichContent == 'urlTarget') {
                angular.element('.urlbox').addClass('disableContent');
            }
            else if (whichContent == 'osTarget') {
                angular.element('.trgt_optngSystm_popShow_out').removeClass('showContent');
                angular.element('.trgt_optngSystm_popShow_out').addClass('hideContent');
                angular.element('.os_after_selected').removeClass('hideContent').addClass('showContent');
                angular.element('.os_Text').addClass('hideContent').removeClass('showContent');
            } else if (whichContent == 'browserTarget') {
                angular.element('.targetbrowsers').removeClass('showContent');
                angular.element('.targetbrowsers').addClass('hideContent');
                angular.element('.show_selected_browsers').removeClass('hideContent').addClass('showContent');
                angular.element('.browserText').addClass('hideContent').removeClass('showContent');
            } else if (whichContent == 'TargetLang') {

                angular.element('.slectLang').addClass('disableContent').addClass('hideContent');
                angular.element('.showSlectedLang').removeClass('hideContent').addClass('showContent');
            } else if (whichContent == 'UploadArtWork') {
                angular.element('.uploadCrtv').addClass('hideContent').removeClass('showContent');
                angular.element('.aftrUploadCrtv').removeClass('hideContent').addClass('showContent');
            } else if (whichContent == 'geoTarget') {
                angular.element('.geoLoc').addClass('disableContent');

            } else if (whichContent == 'ageTarget') {
                angular.element('.ageBox').addClass('disableContent');

            }

        }

        // Show Extra Content Below
        if (whichContent == 'CampaignType' || whichContent == 'CampaignTier' || whichContent == 'ContentTypeCrtv') {
            var activeElement = angular.element('.active_focus');
            var classToManipluate = activeElement.attr('data-class');
            classToManipluate = angular.element('.' + classToManipluate);
            (classToManipluate.hasClass('showContent')) ? classToManipluate.removeClass('showContent').addClass('hideContent')
                : classToManipluate.addClass('showContent').removeClass('hideContent');
        }
    }

    // Go To Module
    $scope.goToModule = function (toActive, value) {
        //angular.element('.' + value).trigger('click');

        angular.element(".addCamp_accordian_showOut").stop().slideUp(500);
        angular.element('.' + value).parents(".addCamp_accordian_out").find(".addCamp_accordian_showOut").stop().slideDown(500, function () {

            var backTo_top_poswe = $(this).parents(".addCamp_accordian_out")
                .find(".addCamp_accordian_title").offset().top;
            $("html, body").animate({scrollTop: backTo_top_poswe}, 1000);
        });

        angular.element(".addCamp_accordian_title").removeClass("active");
        angular.element('.' + value).parents(".addCamp_accordian_out").find(".addCamp_accordian_title").addClass("active");

        angular.element('.crtv_menuSticky_menu ul li a').removeClass('active');
        angular.element('.copaignLanding_banerTabs ul li a').removeClass('active');
        angular.element('.' + toActive).addClass('active');
    }

    // Go To Active Module
    $scope.activeClass = function (toActive) {
        angular.element('.crtv_menuSticky_menu ul li a').removeClass('active');
        angular.element('.copaignLanding_banerTabs ul li a').removeClass('active');
        angular.element('.' + toActive).addClass('active');
    }

    // Validate finance Values
    $scope.validateFinanceValue = function () {
        var isValid = true;
        var toCheckRate = $scope.addCampaign.finance_type + "_finance_rate";
        var toCheckBudget = $scope.addCampaign.finance_type + "_finance_budget";
        if ($scope.addCampaign[toCheckRate] <= 0) {
            angular.element('#' + toCheckRate).addClass('fieldError');
            isValid = false;
        }

        if ($scope.addCampaign[toCheckBudget] <= 0) {
            angular.element('#' + toCheckBudget).addClass('fieldError');
            isValid = false;
        }

        return isValid;
    };

    // Save Campaign By Type
    $scope.activeSchedule = false; // Disabled Schedule Step
    $scope.targetStep = false; // Disabled Schedule Step
    $scope.creativeStep = false; // Disabled Schedule Step
    $scope.saveCampaign = function (type) {
        if (type == 'info') {
            // Save View Type in Session for future use
            sharedProperties.setProperty('viewType', $scope.addCampaign.view_type);

            var saveCamp = common.http.post('campaign/save/info', $scope.addCampaign);
            saveCamp.then(
                function (response) {
                    response = response.data;
                    if (response.status) {
                        //angular.element('.continueToSchedule').trigger('click');
                        $scope.goToModule('iAmSchedule', 'continueToSchedule');
                        common.flashMsg('success', response.message + ' View type is:' + sharedProperties.getProperty('viewType'));
                    } else {
                        common.flashMsg('error', response.message);
                    }
                }, function (reason) {
                    common.flashMsg('error', 'Campaign insertion failed.');
                }
            );
        } else if (type == 'schedule') {
            // Save View Type in Session for future use
            sharedProperties.setProperty('viewType', $scope.addCampaign.view_type);

            if ($scope.addCampaign.start_date_type == 'user') {
                var start_camp_date = $('#datepicker_radio_hidden').val();
            } else {
                start_camp_date = new Date();
            }


            $scope.addCampaign.start_date = start_camp_date;
            var date_inputed = $('.dating').val();

            $scope.endDate_counts.date_val = date_inputed;
            //shahidrafiqhere
            angular.forEach($scope.endDate_counts, function (value, key) {
                if (value['select_endDate'] == 'Date') {
                    value['value'] = date_inputed;
                }
            });
            $scope.addCampaign.endCamaign = $scope.endDate_counts;
            $scope.addCampaign.vCaping = $scope.visitorcap_counts;


//            return false;
            // Save Day Parting if DayParting is Activate
            if ($scope.addCampaign.day_parting) {
                var multipleArrays = [
                    $scope.dayMonday, $scope.dayTuesday, $scope.dayWednesday,
                    $scope.dayThursday, $scope.dayFriday, $scope.daySaturday,
                    $scope.daySunday
                ];
                var day_parting = [].concat.apply([], multipleArrays);
                day_parting = day_parting.join();
                $scope.addCampaign.day_parting_value = day_parting;
            }

            // Check if Visitor Capping is On
            if ($scope.addCampaign.visitor_capping) {
                $scope.addCampaign.visitor_capping_value = angular.toJson($scope.visitorCapping);
            }

            // Check if Campaign Capping is On
            if ($scope.addCampaign.campaign_capping) {
                $scope.addCampaign.campaign_capping_value = angular.toJson($scope.campaignCapping);
            }

            var multipleArrays = [
                $scope.dayMonday, $scope.dayTuesday, $scope.dayWednesday,
                $scope.dayThursday, $scope.dayFriday, $scope.daySaturday,
                $scope.daySunday
            ];
            var day_parting = [].concat.apply([], multipleArrays);
            //console.log(day_parting);
            //day_parting = day_parting.join();

            var data = {
                inputs: null,
                dayParting: angular.toJson(day_parting),
                parent_name: $scope.addCampaign.day_parting_name
            };
            data.input = angular.toJson($scope.daypartinput_counts);

            $scope.addCampaign.saveDayPart = data;

            //$scope.addCampaign.end_campaign = angular.toJson($scope.endCampaign);
            $scope.addCampaign.campID = $scope.CampId;
            var saveSchedule = common.http.post('campaign/save/schedule', $scope.addCampaign);
            saveSchedule.then(
                function (response) {
                    response = response.data;
                    $scope.targetStep = true;
                    $scope.goToModule('iAmTarget', 'continueToTarget');
                    if (response.status) {
                        common.flashMsg('success', response.message);

                    } else {
                        common.flashMsg('error', response.message);
                    }
                }, function (reason) {
                    common.flashMsg('error', 'Campaign insertion failed.');
                }
            );
        } else if (type == 'target') {
            $scope.creativeStep = true;
            angular.element('#activeCreative').trigger('click');
        }
    };

    // Get All Ad Types
    $scope.getAdTypes = [];
    $scope.ready = false;
    $scope.getDayPartTemplates = function () {
        var campaigns = common.http.get('templates/dayparting');
        campaigns.then(
            function (response) {
                response = response.data;
                if (response.status) {
                    $scope.ready = true;
                    $scope.dayPartTemplates = response.data.templates;
                    console.log($scope.dayPartTemplates);
                }
            },
            function (data) {
                // Handle error here
                $scope.loadingData = false;
                $scope.dayPartTemplates = [];
                common.flashMsg('error', 'Day Parting not found. Error..!');
            }
        );
    };

    // Get Day Parting Templates
    $scope.getAllAdTypes = function () {
        var campaigns = common.http.get('campaign/ad_types');
        campaigns.then(
            function (response) {
                response = response.data;
                if (response.status) {
                    $scope.ready = true;
                    $scope.getAdTypes = response.ad_types;
                    $scope.adTypesLength = $scope.getAdTypes.length - 1;
                }
            },
            function (data) {
                // Handle error here
                $scope.loadingData = false;
                common.flashMsg('error', 'Ad Types not found.Please reload page to retry.');
            }
        );
    };

    // Get View Type Name by ID
    $scope.getNameByTypeId = function (id) {
        var viewType = (id !== null) ? id : $scope.addCampaign.view_type;
        var viewTypeName = '';
        angular.forEach($scope.getAdTypes, function (value, key) {
            if (parseInt(value['id']) == parseInt(viewType)) {
                viewTypeName = value['name'];
            }
        });
        return viewTypeName;
    };

    // Update Start Value
    $scope.updateStartValue = function () {
        if ($scope.addCampaign.start_date_type == 'now') {
            $scope.addCampaign.start_date_type = 'custom';
        } else {
            $scope.addCampaign.start_date_type = 'now';
        }
    };

    // Update End Value
    $scope.updateEndValue = function () {
        if ($scope.addCampaign.end_campaign_type == 'never') {
            $scope.addCampaign.end_campaign_type = 'impressions';
        } else {
            $scope.addCampaign.end_campaign_type = 'never';
        }
    };

    // Load All Ad Types
    $scope.getAllAdTypes();

    // Load All Template
    $scope.getDayPartTemplates();

    //-----------------------------Add New Creative --------------------------//

    // INIT Add Creative - Allow Multiple Creatives
    // INIT Creative Data
    $scope.addCreative = {
        name: '',
        duplicate: 'new',
        duplicateWith: '',
        creative_type: 2,
        creative_data: "",
        creative_data_url: "",
        landingUrl: "",
        dimension: 1,
        dayPartGroupID: null,
        redirect_url_popup: "",
        video_url: "",
        creative_options: {
            count_clicks_html: false,
            count_clicks_zip: true,
            autoplay_video_yt: false,
            start_muted_video: false,
            autorepeat_video: false,
            showcontrols_video: false,
            autoplay_video: false,

            // Slider View Type options
            slider_animate_type: 'slide',
            slider_animate_interval: 2000,
            slider_animate_time: 2000,
            slider_pause_mouseover: false,
            slider_show_control: false,

            // Video View Type options
            video_type: 'mp4',
            video_width: '',
            video_height: '',
            video_duration_hh: '',
            video_duration_mm: '',
            video_duration_ss: ''

        },
        custom_parameters: [
            {
                key: '',
                value: ''
            },
            {
                key: '',
                value: ''
            }

        ],
        sliderUrl: [
            {url: ''},
            {url: ''}
        ]
    };
    $scope.addCreativeList = [
        $scope.addCreative
    ];

    // Possible Duplicate Creative List
    $scope.getCreativeListByViewType = function (viewType) {
        $scope.duplicateCreativeList = [];
        $scope.addCreative.duplicateWith = '';
        angular.element(".chooseDuplicateCrtive").addClass("btnDisabled");
        angular.element(".duplicateCreative").find("span").text("Select Creative");
        var creatives = common.http.get('creative/viewtype?id=' + viewType);
        creatives.then(
            function (response) {
                response = response.data;
                if (response.status) {
                    $scope.duplicateCreativeList = response.data;
                } else {
                    $scope.duplicateCreativeList = [];
                }
                if ($scope.duplicateCreativeList.length > 0) {
                    angular.element(".duplicateCreative").find("span").text("Select Creative");
                } else {
                    angular.element(".duplicateCreative").find("span").text("No Creative found");
                }
            },
            function (data) {
                // Handle error here
                $scope.duplicateCreativeList = [];
            }
        );
    }

    // Load Creatives Based on View Type
    $scope.getCreativeListByViewType($scope.addCampaign.view_type);

    // Choose Creative Option - New/Duplicate
    $scope.newCreativeType = function () {
        if ($scope.addCreative.duplicate == "new") {
            angular.element(".chooseDuplicateCrtive").removeClass("btnDisabled");
            var name = $scope.addCreative.name;
            var duplicate = $scope.addCreative.duplicate;

            // INIT Creative Data
            $scope.addCreative = {
                name: name,
                duplicate: duplicate,
                duplicateWith: '',
                creative_type: 2,
                creative_data: "",
                creative_data_url: "",
                landingUrl: "",
                dimension: "",
                redirect_url_popup: "",
                video_url: "",
                creative_options: {
                    count_clicks_html: false,
                    count_clicks_zip: true,
                    autoplay_video_yt: false,
                    start_muted_video: false,
                    autorepeat_video: false,
                    showcontrols_video: false,
                    autoplay_video: false,

                    // Slider View Type options
                    slider_animate_type: 'slide',
                    slider_animate_interval: 2000,
                    slider_animate_time: 2000,
                    slider_pause_mouseover: false,
                    slider_show_control: false,

                    // Video View Type options
                    video_type: 'mp4',
                    video_width: '',
                    video_height: '',
                    video_duration_hh: '',
                    video_duration_mm: '',
                    video_duration_ss: ''

                },
                custom_parameters: [
                    {
                        key: '',
                        value: ''
                    },
                    {
                        key: '',
                        value: ''
                    }

                ],
                sliderUrl: [
                    {url: ''},
                    {url: ''}
                ]
            };

            if ($scope.campaignViewType === 6) {
                $scope.addCreative.creative_type = 8;
            } else if ($scope.campaignViewType === 9) {
                $scope.addCreative.creative_type = 9;
            } else if ($scope.campaignViewType === 5) {
                $scope.addCreative.creative_type = 7;
            } else {
                $scope.addCreative.creative_type = 2;
            }
        } else {
            if ($scope.addCreative.duplicateWith == '') {
                angular.element(".chooseDuplicateCrtive").addClass("btnDisabled");
            }
        }
    }

    // Reset Dropzone files
    $scope.resetDropZoneJs = function () {
        myDropzone.removeAllFiles();
        videoDropzone.removeAllFiles();
        htmlDropzone.removeAllFiles();
    }

    //$scope.campaignViewType = parseInt(sharedProperties.getProperty('viewType'));
    $scope.campaignViewType = 1;
    var parentCrtv = $scope.addCreative;
    if ($scope.campaignViewType === 6) {
        parentCrtv.creative_type = 8; // Slider
    } else if ($scope.campaignViewType === 9) {
        parentCrtv.creative_type = 9; // Video Type Campaign
    } else if ($scope.campaignViewType === 5) {
        parentCrtv.creative_type = 7; // Popup Type Campaign
    } else {
        parentCrtv.creative_type = 2;
    }

    // Update View type and Change View base on Creative Type/View Type
    $scope.changeViewType = function (id) {
        $scope.addCampaign.view_type = parseInt(id);
        $scope.campaignViewType = parseInt(id);

        $scope.getCreativeListByViewType($scope.addCampaign.view_type);
    }

    // Add More Creative - it will redirect to first step
    $scope.addMoreCreative = function () {

        $scope.resetDropZoneJs();
        angular.element('.topToAddNew').trigger('click');

        // Reset Upload Art Work
        angular.element('.aftrUploadCrtv').addClass('hideContent').removeClass('showContent');
        angular.element('.uploadCrtv').addClass('showContent').removeClass('hideContent');
        angular.element('.divUploadCrtv').addClass('hideContent').removeClass('showContent');

        // INIT Creative Data
        $scope.addCreative = {
            name: '',
            duplicate: 'new',
            duplicateWith: '',
            creative_type: 2,
            creative_data: "",
            creative_data_url: "",
            landingUrl: "",
            dimension: 1,
            dayPartGroupID: null,
            redirect_url_popup: "",
            video_url: "",
            creative_options: {
                count_clicks_html: false,
                count_clicks_zip: true,
                autoplay_video_yt: false,
                start_muted_video: false,
                autorepeat_video: false,
                showcontrols_video: false,
                autoplay_video: false,

                // Slider View Type options
                slider_animate_type: 'slide',
                slider_animate_interval: 2000,
                slider_animate_time: 2000,
                slider_pause_mouseover: false,
                slider_show_control: false,

                // Video View Type options
                video_type: 'mp4',
                video_width: '',
                video_height: '',
                video_duration_hh: '',
                video_duration_mm: '',
                video_duration_ss: ''

            },
            custom_parameters: [
                {
                    key: '',
                    value: ''
                },
                {
                    key: '',
                    value: ''
                }

            ],
            sliderUrl: [
                {url: ''},
                {url: ''}
            ]
        };

        $scope.campaignViewType = 1;
        if ($scope.campaignViewType === 6) {
            $scope.addCreative.creative_type = 8; // Slider
        } else if ($scope.campaignViewType === 9) {
            $scope.addCreative.creative_type = 9; // Video Type Campaign
        } else if ($scope.campaignViewType === 5) {
            $scope.addCreative.creative_type = 7; // Popup Type Campaign
        } else {
            $scope.addCreative.creative_type = 2;
        }

        // Show Selected Option in Span Tag
        $timeout(function () {
            var srchFiltr_val = angular.element('.showslected').find(":selected").text();
            if (angular.element('.showslected').hasClass('showText')) {
                srchFiltr_val = angular.element('.showslected').find(":selected").text();
            }
            angular.element('.showslected').parent().find("span").text(srchFiltr_val);
        }, 1200);

        $scope.changeViewType($scope.addCampaign.view_type);
        common.resetSessionValues(['new_creative_id']);

    };

    // Save Creative
    $scope.savedPrevious = false; // hide Add More Creative Button
    $scope.saveCreative = function (addMore) {
        var tstCreative = $scope.addCreative;
        $scope.addMoreCrtv = addMore;
        if (tstCreative.creative_type == 2) {
            tstCreative.creative_data = angular.element('#UploadCreativeImage').val();
        } else if (tstCreative.creative_type == 5) {
            tstCreative.creative_data = angular.element('#htmlCreative').val();
        } else if (tstCreative.creative_type == 1) {
            tstCreative.creative_data = angular.element('#UploadCreativeHtmlZip').val();
        } else if (tstCreative.creative_type == 6) {
            tstCreative.creative_data = angular.element('#ytVideoUrl').val();
        } else if ($scope.addCreativeList[0].creative_type == 3) {
            tstCreative.creative_data = angular.element('#UploadCreativeVideo').val();
        }

        tstCreative.custom_parameters = angular.toJson(tstCreative.custom_parameters);
        tstCreative.sliderUrl = angular.toJson(tstCreative.sliderUrl);
        var saveCreative = common.http.post('creative/save', tstCreative);
        saveCreative.then(
            function (response) {
                $scope.savedPrevious = true;
                response = response.data;
                if (response.status) {
                    common.flashMsg('success', response.message);
                    if ($scope.addMoreCrtv) {
                        $scope.addMoreCreative();
                    } else {
                        $location.path('#!/campaigns');
                    }
                } else {
                    common.flashMsg('error', response.message);
                }
            }, function (reason) {
                common.flashMsg('error', 'Creative insertion failed.');
            }
        );
    };

    // Add More Custom Parameters
    $scope.addMoreCP = function () {
        $scope.addCreative.custom_parameters.push({
            key: '',
            value: ''
        });
    };

    // Remove Custom Parameters
    $scope.removeCP = function (index) {
        $scope.addCreative.custom_parameters.splice(index, 1);
    };


    // Reset Dropzone files
    $scope.resetDropZoneJs = function () {
        myDropzone.removeAllFiles();
        videoDropzone.removeAllFiles();
        htmlDropzone.removeAllFiles();
    }

    // Call if User Duplicating Creative & Map with Object
    $scope.editCreative = function (id) {
        $scope.resetDropZoneJs();
        var creative = common.http.get('creative/id/' + id);
        creative.then(
            function (response) {
                response = response.data;

                if (response.status) {
                    $scope.editCreativeData = response.data;

                    var name = $scope.addCreative.name;
                    var duplicate = $scope.addCreative.duplicate;
                    $scope.addCreative = {
                        editId: id,
                        name: name,
                        duplicate: duplicate,
                        creative_type: parseInt(response.data.creative_type),
                        creative_data: "",
                        creative_data_url: "",
                        landingUrl: response.data.landing_page_url,
                        dimension: response.data.dimension_id,
                        redirect_url_popup: "",
                        video_url: "",
                        creative_options: {
                            count_clicks_html: false,
                            count_clicks_zip: false,

                            autoplay_video_yt: false,

                            start_muted_video: false,
                            autorepeat_video: false,
                            showcontrols_video: false,
                            autoplay_video: false,

                            // Slider View Type options
                            slider_animate_type: 'slide',
                            slider_animate_interval: 2000,
                            slider_animate_time: 2000,
                            slider_pause_mouseover: false,
                            slider_show_control: false,

                            // Video View Type options
                            video_type: 'mp4',
                            video_width: '',
                            video_height: '',
                            video_duration_hh: '',
                            video_duration_mm: '',
                            video_duration_ss: ''

                        },
                        custom_parameters: [
                            {
                                key: '',
                                value: ''
                            },
                            {
                                key: '',
                                value: ''
                            }

                        ],
                        sliderUrl: [
                            {url: ''},
                            {url: ''}
                        ]
                    };

                    if ($scope.campaignViewType === 6) {
                        $scope.addCreative.creative_type = 8;
                    } else if ($scope.campaignViewType === 9) {
                        $scope.addCreative.creative_type = 9;
                    } else if ($scope.campaignViewType === 5) {
                        $scope.addCreative.creative_type = 7;
                    }

                    if ($scope.addCreative.creative_type == AdPortalConfig.BANNER_IMAGE) {
                        // png,jpg,gif Type
                        angular.element('#preloadImgType').val('banner');
                        angular.element('#preloadImgName').val(response.data.CreativeContent);
                        $scope.addCreative.creative_data = response.data.CreativeContent;
                        image_name = response.data.CreativeContent;
                        angular.element('#preloadImgNow').trigger("click");
                        angular.element('#UploadCreativeImage').val(response.data.CreativeContent);
                    } else if ($scope.addCreative.creative_type == AdPortalConfig.HTML_CODE) {
                        // HTML Code
                        angular.element('#htmlCreative').val(response.data.CreativeContent);
                        $scope.addCreative.creative_data = response.data.CreativeContent;
                    } else if ($scope.addCreative.creative_type == AdPortalConfig.HTML_ZIP) {
                        // HTML Type
                        angular.element('#preloadImgType').val('html');
                        angular.element('#preloadImgName').val(response.data.CreativeContent);
                        $scope.addCreative.creative_data = response.data.CreativeContent;
                        html_image_name = response.data.CreativeContent;
                        angular.element('#UploadCreativeHtmlZip').val(response.data.CreativeContent);
                        angular.element('#preloadImgNow').trigger("click");
                    } else if ($scope.addCreative.creative_type == AdPortalConfig.VIDEO_URL) {
                        // Youtube URL Video
                        angular.element('#ytVideoUrl').val(response.data.CreativeContent);
                        $scope.addCreative.creative_data = angular.element('#ytVideoUrl').val();
                    } else if ($scope.addCreative.creative_type == AdPortalConfig.VIDEO_UPLOAD) {
                        // Video Type
                        angular.element('#preloadImgType').val('video');
                        angular.element('#preloadImgName').val(response.data.CreativeContent);
                        $scope.addCreative.creative_data = response.data.CreativeContent;
                        video_image_name = response.data.CreativeContent;
                        angular.element('#UploadCreativeVideo').val(response.data.CreativeContent);
                        angular.element('#preloadImgNow').trigger("click");
                    } else if ($scope.addCreative.creative_type == AdPortalConfig.VIDEO_TYPE_CAMPAIGN) {
                        // Video Type Campaign
                        $scope.addCreative.video_url = response.data.CreativeContent;
                    } else if ($scope.addCreative.creative_type == AdPortalConfig.POPUP) {
                        // Popup Creative
                        $scope.addCreative.redirect_url_popup = response.data.CreativeContent;
                    } else if ($scope.addCreative.creative_type == AdPortalConfig.SLIDER_TYPE_CAMPAIGN) {
                        // Slider Creative
                        var getContents = common.http.get('creative/content/' + id);
                        getContents.then(
                            function (responseSlider) {
                                responseSlider = responseSlider.data;
                                if (responseSlider.status) {
                                    $scope.addCreative.sliderUrl = [];
                                    angular.forEach(responseSlider.data, function (value, key) {
                                        $scope.addCreative.sliderUrl.push({
                                            url: value['content']
                                        });
                                    });
                                }
                            }
                        );
                    }

                    // init Custom Parameters - if not Empty
                    var toArr = response.data.custom_params;
                    toArr = toArr.split("&");
                    if (toArr.length > 0) {
                        var dumm = [];
                        for (var i = 0; i < toArr.length; i++) {
                            var tst = toArr[i].split('=');
                            dumm.push({
                                key: tst[0],
                                value: tst[1]
                            });
                        }
                        $scope.addCreative.custom_parameters = dumm;
                    }


                    // --------- Update Slider Options
                    if ($scope.addCreative.creative_type == AdPortalConfig.SLIDER_TYPE_CAMPAIGN) {

                        var sliderOptions = angular.fromJson(response.data.CreativeOption);
                        // Slider View Type options
                        $scope.addCreative.creative_options.slider_animate_type = sliderOptions.animation_type;
                        $scope.addCreative.creative_options.slider_animate_interval = sliderOptions.animation_interval;
                        $scope.addCreative.creative_options.slider_animate_time = sliderOptions.interval;
                        $scope.addCreative.creative_options.slider_pause_mouseover = sliderOptions.pause_on_mover;
                        $scope.addCreative.creative_options.slider_show_control = sliderOptions.show_controls;
                    } else if ($scope.addCreative.creative_type == AdPortalConfig.VIDEO_TYPE_CAMPAIGN) {
                        var videoOptions = angular.fromJson(response.data.CreativeOption);
                        // Video View Type options
                        $scope.addCreative.creative_options.video_type = videoOptions.type;
                        $scope.addCreative.creative_options.video_width = videoOptions.width;
                        $scope.addCreative.creative_options.video_height = videoOptions.height;
                        $scope.addCreative.creative_options.video_duration_hh = videoOptions.hour;
                        $scope.addCreative.creative_options.video_duration_mm = videoOptions.minutes;
                        $scope.addCreative.creative_options.video_duration_ss = videoOptions.seconds;
                    } else if ($scope.addCreative.creative_type == AdPortalConfig.HTML_ZIP) {
                        var htmlZipOptions = angular.fromJson(response.data.CreativeOption);
                        $scope.addCreative.creative_options.count_clicks_zip = htmlZipOptions.clicks_on_count;
                    } else if ($scope.addCreative.creative_type == AdPortalConfig.HTML_CODE) {
                        // INIT Html Creative Options
                        var htmlCodeOptions = angular.fromJson(response.data.CreativeOption);
                        $scope.addCreative.creative_options.count_clicks_html = htmlCodeOptions.clicks_on_count;
                    } else if ($scope.addCreative.creative_type == AdPortalConfig.VIDEO_UPLOAD) {
                        // INIT Video Creative Options
                        var videoOptions = angular.fromJson(response.data.CreativeOption);
                        $scope.addCreative.creative_options.start_muted_video = videoOptions.muted;
                        $scope.addCreative.creative_options.autorepeat_video = videoOptions.loop;
                        $scope.addCreative.creative_options.showcontrols_video = videoOptions.controls;
                        $scope.addCreative.creative_options.autoplay_video = videoOptions.autoplay;
                    } else if ($scope.addCreative.creative_type == AdPortalConfig.VIDEO_URL) {
                        // INIT Video Type Campaign Options
                        var videoUrlOptions = angular.fromJson(response.data.CreativeOption);
                        $scope.addCreative.creative_options.autoplay_video_yt = videoUrlOptions.autoplay;
                    }

                    // Show Selected Option in Span Tag
                    $timeout(function () {
                        var srchFiltr_val = angular.element('.showslected').find(":selected").text();
                        if (angular.element('.showslected').hasClass('showText')) {
                            srchFiltr_val = angular.element('.showslected').find(":selected").text();
                        }
                        angular.element('.showslected').parent().find("span").text(srchFiltr_val);
                    }, 1200);

                }
            },
            function (data) {
                // Handle error here
                $scope.loadingData = false;
                common.flashMsg('error', 'Creative detail not found.');
            }
        );
    }

    // Duplicate Creative With ID,Name
    $scope.duplicateWith = function (id, name) {
        angular.element(".chooseDuplicateCrtive").removeClass("btnDisabled");
        $scope.addCreative.duplicateWith = id;
        $scope.editCreative(id);
    }

    // Add More Slider Url
    $scope.addMoreSliderUrl = function () {
        $scope.addCreative.sliderUrl.push({
            url: ''
        });
    };

    // Get Campaign By ID
    $scope.getCampaignById = function (id) {
        var website = common.http.get('campaign/id/' + id);
        website.then(
            function (response) {
                response = response.data;
                if (response.status) {
                    $scope.editCampaign = response.data.campaign[0];
                    $scope.campaignViewType = parseInt($scope.editCampaign.view_type);

                    $scope.addCampaign = {
                        edit_id: common.decryptUrlParameter($routeParams.id),
                        name: $scope.editCampaign.name,
                        view_type: parseInt($scope.editCampaign.view_type),
                        campaign_type: $scope.editCampaign.type,
                        campaign_weight: parseInt($scope.editCampaign.camp_weight),
                        duplicate: false,
                        status: 1,
                        finance_type: $scope.editCampaign.finance_type,
                        // cpm
                        cpm_finance_rate: ($scope.editCampaign.finance_type == 'cpm') ? $scope.editCampaign.finance_rate : '',
                        cpm_finance_budget: ($scope.editCampaign.finance_type == 'cpm') ? $scope.editCampaign.finance_value : '',
                        // cpc
                        cpc_finance_rate: ($scope.editCampaign.finance_type == 'cpc') ? $scope.editCampaign.finance_rate : '',
                        cpc_finance_budget: ($scope.editCampaign.finance_type == 'cpc') ? $scope.editCampaign.finance_value : '',
                        // cpa
                        cpa_finance_rate: ($scope.editCampaign.finance_type == 'cpa') ? $scope.editCampaign.finance_rate : '',
                        cpa_finance_budget: ($scope.editCampaign.finance_type == 'cpa') ? $scope.editCampaign.finance_value : '',
                        // cpl
                        cpl_finance_rate: ($scope.editCampaign.finance_type == 'cpl') ? $scope.editCampaign.finance_rate : '',
                        cpl_finance_budget: ($scope.editCampaign.finance_type == 'cpl') ? $scope.editCampaign.finance_value : '',
                        // fixed
                        budget_finance_rate: ($scope.editCampaign.finance_type == 'budget') ? $scope.editCampaign.finance_rate : '',
                        budget_finance_budget: ($scope.editCampaign.finance_type == 'budget') ? $scope.editCampaign.finance_value : '',

                        // Schedule Tab --- Options
                        start_date_type: "custom",
                        start_date: $scope.editCampaign.start_date_format,
                        start_date_init: $scope.editCampaign.start_date_format,

                        //end_campaign: [],
                        end_campaign_type: $scope.editCampaign.end_camp_type,
                        end_campaign_value: ($scope.editCampaign.end_camp_type !== 'datetime' && $scope.editCampaign.end_camp_type !== 'never') ? $scope.editCampaign.end_camp_value : 0,
                        end_campaign_date: ($scope.editCampaign.end_camp_type == 'datetime') ? $filter('date')($scope.editCampaign.end_date_format, 'MM/dd/yyyy') : $filter('date')(new Date(), 'MM/dd/yyyy'),
                        end_date_init: ($scope.editCampaign.end_camp_type == 'datetime') ? $filter('date')($scope.editCampaign.end_date_format, 'MM/dd/yyyy') : $filter('date')(new Date(), 'MM/dd/yyyy'),

                        visitor_capping: (parseInt($scope.editCampaign.visitor_cap) > 0) ? true : false,
                        visitor_capping_value: [],

                        campaign_capping: (parseInt($scope.editCampaign.campaign_cap) > 0) ? true : false,
                        campaign_capping_value: {},

                        day_parting: false,
                        day_parting_value: ""
                    };

                    if ($scope.campaignViewType === 6) {
                        $scope.addCreative.creative_type = 8;
                    } else if ($scope.campaignViewType === 9) {
                        $scope.addCreative.creative_type = 9;
                    } else if ($scope.campaignViewType === 5) {
                        $scope.addCreative.creative_type = 7;
                    } else {
                        $scope.addCreative.creative_type = 2;
                    }

                    // Init Campaign Capping
                    if ($scope.addCampaign.campaign_capping) {
                        // Init Campaign Capping
                        var splitCCapping = $scope.editCampaign.camp_capping_value.split(",");
                        $scope.campaignCapping = {
                            value: parseInt(splitCCapping[0]),
                            duration: splitCCapping[1]
                        };
                    }

                    if ($scope.addCampaign.visitor_capping) {
                        $scope.getVisitorCappingData(id);
                    }

                    // Load Day Parting
                    //$scope.getDayParting();
                }
            },
            function (data) {
                // Handle error here
                $scope.loadingData = false;
                common.flashMsg('error', 'campaigns: Error Occurred');
            }
        );
    };

    // get Creative by Campaign ID
    $scope.getCreativeByCampID = function () {
        var getCreative = common.http.post('creative/list', {campaignID: common.decryptUrlParameter($routeParams.id)});
        getCreative.then(
            function (response) {
                response = response.data;
                if (response.status) {
                    $scope.creativeDatalist = response.data;
                    $scope.filteredItems = $scope.creativeDatalist.length;
                }
            },
            function (data) {
                // Handle error here
                common.flashMsg('error', 'Creative not found');
            }
        );
    }

    // Init Creative Types - Image etc
    $scope.creativeTypes = [
        {
            id: 2,
            name: "Image",
            class: "crtv_uploadPic_circleIcon1"
        },
        {
            id: 5,
            name: "HTML Document",
            class: "crtv_uploadPic_circleIcon2"
        },
        {
            id: 1,
            name: "HTML5 Zip Archive",
            class: "crtv_uploadPic_circleIcon3"
        },
        {
            id: 6,
            name: "YouTube Video",
            class: "crtv_uploadPic_circleIcon4"
        },
        {
            id: 3,
            name: "Video Ad",
            class: "crtv_uploadPic_circleIcon5"
        }
    ];

    // Get View Type Name by ID
    $scope.getCreativeNameById = function (id) {
        var viewTypeName = '';
        angular.forEach($scope.creativeTypes, function (value, key) {
            if (value['id'] == parseInt(id)) {
                viewTypeName = value['name'];
            }
        });
        return viewTypeName;
    };

    // Get All Dimensions
    $scope.getCreativeDimensions = function () {
        var Zones = common.http.get('creative/dimensions');
        Zones.then(
            function (response) {
                response = response.data;
                if (response.status) {
                    $scope.DimesnionList = response.dimension;

                }
            },
            function (data) {
                // Handle error here
                $scope.loadingData = false;
                common.flashMsg('error', 'Dimensions list not found.');
            }
        );
    };
    $scope.getCreativeDimensions();

    // Get Creative
    $scope.getCreativeByCampID();
    // Get Campaign By Id
    $scope.getCampaignById(common.decryptUrlParameter($routeParams.id));
}]);