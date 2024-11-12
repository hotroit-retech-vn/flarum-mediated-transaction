import Component from 'flarum/Component';
import app from 'flarum/app';
import LoadingIndicator from 'flarum/components/LoadingIndicator';
import Button from 'flarum/components/Button';
import Dropdown from 'flarum/common/components/Dropdown';
import DetailTransactionModal from './DetailTransactionModal';
import CancelTransactionModal from './CancelTransactionModal';

export default class TransactionHistoryList extends Component {
  oninit(vnode) {
    super.oninit(vnode);
    this.loading = true;
    this.moreResults = false;
    this.transactionHistory = [];
    this.user = this.attrs.params.user;
    this.statusText = {
      1: 'Đang xử lý',
      2: 'Thanh toán',
      3: 'Hoàn thành',
      4: 'Kiếu nại',
      5: 'Đã hủy',
    };
    this.loadResults();
  }

  getTotalMonny() {}

  getStatus(status, banks, monney, creator_id) {
    if (!banks && banks.length <= 0) return 1;
    let totalMonney = banks.reduce((total, transaction) => {
      return total + parseFloat(transaction.rvn_amount);
    }, 0);
    let balance = totalMonney - monney;
    let isCurrent = this.user == creator_id ? true : false;
    if (balance >= 0) {
      if (status == 1 || status == 2) {
        return 2;
      }
      if (status == 3) {
        return 3;
      }
    }
    if (status == 4) {
      return 4;
    }
    if (status == 5) {
      return 5;
    }
    return 1;
  }

  showStatusText(status) {
    if (status == 3) return 'Hoàn thành';
    if (status == 5) return 'Đã hủy';
    return 'Đang xử lý';
  }

  view() {
    let loading;

    if (this.loading) {
      loading = LoadingIndicator.component({ size: 'large' });
    }

    return (
      <div>
        <div style="padding-bottom:10px; font-size: 24px;font-weight: bold;">Lịch sử giao dịch</div>

        <div class="sideNavContainer">
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
                let checkStatus = this.getStatus(transac.attributes.latest_log_status, transac.attributes.banks, paid, transac.attributes.creator.id);
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
                    <td class="rvn__td">{this.showStatusText(checkStatus)}</td>
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
                                  onclick: () => app.modal.show(DetailTransactionModal),
                                },
                                ['Hoàn thành']
                              )
                            : '',
                          checkStatus == 1 || checkStatus == 2 || checkStatus == 5
                            ? m(
                                'button.Button.UserList-cancelBtn',
                                {
                                  title: 'Hủy',
                                  onclick: () => app.modal.show(CancelTransactionModal),
                                },
                                ['Hủy']
                              )
                            : '',
                          checkStatus == 1 || checkStatus == 2 || checkStatus == 3
                            ? m(
                                'button.Button.UserList-complaintsBtn',
                                {
                                  title: 'Khiếu nại',
                                  onclick: () => app.modal.show(CancelTransactionModal),
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
    return (+value).toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }

  parseResults(results) {
    this.moreResults = !!results.payload.links && !!results.payload.links.next;
    console.log(results.payload.data);

    [].push.apply(this.transactionHistory, results.payload.data);
    this.loading = false;
    m.redraw();

    return results;
  }

  hasMoreResults() {
    return this.moreResults;
  }

  loadResults(offset = 0) {
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
