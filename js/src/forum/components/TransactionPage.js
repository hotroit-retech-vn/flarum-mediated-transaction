import app from 'flarum/forum/app';
import Page from 'flarum/common/components/Page';
import IndexPage from 'flarum/components/IndexPage';
import listItems from 'flarum/helpers/listItems';
import Button from 'flarum/components/Button';
import Alert from 'flarum/common/components/Alert';
import QRModal from './QRModal';

export default class TransactionPage extends Page {
  oninit(vnode) {
    super.oninit(vnode);
    this.loading = true;
    this.user_current = app.session.user;
    this.initializeData();
    this.resultsUser = [];
    this.showDropdown = false;
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  initializeData() {
    this.data = {
      rvn_creator_id: 1,
      rvn_receiver_id: '',
      rvn_amount: 0,
      rvn_fee: 0.1,
      rvn_payer_id: this.user_current.data.id,
      rvn_note: '',
    };

    this.rvn_creator_name = app.session.user.username();
    this.rvn_receiver_name = '';
    this.rvn_service_fee = 0;
    this.rvn_total_amount = 0;
    this.rvn_receiver_name_search = '';
    this.rvn_receiver_name_select = '';
  }

  oncreate(vnode) {
    super.oncreate(vnode);
    app.setTitle('Giao dịch trung gian');
    app.setTitleCount(0);
    document.addEventListener('click', this.handleClickOutside);
  }

  onremove() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  view() {
    return m('.IndexPage', [IndexPage.prototype.hero(), m('.container', [m('.sideNavContainer', [this.renderSidebar(), this.renderForm()])])]);
  }

  renderSidebar() {
    return m('nav.IndexPage-nav.sideNav', m('ul', listItems(IndexPage.prototype.sidebarItems().toArray())));
  }

  renderForm() {
    return m('.IndexPage-results.sideNavOffset', [
      m('div.retechvn__text-center', m('h2', 'Giao dịch trung gian')),
      m('.Modal-body.rvn__body-form .row', [
        this.renderInput(`Tên đồ án`, 'Nhập tên đồ án',  this.rvn_creator_name + `${this.rvn_receiver_name != '' ? '__' +this.rvn_receiver_name : ''}`, true),
        this.renderReceiverInput('Tên đối tác', 'Nhập tên đối tác cần tìm kiếm'),
        this.renderNumberInput('Tiền thuê', this.data.rvn_amount, this.handleRentChange.bind(this)),
        this.renderInput(`Phí dịch vụ (${this.data.rvn_fee * 100}%)`, '', this.rvn_service_fee, true),
        this.renderRadioGroup('Người trả phí', 'Bạn trả phí', 'Đối tác trả phi'),
        this.renderInput('Tổng tiền bạn phải trả', '', this.rvn_total_amount, true),
        this.renderTextarea('Ghi chú', this.data.rvn_note, (e) => (this.data.rvn_note = e.target.value)),
        this.renderCheckbox(),
        this.renderSubmitButton(),
      ]),
    ]);
  }


  renderInput(label, placeholder, value, disabled = false) {
    return m('.Form-group.col.col-md-6', [m('label', label), m('input.FormControl', { value, disabled, placeholder })]);
  }

  renderReceiverInput(lable, placeholder) {
    return m('.Form-group.position-relative.col.col-md-6', [
      m('label', [
        lable,
        m(
          'span',
          { className: this.data.rvn_receiver_id ? 'rvn__text-green' : 'rvn__text-red' },
          this.data.rvn_receiver_id ? ` (${this.rvn_receiver_name_select})` : ' (Chưa chọn)'
        ),
      ]),
      m('input.FormControl', {
        value: this.rvn_receiver_name_search,
        placeholder: placeholder,
        onfocus: () => (this.showDropdown = true),
        onkeyup: (e) => this.handleSearch(e),
      }),
      this.showDropdown && this.renderDropdown(),
    ]);
  }

  renderDropdown() {
    return m(
      '.search-results',
      this.resultsUser.length ? this.resultsUser.map(this.renderDropdownItem.bind(this)) : m('div.no-results.rvn__mx2', 'Không có dữ liệu')
    );
  }

  renderDropdownItem(user) {
    return m('div.search-result-item', { onclick: () => this.selectReceiver(user) }, [
      user.avatarUrl()
        ? m('img.Avatar.rvn__avatar', { src: user.avatarUrl(), alt: user.displayName() })
        : m('span.Avatar.rvn__avatar', { style: this.avatarStyle(user) }, user.displayName().charAt(0).toUpperCase()),
      m('span.username', `  ${user.displayName()} (${user.username()})`),
    ]);
  }

  renderNumberInput(label, value, onChange) {
    return m('.Form-group.col.col-md-6', [
      m('label', `${label} (${this.formatCurrency(value)})`),
      m('input[type=number].FormControl', { value, onchange: onChange }),
    ]);
  }

  renderRadioGroup(lable, lableC1, labelC2) {
    return m('.Form-group.col.col-md-6', [
      m('label', lable),
      m('.radio-group', [
        this.renderRadioOption(lableC1, this.data.rvn_creator_id, this.rvn_creator_name, this.data.rvn_payer_id == this.data.rvn_creator_id),
        this.renderRadioOption(
          labelC2,
          this.data.rvn_receiver_id,
          this.rvn_receiver_name,
          this.data.rvn_payer_id == this.data.rvn_receiver_id,
          !this.data.rvn_receiver_id
        ),
      ]),
    ]);
  }

  renderRadioOption(label, value, text, checked, disabled = false) {
    return m('label', [
      m('input[type=radio]', {
        name: 'fee_payer',
        value,
        checked,
        disabled,
        onchange: (e) => this.handleFeePayerChange(e),
      }),
      ` ${label} (${text})`,
    ]);
  }

  renderTextarea(label, value, onChange) {
    return m('.Form-group.col.col-12.rvn_note', [m('label', label), m('textarea.FormControl', { value, onchange: onChange })]);
  }

  renderCheckbox() {
    return m('.Form-group.col', [
      m('label', [
        m('input[type=checkbox]', {
          checked: this.isChecked,
          onchange: (e) => (this.isChecked = e.target.checked),
        }),
        ' Đồng ý với điều khoản và điều kiện!',
      ]),
    ]);
  }

  renderSubmitButton() {
    return m('.Form-group.col.col-12', [
      Button.component(
        {
          type: 'button',
          className: 'Button Button--primary Button--block',
          onclick: (e) => this.onsubmit(e),
        },
        'Tạo giao dịch'
      ),
    ]);
  }

  handleRentChange(e) {
    this.data.rvn_amount = +e.target.value;
    this.calculateTotal();
  }

  handleFeePayerChange(e) {
    this.data.rvn_payer_id = e.target.value;
    this.calculateTotal();
  }

  handleSearch(e) {
    this.rvn_receiver_name_search = e.target.value;
    setTimeout(() => this.search(e.target.value), 1000);
  }

  selectReceiver(user) {
    this.rvn_receiver_name = user.username();
    this.rvn_receiver_name_search = '';
    this.rvn_receiver_name_select = `${user.displayName()} (${user.username()})`;
    this.data.rvn_receiver_id = user.data.id;
    this.showDropdown = false;
  }

  avatarStyle(user) {
    return {
      '--avatar-bg': user.color(),
      'font-size': '20px',
    };
  }

  validateForm() {
    const { rvn_receiver_id, rvn_amount, rvn_fee, rvn_payer_id } = this.data;
    const errors = [
      [!rvn_receiver_id, 'Chưa chọn tên đối tác.'],
      [rvn_amount <= 0, 'Tiền thuê phải lớn hơn 0.'],
      [!rvn_fee, 'Phí dịch vụ không hợp lệ.'],
      [!rvn_payer_id, 'Người trả phí chưa được chọn.'],
      [!this.isChecked, 'Bạn phải đồng ý với điều khoản và điều kiện.'],
    ];

    for (let [condition, message] of errors) {
      if (condition) {
        this.showAlert('error', message, 5000);
        return false;
      }
    }

    return true;
  }

  formatCurrency(value) {
    return (+value).toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }

  calculateTotal() {
    const rentAmount = +this.data.rvn_amount || 0;
    const serviceFee = rentAmount * 0.1;
    this.rvn_service_fee = this.formatCurrency(serviceFee);
    this.rvn_total_amount = this.formatCurrency(this.data.rvn_payer_id == this.data.rvn_creator_id ? rentAmount + serviceFee : rentAmount);
  }

  search(query) {
    if (query.trim()) {
      app.store.find('users', { filter: { q: query } }).then((users) => {
        this.resultsUser = users.filter((user) => user.data.id != this.data.rvn_creator_id);
        this.showDropdown = true;
        m.redraw();
      });
    } else {
      this.resultsUser = [];
      this.showDropdown = false;
      m.redraw();
    }
  }

  handleClickOutside(e) {
    if (!e.target.closest('.FormControl') && !e.target.closest('.search-results')) {
      this.showDropdown = false;
      m.redraw();
    }
  }

  showAlert(type = 'success', message = '', timeClear = 5000) {
    app.alerts.show(Alert, { type: type }, message);
    setTimeout(() => {
      app.alerts.clear();
    }, timeClear);
  }

  onsubmit(event) {
    event.preventDefault();

    // if (!this.validateForm()) {
    //   return;
    // }

    this.loading = true;

    const data = {
      rvn_creator_id: Number(this.data.rvn_creator_id),
      rvn_receiver_id: Number(this.data.rvn_receiver_id),
      rvn_amount: Number(this.data.rvn_amount),
      rvn_fee: this.data.rvn_fee,
      rvn_payer_id: Number(this.data.rvn_payer_id),
      rvn_note: this.data.rvn_note,
    };
    console.log(data);

    app.modal.show(QRModal, {  
      onsubmit: (confirm) => {
        confirm = confirm;
        console.log(confirm);
        
        app
          .request({
            method: 'POST',
            url: app.forum.attribute('apiUrl') + '/transactions',
            body: { data },
          })
          .then((response) => {
            console.log(response);
    
            this.showAlert('success', 'Tạo giao dịch thành công!', 5000);
            this.initializeData();
            this.loading = false;
          })
          .catch((error) => {
            console.log(error);
            
            this.showAlert('error', 'Có lỗi xảy ra. Vui lòng thử lại!', 5000);
            this.loading = false;
          });
        
      }
    })
  }
}
