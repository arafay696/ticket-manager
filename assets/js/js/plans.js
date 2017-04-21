$(function() {
  var self, setPrices;
  self = this;
  setPrices = function(term) {
    return $('.pricing-options > .pricing-option').each(function() {
      var str;
      str = (PLANS[$(this).attr('data-plan')]['terms'][term]['price'] / 100 / term).toFixed(2);
      return $(this).find('.price-text').html('$' + parseFloat(str));
    });
  };
  setPrices(12);
  $('#term-options .btn').click(function() {
    var term;
    term = $(this).attr('data-term');
    return setPrices(term);
  });
  return $('.pricing-button').click(function(event) {
    var plan, term;
    event.preventDefault();
    plan = $(this).closest('.pricing-option').attr('data-plan');
    term = $('#term-options .btn.active').attr('data-term');
    window.location = '/plans/signup/' + plan + '/' + term;
    return false;
  });
});
