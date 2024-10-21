import Component from 'flarum/Component';
import app from 'flarum/app';
import LoadingIndicator from 'flarum/components/LoadingIndicator';
import Button from 'flarum/components/Button';
import Dropdown from 'flarum/common/components/Dropdown';

export default class TransactionHistoryList extends Component {
  oninit(vnode) {
    super.oninit(vnode);
    this.loading = true;
    this.moreResults = false;
    this.transactionHistory = [];
    this.user = this.attrs.params.user;
    this.loadResults();
  }

  view() {
    let loading;

    console.log(this.transactionHistory);

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
                <th class="rvn__th">Người tạo</th>
                <th class="rvn__th">Người nhận</th>
                <th class="rvn__th">Người trả phí</th>
                <th class="rvn__th">Phí giao dịch (%)</th>
                <th class="rvn__th">Tổng tiền</th>
                <th class="rvn__th">Ngày tạo</th>
                <th class="rvn__th">Trạng thái</th>
                <th class="rvn__th" style="width:100px;">
                  Chi tiết
                </th>
              </tr>
            </thead>

            <tbody class="rvn__tbody">
              {this.transactionHistory.map((transactionHistory, colIndex) => {
                return (
                  <tr class="rvn__tr" key={transactionHistory.id} data-id={transactionHistory.id}>
                    <td class="rvn__td">{colIndex + 1}</td>
                    <td class="rvn__td">{transactionHistory.attributes.creator.username}</td>
                    <td class="rvn__td">{transactionHistory.attributes.receiver.username}</td>
                    <td class="rvn__td">
                      {transactionHistory.attributes.rvn_payer_id == transactionHistory.attributes.rvn_receiver_id
                        ? transactionHistory.attributes.receiver.username
                        : transactionHistory.attributes.creator.username}
                    </td>
                    <td class="rvn__td">{transactionHistory.attributes.rvn_fee * 100} %</td>
                    <td class="rvn__td">
                      {transactionHistory.attributes.rvn_amount + transactionHistory.attributes.rvn_amount * transactionHistory.attributes.rvn_fee}
                    </td>
                    <td class="rvn__td">{transactionHistory.attributes.created_at}</td>
                    <td class="rvn__td">{transactionHistory.attributes.updated_at}</td>

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
                            'button.Button.UserList-cancelBtn',
                            {
                              title: 'Hủy',
                            },
                            ['Hủy']
                          ),
                          m(
                            'button.Button.UserList-confirmBtn',
                            {
                              title: 'Xác nhận',
                            },
                            ['Xác nhận']
                          ),
                          m(
                            'button.Button.UserList-complaintsBtn',
                            {
                              title: 'Khiếu nại',
                            },
                            ['Khiếu nại']
                          ),
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

  parseResults(results) {
    this.moreResults = !!results.payload.links && !!results.payload.links.next;
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
