import Component from 'flarum/Component';
import app from 'flarum/app';
import LoadingIndicator from 'flarum/components/LoadingIndicator';
import Dropdown from 'flarum/common/components/Dropdown';
import DetailTransactionModal from './DetailTransactionModal';
import UpdateStatusTransactionModal from './UpdateStatusTransactionModal';
import PayRequestTransactionModal from './PayRequestTransactionModal';

export default class TransactionHistoryList extends Component {
  oninit(vnode) {
    super.oninit(vnode);
    this.loading = true;
    this.moreResults = false;
    this.transactionHistory = [];
    this.monneyTransaction = {};
    this.user = this.attrs.params.user;
    this.loadResults();
  }

  getStatus(status, banks, monney, creator_id, create_status, revice_status) {
    if (!banks || banks.length === 0) return 1;

    const totalMonney = banks.reduce((total, transaction) => total + parseFloat(transaction.rvn_amount), 0);
    const balance = totalMonney - monney;
    const isCurrentUser = this.user.id() === creator_id;

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
  }

  getStatusText(status) {
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
  }

  getStatusColor(status) {
    switch (status) {
      case 3: // Hoàn thành
        return 'green';
      case 4: // Đã hủy
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
  }

  view() {
    let loading;

    if (this.loading) {
      loading = LoadingIndicator.component({ size: 'large' });
    }
    const monneyData = this.monneyTransaction || {};

    return (
      <div>
        <div style="display: flex; justify-content: space-between;">
          <div style="padding-bottom:10px; font-size: 24px; font-weight: bold;">Lịch sử giao dịch</div>
          <button
            class="btn-withdraw"
            onclick={() => {
              app.modal.show(PayRequestTransactionModal);
            }}
          >
            Rút Tiền
          </button>
        </div>

        {/* Thêm phần hiển thị 4 card */}

        <div class="sideNavContainer">
          <div class="container">
            <div class="row">
              <div class="col-12 col-md-6 col-lg-3">
                <div class="card">
                  <div class="card-title">Đã chuyển</div>
                  <div class="card-value">{this.formatCurrency(monneyData.total_monney_bank)}</div>
                </div>
              </div>
              <div class="col-12 col-md-6 col-lg-3">
                <div class="card">
                  <div class="card-title">Hoàn thành job</div>
                  <div class="card-value">{this.formatCurrency(monneyData.total_to_pay)}</div>
                </div>
              </div>
              <div class="col-12 col-md-6 col-lg-3">
                <div class="card">
                  <div class="card-title">Đã hoàn trả</div>
                  <div class="card-value">{this.formatCurrency(0)}</div>
                </div>
              </div>
              <div class="col-12 col-md-6 col-lg-3">
                <div class="card">
                  <div class="card-title">Được rút</div>
                  <div class="card-value">{this.formatCurrency(monneyData.total_to_receive)}</div>
                </div>
              </div>
            </div>

            <table class="rvn__table">
              <thead class="rvn__thead">
                <tr class="rvn__tr">
                  <th class="rvn__th">STT</th>
                  <th class="rvn__th">Tên đồ án</th>
                  <th class="rvn__th">Tên thợ</th>
                  <th class="rvn__th">Tiền thuê</th>
                  <th class="rvn__th">Phí</th>
                  <th class="rvn__th">Người trả phí</th>
                  <th class="rvn__th">Tổng tiền</th>
                  <th class="rvn__th">Trạng thái</th>
                  <th class="rvn__th">Ngày tạo</th>
                  <th class="rvn__th" style="width:100px;">
                    Chi tiết
                  </th>
                </tr>
              </thead>

              <tbody class="rvn__tbody">
                {this.transactionHistory.map((transac, colIndex) => {
                  let paid = this.showPrice(
                    this.user.id,
                    transac.attributes.creator.id,
                    transac.attributes.rvn_payer_id,
                    transac.attributes.rvn_amount,
                    transac.attributes.rvn_fee
                  );
                  let checkStatus = this.getStatus(
                    transac.attributes.rvn_status,
                    transac.attributes.banks,
                    paid,
                    transac.attributes.creator.id,
                    transac.attributes.sender_last_status,
                    transac.attributes.receiver_last_status
                  );

                  return (
                    <tr class="rvn__tr" key={transac.id} data-id={transac.id}>
                      <td class="rvn__td">{colIndex + 1}</td>
                      <td class="rvn__td">{transac.attributes.creator.username + '__' + transac.attributes.receiver.username}</td>
                      <td class="rvn__td">{transac.attributes.receiver.username}</td>
                      <td class="rvn__td">{this.formatCurrency(transac.attributes.rvn_amount)}</td>
                      <td class="rvn__td">{transac.attributes.rvn_fee * 100}%</td>
                      <td class="rvn__td">
                        {transac.attributes.rvn_payer_id == transac.attributes.rvn_receiver_id
                          ? transac.attributes.receiver.username
                          : transac.attributes.creator.username}
                      </td>
                      <td class="rvn__td">
                        {this.formatCurrency(transac.attributes.rvn_amount + transac.attributes.rvn_amount * transac.attributes.rvn_fee)}
                      </td>
                      <td class="rvn__td" style={{ color: this.getStatusColor(checkStatus) }}>
                        {this.getStatusText(checkStatus)}
                      </td>
                      <td class="rvn__td">{transac.attributes.created_at}</td>

                      {m(
                        'td.rvn__td',
                        m(
                          Dropdown,
                          {
                            className: 'User-controls',
                            buttonClassName: 'Button Button--icon Button--flat',
                            menuClassName: 'Dropdown-menu--right',
                            icon: 'fas fa-ellipsis-h',
                          },
                          [
                            m(
                              'button.Button.UserList-detailBtn',
                              {
                                title: 'Xem chi tiết',
                                onclick: () => app.modal.show(DetailTransactionModal, { transId: transac.id, userId: this.user.id() }),
                              },
                              ['Xem chi tiết']
                            ),

                            checkStatus == 2 || checkStatus == 5
                              ? m(
                                  'button.Button.UserList-confirmBtn',
                                  {
                                    title: 'Hoàn thành',
                                    onclick: () =>
                                      app.modal.show(UpdateStatusTransactionModal, {
                                        transId: transac.id,
                                        userId: this.user.id(),
                                        status: 3,
                                        status_old:
                                          transac.attributes.creator.id == this.user.id()
                                            ? transac.attributes.sender_last_status
                                            : transac.attributes.receiver_last_status,
                                        onCancelConfirmed: () => {
                                          this.transactionHistory = [];
                                          this.loadResults();
                                        },
                                      }),
                                  },
                                  ['Hoàn thành']
                                )
                              : '',
                            checkStatus == 1 || checkStatus == 2 || checkStatus == 5
                              ? m(
                                  'button.Button.UserList-cancelBtn',
                                  {
                                    title: 'Hủy',
                                    onclick: () =>
                                      app.modal.show(UpdateStatusTransactionModal, {
                                        transId: transac.id,
                                        userId: this.user.id(),
                                        status: 4,
                                        status_old:
                                          transac.attributes.creator.id == this.user.id()
                                            ? transac.attributes.sender_last_status
                                            : transac.attributes.receiver_last_status,
                                        onCancelConfirmed: () => {
                                          this.transactionHistory = [];
                                          this.loadResults();
                                        },
                                      }),
                                  },
                                  ['Hủy']
                                )
                              : '',
                            checkStatus == 2 || (checkStatus == 3 && checkStatus != 1)
                              ? m(
                                  'button.Button.UserList-complaintsBtn',
                                  {
                                    title: 'Khiếu nại',
                                    onclick: () =>
                                      app.modal.show(UpdateStatusTransactionModal, {
                                        transId: transac.id,
                                        userId: this.user.id(),
                                        status: 5,
                                        status_old:
                                          transac.attributes.creator.id == this.user.id()
                                            ? transac.attributes.sender_last_status
                                            : transac.attributes.receiver_last_status,
                                        onCancelConfirmed: () => {
                                          this.transactionHistory = [];
                                          this.loadResults();
                                        },
                                      }),
                                  },
                                  ['Khiếu nại']
                                )
                              : '',
                          ]
                        )
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  loadMore() {
    this.loading = true;
    this.loadResults(this.transactionHistory.length);
  }

  showPrice(currentID, creatorId, playFee, price, fee) {
    if (creatorId == currentID && currentID == playFee) {
      return fee * price;
    } else if (creatorId == currentID && currentID != playFee) {
      return 0;
    } else if (creatorId != currentID && currentID == playFee) {
      return price + fee * price;
    } else {
      return price;
    }
  }

  caculator(price, fee, getFee = false) {
    return getFee ? this.formatCurrency(price + fee * price) : this.formatCurrency(fee * price);
  }

  formatCurrency(value) {
    if (!value) value = 0;
    return (+value).toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }

  parseResults(results) {
    this.moreResults = !!results.payload.links && !!results.payload.links.next;

    [].push.apply(this.transactionHistory, results.payload.data);
    this.loading = false;
    m.redraw();

    return results;
  }

  parseMonneyResults(results) {
    this.monneyTransaction = { ...results.data.attributes };
    this.loading = false;
    m.redraw();
    return results;
  }

  hasMoreResults() {
    return this.moreResults;
  }

  loadResults(offset = 0) {
    app
      .request({
        method: 'GET',
        url: app.forum.attribute('apiUrl') + '/get-all-transactions',
      })
      .then(this.parseMonneyResults.bind(this))
      .catch(() => {});
    return app.store
      .find('transactions', {
        filter: {
          user: this.user.id(),
        },
        page: {
          offset,
        },
      })
      .catch(() => {})
      .then(this.parseResults.bind(this));
  }
}
