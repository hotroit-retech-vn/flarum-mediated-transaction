import Modal from 'flarum/components/Modal';
import app from 'flarum/app';
import Button from 'flarum/components/Button';
import Alert from 'flarum/common/components/Alert';

export default class PayRequestTransactionModal extends Modal {
  oninit(vnode) {
    super.oninit(vnode);
    this.bankAccountName = '';
    this.bankAccountNumber = '';
    this.bankName = '';
    this.totalAmount = 500000;
    this.bankList = [];
    this.loadingBanks = false;
    this.getBankName();
  }

  async getBankName() {
    this.loadingBanks = true;
    try {
      const response = await app.request({
        method: 'GET',
        url: 'https://api.vietqr.io/v2/banks',
      });
      console.log(response);

      this.bankList = response.data.map((bank) => ({
        value: bank.code,
        label: bank.name,
      }));
      console.log(this.bankList);
    } catch (error) {
      console.error('Error fetching bank list:', error);
      this.showAlert('error', 'Không thể tải danh sách ngân hàng. Vui lòng thử lại sau.', 5000);
    } finally {
      this.loadingBanks = false;
      m.redraw(); // Cập nhật giao diện
    }
  }

  title() {
    return 'Yêu cầu rút tiền';
  }

  content() {
    return (
      <div className="Modal-body">
        <div className="Form-group">
          <label>Tổng số tiền có thể rút</label>
          <input className="FormControl" type="text" value={this.totalAmount} disabled />
        </div>

        <div className="Form-group">
          <label>Tên ngân hàng</label>
          {this.loadingBanks ? (
            <div>Đang tải danh sách ngân hàng...</div>
          ) : (
            <select
              className="FormControl"
              value={this.bankName}
              onchange={(e) => {
                this.bankName = e.target.value;
              }}
            >
              <option value="" disabled>
                Chọn ngân hàng
              </option>
              {this.bankList.map((bank) => (
                <option key={bank.value} value={bank.value}>
                  {bank.label}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="Form-group">
          <label>Tên tài khoản</label>
          <input
            className="FormControl"
            type="text"
            placeholder="Nhập tên tài khoản ngân hàng"
            value={this.bankAccountName}
            oninput={(e) => {
              this.bankAccountName = e.target.value;
            }}
          />
        </div>

        <div className="Form-group">
          <label>Số tài khoản</label>
          <input
            className="FormControl"
            type="text"
            placeholder="Nhập số tài khoản ngân hàng"
            value={this.bankAccountNumber}
            oninput={(e) => {
              this.bankAccountNumber = e.target.value;
            }}
          />
        </div>

        <div className="Form-group">
          <Button className="Button Button--primary" type="submit" loading={this.loading}>
            Xác nhận
          </Button>
          <Button
            className="Button Button--secondary"
            onclick={() => {
              this.onCancelConfirmed();
              this.hide();
            }}
          >
            Hủy bỏ
          </Button>
        </div>
      </div>
    );
  }

  showAlert(type = 'success', message = '', timeClear = 5000) {
    app.alerts.show(Alert, { type: type }, message);
    setTimeout(() => {
      app.alerts.clear();
    }, timeClear);
  }

  onsubmit(event) {
    event.preventDefault();
    if (this.bankAccountName && this.bankAccountNumber && this.bankName && this.totalAmount) {
      const data = {
        rvn_bankacc_name: this.bankAccountName,
        rvn_bankacc_number: this.bankAccountNumber,
        rvn_bank_name: this.bankName,
        rvn_monney: this.totalAmount,
      };

      app
        .request({
          method: 'POST',
          url: app.forum.attribute('apiUrl') + '/pay-requests',
          body: { data },
        })
        .then((response) => {
          this.showAlert('success', 'Yêu cầu rút tiền đã được gửi!', 5000);
          this.onCancelConfirmed();
          this.loading = false;
          app.modal.close();
        })
        .catch((error) => {
          console.log(error);
          this.showAlert('error', 'Có lỗi xảy ra. Vui lòng thử lại!', 5000);
          this.loading = false;
        });
    } else {
      this.showAlert('error', 'Thiếu thông tin!', 2000);
      return;
    }
  }

  // Xử lý khi hủy bỏ
  onCancelConfirmed() {
    this.bankAccountName = '';
    this.bankAccountNumber = '';
    this.bankName = '';
  }

  className() {
    return 'PayRequestTransactionModal';
  }
}
