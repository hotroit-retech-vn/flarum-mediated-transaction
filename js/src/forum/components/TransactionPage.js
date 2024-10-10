import app from 'flarum/forum/app';
import Page from 'flarum/common/components/Page';
import IndexPage from 'flarum/components/IndexPage';
import listItems from 'flarum/helpers/listItems';
import Button from 'flarum/components/Button';
export default class TransactionPage extends Page {
  oninit(vnode) {
    super.oninit(vnode);
    this.loading = true;

    this.scammerName = '';
    this.scammerBankName = '';
    this.scammerPhone = '';
    this.scammerAccName = '';
    this.scammerEmail = '';
    this.scammerBankCode = '';
    this.scammerFacebook = '';
    this.scammerFacebook = '';
    this.description = '';
  }
  oncreate(vnode) {
    super.oncreate(vnode);

    app.setTitle('Giao dịch trung gian');
    app.setTitleCount(0);
  }

  view() {
    return m('.IndexPage', [
        IndexPage.prototype.hero(),
        m(
          '.container',
          m('.sideNavContainer', [
            m('nav.IndexPage-nav.sideNav', m('ul', listItems(IndexPage.prototype.sidebarItems().toArray()))),
            m(
              '.IndexPage-results.sideNavOffset',
              m('div', { class: 'retechvn__text-center' }, [m('h2', 'Giao dịch trung gian')]),
              m('.Modal-body .row', [
                m('.Form-group .col .col-6', [
                    m('label', 'Tieeu '),
                    m('input.FormControl', {
                        value: this.scammerName,
                        onchange: event => {
                            this.scammerName = event.target.value;
                        },
                    })
                ]),
                m('.Form-group .col .col-6', [
                    m('label', 'Tên ngân hàng'),
                    m('input.FormControl', {
                        value: this.scammerBankName,
                        onchange: event => {
                            this.scammerBankName = event.target.value;
                        },
                    })
                ]),
                m('.Form-group .col .col-6', [
                    m('label', 'Số điện thoại'),
                    m('input.FormControl', {
                        value: this.scammerPhone,
                        onchange: event => {
                            this.scammerPhone = event.target.value;
                        },
                    })
                ]),
                m('.Form-group .col .col-6', [
                    m('label', 'Tên chủ tài khoản'),
                    m('input.FormControl', {
                        value: this.scammerAccName,
                        onchange: event => {
                            this.scammerAccName = event.target.value;
                        },
                    })
                ]),
                m('.Form-group .col .col-6', [
                    m('label', 'Email'),
                    m('input.FormControl', {
                        value: this.scammerEmail,
                        onchange: event => {
                            this.scammerEmail = event.target.value;
                        },
                    })
                ]),
                m('.Form-group .col .col-6', [
                    m('label', 'Số tài khoản'),
                    m('input.FormControl', {
                        value: this.scammerBankCode,
                        onchange: event => {
                            this.scammerBankCode = event.target.value;
                        },
                    })
                ]),
                m('.Form-group .col .col-12', [
                    m('label', 'Facebook'),
                    m('input.FormControl', {
                        value: this.scammerFacebook,
                        onchange: event => {
                            this.scammerFacebook = event.target.value;
                        },
                    })
                ]),
                m('.Form-group .col .col-12', [
                    m('label', 'Ảnh'),
                    m('input.FormControl', {
                        type: 'image',
                        value: this.scammerImage,
                        onchange: event => {
                            this.scammerImage = event.target.value;
                        },
                    })
                ]),
                m('.Form-group .col .col-12', [
                    m('label', 'Nội dung tố cáo'),
                    m('textarea.FormControl', {
                        value: this.description,
                        onchange: event => {
                            this.description = event.target.value;
                        },
                    })
                ]),
                m('.Form-group  .col .col-12', [
                    Button.component({
                        type: 'submit',
                        className: 'Button Button--primary Button--block'
                    }, [app.translator.trans('hoa1210-check-scamer.forum.modal.button')])
                ]),
            ]),
            ),
          ])
        ),
      ]);
  }
}
