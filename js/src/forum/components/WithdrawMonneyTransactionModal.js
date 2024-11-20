import Modal from 'flarum/components/Modal';
import app from 'flarum/app';
import Button from 'flarum/components/Button';

export default class WithdrawMonneyTransactionModal extends Modal {
  oninit(vnode) {
    super.oninit(vnode);
    this.bankAccountName = ''; // Tên tài khoản ngân hàng
    this.bankAccountNumber = ''; // Số tài khoản ngân hàng
    this.bankName = ''; // Tên ngân hàng
    this.totalAmount = 500000; // Tổng số tiền có thể rút (có thể lấy từ API hoặc logic tính toán)
  }

  title() {
    return 'Yêu cầu rút tiền';
  }

  content() {
    return (
      <div className="Modal-body">
        {/* Hiển thị tổng số tiền có thể rút */}
        <div className="Form-group">
          <label>Tổng số tiền có thể rút</label>
          <input
            className="FormControl"
            type="text"
            value={this.totalAmount}
            disabled
          />
        </div>

        {/* Tên tài khoản ngân hàng */}
        <div className="Form-group">
          <label>Tên tài khoản ngân hàng</label>
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

        {/* Số tài khoản ngân hàng */}
        <div className="Form-group">
          <label>Số tài khoản ngân hàng</label>
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

        {/* Tên ngân hàng */}
        <div className="Form-group">
          <label>Tên ngân hàng</label>
          <input
            className="FormControl"
            type="text"
            placeholder="Nhập tên ngân hàng"
            value={this.bankName}
            oninput={(e) => {
              this.bankName = e.target.value;
            }}
          />
        </div>

        {/* Các nút xác nhận và hủy bỏ */}
        <div className="Form-group">
          <Button
            className="Button Button--primary"
            type="submit"
            loading={this.loading}
            onclick={() => {
              this.onSubmit();
            }}
          >
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

  // Xử lý khi xác nhận yêu cầu rút tiền
  onSubmit() {
    if (this.bankAccountName && this.bankAccountNumber && this.bankName) {
      // Gửi yêu cầu rút tiền (giả sử bạn có API hoặc logic xử lý tại đây)
      app.store.createRecord('withdraw-transaction', {
        bankAccountName: this.bankAccountName,
        bankAccountNumber: this.bankAccountNumber,
        bankName: this.bankName,
        totalAmount: this.totalAmount,
      });

      // Đóng modal sau khi gửi yêu cầu
      this.hide();
      alert('Yêu cầu rút tiền đã được gửi.');
    } else {
      alert('Vui lòng nhập đầy đủ thông tin!');
    }
  }

  // Xử lý khi hủy bỏ
  onCancelConfirmed() {
    this.bankAccountName = '';
    this.bankAccountNumber = '';
    this.bankName = '';
  }

  className() {
    return 'WithdrawMonneyTransactionModal';
  }
}
