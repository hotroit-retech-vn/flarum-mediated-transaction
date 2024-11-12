<<<<<<< HEAD
/******/ (() => { // webpackBootstrap
/******/ 	// runtime can't be in strict mode because a global variable is assign and maybe created.
/******/ 	var __webpack_modules__ = ({

/***/ "./src/admin/components/TransactionListPage.js":
/*!*****************************************************!*\
  !*** ./src/admin/components/TransactionListPage.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TransactionListPage)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/admin/app */ "flarum/admin/app");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_admin_components_AdminPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/admin/components/AdminPage */ "flarum/admin/components/AdminPage");
/* harmony import */ var flarum_admin_components_AdminPage__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_components_AdminPage__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_helpers_listItems__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/helpers/listItems */ "flarum/common/helpers/listItems");
/* harmony import */ var flarum_common_helpers_listItems__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_helpers_listItems__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_common_components_Dropdown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/components/Dropdown */ "flarum/common/components/Dropdown");
/* harmony import */ var flarum_common_components_Dropdown__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Dropdown__WEBPACK_IMPORTED_MODULE_4__);





var TransactionListPage = /*#__PURE__*/function (_AdminPage) {
  function TransactionListPage() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _AdminPage.call.apply(_AdminPage, [this].concat(args)) || this;
    _this.throttledSearch = debounce(250, function () {
      return _this.loadPage(0);
    });
    return _this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(TransactionListPage, _AdminPage);
  var _proto = TransactionListPage.prototype;
  _proto.oninit = function oninit(vnode) {
    _AdminPage.prototype.oninit.call(this, vnode);
    // this.scammerData = [];
    this.loadTransactionList();
    this.scammerData = [{
      id: 1,
      attributes: {
        creatorName: 'Nguyễn Văn A',
        receiverName: 'Trần Thị B',
        serviceFee: 10000,
        transactionFee: 5000,
        totalAmount: 150000,
        createdAt: '2024-10-12T10:00:00Z',
        status: 'Hoàn tất',
        scammerBankCode: '123456789',
        scammerAccName: 'Nguyễn Văn A',
        scammerBankName: 'Ngân hàng ABC',
        scammerPhone: '0987654321',
        scammerEmail: 'nguyenvana@example.com'
      }
    }, {
      id: 2,
      attributes: {
        creatorName: 'Lê Văn C',
        receiverName: 'Nguyễn Thị D',
        serviceFee: 20000,
        transactionFee: 10000,
        totalAmount: 300000,
        createdAt: '2024-10-11T15:30:00Z',
        status: 'Đang xử lý',
        scammerBankCode: '987654321',
        scammerAccName: 'Lê Văn C',
        scammerBankName: 'Ngân hàng XYZ',
        scammerPhone: '0123456789',
        scammerEmail: 'levanc@example.com'
      }
    }, {
      id: 3,
      attributes: {
        creatorName: 'Phạm Văn E',
        receiverName: 'Trần Văn F',
        serviceFee: 15000,
        transactionFee: 7000,
        totalAmount: 220000,
        createdAt: '2024-10-10T08:15:00Z',
        status: 'Thất bại',
        scammerBankCode: '456789123',
        scammerAccName: 'Phạm Văn E',
        scammerBankName: 'Ngân hàng MNO',
        scammerPhone: '0987654321',
        scammerEmail: 'phamvena@example.com'
      }
    }];
  };
  _proto.loadTransactionList = function loadTransactionList() {};
  _proto.headerInfo = function headerInfo() {
    return {
      className: 'SharedUploadPage--header',
      icon: 'fas fa-magic',
      title: 'Quản lý giao dịch',
      description: 'What is here??'
    };
  }

  /**
   * Show the actual ImageUploadPage.
   *
   * @returns {*}
   */;
  _proto.content = function content() {
    var _this2 = this;
    return [m('div.UserListPage-header', [m('div.Search-input', [m('input.FormControl.SearchBar', {
      type: 'search',
      placeholder: 'Nhập thông tin tìm kiếm',
      oninput: function oninput(e) {
        _this2.isLoadingPage = true;
        _this2.query = e.target.value;
        _this2.throttledSearch();
      }
    })])]), m('div', [m('.sideNavContainer', [m('div', [m('div.iconcontainer', [m('div.rvn__title-table', 'Danh sách yêu cầu giao dịch')]), m('table.rvn__table', [m('thead.rvn__thead', [m('tr.rvn__tr', [m('th.rvn__th', 'STT'), m('th.rvn__th', 'Người tạo'), m('th.rvn__th', 'Người nhận'), m('th.rvn__th', 'Phí nhận'), m('th.rvn__th', 'Phí giao dịch (%)'), m('th.rvn__th', 'Tổng tiền'), m('th.rvn__th', 'Ngày tạo'), m('th.rvn__th', 'Trạng thái'), m('th.rvn__th', {
      style: 'width:100px;'
    }, 'Chi tiết')])]), m('tbody.rvn__tbody', this.scammerData.map(function (scammer, colIndex) {
      return m('tr.rvn__tr', {
        key: scammer.id
      }, [m('td.rvn__td', colIndex + 1), m('td.rvn__td', scammer.attributes.creatorName), m('td.rvn__td', scammer.attributes.receiverName), m('td.rvn__td', scammer.attributes.serviceFee), m('td.rvn__td', scammer.attributes.transactionFee), m('td.rvn__td', scammer.attributes.totalAmount), m('td.rvn__td', new Date(scammer.attributes.createdAt).toLocaleDateString()), m('td.rvn__td', scammer.attributes.status), m('td.rvn__td', m((flarum_common_components_Dropdown__WEBPACK_IMPORTED_MODULE_4___default()), {
        className: 'User-controls',
        buttonClassName: 'Button Button--icon Button--flat',
        menuClassName: 'Dropdown-menu--right',
        icon: 'fas fa-ellipsis-h'
      }, m('button.Button.UserList-editModalBtn', {
        title: 'nút'
        // onclick: () => app.modal.show(EditUserModal, { user }),
      }, [m('i.fas.fa-pencil-alt'),
      // icon
      'Xem chi tiết'])))]);
    }))])])])])];
  };
  return TransactionListPage;
}((flarum_admin_components_AdminPage__WEBPACK_IMPORTED_MODULE_2___default()));

function debounce(delay, callback) {
  var timeoutId;
  return function () {
    var _this3 = this;
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(function () {
      callback.apply(_this3, args);
    }, delay);
  };
}

/***/ }),

/***/ "./src/admin/index.js":
/*!****************************!*\
  !*** ./src/admin/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/admin/app */ "flarum/admin/app");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/extend */ "flarum/common/extend");
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_admin_components_AdminNav__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/admin/components/AdminNav */ "flarum/admin/components/AdminNav");
/* harmony import */ var flarum_admin_components_AdminNav__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_components_AdminNav__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/LinkButton */ "flarum/common/components/LinkButton");
/* harmony import */ var flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_TransactionListPage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/TransactionListPage */ "./src/admin/components/TransactionListPage.js");





flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().initializers.add('retechvn/mediated-transaction', function () {
  (flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().routes).transactionListPage = {
    path: '/giao-dich-trung-gian',
    component: _components_TransactionListPage__WEBPACK_IMPORTED_MODULE_4__["default"]
  };
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__.extend)((flarum_admin_components_AdminNav__WEBPACK_IMPORTED_MODULE_2___default().prototype), 'items', function (items) {
    items.add('list-scammers', m((flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_3___default()), {
      href: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().route('transactionListPage'),
      icon: "fas fa-magic",
      title: "Giao d\u1ECBch trung gian"
    }, "Giao d\u1ECBch trung gian"), 49);
  });
});

/***/ }),

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

/***/ "flarum/admin/app":
/*!**************************************************!*\
  !*** external "flarum.core.compat['admin/app']" ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['admin/app'];

/***/ }),

/***/ "flarum/admin/components/AdminNav":
/*!******************************************************************!*\
  !*** external "flarum.core.compat['admin/components/AdminNav']" ***!
  \******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['admin/components/AdminNav'];

/***/ }),

/***/ "flarum/admin/components/AdminPage":
/*!*******************************************************************!*\
  !*** external "flarum.core.compat['admin/components/AdminPage']" ***!
  \*******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['admin/components/AdminPage'];

/***/ }),

/***/ "flarum/common/app":
/*!***************************************************!*\
  !*** external "flarum.core.compat['common/app']" ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/app'];

/***/ }),

/***/ "flarum/common/components/Dropdown":
/*!*******************************************************************!*\
  !*** external "flarum.core.compat['common/components/Dropdown']" ***!
  \*******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/Dropdown'];

/***/ }),

/***/ "flarum/common/components/LinkButton":
/*!*********************************************************************!*\
  !*** external "flarum.core.compat['common/components/LinkButton']" ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/LinkButton'];

/***/ }),

/***/ "flarum/common/extend":
/*!******************************************************!*\
  !*** external "flarum.core.compat['common/extend']" ***!
  \******************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/extend'];

/***/ }),

/***/ "flarum/common/helpers/listItems":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['common/helpers/listItems']" ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/helpers/listItems'];

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
  !*** ./admin.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/common */ "./src/common/index.js");
/* harmony import */ var _src_admin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/admin */ "./src/admin/index.js");


})();

module.exports = __webpack_exports__;
/******/ })()
;
=======
(()=>{var t={n:e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return t.d(n,{a:n}),n},d:(e,n)=>{for(var a in n)t.o(n,a)&&!t.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:n[a]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)};(()=>{"use strict";const e=flarum.core.compat["common/app"];t.n(e)().initializers.add("retechvn/mediated-transaction",(function(){console.log("[retechvn/mediated-transaction] Hello, forum and admin!")}));const n=flarum.core.compat["admin/app"];var a=t.n(n);const r=flarum.core.compat["common/extend"],o=flarum.core.compat["admin/components/AdminNav"];var i=t.n(o);const c=flarum.core.compat["common/components/LinkButton"];var s=t.n(c);function d(t,e){return d=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},d(t,e)}const u=flarum.core.compat["admin/components/AdminPage"];var h=t.n(u);flarum.core.compat["common/helpers/listItems"];const l=flarum.core.compat["common/components/Dropdown"];var p=t.n(l),v=function(t){function e(){for(var e,n,a,r=arguments.length,o=new Array(r),m=0;m<r;m++)o[m]=arguments[m];return(e=t.call.apply(t,[this].concat(o))||this).throttledSearch=(n=function(){return e.loadPage(0)},function(){for(var t=this,e=arguments.length,r=new Array(e),o=0;o<e;o++)r[o]=arguments[o];a&&clearTimeout(a),a=setTimeout((function(){n.apply(t,r)}),250)}),e}var n,a;a=t,(n=e).prototype=Object.create(a.prototype),n.prototype.constructor=n,d(n,a);var r=e.prototype;return r.oninit=function(e){t.prototype.oninit.call(this,e),this.loadTransactionList(),this.scammerData=[{id:1,attributes:{creatorName:"Nguyễn Văn A",receiverName:"Trần Thị B",serviceFee:1e4,transactionFee:5e3,totalAmount:15e4,createdAt:"2024-10-12T10:00:00Z",status:"Hoàn tất",scammerBankCode:"123456789",scammerAccName:"Nguyễn Văn A",scammerBankName:"Ngân hàng ABC",scammerPhone:"0987654321",scammerEmail:"nguyenvana@example.com"}},{id:2,attributes:{creatorName:"Lê Văn C",receiverName:"Nguyễn Thị D",serviceFee:2e4,transactionFee:1e4,totalAmount:3e5,createdAt:"2024-10-11T15:30:00Z",status:"Đang xử lý",scammerBankCode:"987654321",scammerAccName:"Lê Văn C",scammerBankName:"Ngân hàng XYZ",scammerPhone:"0123456789",scammerEmail:"levanc@example.com"}},{id:3,attributes:{creatorName:"Phạm Văn E",receiverName:"Trần Văn F",serviceFee:15e3,transactionFee:7e3,totalAmount:22e4,createdAt:"2024-10-10T08:15:00Z",status:"Thất bại",scammerBankCode:"456789123",scammerAccName:"Phạm Văn E",scammerBankName:"Ngân hàng MNO",scammerPhone:"0987654321",scammerEmail:"phamvena@example.com"}}]},r.loadTransactionList=function(){},r.headerInfo=function(){return{className:"SharedUploadPage--header",icon:"fas fa-magic",title:"Quản lý giao dịch",description:"What is here??"}},r.content=function(){var t=this;return[m("div.UserListPage-header",[m("div.Search-input",[m("input.FormControl.SearchBar",{type:"search",placeholder:"Nhập thông tin tìm kiếm",oninput:function(e){t.isLoadingPage=!0,t.query=e.target.value,t.throttledSearch()}})])]),m("div",[m(".sideNavContainer",[m("div",[m("div.iconcontainer",[m("div.rvn__title-table","Danh sách yêu cầu giao dịch")]),m("table.rvn__table",[m("thead.rvn__thead",[m("tr.rvn__tr",[m("th.rvn__th","STT"),m("th.rvn__th","Người tạo"),m("th.rvn__th","Người nhận"),m("th.rvn__th","Phí nhận"),m("th.rvn__th","Phí giao dịch (%)"),m("th.rvn__th","Tổng tiền"),m("th.rvn__th","Ngày tạo"),m("th.rvn__th","Trạng thái"),m("th.rvn__th",{style:"width:100px;"},"Chi tiết")])]),m("tbody.rvn__tbody",this.scammerData.map((function(t,e){return m("tr.rvn__tr",{key:t.id},[m("td.rvn__td",e+1),m("td.rvn__td",t.attributes.creatorName),m("td.rvn__td",t.attributes.receiverName),m("td.rvn__td",t.attributes.serviceFee),m("td.rvn__td",t.attributes.transactionFee),m("td.rvn__td",t.attributes.totalAmount),m("td.rvn__td",new Date(t.attributes.createdAt).toLocaleDateString()),m("td.rvn__td",t.attributes.status),m("td.rvn__td",m(p(),{className:"User-controls",buttonClassName:"Button Button--icon Button--flat",menuClassName:"Dropdown-menu--right",icon:"fas fa-ellipsis-h"},m("button.Button.UserList-editModalBtn",{title:"nút"},[m("i.fas.fa-pencil-alt"),"Xem chi tiết"])))])})))])])])])]},e}(h());a().initializers.add("retechvn/mediated-transaction",(function(){a().routes.transactionListPage={path:"/giao-dich-trung-gian",component:v},(0,r.extend)(i().prototype,"items",(function(t){t.add("list-scammers",m(s(),{href:a().route("transactionListPage"),icon:"fas fa-magic",title:"Giao dịch trung gian"},"Giao dịch trung gian"),49)}))}))})(),module.exports={}})();
>>>>>>> 3bfd2205f68a5840158c69add336317e48afd04a
//# sourceMappingURL=admin.js.map