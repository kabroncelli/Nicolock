webpackJsonp([6],{

/***/ 303:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = __webpack_require__(26);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var contractorList = {
  getContractors: function getContractors() {
    return _axios2.default.get('/rest/contractor-list/').then(function (data) {
      return data.data;
    }).catch(function (error) {
      return error.response.data;
    });
  },
  removeContractor: function removeContractor(csrfToken, contractorId, currentContractorIds) {
    var config = {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken
      }
    };
    var newContractorIds = currentContractorIds.filter(function (id) {
      return id !== contractorId;
    });
    return _axios2.default.patch('/rest/contractor-list/', {
      'contractors': newContractorIds
    }, config).then(function (data) {
      return data.data;
    }).catch(function (error) {
      return error.response.data;
    });
  },
  saveCompanyProfile: function saveCompanyProfile(csrfToken, field, value) {
    var config = {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken
      }
    };
    return _axios2.default.patch('/rest/users/me/company-profile', _defineProperty({}, field, value), config).catch(function (error) {
      return error.response.data;
    });
  }
};

exports.default = contractorList;

/***/ }),

/***/ 889:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(17);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _ContractorList = __webpack_require__(890);

var _ContractorList2 = _interopRequireDefault(_ContractorList);

var _ProfileApp = __webpack_require__(892);

var _ProfileApp2 = _interopRequireDefault(_ProfileApp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var listAppContainer = document.getElementById('contractor-list');
if (listAppContainer) {
  var isEditable = listAppContainer.getAttribute('data-editable');
  isEditable = JSON.parse(isEditable);
  _reactDom2.default.render(_react2.default.createElement(_ContractorList2.default, {
    editable: isEditable }), listAppContainer);
}

var profileAppContainer = document.getElementById('contractor-profile');
if (profileAppContainer) {
  var editable = profileAppContainer.getAttribute('data-editable');
  editable = JSON.parse(editable);
  _reactDom2.default.render(_react2.default.createElement(_ProfileApp2.default, {
    name: profileAppContainer.getAttribute('data-name'),
    address_line_1: profileAppContainer.getAttribute('data-address-1'),
    address_line_2: profileAppContainer.getAttribute('data-address-2'),
    city: profileAppContainer.getAttribute('data-city'),
    state: profileAppContainer.getAttribute('data-state'),
    postal_code: profileAppContainer.getAttribute('data-postal-code'),
    website: profileAppContainer.getAttribute('data-website'),
    phone: profileAppContainer.getAttribute('data-phone'),
    email: profileAppContainer.getAttribute('data-email'),
    contact: profileAppContainer.getAttribute('data-contact'),
    area: profileAppContainer.getAttribute('data-area'),
    specialties: profileAppContainer.getAttribute('data-specialties'),
    description: profileAppContainer.getAttribute('data-description'),
    editable: editable }), profileAppContainer);
}

/***/ }),

/***/ 890:
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

var _helpers = __webpack_require__(303);

var _helpers2 = _interopRequireDefault(_helpers);

var _universalCookie = __webpack_require__(48);

var _universalCookie2 = _interopRequireDefault(_universalCookie);

var _Contractors = __webpack_require__(891);

var _Contractors2 = _interopRequireDefault(_Contractors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContractorList = function (_React$Component) {
  _inherits(ContractorList, _React$Component);

  function ContractorList(props) {
    _classCallCheck(this, ContractorList);

    var _this = _possibleConstructorReturn(this, (ContractorList.__proto__ || Object.getPrototypeOf(ContractorList)).call(this, props));

    _this.removeContractor = function (contractorId) {
      if (_this.state.contractorList.length > 0) {
        var contractorIds = _this.state.contractorList.map(function (contractor) {
          return contractor.id;
        });
        var contractors = _helpers2.default.removeContractor(_this.csrfToken, contractorId, contractorIds);
        contractors.then(function (contractorList) {
          _this.setState({
            contractorList: contractorList.contractor_list
          });
        });
      }
    };

    _this.state = {
      contractorList: []
    };
    if (props.editable) {
      var cookies = new _universalCookie2.default();
      _this.csrfToken = cookies.get('csrftoken');
    }
    return _this;
  }

  _createClass(ContractorList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var contractors = _helpers2.default.getContractors();
      contractors.then(function (contractorList) {
        _this2.setState({
          contractorList: contractorList.contractor_list
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_Contractors2.default, {
        contractorList: this.state.contractorList,
        removeContractor: this.props.editable ? this.removeContractor : undefined });
    }
  }]);

  return ContractorList;
}(_react2.default.Component);

ContractorList.propTypes = {
  editable: _propTypes2.default.bool.isRequired
};
exports.default = ContractorList;

/***/ }),

/***/ 891:
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

var Contractors = function Contractors(_ref) {
  var contractorList = _ref.contractorList,
      removeContractor = _ref.removeContractor;

  var removeClick = function removeClick(e, contractorId) {
    e.preventDefault();
    if (removeContractor) {
      removeContractor(contractorId);
    }
  };

  var contractors = contractorList.filter(function (contractor) {
    return contractor.companyprofile !== null;
  });

  return _react2.default.createElement(
    'div',
    { className: 'homeowner-contractor-wrap' },
    contractors.map(function (contractor) {
      return _react2.default.createElement(
        'div',
        { key: contractor.id, className: 'homeowner-contractor' },
        removeContractor && _react2.default.createElement(
          'span',
          { className: 'remove', onClick: function onClick(e) {
              return removeClick(e, contractor.id);
            } },
          _react2.default.createElement(
            'svg',
            { version: '1.1', xmlns: 'http://www.w3.org/2000/svg', x: '0px', y: '0px', viewBox: '0 0 486.4 486.4', xmlSpace: 'preserve' },
            _react2.default.createElement('path', { d: 'M446,70H344.8V53.5c0-29.5-24-53.5-53.5-53.5h-96.2c-29.5,0-53.5,24-53.5,53.5V70H40.4c-7.5,0-13.5,6-13.5,13.5 S32.9,97,40.4,97h24.4v317.2c0,39.8,32.4,72.2,72.2,72.2h212.4c39.8,0,72.2-32.4,72.2-72.2V97H446c7.5,0,13.5-6,13.5-13.5 S453.5,70,446,70z M168.6,53.5c0-14.6,11.9-26.5,26.5-26.5h96.2c14.6,0,26.5,11.9,26.5,26.5V70H168.6V53.5z M394.6,414.2 c0,24.9-20.3,45.2-45.2,45.2H137c-24.9,0-45.2-20.3-45.2-45.2V97h302.9v317.2H394.6z' }),
            _react2.default.createElement('path', { d: 'M243.2,411c7.5,0,13.5-6,13.5-13.5V158.9c0-7.5-6-13.5-13.5-13.5s-13.5,6-13.5,13.5v238.5 C229.7,404.9,235.7,411,243.2,411z' }),
            _react2.default.createElement('path', { d: 'M155.1,396.1c7.5,0,13.5-6,13.5-13.5V173.7c0-7.5-6-13.5-13.5-13.5s-13.5,6-13.5,13.5v208.9 C141.6,390.1,147.7,396.1,155.1,396.1z' }),
            _react2.default.createElement('path', { d: 'M331.3,396.1c7.5,0,13.5-6,13.5-13.5V173.7c0-7.5-6-13.5-13.5-13.5s-13.5,6-13.5,13.5v208.9 C317.8,390.1,323.8,396.1,331.3,396.1z' })
          )
        ),
        _react2.default.createElement(
          'span',
          { className: 'title' },
          contractor.companyprofile.name
        ),
        _react2.default.createElement(
          'span',
          { className: 'address' },
          contractor.companyprofile.address_line_1
        ),
        _react2.default.createElement(
          'span',
          { className: 'address' },
          contractor.companyprofile.address_line_2
        ),
        _react2.default.createElement(
          'span',
          { className: 'address' },
          contractor.companyprofile.city,
          ', ',
          contractor.companyprofile.state,
          ' ',
          contractor.companyprofile.postal_code
        ),
        _react2.default.createElement(
          'span',
          { className: 'phone' },
          contractor.companyprofile.phone
        )
      );
    })
  );
};

Contractors.propTypes = {
  contractorList: _propTypes2.default.array,
  removeContractor: _propTypes2.default.func
};

Contractors.defaultProps = {
  contractorList: []
};

exports.default = Contractors;

/***/ }),

/***/ 892:
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

var _helpers = __webpack_require__(303);

var _helpers2 = _interopRequireDefault(_helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContractorProfile = function (_React$Component) {
  _inherits(ContractorProfile, _React$Component);

  function ContractorProfile(props) {
    _classCallCheck(this, ContractorProfile);

    var _this = _possibleConstructorReturn(this, (ContractorProfile.__proto__ || Object.getPrototypeOf(ContractorProfile)).call(this, props));

    _this.state = {
      name: props.name,
      address_line_1: props.address_line_1,
      address_line_2: props.address_line_2,
      city: props.city,
      state: props.state,
      postal_code: props.postal_code,
      website: props.website,
      phone: props.phone,
      email: props.email,
      contact: props.contact,
      area: props.area,
      specialties: props.specialties,
      description: props.description,
      editable: props.editable,
      message: '',
      messageVisible: false
    };
    var cookies = new _universalCookie2.default();
    _this.csrfToken = cookies.get('csrftoken');

    _this.handleAddressLine1 = _this.updateField.bind(_this, 'address_line_1');
    _this.handleAddressLine2 = _this.updateField.bind(_this, 'address_line_2');
    _this.handleCity = _this.updateField.bind(_this, 'city');
    _this.handleState = _this.updateField.bind(_this, 'state');
    _this.handlePostalCode = _this.updateField.bind(_this, 'postal_code');
    _this.handleWebsite = _this.updateField.bind(_this, 'website');
    _this.handlePhone = _this.updateField.bind(_this, 'phone');
    _this.handleEmail = _this.updateField.bind(_this, 'email');
    _this.handleContact = _this.updateField.bind(_this, 'contact');
    _this.handleArea = _this.updateField.bind(_this, 'area');
    _this.handleSpecialties = _this.updateField.bind(_this, 'specialties');
    _this.handleDescription = _this.updateField.bind(_this, 'description');
    _this.saveProfileField = _this.saveProfileField.bind(_this);
    return _this;
  }

  _createClass(ContractorProfile, [{
    key: 'updateField',
    value: function updateField(field, event) {
      this.setState(_defineProperty({}, field, event.target.value));
    }
  }, {
    key: 'saveProfileField',
    value: function saveProfileField(event) {
      var _this2 = this;

      var updatedField = _helpers2.default.saveCompanyProfile(this.csrfToken, event.target.name, event.target.value);
      updatedField.then(function (response) {
        if (response.status === 200) {
          _this2.setState({
            message: 'Your profile has been saved',
            messageVisible: true
          });
          setTimeout(function () {
            _this2.setState({
              messageVisible: false
            });
          }, 2000);
        } else {
          _this2.setState({
            message: 'There was a problem saving your profile',
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
        'form',
        { className: 'companyprofile-form' },
        _react2.default.createElement(
          'div',
          { className: 'input-group address-group' },
          _react2.default.createElement(
            'label',
            { className: 'label' },
            'Address:'
          ),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement('input', { className: 'input ' + (this.props.editable ? 'has-icon' : ''), disabled: !this.props.editable, name: 'address_line_1', value: this.state.address_line_1, onChange: this.handleAddressLine1, onBlur: this.saveProfileField }),
            _react2.default.createElement('input', { className: 'input ' + (this.props.editable ? 'has-icon' : ''), disabled: !this.props.editable, name: 'address_line_2', value: this.state.address_line_2, onChange: this.handleAddressLine2, onBlur: this.saveProfileField }),
            _react2.default.createElement(
              'div',
              { className: 'state-data' },
              _react2.default.createElement('input', { className: 'input ' + (this.props.editable ? 'has-icon' : ''), disabled: !this.props.editable, name: 'city', value: this.state.city, onChange: this.handleCity, onBlur: this.saveProfileField }),
              _react2.default.createElement('input', { className: 'input ' + (this.props.editable ? 'has-icon' : ''), disabled: !this.props.editable, name: 'state', value: this.state.state, onChange: this.handleState, onBlur: this.saveProfileField }),
              _react2.default.createElement('input', { className: 'input ' + (this.props.editable ? 'has-icon' : ''), disabled: !this.props.editable, name: 'postal_code', value: this.state.postal_code, onChange: this.handlePostalCode, onBlur: this.saveProfileField })
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'input-group' },
          _react2.default.createElement(
            'label',
            { className: 'label' },
            'Website:'
          ),
          _react2.default.createElement('input', { className: 'input ' + (this.props.editable ? 'has-icon' : ''), disabled: !this.props.editable, name: 'website', value: this.state.website, onChange: this.handleWebsite, onBlur: this.saveProfileField })
        ),
        _react2.default.createElement(
          'div',
          { className: 'input-group' },
          _react2.default.createElement(
            'label',
            { className: 'label' },
            'Phone:'
          ),
          _react2.default.createElement('input', { className: 'input ' + (this.props.editable ? 'has-icon' : ''), disabled: !this.props.editable, name: 'phone', value: this.state.phone, onChange: this.handlePhone, onBlur: this.saveProfileField })
        ),
        _react2.default.createElement(
          'div',
          { className: 'input-group' },
          _react2.default.createElement(
            'label',
            { className: 'label' },
            'Email:'
          ),
          _react2.default.createElement('input', { className: 'input ' + (this.props.editable ? 'has-icon' : ''), disabled: !this.props.editable, name: 'email', value: this.state.email, onChange: this.handleEmail, onBlur: this.saveProfileField })
        ),
        _react2.default.createElement(
          'div',
          { className: 'input-group' },
          _react2.default.createElement(
            'label',
            { className: 'label' },
            'Contact Person:'
          ),
          _react2.default.createElement('input', { className: 'input ' + (this.props.editable ? 'has-icon' : ''), disabled: !this.props.editable, name: 'contact_name', value: this.state.contact, onChange: this.handleContact, onBlur: this.saveProfileField })
        ),
        _react2.default.createElement(
          'div',
          { className: 'input-group' },
          _react2.default.createElement(
            'label',
            { className: 'label' },
            'Areas Covered:'
          ),
          _react2.default.createElement('input', { className: 'input ' + (this.props.editable ? 'has-icon' : ''), disabled: !this.props.editable, name: 'area_covered', value: this.state.area, onChange: this.handleArea, onBlur: this.saveProfileField })
        ),
        _react2.default.createElement(
          'div',
          { className: 'input-group' },
          _react2.default.createElement(
            'label',
            { className: 'label' },
            'Specialties:'
          ),
          _react2.default.createElement('input', { className: 'input ' + (this.props.editable ? 'has-icon' : ''), disabled: !this.props.editable, name: 'specialties', value: this.state.specialties, onChange: this.handleSpecialties, onBlur: this.saveProfileField })
        ),
        _react2.default.createElement(
          'div',
          { className: 'input-group' },
          _react2.default.createElement(
            'label',
            { className: 'label' },
            'Description:'
          ),
          _react2.default.createElement('input', { className: 'input ' + (this.props.editable ? 'has-icon' : ''), disabled: !this.props.editable, name: 'description', value: this.state.description, onChange: this.handleDescription, onBlur: this.saveProfileField })
        ),
        _react2.default.createElement(
          'p',
          { className: 'message ' + (this.state.messageVisible ? 'is-visible' : '') },
          this.state.message
        )
      );
    }
  }]);

  return ContractorProfile;
}(_react2.default.Component);

;

ContractorProfile.propTypes = {
  name: _propTypes2.default.string.isRequired,
  address_line_1: _propTypes2.default.string.isRequired,
  address_line_2: _propTypes2.default.string,
  city: _propTypes2.default.string.isRequired,
  state: _propTypes2.default.string.isRequired,
  postal_code: _propTypes2.default.string.isRequired,
  website: _propTypes2.default.string.isRequired,
  phone: _propTypes2.default.string.isRequired,
  email: _propTypes2.default.string.isRequired,
  contact: _propTypes2.default.string.isRequired,
  area: _propTypes2.default.string.isRequired,
  specialties: _propTypes2.default.string.isRequired,
  description: _propTypes2.default.string.isRequired,
  editable: _propTypes2.default.bool.isRequired
};

exports.default = ContractorProfile;

/***/ })

},[889]);