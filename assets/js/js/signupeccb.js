var SignupView,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

SignupView = (function(superClass) {
  extend(SignupView, superClass);

  function SignupView() {
    this.processSignupFormResponse = bind(this.processSignupFormResponse, this);
    return SignupView.__super__.constructor.apply(this, arguments);
  }

  SignupView.prototype.getPlanPrice = function(term) {
    return parseFloat(PLAN['terms'][term]['price']) / 100;
  };

  SignupView.prototype.initialize = function() {
    var initialize, self, updateCardChargeInfo;
    self = this;
    this.percentOff = 0.0;
    updateCardChargeInfo = function() {
      var price, term;
      term = $('[name="billing-term"]').val();
      price = self.getPlanPrice(term);
      $('#payment-total').html('$' + (price * (1 - self.percentOff)).toFixed(2));
      if (self.percentOff > 0.0) {
        $('#payment-without-coupon').html('$' + price.toFixed(2));
      } else {
        $('#payment-without-coupon').html('');
      }
      return $('#recur-month').html(term + (term > 1 ? ' months' : ' month'));
    };
    initialize = function() {
      $('.plan-name b').html(PLAN['name']);
      self.signupTimeout = null;
      if ('terms' in PLAN) {
        $('#signup .payment-term [name="billing-term"]').val(PLAN_TERM);
        console.log(PLAN_TERM);
        $('#signup .payment-term [name="billing-term"] option').each(function() {
          var parts, price, term;
          term = $(this).val();
          price = (self.getPlanPrice(term) / term).toFixed();
          parts = $(this).html().split("$");
          return $(this).html(parts[0] + '$' + price + parts[1]);
        });
        updateCardChargeInfo();
      }
      return $('form:not(.filter) :input:visible:first').focus();
    };
    initialize();
    $('[name="billing-term"]').change(function() {
      return updateCardChargeInfo();
    });
    $('#signup .account-info .signup-login').click(function() {
      var modal;
      modal = $('#login-modal');
      modal.find('[name="redirect"]').remove();
      return modal.append('<input name="redirect" type="hidden" value="' + window.location.href + '"></input>');
    });
    $('#apply-coupon').click((function(_this) {
      return function() {
        var couponCode;
        $('#apply-coupon-container .loading-indicator').removeClass('hidden');
        self.setResponseText('');
        couponCode = $('#signup-form').find('[name="coupon"]').val();
        $.ajax({
          type: 'GET',
          dataType: 'json',
          data: {
            'code': couponCode
          },
          url: '/plans/coupon',
          error: function() {
            self.setResponseText('Unable to process coupon. Please <a class="error-link" href="mailto:support@jetstrap.com?subject="Coupon_Processing_Error" target="_blank">contact support</a>');
            $('#apply-coupon-container .loading-indicator').addClass('hidden');
            return self.percentOff = 0.0;
          },
          success: function(result) {
            if ('error' in result) {
              self.setResponseText(result['error']);
              self.percentOff = 0.0;
              updateCardChargeInfo();
            } else if ('percent_off' in result) {
              self.setResponseText('');
              self.percentOff = parseFloat(result['percent_off']) / 100;
              updateCardChargeInfo();
            }
            return $('#apply-coupon-container .loading-indicator').addClass('hidden');
          }
        });
        return false;
      };
    })(this));
    return $('#signup-form').submit((function(_this) {
      return function() {
        var form$, response;
        self.signupTimeout = window.setTimeout(function() {
          return $('.submit .loading-indicator').removeClass('hidden');
        }, 400);
        self.setResponseText('');
        if (PAID_PLAN) {
          form$ = $('#signup-form');
          Stripe.createToken({
            number: form$.find('.card-number').val(),
            cvc: form$.find('.card-cvc').val(),
            exp_month: form$.find('.card-expiry-month').val(),
            exp_year: form$.find('.card-expiry-year').val()
          }, self.processSignupFormResponse);
        } else {
          response = {};
          self.processSignupFormResponse(null, response);
        }
        return false;
      };
    })(this));
  };

  SignupView.prototype.processSignupFormResponse = function(status, response) {
    var form$, self, token;
    self = this;
    form$ = $('#signup-form');
    if (indexOf.call(response, 'error') >= 0) {
      window.clearTimeout(self.signupTimeout);
      $('.submit .loading-indicator').addClass('hidden');
      self.setResponseText(response.error.message);
      return;
    }
    token = null;
    form$.find('[name="stripeToken"]').remove();
    form$.find('[name="plan"]').remove();
    if (PAID_PLAN) {
      token = response['id'];
      form$.append("<input type='hidden' name='stripeToken' value='" + token + "'/>");
      form$.append("<input type='hidden' name='plan' value='" + PLAN['id'] + "-" + $('[name="billing-term"]').val() + "'/>");
    } else {
      form$.append("<input type='hidden' name='plan' value='" + PLAN['id'] + "'/>");
    }
    return $.ajax({
      type: 'POST',
      dataType: 'json',
      data: form$.serialize(),
      url: '/handlers/account-plan',
      error: function() {
        window.clearTimeout(self.signupTimeout);
        $('.submit .loading-indicator').addClass('hidden');
        return self.setResponseText('Unable to process payment. Please <a class="error-link" href="mailto:support@jetstrap.com?subject="Payment_Processing_Error" target="_blank">contact support</a>');
      },
      success: (function(_this) {
        return function(result) {
          window.clearTimeout(self.signupTimeout);
          $('.submit .loading-indicator').addClass('hidden');
          if ('error' in result) {
            return self.setResponseText(result['error']);
          } else if (result.status === 'success') {
            self.setResponseText('');
            form$.get(0).reset();
            return window.location.href = "/dash";
          }
        };
      })(this)
    });
  };

  SignupView.prototype.setResponseText = function(message) {
    var text;
    text = $('#response-text');
    text.html(message);
    if (message === '') {
      return text.addClass('hidden');
    } else {
      return text.removeClass('hidden');
    }
  };

  return SignupView;

})(Backbone.View);

window.Signup = new SignupView();
