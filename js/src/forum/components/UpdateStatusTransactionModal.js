import Modal from 'flarum/components/Modal';
import app from 'flarum/app';
import Button from 'flarum/components/Button';

export default class UpdateStatusTransactionModal extends Modal {
  oninit(vnode) {
    super.oninit(vnode);
    this.transId = this.attrs.transId;
    this.currentUserId = this.attrs.userId;
    this.reason = '';
    this.loading = false;
    this.status = this.attrs.status;
    this.status_old = this.attrs.status_old
    this.onCancelConfirmed = this.attrs.onCancelConfirmed || function () {};
  }

  titleStatus(status) {
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
  }

  title() {
    return this.titleStatus(this.status);
  }

  content() {
    return (
      <div className="Modal-body">
        {this.status !== 3 ? (
          <div className="Form-group">
            <label>Lý do</label>
            <input
              className="FormControl"
              type="text"
              placeholder="Nhập lý do"
              value={this.reason}
              oninput={(e) => {
                this.reason = e.target.value;
              }}
            />
          </div>
        ) : (
          ''
        )}

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

  onsubmit(event) {
    event.preventDefault();
    this.loading = true;

    const data = {
      transId: Number(this.transId),
      userId: Number(this.currentUserId),
      reason: this.reason,
      status: this.status,
      status_old: this.status_old
    };
    app
      .request({
        method: 'POST',
        url: app.forum.attribute('apiUrl') + '/transaction-logs',
        body: {
          data,
        },
      })
      .then((res) => {
        this.loading = false;
        this.onCancelConfirmed();
        this.hide();
        app.alerts.show({ type: 'success' }, 'Đã cập nhật.');
      })
      .catch((error) => {
        this.loading = false;
        app.alerts.show({ type: 'error' }, 'Đã xảy ra lỗi. Vui lòng thử lại.');
      });
  }

  className() {
    return 'CancelTransactionModal';
  }
}
