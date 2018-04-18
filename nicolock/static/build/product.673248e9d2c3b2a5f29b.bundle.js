webpackJsonp([9],{

/***/ 921:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.galleries = undefined;

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(17);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _AddToGallery = __webpack_require__(922);

var _AddToGallery2 = _interopRequireDefault(_AddToGallery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addToGalleryContainer = document.getElementById('add-image-to-gallery');
var galleries = exports.galleries = void 0;
if (addToGalleryContainer) {
  exports.galleries = galleries = JSON.parse(addToGalleryContainer.getAttribute('data-galleries'));
  _reactDom2.default.render(_react2.default.createElement(_AddToGallery2.default, {
    galleries: galleries,
    imageId: parseInt(document.getElementById('featured-product-image').getAttribute('data-id')),
    imageUrl: document.getElementById('featured-product-image').getAttribute('src')
  }), addToGalleryContainer);
}

/***/ }),

/***/ 922:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(3);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _universalCookie = __webpack_require__(48);

var _universalCookie2 = _interopRequireDefault(_universalCookie);

var _helpers = __webpack_require__(923);

var _helpers2 = _interopRequireDefault(_helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddToGallery = function (_React$Component) {
  _inherits(AddToGallery, _React$Component);

  function AddToGallery(props) {
    _classCallCheck(this, AddToGallery);

    var _this = _possibleConstructorReturn(this, (AddToGallery.__proto__ || Object.getPrototypeOf(AddToGallery)).call(this, props));

    _this.state = {
      error: '',
      galleryId: '',
      imageId: _this.props.imageId,
      imageUrl: _this.props.imageUrl,
      notes: '',
      message: '',
      messageVisible: false
    };

    var cookies = new _universalCookie2.default();
    _this.csrfToken = cookies.get('csrftoken');

    _this.handleSelectedGallery = _this.handleSelectedGallery.bind(_this);
    _this.handleNotes = _this.handleNotes.bind(_this);
    _this.saveImage = _this.saveImage.bind(_this);
    return _this;
  }

  _createClass(AddToGallery, [{
    key: 'handleSelectedGallery',
    value: function handleSelectedGallery(event) {
      this.setState({
        galleryId: event.target.value,
        imageId: parseInt(document.getElementById('featured-product-image').getAttribute('data-id')),
        imageUrl: document.getElementById('featured-product-image').getAttribute('src')
      });
    }
  }, {
    key: 'handleNotes',
    value: function handleNotes(event) {
      this.setState({
        notes: event.target.value
      });
    }
  }, {
    key: 'saveImage',
    value: function saveImage(event) {
      var _this2 = this;

      event.preventDefault();
      if (!this.state.galleryId) {
        this.setState({
          error: 'Please select a gallery',
          messageVisible: true
        });
      } else {
        var saveImage = _helpers2.default.saveImage(this.csrfToken, this.state.imageId, this.state.galleryId, this.state.imageUrl, this.state.notes);
        saveImage.then(function (response) {
          if (response.success) {
            _this2.setState({
              galleryId: '',
              imageId: '',
              imageUrl: '',
              notes: '',
              message: 'The image has been added to your gallery',
              messageVisible: true
            });
            setTimeout(function () {
              _this2.setState({
                messageVisible: false
              });
              document.querySelector('.add-gallery-modal-wrap').classList.toggle('is-visible');
            }, 2000);
          } else {
            _this2.setState({
              error: 'There was a problem saving the image to your gallery',
              messageVisible: true
            });
            setTimeout(function () {
              _this2.setState({
                messageVisible: false
              });
            }, 2000);
          }
        });
      }
    }
  }, {
    key: 'renderGalleryOptions',
    value: function renderGalleryOptions(galleries) {
      var _this3 = this;

      return galleries.map(function (gallery, id) {
        return _react2.default.createElement(
          'label',
          { key: gallery.id, className: 'radio' },
          _react2.default.createElement('input', { type: 'radio', name: 'gallery', value: gallery.id, onChange: _this3.handleSelectedGallery }),
          _react2.default.createElement('span', null),
          gallery.name
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var location = window.location.href;
      return _react2.default.createElement(
        'form',
        null,
        _react2.default.createElement(
          'h4',
          { className: 'title' },
          'Add To Gallery'
        ),
        _react2.default.createElement(
          'div',
          { className: 'input-group' },
          _react2.default.createElement(
            'p',
            { className: 'paragraph pad-half--bottom' },
            'Select One'
          ),
          this.state.error ? _react2.default.createElement(
            'p',
            { className: 'paragraph', style: { color: '#d0021b', margin: '10px 0' } },
            this.state.error
          ) : '',
          this.renderGalleryOptions(this.props.galleries)
        ),
        _react2.default.createElement(
          'a',
          { className: 'link neutral-0 link-new-gallery', href: '/galleries/add/?from=' + location },
          'Or create a new gallery'
        ),
        _react2.default.createElement('hr', { className: 'divider' }),
        _react2.default.createElement(
          'div',
          { className: 'input-group' },
          _react2.default.createElement(
            'fieldset',
            null,
            _react2.default.createElement(
              'legend',
              null,
              'Notes'
            ),
            _react2.default.createElement('textarea', { className: 'textarea', onChange: this.handleNotes, value: this.state.notes })
          )
        ),
        _react2.default.createElement(
          'button',
          { className: 'btn btn-md neutral-0', onClick: this.saveImage },
          'ADD'
        ),
        _react2.default.createElement(
          'p',
          { className: 'message ' + (this.state.messageVisible ? 'is-visible' : '') },
          this.state.message
        )
      );
    }
  }]);

  return AddToGallery;
}(_react2.default.Component);

;

AddToGallery.propTypes = {
  galleries: _propTypes2.default.array,
  imageId: _propTypes2.default.number.isRequired,
  imageUrl: _propTypes2.default.string.isRequired
};

exports.default = AddToGallery;

/***/ }),

/***/ 923:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = __webpack_require__(26);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var products = {
  saveImage: function saveImage(csrfToken, imageId, galleryId, imageUrl, notes) {
    var config = {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken
      }
    };
    var body = {
      'name': 'Product Image',
      'color': '',
      'notes': notes,
      'original': imageUrl,
      'gallery': galleryId
    };
    return _axios2.default.post('/rest/items/create-from-image/' + imageId, body, config).then(function (data) {
      data.success = true;
      return data;
    }).catch(function (error) {
      return error;
    });
  }
};

exports.default = products;

/***/ })

},[921]);