var AccountView, AccountViewRouter,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

AccountViewRouter = (function(superClass) {
  extend(AccountViewRouter, superClass);

  function AccountViewRouter() {
    return AccountViewRouter.__super__.constructor.apply(this, arguments);
  }

  AccountViewRouter.prototype.routes = {
    'dash/account/:tab': 'showTab'
  };

  return AccountViewRouter;

})(Backbone.Router);

AccountView = (function(superClass) {
  extend(AccountView, superClass);

  function AccountView() {
    return AccountView.__super__.constructor.apply(this, arguments);
  }

  AccountView.prototype.initialize = function() {
    var changeTab, self;
    self = this;
    this.router = new AccountViewRouter;
    this.router.on('route:showTab', (function(_this) {
      return function(tab) {
        console.log('Showing tab', tab);
        return _this.showTab(tab);
      };
    })(this));
    changeTab = function(name) {
      if ($('#account-modal .tab.' + name)) {
        return $('#account-modal .tab.' + name).click();
      }
    };
    $('#account-modal .tab').click(function() {
      var href;
      $('#account-modal .sidebar .tab').removeClass('selected');
      $(this).addClass('selected');
      href = $('a', this).attr('href');
      $('#account-modal .content').removeClass('selected');
      $('#account-modal .content.' + href).addClass('selected');
      $('#save-button').attr('form', 'update-' + href + '-form');
      if (href === 'billing') {
        $('#save-button').addClass('hidden');
      } else {
        $('#save-button').removeClass('hidden');
      }
      return false;
    });
    $('#save-button').click((function(_this) {
      return function() {
        var data;
        $('#save-button').addClass('disabled');
        data = $('#update-account-form').serialize();
        $.ajax({
          url: '/account/update/',
          data: data,
          success: function(response) {
            $('#save-button').removeClass('disabled');
            if ('error' in response) {
              return _this.setResponseText(true, response['error']);
            } else {
              _this.setResponseText(false);
              if ('name_changed' in response) {
                return $('#account-dropdown .dropdown-toggle .user-name').html(' ' + $('[name=first_name]').val() + ' ' + $('[name=last_name]').val());
              }
            }
          },
          type: 'POST',
          dataType: 'json'
        });
        return false;
      };
    })(this));
    return $('#update-payment-info').click(function() {
      $('#update-payment-pane').toggleClass('hidden');
      $('#save-button').toggleClass('hidden');
      return false;
    });
  };

  AccountView.prototype.setResponseText = function(error, message) {
    var text;
    text = $('#response-text');
    clearTimeout(window.Account.waitTimeout);
    text.addClass('hidden');
    if (error) {
      if (!message) {
        message = 'There was an error updating your information';
      }
      text.css('color', '#B02220');
    } else {
      if (!message) {
        message = 'All changes saved';
      }
      text.css('color', '#40973C');
    }
    text.html(message);
    text.fadeIn(10);
    text.removeClass('hidden');
    return window.Account.waitTimeout = setTimeout(function() {
      return text.fadeOut(300, function() {
        return text.addClass('hidden');
      });
    }, 3000);
  };

  AccountView.prototype.showTab = function(tab, message) {
    $('#account-modal').modal('show');
    if ($('#account-modal .tab.' + tab).length) {
      $('#account-modal .tab.' + tab).click();
    }
    if (message) {
      return $('#account-modal .content.selected').find('.message').show().html(message);
    }
  };

  return AccountView;

})(Backbone.View);

window.Account = new AccountView();
