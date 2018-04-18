webpackJsonp([8],{

/***/ 880:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(17);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _App = __webpack_require__(881);

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var appContainter = document.getElementById('search-app');
_reactDom2.default.render(_react2.default.createElement(_App2.default, null), appContainter);

/***/ }),

/***/ 881:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _helpers = __webpack_require__(882);

var _helpers2 = _interopRequireDefault(_helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      searchTerm: '',
      searchResults: []
    };
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    _this.handleChange = _this.handleChange.bind(_this);
    return _this;
  }

  _createClass(App, [{
    key: 'handleChange',
    value: function handleChange(e) {
      this.setState({
        searchTerm: e.target.value
      });
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(e) {
      var _this2 = this;

      e.preventDefault();
      var searchResultsPromise = _helpers2.default.getSearchResults(this.state.searchTerm);
      searchResultsPromise.then(function (searchResults) {
        return _this2.setState({
          searchResults: searchResults
        });
      });
    }
  }, {
    key: 'renderSearchResults',
    value: function renderSearchResults(results) {
      return Object.keys(results).map(function (keyName, id) {
        if (results[keyName].length > 0) {
          return _react2.default.createElement(
            'div',
            { className: 'search-group', key: 'result-group-' + id },
            _react2.default.createElement(
              'h4',
              { className: 'title' },
              keyName
            ),
            _react2.default.createElement(
              'div',
              { className: 'search-result-wrapper' },
              results[keyName].map(function (result, key) {
                if (keyName.toLocaleLowerCase() === 'products') {
                  return _react2.default.createElement(
                    'div',
                    { className: 'search-result', key: key },
                    _react2.default.createElement(
                      'a',
                      { className: 'link', href: result.url },
                      _react2.default.createElement('img', { className: 'img', src: result.images[0].thumbnail }),
                      _react2.default.createElement(
                        'span',
                        { className: 'result-title' },
                        result.name
                      )
                    )
                  );
                } else if (keyName.toLocaleLowerCase() === 'images') {
                  return _react2.default.createElement(
                    'div',
                    { className: 'search-result', key: key },
                    _react2.default.createElement(
                      'a',
                      { className: 'link', href: result.url },
                      _react2.default.createElement('img', { className: 'img', src: result.thumbnail }),
                      _react2.default.createElement(
                        'span',
                        { className: 'result-title' },
                        result.name
                      )
                    )
                  );
                } else if (keyName.toLocaleLowerCase() === 'specs') {
                  return _react2.default.createElement(
                    'div',
                    { className: 'search-result is-specs', key: key },
                    _react2.default.createElement(
                      'a',
                      { className: 'link', target: '_blank', href: result.file },
                      _react2.default.createElement('img', { className: 'img', src: result.icon }),
                      _react2.default.createElement(
                        'span',
                        { className: 'result-title' },
                        result.label
                      )
                    )
                  );
                }
              })
            )
          );
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'search-container' },
        _react2.default.createElement(
          'form',
          { className: 'seach-page-form', onSubmit: this.handleSubmit },
          _react2.default.createElement(
            'div',
            { className: 'input-group' },
            _react2.default.createElement(
              'label',
              { htmlFor: 'q', className: 'label' },
              'Search:'
            ),
            _react2.default.createElement('input', { className: 'input', id: 'id_q', name: 'q', type: 'text', onChange: this.handleChange })
          )
        ),
        this.renderSearchResults(this.state.searchResults)
      );
    }
  }]);

  return App;
}(_react2.default.Component);

;

exports.default = App;

/***/ }),

/***/ 882:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = __webpack_require__(26);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var search = {
  getSearchResults: function getSearchResults(term) {
    return _axios2.default.get('/rest/search/?q=' + term).then(function (data) {
      return data.data;
    }).catch(function (error) {
      return error.response.data;
    });
  }
};

exports.default = search;

/***/ })

},[880]);