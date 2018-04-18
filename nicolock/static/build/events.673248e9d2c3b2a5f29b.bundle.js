webpackJsonp([3],{

/***/ 924:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(17);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _App = __webpack_require__(925);

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(_App2.default, null), document.getElementById('events'));

/***/ }),

/***/ 925:
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

var _moment = __webpack_require__(1);

var _moment2 = _interopRequireDefault(_moment);

var _DatePicker = __webpack_require__(927);

var _DatePicker2 = _interopRequireDefault(_DatePicker);

var _Calendar = __webpack_require__(928);

var _Calendar2 = _interopRequireDefault(_Calendar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.dateChanged = function (date) {
      _this.setState({ date: date });
    };

    _this.state = {
      date: props.date || (0, _moment2.default)()
    };
    return _this;
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'h1',
            { className: 'title' },
            'Events &',
            _react2.default.createElement('br', null),
            'Training'
          ),
          _react2.default.createElement(_DatePicker2.default, {
            date: this.state.date,
            dateChange: this.dateChanged })
        ),
        _react2.default.createElement(_Calendar2.default, {
          date: this.state.date,
          dateChange: this.dateChanged })
      );
    }
  }]);

  return App;
}(_react2.default.Component);

App.propTypes = {
  date: _propTypes2.default.object
};
exports.default = App;

/***/ }),

/***/ 927:
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

var _moment = __webpack_require__(1);

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Datepicker = function (_React$Component) {
  _inherits(Datepicker, _React$Component);

  function Datepicker(props) {
    _classCallCheck(this, Datepicker);

    var _this = _possibleConstructorReturn(this, (Datepicker.__proto__ || Object.getPrototypeOf(Datepicker)).call(this, props));

    _this.monthChange = function (e) {
      var stringEntered = e.target.value.replace(' ', '');
      if (stringEntered.length > 2) {
        return null;
      }
      _this.setState({
        monthInput: stringEntered
      });
      var valueEntered = parseInt(stringEntered);
      if (isNaN(valueEntered)) {
        return null;
      }
      if (valueEntered < 1 || valueEntered > 12) {
        return null;
      }
      // If the input was actually valid we can save it
      _this.setState({ month: valueEntered });
    };

    _this.dayChange = function (e) {
      var stringEntered = e.target.value.replace(' ', '');
      if (stringEntered.length > 2) {
        return null;
      }
      _this.setState({
        dayInput: stringEntered
      });
      var valueEntered = parseInt(stringEntered);
      if (isNaN(valueEntered)) {
        return null;
      }
      if (valueEntered < 1 || valueEntered > 31) {
        return null;
      }
      // If the input was actually valid we can save it
      _this.setState({ day: valueEntered });
    };

    _this.yearChange = function (e) {
      var stringEntered = e.target.value.replace(' ', '');
      if (stringEntered.length > 4) {
        return null;
      }
      _this.setState({
        yearInput: stringEntered
      });
      var valueEntered = parseInt(stringEntered);
      if (isNaN(valueEntered)) {
        return null;
      }
      // If the input was actually valid we can save it
      _this.setState({ year: valueEntered });
    };

    _this.findEventsSubmit = function (e) {
      e.preventDefault();
      var newDate = (0, _moment2.default)(_this.state.month + '-' + _this.state.day + '-' + _this.state.year, 'M-D-YYYY');
      _this.props.dateChange(newDate);
      _this.setState(_this.getStateFromDate(newDate));
    };

    _this.state = _this.getStateFromDate(props.date);
    return _this;
  }

  _createClass(Datepicker, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      var date = props.date || (0, _moment2.default)();
      this.setState(this.getStateFromDate(date));
    }
  }, {
    key: 'getStateFromDate',
    value: function getStateFromDate(date) {
      return {
        monthInput: date.format('MM'),
        dayInput: date.format('DD'),
        yearInput: date.format('YYYY'),
        month: date.format('MM'),
        day: date.format('DD'),
        year: date.format('YYYY')
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'form',
        { onSubmit: this.findEventsSubmit, className: 'row picker-wrap' },
        _react2.default.createElement(
          'span',
          { className: 'text' },
          'Search',
          _react2.default.createElement('br', null),
          'by date'
        ),
        _react2.default.createElement(
          'div',
          { className: 'picker' },
          _react2.default.createElement('input', {
            onChange: this.monthChange,
            value: this.state.monthInput,
            type: 'text', placeholder: '--' }),
          ' /',
          _react2.default.createElement('input', {
            onChange: this.dayChange,
            value: this.state.dayInput,
            type: 'text',
            placeholder: '--' }),
          ' /',
          _react2.default.createElement('input', {
            onChange: this.yearChange,
            value: this.state.yearInput,
            type: 'text', placeholder: '--' })
        ),
        _react2.default.createElement(
          'button',
          { className: 'btn btn-sm hollow' },
          'Find events'
        )
      );
    }
  }]);

  return Datepicker;
}(_react2.default.Component);

Datepicker.propTypes = {
  dateChange: _propTypes2.default.func.isRequired,
  date: _propTypes2.default.object.isRequired
};
exports.default = Datepicker;

/***/ }),

/***/ 928:
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

var _moment = __webpack_require__(1);

var _moment2 = _interopRequireDefault(_moment);

var _helpers = __webpack_require__(929);

var _helpers2 = _interopRequireDefault(_helpers);

var _CalendarDay = __webpack_require__(930);

var _CalendarDay2 = _interopRequireDefault(_CalendarDay);

var _CalendarControl = __webpack_require__(931);

var _CalendarControl2 = _interopRequireDefault(_CalendarControl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Calendar = function (_React$Component) {
  _inherits(Calendar, _React$Component);

  function Calendar(props) {
    _classCallCheck(this, Calendar);

    var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props));

    _this.moveCalendarForward = function (e) {
      e.preventDefault();
      var newDate = _this.state.date.clone().endOf('month').add(1, 'days');
      _this.setState(_this.getStateFromDate(newDate));
      _this.props.dateChange(newDate);
      _this.loadEventsForDate(newDate);
    };

    _this.moveCalendarBackward = function (e) {
      e.preventDefault();
      var newDate = _this.state.date.clone().startOf('month').subtract(1, 'days');
      _this.setState(_this.getStateFromDate(newDate));
      _this.props.dateChange(newDate);
      _this.loadEventsForDate(newDate);
    };

    var date = _this.props.date || (0, _moment2.default)();
    _this.state = _this.getStateFromDate(date);
    _this.state.events = [];
    return _this;
  }

  _createClass(Calendar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.loadEventsForDate(this.state.date);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      var date = props.date || (0, _moment2.default)();
      this.setState(this.getStateFromDate(date));
      this.loadEventsForDate(date);
    }
  }, {
    key: 'loadEventsForDate',
    value: function loadEventsForDate(date) {
      var _this2 = this;

      _helpers2.default.getEvents(date.format('M'), date.format('YYYY')).then(function (events) {
        _this2.setState({ events: events });
      });
    }
  }, {
    key: 'getStateFromDate',
    value: function getStateFromDate(date) {
      return {
        date: date,
        currentMonth: date.format('MMMM'),
        currentYear: date.format('YYYY'),
        weeks: this.getWeeks(date)
      };
    }
  }, {
    key: 'getWeeks',
    value: function getWeeks(date) {
      var firstDay = date.clone().startOf('month');
      var lastDay = date.clone().endOf('month');
      // Need to start counting from a sunday
      // use the weekday() function to find out how many
      // days from the previous month we need and
      // how many days from the next month
      firstDay.subtract(firstDay.weekday(), 'days');
      lastDay.add(6 - lastDay.weekday(), 'days');

      var currentDate = firstDay.clone();
      var weeks = [];
      var currentRow = 0;
      while (currentDate.isBefore(lastDay)) {
        weeks.push([]);
        for (var i = 0; i < 7; i++) {
          weeks[currentRow].push(currentDate.clone());
          currentDate.add(1, 'days');
        }
        currentRow++;
      }
      return weeks;
    }
  }, {
    key: 'renderCalendar',
    value: function renderCalendar() {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'calendar-header' },
          _moment2.default.weekdays().map(function (day, index) {
            return _react2.default.createElement(
              'span',
              { key: index },
              day
            );
          })
        ),
        this.state.weeks.map(function (week, index) {
          return _react2.default.createElement(
            'div',
            { className: 'calendar-row', key: index },
            week.map(function (day) {
              return _react2.default.createElement(_CalendarDay2.default, {
                dayNumber: parseInt(day.format('D')),
                events: _this3.state.events.filter(function (event) {
                  return (0, _moment2.default)(event.start_date, 'YYYY-MM-DD').format('MDY') === day.format('MDY');
                }),
                key: day.format('MDY') });
            })
          );
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'calendar' },
        _react2.default.createElement(_CalendarControl2.default, {
          forwardClick: this.moveCalendarForward,
          backwardClick: this.moveCalendarBackward,
          month: this.state.currentMonth }),
        this.renderCalendar()
      );
    }
  }]);

  return Calendar;
}(_react2.default.Component);

Calendar.propTypes = {
  date: _propTypes2.default.object,
  dateChange: _propTypes2.default.func
};
exports.default = Calendar;

/***/ }),

/***/ 929:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = __webpack_require__(26);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var helpers = {
  getEvents: function getEvents(month, year) {
    return _axios2.default.get('/rest/events/?month=' + month + '&' + year).then(function (data) {
      return data.data;
    }).catch(function (error) {
      return error.response.data;
    });
  }
};

exports.default = helpers;

/***/ }),

/***/ 930:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(3);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CalendarDay = function CalendarDay(_ref) {
  var dayNumber = _ref.dayNumber,
      events = _ref.events;

  return _react2.default.createElement(
    'div',
    { className: 'day' },
    _react2.default.createElement(
      'span',
      { className: 'day-number' },
      dayNumber
    ),
    _react2.default.createElement(
      'div',
      { className: 'day-events' },
      events.map(function (event) {
        return _react2.default.createElement(
          'a',
          { className: 'link neutral-0', href: '/events/' + event.slug, key: event.id },
          event.name
        );
      })
    )
  );
};

CalendarDay.propTypes = {
  dayNumber: _propTypes2.default.number,
  events: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    id: _propTypes2.default.number,
    name: _propTypes2.default.string,
    slug: _propTypes2.default.string
  }))
};

exports.default = CalendarDay;

/***/ }),

/***/ 931:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(3);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CalendarControl = function CalendarControl(_ref) {
  var backwardClick = _ref.backwardClick,
      forwardClick = _ref.forwardClick,
      month = _ref.month;

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'div',
      { className: 'calendar-control' },
      _react2.default.createElement(
        'div',
        { className: 'controls' },
        _react2.default.createElement('a', { className: 'calendar-back', onClick: backwardClick, href: '#' }),
        _react2.default.createElement(
          'span',
          null,
          month
        ),
        _react2.default.createElement('a', { className: 'calendar-forward', onClick: forwardClick, href: '#' })
      )
    )
  );
};

CalendarControl.propTypes = {
  month: _propTypes2.default.string.isRequired,
  backwardClick: _propTypes2.default.func.isRequired,
  forwardClick: _propTypes2.default.func.isRequired
};

exports.default = CalendarControl;

/***/ })

},[924]);