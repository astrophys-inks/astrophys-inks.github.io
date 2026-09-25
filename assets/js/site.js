(function () {
  var config = window.siteConfig || {};
  document.querySelectorAll('[data-link]').forEach(function (link) {
    var key = link.dataset.link, url = config[key];
    if (!url || !/^https:\/\//i.test(url)) return;
    link.href = url;
    link.hidden = false;
    link.removeAttribute('aria-disabled');
    if (key === 'instagram') link.setAttribute('aria-label', 'Instagram');
    var notice = document.querySelector('[data-notice="' + key + '"]');
    if (notice) notice.textContent = 'Use the link below to ' + ({booking:'request a booking',waitlist:'join the waitlist',merch:'visit the shop'}[key]) + '.';
    var form = document.querySelector('[data-form="' + key + '"]');
    if (form) form.hidden = true;
  });
  document.querySelectorAll('[data-form]').forEach(function (form) {
    var key = form.dataset.form;
    var endpoint = (config.formEndpoints || {})[key];
    if (!endpoint || !/^https:\/\//i.test(endpoint)) {
      form.addEventListener('submit', function (event) { event.preventDefault(); });
      return;
    }
    form.action = endpoint;
    form.method = 'post';
    var button = form.querySelector('[type="submit"]');
    button.disabled = false;
    var label = {contact:'Send message',booking:'Send booking request',waitlist:'Join waitlist'}[key];
    if (button.tagName === 'INPUT') button.value = label; else button.textContent = label;
    if (!form.hidden) document.querySelector('[data-notice="' + key + '"]').textContent = 'Complete the form below to send your request.';
  });
})();
