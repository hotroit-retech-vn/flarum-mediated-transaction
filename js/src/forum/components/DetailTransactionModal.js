import Modal from 'flarum/components/Modal';
import app from 'flarum/app';
import LoadingIndicator from 'flarum/components/LoadingIndicator';

export default class DetailTransactionModal extends Modal {
  oninit(vnode) {
    super.oninit(vnode);
    this.transId = this.attrs.transId;
    this.currentUserId = this.attrs.userId;
    this.loading = true;
    this.moreResults = false;
    this.tranlogs = [];
    this.loadData(this.transId);
  }

  parseResults(results) {
    this.moreResults = !!results.payload.links && !!results.payload.links.next;
    [].push.apply(this.tranlogs, results.payload.data);
    this.loading = false;
    m.redraw();

    return results;
  }

  loadData(transID, offset = 0) {
    app.store
      .find('transaction-logs', {
        filter: {
          transactionId: transID,
        },
        page: {
          offset,
        },
      })
      .catch(() => {})
      .then(this.parseResults.bind(this));
  }

  title() {
    return 'Chi tiết giao dịch';
  }

  content() {
    if (this.loading) {
      return <div className="Modal-body">{LoadingIndicator.component({ size: 'large' })}</div>;
    }

    return (
      <div className="Modal-body sideNavContainer">
        <table className="TransactionLogsTable rvn__table">
          <thead class="rvn__thead">
            <tr class="rvn__tr">
              <th class="rvn__th">STT</th>
              <th class="rvn__th">Trạng thái</th>
              <th class="rvn__th">Lý do</th>
              <th class="rvn__th">Ngày cập nhật</th>
            </tr>
          </thead>
          <tbody class="rvn__tbody">
            {this.tranlogs.length ? (
              this.tranlogs.map((log, index) => (
                <tr key={log.id} class="rvn__tr">
                  <td class="rvn__th">{index + 1}</td>
                  <td class="rvn__th">
                    {this.showText(this.currentUserId, log.attributes.creator, log.attributes.rvn_status, log.attributes.transaction)}
                  </td>
                  <td class="rvn__th">{log.attributes.rvn_reason || 'N/A'}</td>
                  <td class="rvn__th">{log.attributes.updated_at}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td class="rvn__th" colSpan="6">
                  Không có dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }

  showText(currentId, creator, status, transaction) {
    let text = '';
    if (status == 1) {
      text = `[${creator.username}] đã tạo giao dịch`;
    }
    if (status == 2 ) {
      text = `[${creator.username}] đã thanh toán giao dịch`;
    }
    if (status == 3) {
      text = `[${creator.username}] đã hoàn thành giao dịch`;
    }
    if (status == 4) {
      text = `[${creator.username}] đã hủy giao dịch`;
    }
    if (status == 5) {
      text = `[${creator.username}] đã khiếu nại giao dịch`;
    }
    return text;
  }

  onsubmit(event) {
    event.preventDefault();
  }

  className() {
    return 'DetailTransactionModal';
  }
}
