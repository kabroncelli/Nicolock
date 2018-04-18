webpackJsonp([10],{

/***/ 886:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(17);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _App = __webpack_require__(887);

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var appContainter = document.getElementById('like');
_reactDom2.default.render(_react2.default.createElement(_App2.default, {
  url: appContainter.getAttribute('data-url'),
  id: appContainter.getAttribute('data-video'),
  type: appContainter.getAttribute('data-type'),
  count: appContainter.getAttribute('data-count')
}), appContainter);

/***/ }),

/***/ 887:
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

var _helpers = __webpack_require__(888);

var _helpers2 = _interopRequireDefault(_helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Like = function (_React$Component) {
  _inherits(Like, _React$Component);

  function Like(props) {
    _classCallCheck(this, Like);

    var _this = _possibleConstructorReturn(this, (Like.__proto__ || Object.getPrototypeOf(Like)).call(this, props));

    _this.state = {
      count: _this.props.count
    };

    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  _createClass(Like, [{
    key: 'handleClick',
    value: function handleClick(event) {
      var _this2 = this;

      event.preventDefault();
      if (typeof Storage !== 'undefined') {
        var likeStatus = localStorage.getItem('nicolock_' + this.props.type + this.props.id);
        if (!likeStatus) {
          localStorage.setItem('nicolock_' + this.props.type + this.props.id, true);
          var liked = _helpers2.default.addLike(this.props.url);
          liked.then(function (respons) {
            _this2.setState({
              count: parseInt(_this2.state.count) + 1
            });
          });
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'a',
        { className: 'link like-number-link', href: '#', onClick: this.handleClick },
        _react2.default.createElement(
          'svg',
          { className: 'icon', version: '1.1', xmlns: 'http://www.w3.org/2000/svg', x: '0px', y: '0px',
            viewBox: '0 0 492.719 492.719' },
          _react2.default.createElement('path', { className: 'path', d: 'M492.719,166.008c0-73.486-59.573-133.056-133.059-133.056c-47.985,0-89.891,25.484-113.302,63.569 c-23.408-38.085-65.332-63.569-113.316-63.569C59.556,32.952,0,92.522,0,166.008c0,40.009,17.729,75.803,45.671,100.178 l188.545,188.553c3.22,3.22,7.587,5.029,12.142,5.029c4.555,0,8.922-1.809,12.142-5.029l188.545-188.553 C474.988,241.811,492.719,206.017,492.719,166.008z' })
        ),
        _react2.default.createElement(
          'span',
          { className: 'like-wrap' },
          'Like',
          _react2.default.createElement('br', null),
          _react2.default.createElement(
            'span',
            { className: 'like-count' },
            _react2.default.createElement(
              'span',
              { className: 'like-number' },
              this.state.count
            ),
            ' Likes'
          )
        )
      );
    }
  }]);

  return Like;
}(_react2.default.Component);

;

Like.propTypes = {
  url: _propTypes2.default.string.isRequired,
  id: _propTypes2.default.string.isRequired,
  type: _propTypes2.default.string.isRequired,
  count: _propTypes2.default.string.isRequired
};

exports.default = Like;

/***/ }),

/***/ 888:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = __webpack_require__(26);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var like = {
  addLike: function addLike(url) {
    return _axios2.default.post('' + url).then(function (data) {
      return data.data;
    }).catch(function (error) {
      return error.response.data;
    });
  }
};

exports.default = like;

/***/ })

},[886]);