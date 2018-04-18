webpackJsonp([11],{

/***/ 883:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(17);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _App = __webpack_require__(884);

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(Array.prototype, 'group', {
  enumerable: false,
  value: function value(key) {
    var map = {};
    this.map(function (e) {
      return { k: key(e), d: e };
    }).forEach(function (e) {
      map[e.k] = map[e.k] || [];
      map[e.k].push(e.d);
    });
    return Object.keys(map).map(function (k) {
      return { key: k, data: map[k] };
    });
  }
});

Object.defineProperty(Array.prototype, 'groupToArray', {
  enumerable: false,
  value: function value(key) {
    var grouping = this.group(key);
    return grouping.map(function (group) {
      return group.data;
    });
  }
});

var appContainter = document.getElementById('app');
_reactDom2.default.render(_react2.default.createElement(_App2.default, null), appContainter);

/***/ }),

/***/ 884:
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

var _helpers = __webpack_require__(885);

var _helpers2 = _interopRequireDefault(_helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FaqSelected = function FaqSelected(props) {
  var _props$faqSelected = props.faqSelected,
      question = _props$faqSelected.question,
      answer = _props$faqSelected.answer,
      relatedQuestions = _props$faqSelected.relatedQuestions;

  return _react2.default.createElement(
    'div',
    { className: 'faq-wrap' },
    _react2.default.createElement(
      'div',
      { className: 'faq-answers' },
      _react2.default.createElement(
        'div',
        { className: 'question' },
        question
      ),
      _react2.default.createElement(
        'div',
        { className: 'answer' },
        answer
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'related-questions' },
      _react2.default.createElement(
        'p',
        { className: 'paragraph' },
        'Related Questions:'
      ),
      _react2.default.createElement(
        'ul',
        { className: 'misc-menu faq-link' },
        relatedQuestions ? relatedQuestions.map(function (question, index) {
          return _react2.default.createElement(
            'li',
            { key: 'relatedQuestion-' + index },
            _react2.default.createElement(
              'span',
              { className: 'link faq neutral-0', onClick: question.selectQuestion },
              question.question
            )
          );
        }) : null
      )
    )
  );
};

FaqSelected.propTypes = {
  faqSelected: _propTypes2.default.shape({
    question: _propTypes2.default.string.isRequired,
    answer: _propTypes2.default.string.isRequired,
    relatedQuestions: _propTypes2.default.arrayOf(_propTypes2.default.shape({
      question: _propTypes2.default.string.isRequired,
      selectQuestion: _propTypes2.default.func.isRequired
    }))
  }).isRequired
};

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.handleChange = function (data) {
      _this.setState(function (previousState) {
        return {
          faqSelected: {
            question: data.question,
            answer: data.answer,
            relatedQuestions: previousState.originalFaqList.filter(function (faq) {
              return data.related.includes(faq.id);
            }).map(function (faq) {
              return {
                question: faq.question,
                selectQuestion: _this.handleChange.bind(_this, faq)
              };
            })
          }
        };
      });
    };

    _this.state = {
      faqList: null,
      faqSelected: null
    };
    return _this;
  }

  _createClass(App, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      _helpers2.default.getFaqs().then(function (faqs) {
        var newFaqList = faqs.group(function (item) {
          return item.category_name;
        });
        _this2.setState(function () {
          return {
            originalFaqList: faqs,
            faqList: newFaqList
          };
        }, function () {
          if (newFaqList.length > 0) {
            _this2.handleChange(newFaqList[0].data[0]);
          }
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        { className: 'trifold-content' },
        _react2.default.createElement(
          'div',
          { className: 'trifold-middle faq col-faq' },
          _react2.default.createElement(
            'h1',
            { className: 'title' },
            'FAQs'
          ),
          !this.state.faqList ? _react2.default.createElement(
            'p',
            null,
            'Loading'
          ) : this.state.faqList.map(function (category) {
            return _react2.default.createElement(
              'div',
              { key: category.key },
              _react2.default.createElement(
                'p',
                { className: 'paragraph' },
                category.key,
                ':'
              ),
              _react2.default.createElement(
                'ul',
                { className: 'misc-menu faq-link' },
                category.data.map(function (question, index) {
                  return _react2.default.createElement(
                    'li',
                    { key: 'question-' + index },
                    _react2.default.createElement(
                      'span',
                      { className: 'link faq neutral-0', onClick: function onClick() {
                          return _this3.handleChange(question);
                        } },
                      question.question
                    )
                  );
                })
              )
            );
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'trifold-data col-faq' },
          !this.state.faqSelected ? _react2.default.createElement(
            'p',
            null,
            'Loading'
          ) : _react2.default.createElement(FaqSelected, { faqSelected: this.state.faqSelected })
        )
      );
    }
  }]);

  return App;
}(_react2.default.Component);

exports.default = App;

/***/ }),

/***/ 885:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = __webpack_require__(26);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var faq = {
  getFaqs: function getFaqs() {
    return _axios2.default.get('/rest/faqs/').then(function (data) {
      return data.data;
    }).catch(function (error) {
      return error.response.data;
    });
  },
  getFaqById: function getFaqById(id) {
    return _axios2.default.get('/rest/faqs/' + id).then(function (data) {
      return data.data;
    }).catch(function (error) {
      return error.response.data;
    });
  }
};

exports.default = faq;

/***/ })

},[883]);