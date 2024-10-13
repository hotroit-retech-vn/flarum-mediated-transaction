import app from 'flarum/admin/app';
import AdminPage from 'flarum/admin/components/AdminPage';
import listItems from 'flarum/common/helpers/listItems';
import Dropdown from 'flarum/common/components/Dropdown';
export default class TransactionListPage extends AdminPage {
  throttledSearch = debounce(250, () => this.loadPage(0));

  oninit(vnode) {
    super.oninit(vnode);
    // this.scammerData = [];
    this.loadTransactionList();
    this.scammerData = [
      {
        id: 1,
        attributes: {
          creatorName: 'Nguyễn Văn A',
          receiverName: 'Trần Thị B',
          serviceFee: 10000,
          transactionFee: 5000,
          totalAmount: 150000,
          createdAt: '2024-10-12T10:00:00Z',
          status: 'Hoàn tất',
          scammerBankCode: '123456789',
          scammerAccName: 'Nguyễn Văn A',
          scammerBankName: 'Ngân hàng ABC',
          scammerPhone: '0987654321',
          scammerEmail: 'nguyenvana@example.com',
        },
      },
      {
        id: 2,
        attributes: {
          creatorName: 'Lê Văn C',
          receiverName: 'Nguyễn Thị D',
          serviceFee: 20000,
          transactionFee: 10000,
          totalAmount: 300000,
          createdAt: '2024-10-11T15:30:00Z',
          status: 'Đang xử lý',
          scammerBankCode: '987654321',
          scammerAccName: 'Lê Văn C',
          scammerBankName: 'Ngân hàng XYZ',
          scammerPhone: '0123456789',
          scammerEmail: 'levanc@example.com',
        },
      },
      {
        id: 3,
        attributes: {
          creatorName: 'Phạm Văn E',
          receiverName: 'Trần Văn F',
          serviceFee: 15000,
          transactionFee: 7000,
          totalAmount: 220000,
          createdAt: '2024-10-10T08:15:00Z',
          status: 'Thất bại',
          scammerBankCode: '456789123',
          scammerAccName: 'Phạm Văn E',
          scammerBankName: 'Ngân hàng MNO',
          scammerPhone: '0987654321',
          scammerEmail: 'phamvena@example.com',
        },
      },
    ];
  }

  loadTransactionList() {}

  headerInfo() {
    return {
      className: 'SharedUploadPage--header',
      icon: 'fas fa-magic',
      title: 'Quản lý giao dịch',
      description: 'What is here??',
    };
  }

  /**
   * Show the actual ImageUploadPage.
   *
   * @returns {*}
   */
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
                  m('th.rvn__th', 'Phí nhận'),
                  m('th.rvn__th', 'Phí giao dịch (%)'),
                  m('th.rvn__th', 'Tổng tiền'),
                  m('th.rvn__th', 'Ngày tạo'),
                  m('th.rvn__th', 'Trạng thái'),
                  m('th.rvn__th', { style: 'width:100px;' }, 'Chi tiết'),
                ]),
              ]),

              m(
                'tbody.rvn__tbody',
                this.scammerData.map((scammer, colIndex) =>
                  m('tr.rvn__tr', { key: scammer.id }, [
                    m('td.rvn__td', colIndex + 1),
                    m('td.rvn__td', scammer.attributes.creatorName),
                    m('td.rvn__td', scammer.attributes.receiverName),
                    m('td.rvn__td', scammer.attributes.serviceFee),
                    m('td.rvn__td', scammer.attributes.transactionFee),
                    m('td.rvn__td', scammer.attributes.totalAmount),
                    m('td.rvn__td', new Date(scammer.attributes.createdAt).toLocaleDateString()),
                    m('td.rvn__td', scammer.attributes.status),
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
