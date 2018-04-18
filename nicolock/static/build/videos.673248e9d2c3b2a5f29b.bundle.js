webpackJsonp([7],{

/***/ 877:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(17);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _App = __webpack_require__(878);

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var appContainter = document.getElementById('app');
_reactDom2.default.render(_react2.default.createElement(_App2.default, {
  resourceUrl: appContainter.getAttribute('data-url'),
  resourceType: appContainter.getAttribute('data-type'),
  description: appContainter.getAttribute('data-desc') }), appContainter);

/***/ }),

/***/ 878:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _helpers = __webpack_require__(879);

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
      tags: [],
      videos: []
    };
    _this.filterVideos = _this.filterVideos.bind(_this);
    return _this;
  }

  _createClass(App, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      var tagsPromise = _helpers2.default.getTags();
      var videosPromise = _helpers2.default.getVideos();
      tagsPromise.then(function (tags) {
        return _this2.setState({
          tags: tags
        });
      });
      videosPromise.then(function (videos) {
        return _this2.setState({
          videos: videos
        });
      });
    }
  }, {
    key: 'renderTagItems',
    value: function renderTagItems(tags) {
      return tags.map(function (tag, id) {
        return _react2.default.createElement(
          'option',
          { key: 'tag-' + id, className: 'tag', value: tag.id },
          tag.name
        );
      });
    }
  }, {
    key: 'renderVideoItems',
    value: function renderVideoItems(videos) {
      return videos.map(function (video, id) {
        var youtubeVideoUrl = '';
        var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        var match = video.url.match(regExp);
        if (match && match[2].length === 11) {
          youtubeVideoUrl = match[2];
        }
        return _react2.default.createElement(
          'div',
          { className: 'video-content', key: 'video-' + id },
          _react2.default.createElement(
            'a',
            { className: 'link', href: video.slug },
            _react2.default.createElement('img', { className: 'video-img', src: 'https://img.youtube.com/vi/' + youtubeVideoUrl + '/sddefault.jpg' }),
            _react2.default.createElement(
              'h6',
              { className: 'title' },
              video.name
            )
          )
        );
      });
    }
  }, {
    key: 'filterVideos',
    value: function filterVideos(tag) {
      var _this3 = this;

      var id = tag.target.value;
      if (id === 'all') {
        var videosPromise = _helpers2.default.getVideos();
        videosPromise.then(function (videos) {
          return _this3.setState({
            videos: videos
          });
        });
      } else {
        var _videosPromise = _helpers2.default.getVideosByTag(id);
        _videosPromise.then(function (videos) {
          return _this3.setState({
            videos: videos
          });
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'trifold-content' },
        _react2.default.createElement(
          'div',
          { className: 'trifold-middle' },
          _react2.default.createElement(
            'div',
            { className: 'video-filter' },
            _react2.default.createElement(
              'span',
              null,
              'SORT BY: '
            ),
            _react2.default.createElement(
              'div',
              { className: 'filter-dropdown-wrap' },
              _react2.default.createElement(
                'div',
                { className: 'input-group' },
                _react2.default.createElement(
                  'label',
                  { className: 'select' },
                  _react2.default.createElement(
                    'select',
                    { onChange: this.filterVideos },
                    _react2.default.createElement(
                      'option',
                      { className: 'tag', value: 'all' },
                      'All'
                    ),
                    this.renderTagItems(this.state.tags)
                  )
                )
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'video-wrap' },
            this.renderVideoItems(this.state.videos)
          )
        ),
        _react2.default.createElement('div', { className: 'trifold-data' })
      );
    }
  }]);

  return App;
}(_react2.default.Component);

;

exports.default = App;

/***/ }),

/***/ 879:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = __webpack_require__(26);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var video = {
  getTags: function getTags() {
    return _axios2.default.get('/rest/tags').then(function (data) {
      return data.data;
    }).catch(function (error) {
      return error.response.data;
    });
  },
  getVideos: function getVideos() {
    return _axios2.default.get('/rest/videos').then(function (data) {
      return data.data;
    }).catch(function (error) {
      return error.response.data;
    });
  },
  getVideosByTag: function getVideosByTag(tagId) {
    return _axios2.default.get('/rest/tags/' + tagId + '/videos').then(function (data) {
      return data.data;
    }).catch(function (error) {
      return error.response.data;
    });
  }
};

exports.default = video;

/***/ })

},[877]);