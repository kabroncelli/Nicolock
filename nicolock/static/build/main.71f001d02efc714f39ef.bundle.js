webpackJsonp([5],{

/***/ 431:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(205);

var _general = __webpack_require__(633);

var _general2 = _interopRequireDefault(_general);

var _productDetail = __webpack_require__(634);

var _productDetail2 = _interopRequireDefault(_productDetail);

var _share = __webpack_require__(635);

var _share2 = _interopRequireDefault(_share);

var _downloadSpecs = __webpack_require__(636);

var _downloadSpecs2 = _interopRequireDefault(_downloadSpecs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _general2.default)(); // js

(0, _productDetail2.default)();
(0, _share2.default)();
(0, _downloadSpecs2.default)();

/***/ }),

/***/ 633:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jquery = __webpack_require__(93);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var general = function general() {
  (0, _jquery2.default)(function () {
    if (localStorage.getItem('Login')) {
      (0, _jquery2.default)('.lk-content').append('<div class="alert alert-success">You have successfully logged in.</div>');
      localStorage.removeItem('Login');
    }

    (0, _jquery2.default)('.modal-trigger').click(function (e) {
      e.preventDefault();
      var view = (0, _jquery2.default)(this).attr('data-authentication');
      if (view === 'logout') {
        (0, _jquery2.default)('.modal-container').addClass('position-' + view);
      }
      (0, _jquery2.default)('.modal-wrap').addClass('is-visible');
    });

    (0, _jquery2.default)('.modal-transition').click(function (e) {
      e.preventDefault();
      var view = (0, _jquery2.default)(this).attr('data-authentication');
      if (view === 'register') {
        (0, _jquery2.default)('.modal-container').removeClass('position-login');
        (0, _jquery2.default)('.modal-container').addClass('position-' + view);
      }
      if (view === 'login') {
        (0, _jquery2.default)('.modal-container').removeClass('position-register position-reset');
        (0, _jquery2.default)('.modal-container').addClass('position-' + view);
      }
      if (view === 'reset') {
        (0, _jquery2.default)('.modal-container').addClass('position-' + view);
      }
    });

    (0, _jquery2.default)('.modal .trigger-close').click(function (e) {
      e.preventDefault();
      (0, _jquery2.default)('.modal-wrap').removeClass('is-visible');
      (0, _jquery2.default)('.modal-container').removeClass('position-register position-reset');
      (0, _jquery2.default)('.modal-container').addClass('position-login');
    });

    (0, _jquery2.default)('.nav-trigger').click(function (e) {
      e.preventDefault();
      (0, _jquery2.default)('body').toggleClass('show-menu');
    });

    (0, _jquery2.default)('nav .trigger-close').click(function (e) {
      e.preventDefault();
      (0, _jquery2.default)('body').toggleClass('show-menu');
    });

    (0, _jquery2.default)(document).mouseup(function (e) {
      var menuContainer = (0, _jquery2.default)('.menu-wrap');
      var downloadContainer = (0, _jquery2.default)('.download-modal');
      if (!menuContainer.is(e.target) && menuContainer.has(e.target).length === 0) {
        menuContainer.removeClass('is-visible');
      }
      if (!downloadContainer.is(e.target) && downloadContainer.has(e.target).length === 0) {
        (0, _jquery2.default)('.download-modal-wrap').removeClass('is-visible');
      }
    });

    (0, _jquery2.default)('.desktop.menu-wrap .trigger-close').click(function (e) {
      e.preventDefault();
      (0, _jquery2.default)('.desktop.menu-wrap').toggleClass('is-visible');
    });

    (0, _jquery2.default)('.trifold-menu-trigger').click(function (e) {
      e.preventDefault();
      (0, _jquery2.default)('.trifold-detail, .trifold-sidebar').toggleClass('show-sidebar');
      (0, _jquery2.default)('body').toggleClass('has-sidebar');
    });

    (0, _jquery2.default)('.bifold-content .trifold-menu-trigger').click(function (e) {
      e.preventDefault();
      (0, _jquery2.default)('.bifold-content, .bifold-sidebar').toggleClass('show-sidebar');
      (0, _jquery2.default)('body').toggleClass('has-sidebar');
    });

    // MISC MENU STUFF
    function setActiveMenu() {
      var pageUrl = window.location.pathname;
      var regExp = /[^/]+/g;
      var match = pageUrl.match(regExp);
      var param1 = '';
      if (match && match.length > 1) {
        param1 = match[1].replace('-', ' ');
      } else {
        param1 = '';
      }
      var param2;
      if (match && match.length > 2) {
        param2 = match[2].replace('-', ' ');
      } else {
        param2 = '';
      }
      (0, _jquery2.default)('.misc-menu-category .parent').each(function (i, link) {
        if (param1) {
          if ((0, _jquery2.default)(link).text().toLowerCase() === param1) {
            (0, _jquery2.default)(link).parent('.misc-menu-category').addClass('is-active');
            (0, _jquery2.default)(link).siblings('.misc-menu-child').slideDown();
            (0, _jquery2.default)(link).siblings('.misc-menu-child').children('li').each(function (i, childLink) {
              if (childLink.innerText.toLowerCase() === param2) {
                (0, _jquery2.default)(childLink).children('.child').addClass('is-active');
                return false;
              }
            });
            return false;
          }
        }
      });
    }

    setActiveMenu();

    (0, _jquery2.default)('.misc-menu-category.has-children .parent').click(function (e) {
      e.preventDefault();
      if ((0, _jquery2.default)(this).parent('.misc-menu-category').hasClass('is-active')) {
        (0, _jquery2.default)(this).siblings('.misc-menu-child').slideUp();
      } else {
        (0, _jquery2.default)(this).siblings('.misc-menu-child').slideDown();
      }
      (0, _jquery2.default)(this).parent('.misc-menu-category').toggleClass('is-active');
    });
  });
};

exports.default = general;

/***/ }),

/***/ 634:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jquery = __webpack_require__(93);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var productDetail = function productDetail() {
  (0, _jquery2.default)(function () {
    (0, _jquery2.default)('.product-section .title').click(function (e) {
      e.preventDefault();
      (0, _jquery2.default)(this).parent('.product-section').toggleClass('is-active');
      (0, _jquery2.default)(this).siblings('.product-section-content').slideToggle();
    });

    // grab the width and calculate left value
    var itemWidth = (0, _jquery2.default)('.product-image-shelf-container .product-thumbnail-wrap').outerWidth() + 10;
    var leftValue = itemWidth * -1;
    var trackContainer = (0, _jquery2.default)('.product-image-shelf-container').width();
    var trackWidth = (0, _jquery2.default)('.product-thumbnail-wrap').length * itemWidth;

    // move the last item before first item, just in case user click prev button
    if (trackWidth > trackContainer) {
      (0, _jquery2.default)('.product-thumbnail-wrap:first').before((0, _jquery2.default)('.product-thumbnail-wrap:last'));
      // set the default item to the correct position
      (0, _jquery2.default)('.product-image-shelf-container').css({ 'left': leftValue });
      (0, _jquery2.default)('.product-image-shelf .icon').show();
    }

    (0, _jquery2.default)(window).on('resize', function () {
      var trackContainer = (0, _jquery2.default)('.product-image-shelf-container').width();
      var trackWidth = (0, _jquery2.default)('.product-thumbnail-wrap').length * itemWidth;
      if (trackWidth > trackContainer) {
        (0, _jquery2.default)('.product-image-shelf .icon').show();
      } else {
        (0, _jquery2.default)('.product-image-shelf .icon').hide();
      }
    });

    (0, _jquery2.default)('.icon-left').click(function () {
      if (!(0, _jquery2.default)('.product-image-shelf-container').is(':animated')) {
        // get the right position
        var leftIndent = parseInt((0, _jquery2.default)('.product-image-shelf-container').css('left')) + itemWidth;

        // slide the item
        (0, _jquery2.default)('.product-image-shelf-container').animate({ 'left': leftIndent }, 200, function () {
          // move the last item and put it as first item
          (0, _jquery2.default)('.product-thumbnail-wrap:first').before((0, _jquery2.default)('.product-thumbnail-wrap:last'));

          // set the default item to correct position
          (0, _jquery2.default)('.product-image-shelf-container').css({ 'left': leftValue });
        });
      }
    });

    (0, _jquery2.default)('.icon-right').click(function () {
      if (!(0, _jquery2.default)('.product-image-shelf-container').is(':animated')) {
        // get the right position
        var leftIndent = parseInt((0, _jquery2.default)('.product-image-shelf-container').css('left')) - itemWidth;
        // slide the item
        (0, _jquery2.default)('.product-image-shelf-container').animate({ 'left': leftIndent }, 200, function () {
          // move the last item and put it as first item
          (0, _jquery2.default)('.product-thumbnail-wrap:last').after((0, _jquery2.default)('.product-thumbnail-wrap:first'));

          // set the default item to correct position
          (0, _jquery2.default)('.product-image-shelf-container').css({ 'left': leftValue });
        });
      }
    });

    (0, _jquery2.default)('.product-thumbnail').click(function (e) {
      e.preventDefault();
      var original = (0, _jquery2.default)(this).attr('data-original');
      var imageId = (0, _jquery2.default)(this).attr('data-id');
      var description = (0, _jquery2.default)(this).attr('data-description');
      (0, _jquery2.default)('.product-featured-image').fadeOut('slow', function () {
        (0, _jquery2.default)('.product-featured-image').attr('src', original);
        (0, _jquery2.default)('.product-featured-image').fadeIn('slow');
      });
      (0, _jquery2.default)('.product-featured-image').attr('data-id', imageId);
      if (description === '') {
        (0, _jquery2.default)('.product-image-description').text('N/A');
      } else {
        (0, _jquery2.default)('.product-image-description').text(description);
      }
      window.history.pushState({}, '', '?image=' + imageId);
      (0, _jquery2.default)('#add-to-gallery').attr('action', '/galleries/' + imageId + '/add-product-image/');
    });

    (0, _jquery2.default)('.download-icon').click(function (e) {
      e.preventDefault();
      var imageUrl = this.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.attributes.src.value;
      var imageName = this.parentElement.parentElement.firstElementChild.nextElementSibling.textContent.replace(' ', '_').replace(/\W/g, '').toLowerCase();
      var link = document.createElement('a');
      link.download = imageName;
      link.href = imageUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });

    (0, _jquery2.default)('.print-icon').click(function (e) {
      e.preventDefault();
      var image = this.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.attributes.src.value;
      var printWindow = window.open(image, '_blank');
      printWindow.onload = function () {
        printWindow.print();
      };
    });

    // $('.gallery-icon').click(function (e) {
    //   e.preventDefault()
    //   $('.product-modal-wrap').removeClass('is-visible')
    //   $('.add-gallery-modal-wrap').addClass('is-visible')
    // })

    (0, _jquery2.default)('.product-modal-trigger').click(function (e) {
      e.preventDefault();
      var original = (0, _jquery2.default)(this).attr('data-original');
      var title = (0, _jquery2.default)(this).attr('data-title');
      var description = (0, _jquery2.default)(this).attr('data-description');
      (0, _jquery2.default)('.product-modal-image').attr('src', original);
      (0, _jquery2.default)('.product-modal-image').fadeIn(1000);
      (0, _jquery2.default)('.product-modal-footer .title').text(title);
      (0, _jquery2.default)('.product-modal-footer .paragraph').text(description);
      (0, _jquery2.default)('.product-modal-wrap').addClass('is-visible');
    });

    (0, _jquery2.default)('.product-modal .trigger-close').click(function (e) {
      e.preventDefault();
      (0, _jquery2.default)('.product-modal-wrap').removeClass('is-visible');
      (0, _jquery2.default)('.product-modal-image').fadeOut(100);
      (0, _jquery2.default)('.product-modal-image').attr('src', '');
      (0, _jquery2.default)('.product-modal-footer .title').text('');
      (0, _jquery2.default)('.product-modal-footer .paragraph').text('');
    });

    (0, _jquery2.default)('.related-video-modal-trigger').click(function (e) {
      e.preventDefault();
      var videoUrl = (0, _jquery2.default)(this).attr('data-video');
      (0, _jquery2.default)('.related-video-iframe').attr('src', videoUrl);
      (0, _jquery2.default)('.related-video-modal-wrap').addClass('is-visible');
    });

    (0, _jquery2.default)('.related-video-modal .trigger-close').click(function (e) {
      e.preventDefault();
      (0, _jquery2.default)('.related-video-modal-wrap').removeClass('is-visible');
      (0, _jquery2.default)('.related-video-iframe').attr('src', '');
    });

    function setActiveMenu() {
      var productUrl = window.location.pathname;
      var regExp = /[^/]+/g;
      var match = productUrl.match(regExp);
      var param1 = '';
      if (match && match.length > 1) {
        param1 = match[1].replace('-', ' ');
      } else {
        param1 = '';
      }
      var param2 = '';
      if (match && match.length > 2) {
        param2 = match[2].replace('-', ' ');
      } else {
        param2 = '';
      }
      (0, _jquery2.default)('.product-menu-category .parent').each(function (i, link) {
        if (param1) {
          if ((0, _jquery2.default)(link).text().toLowerCase() === param1) {
            (0, _jquery2.default)(link).parent('.product-menu-category').addClass('is-active');
            (0, _jquery2.default)(link).siblings('.product-menu-child').slideDown();
            (0, _jquery2.default)(link).siblings('.product-menu-child').children('li').each(function (i, childLink) {
              if (childLink.innerText.toLowerCase() === param2) {
                (0, _jquery2.default)(childLink).children('.child').addClass('is-active');
                return false;
              }
            });
            return false;
          }
        }
      });
    }

    setActiveMenu();

    (0, _jquery2.default)('.product-menu-category .parent').click(function (e) {
      e.preventDefault();
      if ((0, _jquery2.default)(this).parent('.product-menu-category').hasClass('is-active')) {
        (0, _jquery2.default)(this).siblings('.product-menu-child').slideUp();
      } else {
        (0, _jquery2.default)(this).siblings('.product-menu-child').slideDown();
      }
      (0, _jquery2.default)(this).parent('.product-menu-category').toggleClass('is-active');
    });

    (0, _jquery2.default)('#gallery-add').click(function (e) {
      e.preventDefault();
      (0, _jquery2.default)('.add-gallery-modal-wrap').addClass('is-visible');
    });

    (0, _jquery2.default)('.add-gallery-modal .trigger-close').click(function (e) {
      e.preventDefault();
      (0, _jquery2.default)('.add-gallery-modal-wrap').removeClass('is-visible');
    });

    (0, _jquery2.default)('.download-trigger').click(function (e) {
      e.preventDefault();
      (0, _jquery2.default)('.download-modal-wrap').addClass('is-visible');
    });

    (0, _jquery2.default)('.download-modal .trigger-close').click(function (e) {
      e.preventDefault();
      (0, _jquery2.default)('.download-modal-wrap').removeClass('is-visible');
    });

    (0, _jquery2.default)('.embed-trigger').click(function (e) {
      e.preventDefault();
      (0, _jquery2.default)('.embed-modal-wrap').addClass('is-visible');
    });

    (0, _jquery2.default)('.embed-modal .trigger-close').click(function (e) {
      e.preventDefault();
      (0, _jquery2.default)('.embed-modal-wrap').removeClass('is-visible');
    });

    (0, _jquery2.default)('#download-specs').click(function (e) {
      e.preventDefault();
      var checkedItems = (0, _jquery2.default)('.download-items input:checked');
      var fileIds = checkedItems.toArray().map(function (item) {
        return 'id=' + item.value;
      });
      var params = fileIds.join('&');
      var url = '/products/file-download?' + params;
      var win = window.open(url, '_blank');
      if (win) {
        // Browser has allowed it to be opened
        win.focus();
      } else {
        // Browser has blocked it
        alert('Please allow popups for this website');
      }
    });

    (0, _jquery2.default)('.spec-chart-trigger').click(function (e) {
      e.preventDefault();
      (0, _jquery2.default)('.spec-chart-modal-wrap').addClass('is-visible');
    });

    (0, _jquery2.default)('.spec-chart-modal .trigger-close').click(function (e) {
      e.preventDefault();
      (0, _jquery2.default)('.spec-chart-modal-wrap').removeClass('is-visible');
    });
  });
};

exports.default = productDetail;

/***/ }),

/***/ 635:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jquery = __webpack_require__(93);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var share = function share() {
  (0, _jquery2.default)(function () {
    (0, _jquery2.default)('.fb-share-link').click(function (e) {
      e.preventDefault();
      FB.ui({
        method: 'share',
        href: location.origin + location.pathname
      },
      // callback
      function (response) {
        if (response && !response.error_message) {
          alert('Posting completed.');
        } else {
          alert('Error while posting.');
        }
      });
    });

    (0, _jquery2.default)('.houzz-share-button').click(function (e) {
      e.preventDefault();

      var link = (0, _jquery2.default)(this).attr('data-url');
      var hzid = (0, _jquery2.default)(this).attr('data-hzid');
      var title = (0, _jquery2.default)(this).attr('data-title');
      var image = (0, _jquery2.default)(this).attr('data-img');

      var popout = 'http://www.houzz.com/imageClipperUpload';
      popout += '?link=' + encodeURIComponent(link);
      popout += '&source=button';
      popout += '&hzid=' + hzid;
      popout += '&imageUrl=' + encodeURIComponent(image);
      popout += '&title=' + encodeURIComponent(title);
      popout += '&ref=' + encodeURIComponent(location.origin + location.pathname);

      var popupWidth = 900;
      var popupHeight = 480;
      var left = Math.floor((screen.width - popupWidth) / 2);
      var top = Math.floor((screen.height - popupHeight) / 2);
      window.open(popout, 'HOUZZ' + new Date().getTime(), 'status=no,resizable=yes,scrollbars=yes,personalbar=no,directories=no,location=no,toolbar=no,menubar=no,width=' + popupWidth + ',height=' + popupHeight + ',left=' + left + ',top=' + top);
    });

    (0, _jquery2.default)('.pinterest-button').click(function (e) {
      e.preventDefault();
      PinUtils.pinAny();
    });
  });
};

exports.default = share;

/***/ }),

/***/ 636:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jquery = __webpack_require__(93);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var downloadSpecs = function downloadSpecs() {
  (0, _jquery2.default)(function () {
    (0, _jquery2.default)('.product-download-button').click(function (e) {
      e.preventDefault();
      var productId = (0, _jquery2.default)(this).attr('data-id');
      (0, _jquery2.default)('.product' + productId).addClass('is-visible');
    });
  });
};

exports.default = downloadSpecs;

/***/ })

},[431]);