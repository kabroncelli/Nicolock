webpackJsonp([2],{

/***/ 204:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var SELECT_IMAGE = exports.SELECT_IMAGE = 'gallery/SELECT_IMAGE';
var UPDATE_IMAGE = exports.UPDATE_IMAGE = 'gallery/UPDATE_IMAGE';

var selectImage = exports.selectImage = function selectImage(image) {
  return {
    type: SELECT_IMAGE,
    image: image
  };
};

var updateImage = exports.updateImage = function updateImage(updatedImage) {
  return {
    type: UPDATE_IMAGE,
    updatedImage: updatedImage
  };
};

/***/ }),

/***/ 312:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = __webpack_require__(26);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var galleryData = {
  saveNotes: function saveNotes(csrfToken, value, id) {
    var config = {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken
      }
    };
    return _axios2.default.patch('/rest/items/' + id, {
      notes: value
    }, config);
  },
  saveGalleryField: function saveGalleryField(csrfToken, field, value, id) {
    var config = {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken
      }
    };
    return _axios2.default.patch('/rest/galleries/' + id, _defineProperty({}, field, value), config);
  },
  saveContractor: function saveContractor(csrfToken, id) {
    var config = {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken
      }
    };
    return _axios2.default.post('/rest/contractor-list/edit/' + id, {}, config).then(function (data) {
      return data;
    }).catch(function (error) {
      return error;
    });
  }
};

exports.default = galleryData;

/***/ }),

/***/ 898:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.galleryData = undefined;

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(17);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = __webpack_require__(128);

var _reducers = __webpack_require__(916);

var _reducers2 = _interopRequireDefault(_reducers);

var _GalleryCarousel = __webpack_require__(918);

var _GalleryCarousel2 = _interopRequireDefault(_GalleryCarousel);

var _GalleryItemData = __webpack_require__(919);

var _GalleryItemData2 = _interopRequireDefault(_GalleryItemData);

var _GalleryAddContractor = __webpack_require__(920);

var _GalleryAddContractor2 = _interopRequireDefault(_GalleryAddContractor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var galleryCarousel = document.getElementById('gallery-carousel');
var galleryData = exports.galleryData = JSON.parse(galleryCarousel.getAttribute('data-gallery'));

if (galleryCarousel) {
  var isEditable = galleryCarousel.getAttribute('data-editable');
  isEditable = JSON.parse(isEditable);
  _reactDom2.default.render(_react2.default.createElement(
    _reactRedux.Provider,
    { store: _reducers2.default },
    _react2.default.createElement(_GalleryCarousel2.default, {
      galleryData: galleryData,
      editable: isEditable
    })
  ), galleryCarousel);
}

var galleryItemData = document.getElementById('gallery-item-data');
if (galleryItemData) {
  var editable = galleryItemData.getAttribute('data-editable');
  editable = JSON.parse(editable);
  _reactDom2.default.render(_react2.default.createElement(
    _reactRedux.Provider,
    { store: _reducers2.default },
    _react2.default.createElement(_GalleryItemData2.default, {
      editable: editable
    })
  ), galleryItemData);
}

var galleryAddContractor = document.getElementById('gallery-add-contractor');
if (galleryAddContractor) {
  var contractorId = parseInt(galleryAddContractor.getAttribute('data-contractor-id'));
  _reactDom2.default.render(_react2.default.createElement(_GalleryAddContractor2.default, {
    contractorId: contractorId,
    contractorName: galleryAddContractor.getAttribute('data-contractor-name')
  }), galleryAddContractor);
}

/***/ }),

/***/ 916:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(203);

var _galleryReducer = __webpack_require__(917);

var _galleryReducer2 = _interopRequireDefault(_galleryReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ... import all your reducers here

var reducers = (0, _redux.combineReducers)({
  galleryReducer: _galleryReducer2.default
  // ... Put all aditional reducers here
});

// before you create the store you can add middleware here and keep your main index file clean ;)
var store = (0, _redux.createStore)(reducers, window.devToolsExtension && window.devToolsExtension());

exports.default = store;

/***/ }),

/***/ 917:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectedImage = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Gallery;

var _galleryActions = __webpack_require__(204);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var galleryCarousel = document.getElementById('gallery-carousel');
var galleryData = JSON.parse(galleryCarousel.getAttribute('data-gallery'));
var selectedImage = exports.selectedImage = galleryData.items.length > 0 ? galleryData.items[0] : undefined;
var projectName = galleryData.gallery_type === 'contractor' ? galleryCarousel.getAttribute('data-project-name') : undefined;

var initialState = {
  projectName: projectName,
  galleryData: galleryData,
  selectedImage: selectedImage
};

function Gallery() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _galleryActions.SELECT_IMAGE:
      return _extends({}, state, {
        selectedImage: action.image
      });
    case _galleryActions.UPDATE_IMAGE:
      var index = state.galleryData.items.findIndex(function (item) {
        return item.id === action.updatedImage.id;
      });
      var galleryItems = [].concat(_toConsumableArray(state.galleryData.items.slice(0, index)), [action.updatedImage], _toConsumableArray(state.galleryData.items.slice(index + 1)));
      var newState = {
        projectName: state.projectName,
        galleryData: {
          id: state.galleryData.id,
          items: galleryItems,
          gallery_type: state.galleryData.gallery_type,
          name: state.galleryData.name,
          description: state.galleryData.description,
          products_used: state.galleryData.products_used,
          patterns_used: state.galleryData.patterns_used,
          slug: state.galleryData.slug,
          user: state.galleryData.user,
          project: state.galleryData.project
        },
        selectedImage: action.updatedImage
      };
      return newState;

    default:
      return state;
  }
}

/***/ }),

/***/ 918:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(128);

var _propTypes = __webpack_require__(3);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _galleryActions = __webpack_require__(204);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GalleryCarousel = function (_React$Component) {
  _inherits(GalleryCarousel, _React$Component);

  function GalleryCarousel(props) {
    _classCallCheck(this, GalleryCarousel);

    var _this = _possibleConstructorReturn(this, (GalleryCarousel.__proto__ || Object.getPrototypeOf(GalleryCarousel)).call(this, props));

    _this.state = {
      carouselPosition: 0
    };

    _this.slideCarousel = _this.slideCarousel.bind(_this);
    return _this;
  }

  _createClass(GalleryCarousel, [{
    key: 'slideCarousel',
    value: function slideCarousel(event) {
      var index = parseInt(event.target.getAttribute('data-position'));
      var position = '-' + index * 100 + '%';
      this.setState({
        carouselPosition: position
      });
      if (this.props.galleryData.gallery_type !== 'contractor') {
        this.props.selectImage(this.props.galleryData.items[index]);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: 'gallery-wrap flex-between' },
        _react2.default.createElement(
          'div',
          { className: 'gallery-img-shelf' },
          this.props.galleryData.items.map(function (item, index) {
            return _react2.default.createElement(
              'div',
              { className: 'img-wrap', key: item.id },
              _react2.default.createElement('img', { className: 'img', src: item.thumbnail, 'data-position': index, onClick: _this2.slideCarousel })
            );
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'gallery-featured' },
          _react2.default.createElement(
            'div',
            { className: 'carousel-container' },
            _react2.default.createElement(
              'ul',
              { className: 'carousel', style: { left: this.state.carouselPosition } },
              this.props.galleryData.items.map(function (item) {
                return _react2.default.createElement(
                  'li',
                  { className: 'carousel-item', key: item.id },
                  _this2.props.editable && _react2.default.createElement(
                    'a',
                    { className: 'link neutral-4 edit', href: '/galleries/items/' + item.slug + '/edit/' },
                    _react2.default.createElement(
                      'svg',
                      { className: 'icon', version: '1.1', xmlns: 'http://www.w3.org/2000/svg', x: '0px', y: '0px', viewBox: '0 0 528.899 528.899' },
                      _react2.default.createElement('path', { d: 'M328.883,89.125l107.59,107.589l-272.34,272.34L56.604,361.465L328.883,89.125z M518.113,63.177l-47.981-47.981 c-18.543-18.543-48.653-18.543-67.259,0l-45.961,45.961l107.59,107.59l53.611-53.611 C532.495,100.753,532.495,77.559,518.113,63.177z M0.3,512.69c-1.958,8.812,5.998,16.708,14.811,14.565l119.891-29.069 L27.473,390.597L0.3,512.69z' })
                    )
                  ),
                  _react2.default.createElement('img', { className: 'gallery-featured-image', src: item.original })
                );
              })
            )
          )
        )
      );
    }
  }]);

  return GalleryCarousel;
}(_react2.default.Component);

;

GalleryCarousel.propTypes = {
  galleryData: _propTypes2.default.object.isRequired,
  editable: _propTypes2.default.bool.isRequired,
  selectImage: _propTypes2.default.func
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    galleryData: state.galleryReducer.galleryData,
    selectedImage: state.galleryReducer.selectedImage
  };
};

var mapDispatchToProps = {
  selectImage: _galleryActions.selectImage
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(GalleryCarousel);

/***/ }),

/***/ 919:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(128);

var _propTypes = __webpack_require__(3);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _universalCookie = __webpack_require__(48);

var _universalCookie2 = _interopRequireDefault(_universalCookie);

var _helpers = __webpack_require__(312);

var _helpers2 = _interopRequireDefault(_helpers);

var _galleryActions = __webpack_require__(204);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GalleryItemData = function (_React$Component) {
  _inherits(GalleryItemData, _React$Component);

  function GalleryItemData(props) {
    _classCallCheck(this, GalleryItemData);

    var _this = _possibleConstructorReturn(this, (GalleryItemData.__proto__ || Object.getPrototypeOf(GalleryItemData)).call(this, props));

    var productsUsed = _this.props.galleryData.products_used ? _this.props.galleryData.products_used : '';
    var patternsUsed = _this.props.galleryData.patterns_used ? _this.props.galleryData.patterns_used : '';
    _this.state = {
      galleryId: _this.props.galleryData.id,
      imageId: _this.props.selectedImage.id,
      notes: _this.props.selectedImage.notes,
      productsUsed: productsUsed,
      patternsUsed: patternsUsed,
      message: '',
      messageVisible: false
    };

    var cookies = new _universalCookie2.default();
    _this.csrfToken = cookies.get('csrftoken');

    _this.handleNotes = _this.handleNotes.bind(_this);
    _this.saveNotes = _this.saveNotes.bind(_this);
    _this.saveGalleryField = _this.saveGalleryField.bind(_this);
    _this.handleProducts = _this.updateField.bind(_this, 'productsUsed');
    _this.handlePatterns = _this.updateField.bind(_this, 'patternsUsed');
    return _this;
  }

  _createClass(GalleryItemData, [{
    key: 'updateField',
    value: function updateField(field, event) {
      this.setState(_defineProperty({}, field, event.target.value));
    }
  }, {
    key: 'handleNotes',
    value: function handleNotes(event) {
      this.setState({
        notes: event.target.value
      });
    }
  }, {
    key: 'saveNotes',
    value: function saveNotes(event) {
      var _this2 = this;

      var newImage = {
        id: this.props.selectedImage.id,
        thumbnail: this.props.selectedImage.thumbnail,
        large_thumbnail: this.props.selectedImage.large_thumbnail,
        name: this.props.selectedImage.name,
        color: this.props.selectedImage.color,
        notes: this.state.notes,
        original: this.props.selectedImage.original,
        slug: this.props.selectedImage.slug,
        gallery: this.props.selectedImage.gallery
      };
      this.props.updateImage(newImage);
      var updateNotes = _helpers2.default.saveNotes(this.csrfToken, event.target.value, this.state.imageId);
      updateNotes.then(function (response) {
        if (response.status === 200) {
          _this2.setState({
            message: 'Your notes have been saved',
            messageVisible: true
          });
          setTimeout(function () {
            _this2.setState({
              messageVisible: false
            });
          }, 2000);
        } else {
          _this2.setState({
            message: 'There was a problem saving your notes',
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
  }, {
    key: 'saveGalleryField',
    value: function saveGalleryField(event) {
      var _this3 = this;

      var updatedField = _helpers2.default.saveGalleryField(this.csrfToken, event.target.name, event.target.value, this.state.galleryId);
      updatedField.then(function (response) {
        if (response.status === 200) {
          _this3.setState({
            message: 'Your gallery data has been saved',
            messageVisible: true
          });
          setTimeout(function () {
            _this3.setState({
              messageVisible: false
            });
          }, 2000);
        } else {
          _this3.setState({
            message: 'There was a problem saving your gallery data',
            messageVisible: true
          });
          setTimeout(function () {
            _this3.setState({
              messageVisible: false
            });
          }, 2000);
        }
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        galleryId: nextProps.galleryData.id,
        imageId: nextProps.selectedImage.id,
        notes: nextProps.selectedImage.notes,
        productsUsed: nextProps.galleryData.products_used,
        patternsUsed: nextProps.galleryData.patterns_used,
        message: '',
        messageVisible: false
      });
    }
  }, {
    key: 'renderTitle',
    value: function renderTitle() {
      if (this.props.galleryData.gallery_type === 'homeowner') {
        return 'Notes';
      } else if (this.props.galleryData.gallery_type === 'contractor') {
        return this.props.projectName + ', ' + this.props.galleryData.name;
      }
    }
  }, {
    key: 'renderDescription',
    value: function renderDescription() {
      if (this.props.galleryData.gallery_type === 'homeowner') {
        return _react2.default.createElement(
          'div',
          { className: 'input-group' },
          _react2.default.createElement('input', { className: 'input ' + (this.props.editable ? 'has-icon' : ''), disabled: !this.props.editable, placeholder: 'My notes', name: 'notes', value: this.state.notes, onChange: this.handleNotes, onBlur: this.saveNotes })
        );
      } else if (this.props.galleryData.gallery_type === 'contractor') {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            { className: 'input-group' },
            _react2.default.createElement(
              'label',
              { className: 'label' },
              'Products Used:'
            ),
            _react2.default.createElement('input', { className: 'input ' + (this.props.editable ? 'has-icon' : ''), disabled: !this.props.editable, placeholder: 'materials, etc...', name: 'products_used', value: this.state.productsUsed, onChange: this.handleProducts, onBlur: this.saveGalleryField })
          ),
          _react2.default.createElement(
            'div',
            { className: 'input-group' },
            _react2.default.createElement(
              'label',
              { className: 'label' },
              'Patterns Used:'
            ),
            _react2.default.createElement('input', { className: 'input ' + (this.props.editable ? 'has-icon' : ''), disabled: !this.props.editable, placeholder: 'herringbone, etc...', name: 'patterns_used', value: this.state.patternsUsed, onChange: this.handlePatterns, onBlur: this.saveGalleryField })
          )
        );
      }
    }
  }, {
    key: 'render',
    value: function render() {
      // If homeownwer gallery and owner of gallery, display editable notes
      // If homeowner gallery and not owner, display uneditable notes
      // If contractor gallery and owner of gallery, display editable Products Used and Patterns Used
      // If contractor gallery and not owner, display uneditable Products Used and Patterns Used
      return _react2.default.createElement(
        'form',
        { className: 'gallery-data-form' },
        _react2.default.createElement(
          'div',
          { className: 'gallery-title' },
          this.renderTitle()
        ),
        _react2.default.createElement(
          'div',
          { className: 'gallery-description' },
          this.renderDescription()
        ),
        _react2.default.createElement(
          'p',
          { className: 'message ' + (this.state.messageVisible ? 'is-visible' : '') },
          this.state.message
        )
      );
    }
  }]);

  return GalleryItemData;
}(_react2.default.Component);

;

GalleryItemData.propTypes = {
  editable: _propTypes2.default.bool,
  galleryData: _propTypes2.default.shape({
    products_used: _propTypes2.default.string,
    patterns_used: _propTypes2.default.string,
    name: _propTypes2.default.string,
    gallery_type: _propTypes2.default.string,
    id: _propTypes2.default.number
  }),
  selectedImage: _propTypes2.default.shape({
    id: _propTypes2.default.number,
    notes: _propTypes2.default.string,
    thumbnail: _propTypes2.default.string,
    large_thumbnail: _propTypes2.default.string,
    name: _propTypes2.default.string,
    color: _propTypes2.default.string,
    original: _propTypes2.default.string,
    slug: _propTypes2.default.string,
    gallery: _propTypes2.default.string
  }),
  updateImage: _propTypes2.default.func,
  projectName: _propTypes2.default.string
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    projectName: state.galleryReducer.projectName,
    galleryData: state.galleryReducer.galleryData,
    selectedImage: state.galleryReducer.selectedImage
  };
};

var mapDispatchToProps = {
  updateImage: _galleryActions.updateImage
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(GalleryItemData);

/***/ }),

/***/ 920:
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

var _helpers = __webpack_require__(312);

var _helpers2 = _interopRequireDefault(_helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GalleryAddContractor = function (_React$Component) {
  _inherits(GalleryAddContractor, _React$Component);

  function GalleryAddContractor(props) {
    _classCallCheck(this, GalleryAddContractor);

    var _this = _possibleConstructorReturn(this, (GalleryAddContractor.__proto__ || Object.getPrototypeOf(GalleryAddContractor)).call(this, props));

    _this.state = {
      modalVisible: false,
      message: '',
      messageVisible: false
    };

    var cookies = new _universalCookie2.default();
    _this.csrfToken = cookies.get('csrftoken');

    _this.dismissCard = _this.dismissCard.bind(_this);
    _this.dismissModal = _this.dismissModal.bind(_this);
    _this.confirmContractor = _this.confirmContractor.bind(_this);
    _this.saveContractor = _this.saveContractor.bind(_this);
    return _this;
  }

  _createClass(GalleryAddContractor, [{
    key: 'dismissCard',
    value: function dismissCard(event) {
      this.props.dismissCard(event);
    }
  }, {
    key: 'dismissModal',
    value: function dismissModal(event) {
      this.setState({
        modalVisible: false
      });
    }
  }, {
    key: 'confirmContractor',
    value: function confirmContractor(event) {
      event.preventDefault();
      this.setState({
        modalVisible: true
      });
    }
  }, {
    key: 'saveContractor',
    value: function saveContractor(event) {
      var _this2 = this;

      var contractorId = this.props.contractorId;
      var saveContractor = _helpers2.default.saveContractor(this.csrfToken, contractorId);
      saveContractor.then(function (response) {
        if (response.status === 200) {
          _this2.setState({
            message: _this2.props.contractorName + ' has been saved to your list of contractors',
            messageVisible: true
          });
          setTimeout(function () {
            _this2.setState({
              modalVisible: false,
              messageVisible: false
            });
          }, 2000);
        } else {
          _this2.setState({
            message: 'There was a problem saving ' + _this2.props.contractorName,
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
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'a',
          { className: 'link neutral-4 save-contractor', href: '#', onClick: this.confirmContractor },
          'Save Contractor to My Contractor List'
        ),
        _react2.default.createElement(
          'div',
          { className: 'modal-wrap modal-light ' + (this.state.modalVisible ? 'is-visible' : '') },
          _react2.default.createElement(
            'div',
            { className: 'modal' },
            _react2.default.createElement(
              'div',
              { className: 'modal-view' },
              _react2.default.createElement(
                'span',
                { className: 'dismiss-modal', onClick: this.dismissModal },
                'x'
              ),
              _react2.default.createElement(
                'div',
                { className: 'modal-header' },
                this.state.messageVisible ? _react2.default.createElement(
                  'h4',
                  { className: 'title' },
                  'Success'
                ) : _react2.default.createElement(
                  'h4',
                  { className: 'title' },
                  'Save Contractor'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'modal-content' },
                this.state.messageVisible ? _react2.default.createElement(
                  'p',
                  { className: 'paragraph' },
                  this.state.message
                ) : _react2.default.createElement(
                  'p',
                  { className: 'paragraph' },
                  'Would you like to save ',
                  this.props.contractorName,
                  ' to your list of contractors?'
                ),
                this.state.messageVisible ? _react2.default.createElement(
                  'button',
                  { className: 'btn btn-md neutral-0' },
                  'SAVED'
                ) : _react2.default.createElement(
                  'button',
                  { className: 'btn btn-md neutral-0', onClick: this.saveContractor },
                  'SAVE'
                )
              ),
              _react2.default.createElement('div', { className: 'modal-footer' })
            )
          )
        )
      );
    }
  }]);

  return GalleryAddContractor;
}(_react2.default.Component);

;

GalleryAddContractor.propTypes = {
  contractorId: _propTypes2.default.number,
  contractorName: _propTypes2.default.string,
  dismissCard: _propTypes2.default.func
};

exports.default = GalleryAddContractor;

/***/ })

},[898]);