import app from 'flarum/admin/app';
import AdminPage from 'flarum/admin/components/AdminPage';
import listItems from 'flarum/common/helpers/listItems';
import Dropdown from 'flarum/common/components/Dropdown';
export default class TransactionListPage extends AdminPage {
  throttledSearch = debounce(250, () => this.loadPage(0));

  oninit(vnode) {
    super.oninit(vnode);
    this.transactionData = [];
    this.isLoadingPage = true;
    this.moreResults = false;
    this.query = '';
    this.loadPage(0);
  }
  parseResults(results) {
    this.moreResults = !!results.payload.links && !!results.payload.links.next;

    [].push.apply(this.transactionData, results.payload.data);
    this.isLoadingPage = false;
    m.redraw();

    return results;
  }

  loadPage(offset = 0) {
    this.transactionData = [];
    return app.store
      .find('admin/transactions', {
        page: {
          offset,
        },
      })
      .catch(() => {})
      .then(this.parseResults.bind(this));
  }

  headerInfo() {
    return {
      className: 'SharedUploadPage--header',
      icon: 'fas fa-magic',
      title: 'Quản lý giao dịch',
      description: 'What is here??',
    };
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

  formatCurrency(value) {
    if (!value) value = 0;
    return (+value).toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }

  content() {
    return [
      m('div.UserListPage-header', [
        m('div.Search-input', [
          m('input.FormControl.SearchBar', {
            type: 'search',
            placeholder: 'Nhập thông tin tìm kiếm',
            oninput: (e) => {
              this.isLoadingPage = true;
              this.query = e.target.value;
              this.throttledSearch();
            },
          }),
        ]),
      ]),

      m('div', [
        m('.sideNavContainer', [
          m('div', [
            m('div.iconcontainer', [m('div.rvn__title-table', 'Danh sách yêu cầu giao dịch')]),

            m('table.rvn__table', [
              m('thead.rvn__thead', [
                m('tr.rvn__tr', [
                  m('th.rvn__th', 'STT'),
                  m('th.rvn__th', 'Người tạo'),
                  m('th.rvn__th', 'Người nhận'),
                  m('th.rvn__th', 'Tiền thuê'),
                  m('th.rvn__th', 'Phí (%)'),
                  m('th.rvn__th', 'Tổng tiền'),
                  m('th.rvn__th', 'Ngày tạo'),
                  m('th.rvn__th', 'Trạng thái'),
                  m('th.rvn__th', { style: 'width:100px;' }, 'Chi tiết'),
                ]),
              ]),

              m(
                'tbody.rvn__tbody',
                this.transactionData.map((transac, colIndex) =>
                  m('tr.rvn__tr', { key: transac.id }, [
                    m('td.rvn__td', colIndex + 1),
                    m('td.rvn__td', transac.attributes.creator.username),
                    m('td.rvn__td', transac.attributes.receiver.username),
                    m('td.rvn__td', this.formatCurrency(transac.attributes.rvn_amount)),
                    m('td.rvn__td', transac.attributes.rvn_fee * 100 + '%'),
                    m('td.rvn__td', this.formatCurrency(transac.attributes.rvn_amount + transac.attributes.rvn_amount * transac.attributes.rvn_fee)),
                    m('td.rvn__td', transac.attributes.created_at),
                    m('td.rvn__td',  {
                      className: this.getStatusColor(transac.attributes.rvn_status),
                    },this.getStatusText(transac.attributes.rvn_status)),
                    m(
                      'td.rvn__td',
                      m(
                        Dropdown,
                        {
                          className: 'User-controls',
                          buttonClassName: 'Button Button--icon Button--flat',
                          menuClassName: 'Dropdown-menu--right',
                          icon: 'fas fa-ellipsis-h',
                        },
                        m(
                          'button.Button.UserList-editModalBtn',
                          {
                            title: 'nút',
                            // onclick: () => app.modal.show(EditUserModal, { user }),
                          },
                          [
                            m('i.fas.fa-pencil-alt'), // icon
                            'Xem chi tiết',
                          ]
                        )
                      )
                    ),
                  ])
                )
              ),
            ]),
          ]),
        ]),
      ]),
    ];
  }
}

function debounce(delay, callback) {
  let timeoutId;

  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
}
