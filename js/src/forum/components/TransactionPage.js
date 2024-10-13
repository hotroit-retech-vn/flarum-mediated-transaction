import app from 'flarum/forum/app';
import Page from 'flarum/common/components/Page';
import IndexPage from 'flarum/components/IndexPage';
import listItems from 'flarum/helpers/listItems';
import Button from 'flarum/components/Button';
import Alert from 'flarum/common/components/Alert';

export default class TransactionPage extends Page {
  oninit(vnode) {
    super.oninit(vnode);
    this.loading = true;
    this.usernameCreate = app.session.user.username();
    this.initializeData();
    this.resultsUser = [];
    this.showDropdown = false;
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  initializeData() {
    this.data = {
      rvn_creator_id : 1,
      rvn_receiver_id: '',
      rvn_rent_amount: 0,
      rvn_fee: 0.1,
      rvn_fee_payer: this.usernameCreate,
      rvn_note: '',
    };
    this.rvn_title = this.usernameCreate;
    this.rvn_receiver_name = '';
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
        this.renderInput('Tên giao dịch', this.rvn_title, true),
        this.renderReceiverInput(),
        this.renderNumberInput('Tiền thuê', this.data.rvn_rent_amount, this.handleRentChange.bind(this)),
        this.renderRadioGroup(),
        this.renderInput(`Phí dịch vụ (${this.data.rvn_fee * 100}%)`, this.rvn_service_fee, true),
        this.renderInput('Tổng số tiền phải trả', this.rvn_total_amount, true),
        this.renderTextarea('Ghi chú', this.data.rvn_note, (e) => (this.data.rvn_note = e.target.value)),
        this.renderCheckbox(),
        this.renderSubmitButton(),
      ]),
    ]);
  }

  renderInput(label, value, disabled = false) {
    return m('.Form-group.col.col-md-6', [m('label', label), m('input.FormControl', { value, disabled })]);
  }

  renderReceiverInput() {
    return m('.Form-group.position-relative.col.col-md-6', [
      m('label', [
        'Người nhận ',
        m(
          'span',
          { className: this.data.rvn_receiver_id ? 'rvn__text-green' : 'rvn__text-red' },
          this.data.rvn_receiver_id ? '(Đã chọn)' : '(Chưa chọn)'
        ),
      ]),
      m('input.FormControl', {
        value: this.rvn_receiver_name,
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
        ? m('img.Avatar', { src: user.avatarUrl(), alt: user.displayName() })
        : m('span.Avatar', { style: this.avatarStyle(user) }, user.displayName().charAt(0).toUpperCase()),
      m('span.username', user.displayName()),
    ]);
  }

  renderNumberInput(label, value, onChange) {
    return m('.Form-group.col.col-md-6', [
      m('label', `${label} (${this.formatCurrency(value)})`),
      m('input[type=number].FormControl', { value, onchange: onChange }),
    ]);
  }

  renderRadioGroup() {
    return m('.Form-group.col.col-md-6', [
      m('label', 'Người trả phí'),
      m('.radio-group', [
        this.renderRadioOption('Người gửi', this.usernameCreate, this.data.rvn_fee_payer === this.usernameCreate),
        this.renderRadioOption(
          'Người nhận',
          this.data.rvn_receiver_id,
          this.data.rvn_fee_payer === this.data.rvn_receiver_id,
          !this.data.rvn_receiver_id
        ),
      ]),
    ]);
  }

  renderRadioOption(label, value, checked, disabled = false) {
    return m('label', [
      m('input[type=radio]', {
        name: 'fee_payer',
        value,
        checked,
        disabled,
        onchange: (e) => this.handleFeePayerChange(e),
      }),
      ` ${label} (${value})`,
    ]);
  }

  renderTextarea(label, value, onChange) {
    return m('.Form-group.col.col-12', [m('label', label), m('textarea.FormControl', { value, onchange: onChange })]);
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
          onclick: (e) => this.validateForm() && this.onsubmit(e),
        },
        'Tạo giao dịch'
      ),
    ]);
  }

  handleRentChange(e) {
    this.data.rvn_rent_amount = +e.target.value;
    this.calculateTotal();
  }

  handleFeePayerChange(e) {
    this.data.rvn_fee_payer = e.target.value;
    this.calculateTotal();
  }

  handleSearch(e) {
    this.rvn_receiver_name = e.target.value;
    setTimeout(() => this.search(e.target.value), 1000);
  }

  selectReceiver(user) {
    this.rvn_receiver_name = user.displayName();
    this.data.rvn_receiver_id = user.username();
    this.rvn_title = `${this.usernameCreate}__${this.data.rvn_receiver_id}`;
    this.showDropdown = false;
  }

  avatarStyle(user) {
    return {
      '--avatar-bg': user.color(),
      'font-size': '20px',
      '--size': '30px',
      margin: '0 10px',
    };
  }

  validateForm() {
    const { rvn_title, rvn_receiver_id, rvn_rent_amount, rvn_fee, rvn_fee_payer } = this.data;
    const errors = [
      [!rvn_title, 'Tên giao dịch không được để trống.'],
      [!rvn_receiver_id, 'Người nhận chưa được chọn.'],
      [rvn_rent_amount <= 0, 'Tiền thuê phải lớn hơn 0.'],
      [!rvn_fee, 'Phí dịch vụ không hợp lệ.'],
      [!rvn_fee_payer, 'Người trả phí chưa được chọn.'],
      [!this.isChecked, 'Bạn phải đồng ý với điều khoản và điều kiện.'],
    ];

    for (let [condition, message] of errors) {
      if (condition) {
        this.showAlert('error', message, 5000)
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
    const rentAmount = +this.data.rvn_rent_amount || 0;
    const serviceFee = rentAmount * 0.1;
    this.rvn_service_fee = this.formatCurrency(serviceFee);
    this.rvn_total_amount = this.formatCurrency(this.data.rvn_fee_payer !== this.usernameCreate ? rentAmount + serviceFee : rentAmount);
  }

  search(query) {
    if (query.trim()) {
      app.store.find('users', { filter: { q: query } }).then((users) => {
        this.resultsUser = users.filter((user) => user.username() !== this.usernameCreate);
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

  showAlert(type = 'success', message = "", timeClear = 5000) {
    app.alerts.show(Alert, { type: type }, message);
        setTimeout(() => {
          app.alerts.clear()
        }, timeClear)
  }

  onsubmit(event) {
    event.preventDefault();

    app.alerts.show(Alert, { type: 'success' }, 'Tạo giao dịch thành công!');

    // app.store
    //   .createRecord('scammers')
    //   .save({
    //     scammerName: this.scammerName,
    //     scammerPhone: this.scammerPhone,
    //     scammerEmail: this.scammerEmail,
    //     scammerBankCode: this.scammerBankCode,
    //     scammerBankName: this.scammerBankName,
    //     scammerAccName: this.scammerAccName,
    //     scammerFacebook: this.scammerFacebook,
    //     description: this.description,
    //     createBy: app.session.user.data.id,
    //   })
    //   .then(() => {
    //     app.modal.close();
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     m.redraw();

    //     throw error;
    //   });
  }
}
