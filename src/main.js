import $ from 'jquery';
import asSpinner from './asSpinner';
import info from './info';

const NAMESPACE = 'asSpinner';
const OtherAsSpinner = $.fn.asSpinner;

const jQueryAsSpinner = function(options, ...args) {
  if (typeof options === 'string') {
    const method = options;

    if (/^_/.test(method)) {
      return false;
    } else if ((/^(get)/.test(method))) {
      const instance = this.first().data(NAMESPACE);
      if (instance && typeof instance[method] === 'function') {
        return instance[method](...args);
      }
    } else {
      return this.each(function() {
        const instance = $.data(this, NAMESPACE);
        if (instance && typeof instance[method] === 'function') {
          instance[method](...args);
        }
      });
    }
  }

  return this.each(function() {
    if (!$(this).data(NAMESPACE)) {
      $(this).data(NAMESPACE, new asSpinner(this, options));
    }
  });
};

$.fn.asSpinner = jQueryAsSpinner;

$.asSpinner = $.extend({
  setDefaults: asSpinner.setDefaults,
  noConflict: function() {
    $.fn.asSpinner = OtherAsSpinner;
    return jQueryAsSpinner;
  }
}, info);
