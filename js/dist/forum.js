/******/ (() => { // webpackBootstrap
/******/ 	// runtime can't be in strict mode because a global variable is assign and maybe created.
/******/ 	var __webpack_modules__ = ({

/***/ "./src/common/index.js":
/*!*****************************!*\
  !*** ./src/common/index.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_common_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/app */ "flarum/common/app");
/* harmony import */ var flarum_common_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_app__WEBPACK_IMPORTED_MODULE_0__);

flarum_common_app__WEBPACK_IMPORTED_MODULE_0___default().initializers.add('retechvn/mediated-transaction', function () {
  console.log('[retechvn/mediated-transaction] Hello, forum and admin!');
});

/***/ }),

/***/ "./src/forum/components/DetailTransactionModal.js":
/*!********************************************************!*\
  !*** ./src/forum/components/DetailTransactionModal.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DetailTransactionModal)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/Modal */ "flarum/components/Modal");
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/LoadingIndicator */ "flarum/components/LoadingIndicator");
/* harmony import */ var flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_3__);




var DetailTransactionModal = /*#__PURE__*/function (_Modal) {
  function DetailTransactionModal() {
    return _Modal.apply(this, arguments) || this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(DetailTransactionModal, _Modal);
  var _proto = DetailTransactionModal.prototype;
  _proto.oninit = function oninit(vnode) {
    _Modal.prototype.oninit.call(this, vnode);
    this.transId = this.attrs.transId;
    this.currentUserId = this.attrs.userId;
    this.loading = true;
    this.moreResults = false;
    this.tranlogs = [];
    this.loadData(this.transId);
  };
  _proto.parseResults = function parseResults(results) {
    this.moreResults = !!results.payload.links && !!results.payload.links.next;
    [].push.apply(this.tranlogs, results.payload.data);
    this.loading = false;
    m.redraw();
    return results;
  };
  _proto.loadData = function loadData(transID, offset) {
    if (offset === void 0) {
      offset = 0;
    }
    flarum_app__WEBPACK_IMPORTED_MODULE_2___default().store.find('transaction-logs', {
      filter: {
        transactionId: transID
      },
      page: {
        offset: offset
      }
    })["catch"](function () {}).then(this.parseResults.bind(this));
  };
  _proto.title = function title() {
    return 'Chi tiết giao dịch';
  };
  _proto.content = function content() {
    var _this = this;
    if (this.loading) {
      return m("div", {
        className: "Modal-body"
      }, flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_3___default().component({
        size: 'large'
      }));
    }
    return m("div", {
      className: "Modal-body sideNavContainer"
    }, m("table", {
      className: "TransactionLogsTable rvn__table"
    }, m("thead", {
      "class": "rvn__thead"
    }, m("tr", {
      "class": "rvn__tr"
    }, m("th", {
      "class": "rvn__th"
    }, "STT"), m("th", {
      "class": "rvn__th"
    }, "Tr\u1EA1ng th\xE1i"), m("th", {
      "class": "rvn__th"
    }, "L\xFD do"), m("th", {
      "class": "rvn__th"
    }, "Ng\xE0y c\u1EADp nh\u1EADt"))), m("tbody", {
      "class": "rvn__tbody"
    }, this.tranlogs.length ? this.tranlogs.map(function (log, index) {
      return m("tr", {
        key: log.id,
        "class": "rvn__tr"
      }, m("td", {
        "class": "rvn__th"
      }, index + 1), m("td", {
        "class": "rvn__th"
      }, _this.showText(_this.currentUserId, log.attributes.creator, log.attributes.rvn_status, log.attributes.transaction)), m("td", {
        "class": "rvn__th"
      }, log.attributes.rvn_reason || 'N/A'), m("td", {
        "class": "rvn__th"
      }, log.attributes.updated_at));
    }) : m("tr", null, m("td", {
      "class": "rvn__th",
      colSpan: "6"
    }, "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u")))));
  };
  _proto.showText = function showText(currentId, creator, status, transaction) {
    var text = '';
    if (status == 1) {
      text = "[" + creator.username + "] \u0111\xE3 t\u1EA1o giao d\u1ECBch";
    }
    if (status == 2) {
      text = "[" + creator.username + "] \u0111\xE3 thanh to\xE1n giao d\u1ECBch";
    }
    if (status == 3) {
      text = "[" + creator.username + "] \u0111\xE3 ho\xE0n th\xE0nh giao d\u1ECBch";
    }
    if (status == 4) {
      text = "[" + creator.username + "] \u0111\xE3 h\u1EE7y giao d\u1ECBch";
    }
    if (status == 5) {
      text = "[" + creator.username + "] \u0111\xE3 khi\u1EBFu n\u1EA1i giao d\u1ECBch";
    }
    return text;
  };
  _proto.onsubmit = function onsubmit(event) {
    event.preventDefault();
  };
  _proto.className = function className() {
    return 'DetailTransactionModal';
  };
  return DetailTransactionModal;
}((flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1___default()));


/***/ }),

/***/ "./src/forum/components/PayRequestTransactionModal.js":
/*!************************************************************!*\
  !*** ./src/forum/components/PayRequestTransactionModal.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PayRequestTransactionModal)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/Modal */ "flarum/components/Modal");
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_3__);




var PayRequestTransactionModal = /*#__PURE__*/function (_Modal) {
  function PayRequestTransactionModal() {
    return _Modal.apply(this, arguments) || this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(PayRequestTransactionModal, _Modal);
  var _proto = PayRequestTransactionModal.prototype;
  _proto.oninit = function oninit(vnode) {
    _Modal.prototype.oninit.call(this, vnode);
    this.bankAccountName = ''; // Tên tài khoản ngân hàng
    this.bankAccountNumber = ''; // Số tài khoản ngân hàng
    this.bankName = ''; // Tên ngân hàng
    this.totalAmount = 500000; // Tổng số tiền có thể rút (có thể lấy từ API hoặc logic tính toán)
  };
  _proto.title = function title() {
    return 'Yêu cầu rút tiền';
  };
  _proto.content = function content() {
    var _this = this;
    return m("div", {
      className: "Modal-body"
    }, m("div", {
      className: "Form-group"
    }, m("label", null, "T\u1ED5ng s\u1ED1 ti\u1EC1n c\xF3 th\u1EC3 r\xFAt"), m("input", {
      className: "FormControl",
      type: "text",
      value: this.totalAmount,
      disabled: true
    })), m("div", {
      className: "Form-group"
    }, m("label", null, "T\xEAn t\xE0i kho\u1EA3n ng\xE2n h\xE0ng"), m("input", {
      className: "FormControl",
      type: "text",
      placeholder: "Nh\u1EADp t\xEAn t\xE0i kho\u1EA3n ng\xE2n h\xE0ng",
      value: this.bankAccountName,
      oninput: function oninput(e) {
        _this.bankAccountName = e.target.value;
      }
    })), m("div", {
      className: "Form-group"
    }, m("label", null, "S\u1ED1 t\xE0i kho\u1EA3n ng\xE2n h\xE0ng"), m("input", {
      className: "FormControl",
      type: "text",
      placeholder: "Nh\u1EADp s\u1ED1 t\xE0i kho\u1EA3n ng\xE2n h\xE0ng",
      value: this.bankAccountNumber,
      oninput: function oninput(e) {
        _this.bankAccountNumber = e.target.value;
      }
    })), m("div", {
      className: "Form-group"
    }, m("label", null, "T\xEAn ng\xE2n h\xE0ng"), m("input", {
      className: "FormControl",
      type: "text",
      placeholder: "Nh\u1EADp t\xEAn ng\xE2n h\xE0ng",
      value: this.bankName,
      oninput: function oninput(e) {
        _this.bankName = e.target.value;
      }
    })), m("div", {
      className: "Form-group"
    }, m((flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default()), {
      className: "Button Button--primary",
      type: "submit",
      loading: this.loading,
      onclick: function onclick() {
        _this.onSubmit();
      }
    }, "X\xE1c nh\u1EADn"), m((flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default()), {
      className: "Button Button--secondary",
      onclick: function onclick() {
        _this.onCancelConfirmed();
        _this.hide();
      }
    }, "H\u1EE7y b\u1ECF")));
  };
  _proto.showAlert = function showAlert(type, message, timeClear) {
    if (type === void 0) {
      type = 'success';
    }
    if (message === void 0) {
      message = '';
    }
    if (timeClear === void 0) {
      timeClear = 5000;
    }
    flarum_app__WEBPACK_IMPORTED_MODULE_2___default().alerts.show(Alert, {
      type: type
    }, message);
    setTimeout(function () {
      flarum_app__WEBPACK_IMPORTED_MODULE_2___default().alerts.clear();
    }, timeClear);
  }

  // Xử lý khi xác nhận yêu cầu rút tiền
  ;
  _proto.onSubmit = function onSubmit(event) {
    var _this2 = this;
    event.preventDefault();
    if (this.bankAccountName && this.bankAccountNumber && this.bankName) {
      var data = {
        rvn_bankacc_name: this.bankAccountName,
        rvn_bankacc_number: this.bankAccountNumber,
        rvn_bank_name: this.bankName,
        rvn_monney: this.totalAmount
      };
      // Gửi yêu cầu rút tiền (giả sử bạn có API hoặc logic xử lý tại đây)
      flarum_app__WEBPACK_IMPORTED_MODULE_2___default().request({
        method: 'POST',
        url: flarum_app__WEBPACK_IMPORTED_MODULE_2___default().forum.attribute('apiUrl') + '/pay-requests',
        body: {
          data: data
        }
      }).then(function (response) {
        _this2.showAlert('success', 'Yêu cầu rút tiền đã được gửi!', 5000);
        _this2.onCancelConfirmed();
        _this2.loading = false;
      })["catch"](function (error) {
        console.log(error);
        _this2.showAlert('error', 'Có lỗi xảy ra. Vui lòng thử lại!', 5000);
        _this2.loading = false;
      });
    }
  }

  // Xử lý khi hủy bỏ
  ;
  _proto.onCancelConfirmed = function onCancelConfirmed() {
    this.bankAccountName = '';
    this.bankAccountNumber = '';
    this.bankName = '';
  };
  _proto.className = function className() {
    return 'PayRequestTransactionModal';
  };
  return PayRequestTransactionModal;
}((flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1___default()));


/***/ }),

/***/ "./src/forum/components/QRModal.js":
/*!*****************************************!*\
  !*** ./src/forum/components/QRModal.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ QRModal)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/Modal */ "flarum/components/Modal");
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_3__);




var QRModal = /*#__PURE__*/function (_Modal) {
  function QRModal() {
    return _Modal.apply(this, arguments) || this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(QRModal, _Modal);
  var _proto = QRModal.prototype;
  _proto.oninit = function oninit(vnode) {
    _Modal.prototype.oninit.call(this, vnode);
  };
  _proto.title = function title() {
    return 'Thanh Toán Giao Dịch';
  };
  _proto.content = function content() {
    return m('.Modal-body .row', [m('.Form-group', {
      style: 'width: 100%; text-align: center;'
    }, [m('a', {
      href: 'https://me-qr.com',
      style: 'cursor:pointer;display:block',
      border: '0'
    }, [m('img', {
      src: 'https://cdn2.me-qr.com/qr/129980334.png?v=1728835376',
      alt: 'Create QR code for free'
    })])]), m('.Form-group ', {
      style: 'width: 100%;'
    }, [flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default().component({
      type: 'submit',
      className: 'Button Button--primary Button--block'
    }, 'Tiếp tục tạo giao dịch')])]);
  };
  _proto.onsubmit = function onsubmit(event) {
    event.preventDefault();
    this.attrs.onsubmit(true);
    flarum_app__WEBPACK_IMPORTED_MODULE_2___default().modal.close();
  };
  return QRModal;
}((flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1___default()));


/***/ }),

/***/ "./src/forum/components/TransactionHistoryList.js":
/*!********************************************************!*\
  !*** ./src/forum/components/TransactionHistoryList.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TransactionHistoryList)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/Component */ "flarum/Component");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_Component__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/components/LoadingIndicator */ "flarum/components/LoadingIndicator");
/* harmony import */ var flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_common_components_Dropdown__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/common/components/Dropdown */ "flarum/common/components/Dropdown");
/* harmony import */ var flarum_common_components_Dropdown__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Dropdown__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _DetailTransactionModal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./DetailTransactionModal */ "./src/forum/components/DetailTransactionModal.js");
/* harmony import */ var _UpdateStatusTransactionModal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./UpdateStatusTransactionModal */ "./src/forum/components/UpdateStatusTransactionModal.js");
/* harmony import */ var _PayRequestTransactionModal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./PayRequestTransactionModal */ "./src/forum/components/PayRequestTransactionModal.js");









var TransactionHistoryList = /*#__PURE__*/function (_Component) {
  function TransactionHistoryList() {
    return _Component.apply(this, arguments) || this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(TransactionHistoryList, _Component);
  var _proto = TransactionHistoryList.prototype;
  _proto.oninit = function oninit(vnode) {
    _Component.prototype.oninit.call(this, vnode);
    this.loading = true;
    this.moreResults = false;
    this.transactionHistory = [];
    this.monneyTransaction = {};
    this.user = this.attrs.params.user;
    this.loadResults();
  };
  _proto.getStatus = function getStatus(status, banks, monney, creator_id, create_status, revice_status) {
    if (!banks || banks.length === 0) return 1;
    var totalMonney = banks.reduce(function (total, transaction) {
      return total + parseFloat(transaction.rvn_amount);
    }, 0);
    var balance = totalMonney - monney;
    var isCurrentUser = this.user.id() === creator_id;
    if (status === 4) {
      return 4;
    }
    if (isCurrentUser) {
      if (status === 5) {
        if (create_status === 5) return 5;
        if (create_status === 3) return 6;
        return create_status;
      }
      if (balance >= 0) {
        if (create_status === 3) return 3;
        if ([1, 2].includes(status)) return 2;
        if (status === 3) return 3;
      }
      return 1;
    } else {
      if (status === 5) {
        if (revice_status === 5) return 5;
        if (revice_status === 3) return 6;
        return revice_status;
      }
      if (revice_status === 3) {
        return 3;
      }
      return 2;
    }
  };
  _proto.getStatusText = function getStatusText(status) {
    switch (status) {
      case 3:
        return 'Hoàn thành';
      case 4:
        return 'Đã hủy';
      case 5:
        return 'Đang khiếu nại';
      case 6:
        return 'Đang khiếu nại';
      default:
        return 'Đang xử lý';
    }
  };
  _proto.getStatusColor = function getStatusColor(status) {
    switch (status) {
      case 3:
        // Hoàn thành
        return 'green';
      case 4:
        // Đã hủy
        return 'red';
      case 1: // Đang xử lý
      case 2:
      case 5:
        return 'orange';
      case 6:
        return 'orange';
      default:
        return 'gray';
    }
  };
  _proto.view = function view() {
    var _this = this;
    var loading;
    if (this.loading) {
      loading = flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_4___default().component({
        size: 'large'
      });
    }
    var monneyData = this.monneyTransaction || {};
    return m("div", null, m("div", {
      style: "display: flex; justify-content: space-between;"
    }, m("div", {
      style: "padding-bottom:10px; font-size: 24px; font-weight: bold;"
    }, "L\u1ECBch s\u1EED giao d\u1ECBch"), m("button", {
      "class": "btn-withdraw",
      onclick: function onclick() {
        flarum_app__WEBPACK_IMPORTED_MODULE_3___default().modal.show(_PayRequestTransactionModal__WEBPACK_IMPORTED_MODULE_8__["default"]);
      }
    }, "R\xFAt Ti\u1EC1n")), m("div", {
      "class": "sideNavContainer"
    }, m("div", {
      "class": "container"
    }, m("div", {
      "class": "row"
    }, m("div", {
      "class": "col-12 col-md-6 col-lg-3"
    }, m("div", {
      "class": "card"
    }, m("div", {
      "class": "card-title"
    }, "\u0110\xE3 chuy\u1EC3n"), m("div", {
      "class": "card-value"
    }, this.formatCurrency(monneyData.total_monney_bank)))), m("div", {
      "class": "col-12 col-md-6 col-lg-3"
    }, m("div", {
      "class": "card"
    }, m("div", {
      "class": "card-title"
    }, "Ho\xE0n th\xE0nh job"), m("div", {
      "class": "card-value"
    }, this.formatCurrency(monneyData.total_to_pay)))), m("div", {
      "class": "col-12 col-md-6 col-lg-3"
    }, m("div", {
      "class": "card"
    }, m("div", {
      "class": "card-title"
    }, "\u0110\xE3 ho\xE0n tr\u1EA3"), m("div", {
      "class": "card-value"
    }, this.formatCurrency(0)))), m("div", {
      "class": "col-12 col-md-6 col-lg-3"
    }, m("div", {
      "class": "card"
    }, m("div", {
      "class": "card-title"
    }, "\u0110\u01B0\u1EE3c r\xFAt"), m("div", {
      "class": "card-value"
    }, this.formatCurrency(monneyData.total_to_receive))))), m("table", {
      "class": "rvn__table"
    }, m("thead", {
      "class": "rvn__thead"
    }, m("tr", {
      "class": "rvn__tr"
    }, m("th", {
      "class": "rvn__th"
    }, "STT"), m("th", {
      "class": "rvn__th"
    }, "T\xEAn \u0111\u1ED3 \xE1n"), m("th", {
      "class": "rvn__th"
    }, "T\xEAn th\u1EE3"), m("th", {
      "class": "rvn__th"
    }, "Ti\u1EC1n thu\xEA"), m("th", {
      "class": "rvn__th"
    }, "Ph\xED"), m("th", {
      "class": "rvn__th"
    }, "Ng\u01B0\u1EDDi tr\u1EA3 ph\xED"), m("th", {
      "class": "rvn__th"
    }, "T\u1ED5ng ti\u1EC1n"), m("th", {
      "class": "rvn__th"
    }, "Tr\u1EA1ng th\xE1i"), m("th", {
      "class": "rvn__th"
    }, "Ng\xE0y t\u1EA1o"), m("th", {
      "class": "rvn__th",
      style: "width:100px;"
    }, "Chi ti\u1EBFt"))), m("tbody", {
      "class": "rvn__tbody"
    }, this.transactionHistory.map(function (transac, colIndex) {
      var paid = _this.showPrice(_this.user.id, transac.attributes.creator.id, transac.attributes.rvn_payer_id, transac.attributes.rvn_amount, transac.attributes.rvn_fee);
      var checkStatus = _this.getStatus(transac.attributes.rvn_status, transac.attributes.banks, paid, transac.attributes.creator.id, transac.attributes.sender_last_status, transac.attributes.receiver_last_status);
      return m("tr", {
        "class": "rvn__tr",
        key: transac.id,
        "data-id": transac.id
      }, m("td", {
        "class": "rvn__td"
      }, colIndex + 1), m("td", {
        "class": "rvn__td"
      }, transac.attributes.creator.username + '__' + transac.attributes.receiver.username), m("td", {
        "class": "rvn__td"
      }, transac.attributes.receiver.username), m("td", {
        "class": "rvn__td"
      }, _this.formatCurrency(transac.attributes.rvn_amount)), m("td", {
        "class": "rvn__td"
      }, transac.attributes.rvn_fee * 100, "%"), m("td", {
        "class": "rvn__td"
      }, transac.attributes.rvn_payer_id == transac.attributes.rvn_receiver_id ? transac.attributes.receiver.username : transac.attributes.creator.username), m("td", {
        "class": "rvn__td"
      }, _this.formatCurrency(transac.attributes.rvn_amount + transac.attributes.rvn_amount * transac.attributes.rvn_fee)), m("td", {
        "class": "rvn__td",
        style: {
          color: _this.getStatusColor(checkStatus)
        }
      }, _this.getStatusText(checkStatus)), m("td", {
        "class": "rvn__td"
      }, transac.attributes.created_at), m('td.rvn__td', m((flarum_common_components_Dropdown__WEBPACK_IMPORTED_MODULE_5___default()), {
        className: 'User-controls',
        buttonClassName: 'Button Button--icon Button--flat',
        menuClassName: 'Dropdown-menu--right',
        icon: 'fas fa-ellipsis-h'
      }, [m('button.Button.UserList-detailBtn', {
        title: 'Xem chi tiết',
        onclick: function onclick() {
          return flarum_app__WEBPACK_IMPORTED_MODULE_3___default().modal.show(_DetailTransactionModal__WEBPACK_IMPORTED_MODULE_6__["default"], {
            transId: transac.id,
            userId: _this.user.id()
          });
        }
      }, ['Xem chi tiết']), checkStatus == 2 || checkStatus == 5 ? m('button.Button.UserList-confirmBtn', {
        title: 'Hoàn thành',
        onclick: function onclick() {
          return flarum_app__WEBPACK_IMPORTED_MODULE_3___default().modal.show(_UpdateStatusTransactionModal__WEBPACK_IMPORTED_MODULE_7__["default"], {
            transId: transac.id,
            userId: _this.user.id(),
            status: 3,
            status_old: transac.attributes.creator.id == _this.user.id() ? transac.attributes.sender_last_status : transac.attributes.receiver_last_status,
            onCancelConfirmed: function onCancelConfirmed() {
              _this.transactionHistory = [];
              _this.loadResults();
            }
          });
        }
      }, ['Hoàn thành']) : '', checkStatus == 1 || checkStatus == 2 || checkStatus == 5 ? m('button.Button.UserList-cancelBtn', {
        title: 'Hủy',
        onclick: function onclick() {
          return flarum_app__WEBPACK_IMPORTED_MODULE_3___default().modal.show(_UpdateStatusTransactionModal__WEBPACK_IMPORTED_MODULE_7__["default"], {
            transId: transac.id,
            userId: _this.user.id(),
            status: 4,
            status_old: transac.attributes.creator.id == _this.user.id() ? transac.attributes.sender_last_status : transac.attributes.receiver_last_status,
            onCancelConfirmed: function onCancelConfirmed() {
              _this.transactionHistory = [];
              _this.loadResults();
            }
          });
        }
      }, ['Hủy']) : '', checkStatus == 2 || checkStatus == 3 && checkStatus != 1 ? m('button.Button.UserList-complaintsBtn', {
        title: 'Khiếu nại',
        onclick: function onclick() {
          return flarum_app__WEBPACK_IMPORTED_MODULE_3___default().modal.show(_UpdateStatusTransactionModal__WEBPACK_IMPORTED_MODULE_7__["default"], {
            transId: transac.id,
            userId: _this.user.id(),
            status: 5,
            status_old: transac.attributes.creator.id == _this.user.id() ? transac.attributes.sender_last_status : transac.attributes.receiver_last_status,
            onCancelConfirmed: function onCancelConfirmed() {
              _this.transactionHistory = [];
              _this.loadResults();
            }
          });
        }
      }, ['Khiếu nại']) : ''])));
    }))))));
  };
  _proto.loadMore = function loadMore() {
    this.loading = true;
    this.loadResults(this.transactionHistory.length);
  };
  _proto.showPrice = function showPrice(currentID, creatorId, playFee, price, fee) {
    if (creatorId == currentID && currentID == playFee) {
      return fee * price;
    } else if (creatorId == currentID && currentID != playFee) {
      return 0;
    } else if (creatorId != currentID && currentID == playFee) {
      return price + fee * price;
    } else {
      return price;
    }
  };
  _proto.caculator = function caculator(price, fee, getFee) {
    if (getFee === void 0) {
      getFee = false;
    }
    return getFee ? this.formatCurrency(price + fee * price) : this.formatCurrency(fee * price);
  };
  _proto.formatCurrency = function formatCurrency(value) {
    if (!value) value = 0;
    return (+value).toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };
  _proto.parseResults = function parseResults(results) {
    this.moreResults = !!results.payload.links && !!results.payload.links.next;
    [].push.apply(this.transactionHistory, results.payload.data);
    this.loading = false;
    m.redraw();
    return results;
  };
  _proto.parseMonneyResults = function parseMonneyResults(results) {
    this.monneyTransaction = (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, results.data.attributes);
    this.loading = false;
    m.redraw();
    return results;
  };
  _proto.hasMoreResults = function hasMoreResults() {
    return this.moreResults;
  };
  _proto.loadResults = function loadResults(offset) {
    if (offset === void 0) {
      offset = 0;
    }
    flarum_app__WEBPACK_IMPORTED_MODULE_3___default().request({
      method: 'GET',
      url: flarum_app__WEBPACK_IMPORTED_MODULE_3___default().forum.attribute('apiUrl') + '/get-all-transactions'
    }).then(this.parseMonneyResults.bind(this))["catch"](function () {});
    return flarum_app__WEBPACK_IMPORTED_MODULE_3___default().store.find('transactions', {
      filter: {
        user: this.user.id()
      },
      page: {
        offset: offset
      }
    })["catch"](function () {}).then(this.parseResults.bind(this));
  };
  return TransactionHistoryList;
}((flarum_Component__WEBPACK_IMPORTED_MODULE_2___default()));


/***/ }),

/***/ "./src/forum/components/TransactionHistoryPage.js":
/*!********************************************************!*\
  !*** ./src/forum/components/TransactionHistoryPage.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TransactionHistoryPage)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_UserPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/UserPage */ "flarum/components/UserPage");
/* harmony import */ var flarum_components_UserPage__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_UserPage__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _TransactionHistoryList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TransactionHistoryList */ "./src/forum/components/TransactionHistoryList.js");



var TransactionHistoryPage = /*#__PURE__*/function (_UserPage) {
  function TransactionHistoryPage() {
    return _UserPage.apply(this, arguments) || this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(TransactionHistoryPage, _UserPage);
  var _proto = TransactionHistoryPage.prototype;
  _proto.oninit = function oninit(vnode) {
    _UserPage.prototype.oninit.call(this, vnode);
    this.loadUser(m.route.param('username'));
  };
  _proto.content = function content() {
    return m("div", {
      className: "TransferHistoryPage"
    }, _TransactionHistoryList__WEBPACK_IMPORTED_MODULE_2__["default"].component({
      params: {
        user: this.user
      }
    }));
  };
  return TransactionHistoryPage;
}((flarum_components_UserPage__WEBPACK_IMPORTED_MODULE_1___default()));


/***/ }),

/***/ "./src/forum/components/TransactionNotification.js":
/*!*********************************************************!*\
  !*** ./src/forum/components/TransactionNotification.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TransactionNotification)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_Notification__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/Notification */ "flarum/components/Notification");
/* harmony import */ var flarum_components_Notification__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Notification__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_helpers_username__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/helpers/username */ "flarum/common/helpers/username");
/* harmony import */ var flarum_common_helpers_username__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_helpers_username__WEBPACK_IMPORTED_MODULE_3__);




var TransactionNotification = /*#__PURE__*/function (_Notification) {
  function TransactionNotification() {
    return _Notification.apply(this, arguments) || this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(TransactionNotification, _Notification);
  var _proto = TransactionNotification.prototype;
  _proto.icon = function icon() {
    return 'fas fa-exchange-alt';
  };
  _proto.href = function href() {
    return flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default().route.transaction(this.attrs.notification.subject());
  };
  _proto.content = function content() {
    return flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('retechvn-mediated-transaction.forum.notifications.transaction_created_text', {
      user: this.attrs.notification.fromUser(),
      transaction: this.attrs.notification.subject()
    });
  };
  return TransactionNotification;
}((flarum_components_Notification__WEBPACK_IMPORTED_MODULE_2___default()));


/***/ }),

/***/ "./src/forum/components/TransactionPage.js":
/*!*************************************************!*\
  !*** ./src/forum/components/TransactionPage.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TransactionPage)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_components_Page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/components/Page */ "flarum/common/components/Page");
/* harmony import */ var flarum_common_components_Page__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Page__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_IndexPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/IndexPage */ "flarum/components/IndexPage");
/* harmony import */ var flarum_components_IndexPage__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_IndexPage__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_helpers_listItems__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/helpers/listItems */ "flarum/helpers/listItems");
/* harmony import */ var flarum_helpers_listItems__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_helpers_listItems__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var flarum_common_components_Alert__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! flarum/common/components/Alert */ "flarum/common/components/Alert");
/* harmony import */ var flarum_common_components_Alert__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Alert__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _QRModal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./QRModal */ "./src/forum/components/QRModal.js");








var TransactionPage = /*#__PURE__*/function (_Page) {
  function TransactionPage() {
    return _Page.apply(this, arguments) || this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(TransactionPage, _Page);
  var _proto = TransactionPage.prototype;
  _proto.oninit = function oninit(vnode) {
    _Page.prototype.oninit.call(this, vnode);
    this.loading = true;
    this.user_current = (flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default().session).user;
    this.initializeData();
    this.resultsUser = [];
    this.showDropdown = false;
    this.handleClickOutside = this.handleClickOutside.bind(this);
  };
  _proto.initializeData = function initializeData() {
    this.data = {
      rvn_creator_id: this.user_current.data.id,
      rvn_receiver_id: '',
      rvn_amount: 0,
      rvn_fee: 0.1,
      rvn_payer_id: this.user_current.data.id,
      rvn_note: ''
    };
    this.rvn_creator_name = flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default().session.user.username();
    this.rvn_receiver_name = '';
    this.rvn_service_fee = 0;
    this.rvn_total_amount = 0;
    this.rvn_receiver_name_search = '';
    this.rvn_receiver_name_select = '';
  };
  _proto.oncreate = function oncreate(vnode) {
    _Page.prototype.oncreate.call(this, vnode);
    flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default().setTitle('Giao dịch trung gian');
    flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default().setTitleCount(0);
    document.addEventListener('click', this.handleClickOutside);
  };
  _proto.onremove = function onremove() {
    document.removeEventListener('click', this.handleClickOutside);
  };
  _proto.view = function view() {
    return m('.IndexPage', [flarum_components_IndexPage__WEBPACK_IMPORTED_MODULE_3___default().prototype.hero(), m('.container', [m('.sideNavContainer', [this.renderSidebar(), this.renderForm()])])]);
  };
  _proto.renderSidebar = function renderSidebar() {
    return m('nav.IndexPage-nav.sideNav', m('ul', flarum_helpers_listItems__WEBPACK_IMPORTED_MODULE_4___default()(flarum_components_IndexPage__WEBPACK_IMPORTED_MODULE_3___default().prototype.sidebarItems().toArray())));
  };
  _proto.renderForm = function renderForm() {
    var _this = this;
    return m('.IndexPage-results.sideNavOffset', [m('div.retechvn__text-center', m('h2', 'Giao dịch trung gian')), m('.Modal-body.rvn__body-form .row', [this.renderInput("T\xEAn \u0111\u1ED3 \xE1n", 'Nhập tên đồ án', this.rvn_creator_name + ("" + (this.rvn_receiver_name != '' ? '__' + this.rvn_receiver_name : '')), true), this.renderReceiverInput('Tên đối tác', 'Nhập tên đối tác cần tìm kiếm'), this.renderNumberInput('Tiền thuê', this.data.rvn_amount, this.handleRentChange.bind(this)), this.renderInput("Ph\xED d\u1ECBch v\u1EE5 (" + this.data.rvn_fee * 100 + "%)", '', this.rvn_service_fee, true), this.renderRadioGroup('Người trả phí', 'Bạn trả phí', 'Đối tác trả phi'), this.renderInput('Tổng tiền bạn phải trả', '', this.rvn_total_amount, true), this.renderTextarea('Ghi chú', this.data.rvn_note, function (e) {
      return _this.data.rvn_note = e.target.value;
    }), this.renderCheckbox(), this.renderSubmitButton()])]);
  };
  _proto.renderInput = function renderInput(label, placeholder, value, disabled) {
    if (disabled === void 0) {
      disabled = false;
    }
    return m('.Form-group.col.col-md-6', [m('label', label), m('input.FormControl', {
      value: value,
      disabled: disabled,
      placeholder: placeholder
    })]);
  };
  _proto.renderReceiverInput = function renderReceiverInput(lable, placeholder) {
    var _this2 = this;
    return m('.Form-group.position-relative.col.col-md-6', [m('label', [lable, m('span', {
      className: this.data.rvn_receiver_id ? 'rvn__text-green' : 'rvn__text-red'
    }, this.data.rvn_receiver_id ? " (" + this.rvn_receiver_name_select + ")" : ' (Chưa chọn)')]), m('input.FormControl', {
      value: this.rvn_receiver_name_search,
      placeholder: placeholder,
      onfocus: function onfocus() {
        return _this2.showDropdown = true;
      },
      onkeyup: function onkeyup(e) {
        _this2.rvn_receiver_name_search = e.target.value;
        setTimeout(function () {
          return _this2.search(e.target.value);
        }, 100);
      }
    }), this.showDropdown && this.renderDropdown()]);
  };
  _proto.renderDropdown = function renderDropdown() {
    return m('.search-results', this.resultsUser.length ? this.resultsUser.map(this.renderDropdownItem.bind(this)) : m('div.no-results.rvn__mx2', 'Không có dữ liệu'));
  };
  _proto.renderDropdownItem = function renderDropdownItem(user) {
    var _this3 = this;
    return m('div.search-result-item', {
      onclick: function onclick() {
        return _this3.selectReceiver(user);
      }
    }, [user.avatarUrl() ? m('img.Avatar.rvn__avatar', {
      src: user.avatarUrl(),
      alt: user.displayName()
    }) : m('span.Avatar.rvn__avatar', {
      style: this.avatarStyle(user)
    }, user.displayName().charAt(0).toUpperCase()), m('span.username', "  " + user.displayName() + " (" + user.username() + ")")]);
  };
  _proto.renderNumberInput = function renderNumberInput(label, value, onChange) {
    return m('.Form-group.col.col-md-6', [m('label', label + " (" + this.formatCurrency(value) + ")"), m('input[type=number].FormControl', {
      value: value,
      onchange: onChange
    })]);
  };
  _proto.renderRadioGroup = function renderRadioGroup(lable, lableC1, labelC2) {
    return m('.Form-group.col.col-md-6', [m('label', lable), m('.radio-group', [this.renderRadioOption(lableC1, this.data.rvn_creator_id, this.rvn_creator_name, this.data.rvn_payer_id == this.data.rvn_creator_id), this.renderRadioOption(labelC2, this.data.rvn_receiver_id, this.rvn_receiver_name, this.data.rvn_payer_id == this.data.rvn_receiver_id, !this.data.rvn_receiver_id)])]);
  };
  _proto.renderRadioOption = function renderRadioOption(label, value, text, checked, disabled) {
    var _this4 = this;
    if (disabled === void 0) {
      disabled = false;
    }
    return m('label', [m('input[type=radio]', {
      name: 'fee_payer',
      value: value,
      checked: checked,
      disabled: disabled,
      onchange: function onchange(e) {
        return _this4.handleFeePayerChange(e);
      }
    }), " " + label + " (" + text + ")"]);
  };
  _proto.renderTextarea = function renderTextarea(label, value, onChange) {
    return m('.Form-group.col.col-12.rvn_note', [m('label', label), m('textarea.FormControl', {
      value: value,
      onchange: onChange
    })]);
  };
  _proto.renderCheckbox = function renderCheckbox() {
    var _this5 = this;
    return m('.Form-group.col', [m('label', [m('input[type=checkbox]', {
      checked: this.isChecked,
      onchange: function onchange(e) {
        return _this5.isChecked = e.target.checked;
      }
    }), ' Đồng ý với điều khoản và điều kiện!'])]);
  };
  _proto.renderSubmitButton = function renderSubmitButton() {
    var _this6 = this;
    return m('.Form-group.col.col-12', [flarum_components_Button__WEBPACK_IMPORTED_MODULE_5___default().component({
      type: 'button',
      className: 'Button Button--primary Button--block',
      onclick: function onclick(e) {
        return _this6.onsubmit(e);
      }
    }, 'Tạo giao dịch')]);
  };
  _proto.handleRentChange = function handleRentChange(e) {
    this.data.rvn_amount = +e.target.value;
    this.calculateTotal();
  };
  _proto.handleFeePayerChange = function handleFeePayerChange(e) {
    this.data.rvn_payer_id = e.target.value;
    this.calculateTotal();
  };
  _proto.selectReceiver = function selectReceiver(user) {
    this.rvn_receiver_name = user.username();
    this.rvn_receiver_name_search = '';
    this.rvn_receiver_name_select = user.displayName() + " (" + user.username() + ")";
    this.data.rvn_receiver_id = user.data.id;
    this.showDropdown = false;
  };
  _proto.avatarStyle = function avatarStyle(user) {
    return {
      '--avatar-bg': user.color(),
      'font-size': '20px'
    };
  };
  _proto.validateForm = function validateForm() {
    var _this$data = this.data,
      rvn_receiver_id = _this$data.rvn_receiver_id,
      rvn_amount = _this$data.rvn_amount,
      rvn_fee = _this$data.rvn_fee,
      rvn_payer_id = _this$data.rvn_payer_id;
    var errors = [[!rvn_receiver_id, 'Chưa chọn tên đối tác.'], [rvn_amount <= 0, 'Tiền thuê phải lớn hơn 0.'], [!rvn_fee, 'Phí dịch vụ không hợp lệ.'], [!rvn_payer_id, 'Người trả phí chưa được chọn.'], [!this.isChecked, 'Bạn phải đồng ý với điều khoản và điều kiện.']];
    for (var _i = 0, _errors = errors; _i < _errors.length; _i++) {
      var _errors$_i = _errors[_i],
        condition = _errors$_i[0],
        message = _errors$_i[1];
      if (condition) {
        this.showAlert('error', message, 5000);
        return false;
      }
    }
    return true;
  };
  _proto.formatCurrency = function formatCurrency(value) {
    return (+value).toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };
  _proto.calculateTotal = function calculateTotal() {
    var rentAmount = +this.data.rvn_amount || 0;
    var serviceFee = rentAmount * 0.1;
    this.rvn_service_fee = this.formatCurrency(serviceFee);
    this.rvn_total_amount = this.formatCurrency(this.data.rvn_payer_id == this.data.rvn_creator_id ? rentAmount + serviceFee : rentAmount);
  };
  _proto.search = function search(query) {
    var _this7 = this;
    if (query.trim()) {
      flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default().store.find('users', {
        filter: {
          q: query
        }
      }).then(function (users) {
        _this7.resultsUser = users.filter(function (user) {
          return user.data.id != _this7.user_current.id();
        });
        _this7.showDropdown = true;
      });
    } else {
      this.resultsUser = [];
      this.showDropdown = false;
    }
  };
  _proto.handleClickOutside = function handleClickOutside(e) {
    if (!e.target.closest('.FormControl') && !e.target.closest('.search-results')) {
      this.showDropdown = false;
      m.redraw();
    }
  };
  _proto.showAlert = function showAlert(type, message, timeClear) {
    if (type === void 0) {
      type = 'success';
    }
    if (message === void 0) {
      message = '';
    }
    if (timeClear === void 0) {
      timeClear = 5000;
    }
    flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default().alerts.show((flarum_common_components_Alert__WEBPACK_IMPORTED_MODULE_6___default()), {
      type: type
    }, message);
    setTimeout(function () {
      flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default().alerts.clear();
    }, timeClear);
  };
  _proto.onsubmit = function onsubmit(event) {
    var _this8 = this;
    event.preventDefault();

    // if (!this.validateForm()) {
    //   return;
    // }

    this.loading = true;
    var data = {
      rvn_creator_id: Number(this.data.rvn_creator_id),
      rvn_receiver_id: Number(this.data.rvn_receiver_id),
      rvn_amount: Number(this.data.rvn_amount),
      rvn_fee: this.data.rvn_fee,
      rvn_payer_id: Number(this.data.rvn_payer_id),
      rvn_note: this.data.rvn_note
    };
    flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default().modal.show(_QRModal__WEBPACK_IMPORTED_MODULE_7__["default"], {
      onsubmit: function onsubmit(confirm) {
        flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default().request({
          method: 'POST',
          url: flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default().forum.attribute('apiUrl') + '/transactions',
          body: {
            data: data
          }
        }).then(function (response) {
          _this8.showAlert('success', 'Tạo giao dịch thành công!', 5000);
          _this8.initializeData();
          _this8.loading = false;
        })["catch"](function (error) {
          console.log(error);
          _this8.showAlert('error', 'Có lỗi xảy ra. Vui lòng thử lại!', 5000);
          _this8.loading = false;
        });
      }
    });
  };
  return TransactionPage;
}((flarum_common_components_Page__WEBPACK_IMPORTED_MODULE_2___default()));


/***/ }),

/***/ "./src/forum/components/UpdateStatusTransactionModal.js":
/*!**************************************************************!*\
  !*** ./src/forum/components/UpdateStatusTransactionModal.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UpdateStatusTransactionModal)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/Modal */ "flarum/components/Modal");
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_3__);




var UpdateStatusTransactionModal = /*#__PURE__*/function (_Modal) {
  function UpdateStatusTransactionModal() {
    return _Modal.apply(this, arguments) || this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(UpdateStatusTransactionModal, _Modal);
  var _proto = UpdateStatusTransactionModal.prototype;
  _proto.oninit = function oninit(vnode) {
    _Modal.prototype.oninit.call(this, vnode);
    this.transId = this.attrs.transId;
    this.currentUserId = this.attrs.userId;
    this.reason = '';
    this.loading = false;
    this.status = this.attrs.status;
    this.status_old = this.attrs.status_old;
    this.onCancelConfirmed = this.attrs.onCancelConfirmed || function () {};
  };
  _proto.titleStatus = function titleStatus(status) {
    switch (status) {
      case 3:
        return 'Xác nhận hoàn thành giao dịch';
      case 4:
        return 'Xác nhận hủy giao dịch';
      case 5:
        return 'Xác nhận khiếu nại giao dịch';
      default:
        this.hide();
        break;
    }
  };
  _proto.title = function title() {
    return this.titleStatus(this.status);
  };
  _proto.content = function content() {
    var _this = this;
    return m("div", {
      className: "Modal-body"
    }, this.status !== 3 ? m("div", {
      className: "Form-group"
    }, m("label", null, "L\xFD do"), m("input", {
      className: "FormControl",
      type: "text",
      placeholder: "Nh\u1EADp l\xFD do",
      value: this.reason,
      oninput: function oninput(e) {
        _this.reason = e.target.value;
      }
    })) : '', m("div", {
      className: "Form-group"
    }, m((flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default()), {
      className: "Button Button--primary",
      type: "submit",
      loading: this.loading
    }, "X\xE1c nh\u1EADn"), m((flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default()), {
      className: "Button Button--secondary",
      onclick: function onclick() {
        _this.onCancelConfirmed();
        _this.hide();
      }
    }, "H\u1EE7y b\u1ECF")));
  };
  _proto.onsubmit = function onsubmit(event) {
    var _this2 = this;
    event.preventDefault();
    this.loading = true;
    var data = {
      transId: Number(this.transId),
      userId: Number(this.currentUserId),
      reason: this.reason,
      status: this.status,
      status_old: this.status_old
    };
    flarum_app__WEBPACK_IMPORTED_MODULE_2___default().request({
      method: 'POST',
      url: flarum_app__WEBPACK_IMPORTED_MODULE_2___default().forum.attribute('apiUrl') + '/transaction-logs',
      body: {
        data: data
      }
    }).then(function (res) {
      _this2.loading = false;
      _this2.onCancelConfirmed();
      _this2.hide();
      flarum_app__WEBPACK_IMPORTED_MODULE_2___default().alerts.show({
        type: 'success'
      }, 'Đã cập nhật.');
    })["catch"](function (error) {
      _this2.loading = false;
      flarum_app__WEBPACK_IMPORTED_MODULE_2___default().alerts.show({
        type: 'error'
      }, 'Đã xảy ra lỗi. Vui lòng thử lại.');
    });
  };
  _proto.className = function className() {
    return 'CancelTransactionModal';
  };
  return UpdateStatusTransactionModal;
}((flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1___default()));


/***/ }),

/***/ "./src/forum/index.js":
/*!****************************!*\
  !*** ./src/forum/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_components_LinkButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/LinkButton */ "flarum/components/LinkButton");
/* harmony import */ var flarum_components_LinkButton__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_LinkButton__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/extend */ "flarum/common/extend");
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extend__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_IndexPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/IndexPage */ "flarum/components/IndexPage");
/* harmony import */ var flarum_components_IndexPage__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_IndexPage__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_TransactionPage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/TransactionPage */ "./src/forum/components/TransactionPage.js");
/* harmony import */ var flarum_forum_components_HeaderSecondary__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/forum/components/HeaderSecondary */ "flarum/forum/components/HeaderSecondary");
/* harmony import */ var flarum_forum_components_HeaderSecondary__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_HeaderSecondary__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var flarum_components_UserPage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! flarum/components/UserPage */ "flarum/components/UserPage");
/* harmony import */ var flarum_components_UserPage__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(flarum_components_UserPage__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _components_TransactionHistoryPage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/TransactionHistoryPage */ "./src/forum/components/TransactionHistoryPage.js");
/* harmony import */ var _components_TransactionNotification__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/TransactionNotification */ "./src/forum/components/TransactionNotification.js");
/* harmony import */ var flarum_components_NotificationGrid__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! flarum/components/NotificationGrid */ "flarum/components/NotificationGrid");
/* harmony import */ var flarum_components_NotificationGrid__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(flarum_components_NotificationGrid__WEBPACK_IMPORTED_MODULE_9__);









// import NotificationGrid from 'flarum/forum/components/NotificationGrid';

flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().initializers.add('retechvn/mediated-transaction', function () {
  (flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().routes).transactionPage = {
    path: '/giao-dich-trung-gian',
    component: _components_TransactionPage__WEBPACK_IMPORTED_MODULE_4__["default"]
  };
  (flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().routes)['user.transactionHistoryPage'] = {
    path: '/u/:username/lich-su-giao-dich',
    component: _components_TransactionHistoryPage__WEBPACK_IMPORTED_MODULE_7__["default"]
  };
  (flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().notificationComponents).transactionCreated = _components_TransactionNotification__WEBPACK_IMPORTED_MODULE_8__["default"];
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_2__.extend)((flarum_components_NotificationGrid__WEBPACK_IMPORTED_MODULE_9___default().prototype), 'notificationTypes', function (items) {
    items.add('transactionCreated', {
      name: 'transactionCreated',
      icon: 'fas fa-exchange-alt',
      label: flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('retechvn-mediated-transaction.forum.notifications.transaction_created_label')
    });
  });

  // Thêm nút Giao dịch trung gian ở navItems
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_2__.extend)((flarum_components_IndexPage__WEBPACK_IMPORTED_MODULE_3___default().prototype), 'navItems', function (items) {
    if ((flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().session) && (flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().session).user && (flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().session).user) {
      items.add('transactionPage', m((flarum_components_LinkButton__WEBPACK_IMPORTED_MODULE_1___default()), {
        href: flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().route('transactionPage'),
        icon: "fas fa-magic"
      }, 'Giao dịch trung gian'), 100);
    }
  });

  // Hiển thị tiển ở trên header
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_2__.extend)((flarum_forum_components_HeaderSecondary__WEBPACK_IMPORTED_MODULE_5___default().prototype), 'items', function (items) {
    if ((flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().session) && (flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().session).user && (flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().session).user) {
      // items.add('techcoin', m('span.rvn__text-piece', [m('i.fas.fa-coins'), `${app.session.user.attribute('rvn_point')} đ`]), 15);
    }
  });

  // Hiển thị lịch sử giao dịch trong trang cá nhân
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_2__.extend)((flarum_components_UserPage__WEBPACK_IMPORTED_MODULE_6___default().prototype), 'navItems', function (items, user) {
    if ((flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().session) && (flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().session).user) {
      var currentUserID = flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().session.user.id();
      var targetUserID = this.user.id();
      if (currentUserID == targetUserID) {
        items.add('transactionMoney', flarum_components_LinkButton__WEBPACK_IMPORTED_MODULE_1___default().component({
          href: flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().route('user.transactionHistoryPage', {
            username: this.user.username()
          }),
          icon: 'fas fa-money-bill'
        }, ['Lịch sử giao dịch']), 10);
      }
    }
  });
});

/***/ }),

/***/ "flarum/Component":
/*!**************************************************!*\
  !*** external "flarum.core.compat['Component']" ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['Component'];

/***/ }),

/***/ "flarum/app":
/*!********************************************!*\
  !*** external "flarum.core.compat['app']" ***!
  \********************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['app'];

/***/ }),

/***/ "flarum/common/app":
/*!***************************************************!*\
  !*** external "flarum.core.compat['common/app']" ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/app'];

/***/ }),

/***/ "flarum/common/components/Alert":
/*!****************************************************************!*\
  !*** external "flarum.core.compat['common/components/Alert']" ***!
  \****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/Alert'];

/***/ }),

/***/ "flarum/common/components/Dropdown":
/*!*******************************************************************!*\
  !*** external "flarum.core.compat['common/components/Dropdown']" ***!
  \*******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/Dropdown'];

/***/ }),

/***/ "flarum/common/components/Page":
/*!***************************************************************!*\
  !*** external "flarum.core.compat['common/components/Page']" ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/Page'];

/***/ }),

/***/ "flarum/common/extend":
/*!******************************************************!*\
  !*** external "flarum.core.compat['common/extend']" ***!
  \******************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/extend'];

/***/ }),

/***/ "flarum/common/helpers/username":
/*!****************************************************************!*\
  !*** external "flarum.core.compat['common/helpers/username']" ***!
  \****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/helpers/username'];

/***/ }),

/***/ "flarum/components/Button":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['components/Button']" ***!
  \**********************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['components/Button'];

/***/ }),

/***/ "flarum/components/IndexPage":
/*!*************************************************************!*\
  !*** external "flarum.core.compat['components/IndexPage']" ***!
  \*************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['components/IndexPage'];

/***/ }),

/***/ "flarum/components/LinkButton":
/*!**************************************************************!*\
  !*** external "flarum.core.compat['components/LinkButton']" ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['components/LinkButton'];

/***/ }),

/***/ "flarum/components/LoadingIndicator":
/*!********************************************************************!*\
  !*** external "flarum.core.compat['components/LoadingIndicator']" ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['components/LoadingIndicator'];

/***/ }),

/***/ "flarum/components/Modal":
/*!*********************************************************!*\
  !*** external "flarum.core.compat['components/Modal']" ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['components/Modal'];

/***/ }),

/***/ "flarum/components/Notification":
/*!****************************************************************!*\
  !*** external "flarum.core.compat['components/Notification']" ***!
  \****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['components/Notification'];

/***/ }),

/***/ "flarum/components/NotificationGrid":
/*!********************************************************************!*\
  !*** external "flarum.core.compat['components/NotificationGrid']" ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['components/NotificationGrid'];

/***/ }),

/***/ "flarum/components/UserPage":
/*!************************************************************!*\
  !*** external "flarum.core.compat['components/UserPage']" ***!
  \************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['components/UserPage'];

/***/ }),

/***/ "flarum/forum/app":
/*!**************************************************!*\
  !*** external "flarum.core.compat['forum/app']" ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['forum/app'];

/***/ }),

/***/ "flarum/forum/components/HeaderSecondary":
/*!*************************************************************************!*\
  !*** external "flarum.core.compat['forum/components/HeaderSecondary']" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['forum/components/HeaderSecondary'];

/***/ }),

/***/ "flarum/helpers/listItems":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['helpers/listItems']" ***!
  \**********************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['helpers/listItems'];

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/extends.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _extends)
/* harmony export */ });
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _inheritsLoose)
/* harmony export */ });
/* harmony import */ var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js");

function _inheritsLoose(t, o) {
  t.prototype = Object.create(o.prototype), t.prototype.constructor = t, (0,_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(t, o);
}


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _setPrototypeOf)
/* harmony export */ });
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, _setPrototypeOf(t, e);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!******************!*\
  !*** ./forum.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/common */ "./src/common/index.js");
/* harmony import */ var _src_forum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/forum */ "./src/forum/index.js");


})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=forum.js.map