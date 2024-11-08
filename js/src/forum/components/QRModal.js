import Modal from 'flarum/components/Modal';
import app from 'flarum/app';
import Button from 'flarum/components/Button';

export default class QRModal extends Modal {
  oninit(vnode) {
    super.oninit(vnode);
  }

  title() {
    return 'Thanh Toán Giao Dịch';
  }

  content() {
    return m('.Modal-body .row', [
      m(
        '.Form-group',
        {
          style: 'width: 100%; text-align: center;',
        },
        [
          m(
            'a',
            {
              href: 'https://me-qr.com',
              style: 'cursor:pointer;display:block',
              border: '0',
            },
            [
              m('img', {
                src: 'https://cdn2.me-qr.com/qr/129980334.png?v=1728835376',
                alt: 'Create QR code for free',
              }),
            ]
          ),
        ]
      ),
      m(
        '.Form-group ',
        {
          style: 'width: 100%;',
        },
        [
          Button.component(
            {
              type: 'submit',
              className: 'Button Button--primary Button--block',
            },
            'Tiếp tục tạo giao dịch'
          ),
        ]
      ),
    ]);
  }

  onsubmit(event) {
    event.preventDefault();
    this.attrs.onsubmit(true);
    app.modal.close();
  }
}
