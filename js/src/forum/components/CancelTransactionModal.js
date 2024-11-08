import Modal from 'flarum/components/Modal';
import app from 'flarum/app';
import Button from 'flarum/components/Button';

export default class CancelTransactionModal extends Modal {
  oninit(vnode) {
    super.oninit(vnode);
    this.transId = this.attrs.transId;
    console.log(this.attrs);
  }

  loadData(transID) {}

  title() {
    return 'Hủy giao dịch';
  }

  content() {
    return m('.Modal-body .row', <p> sdas</p>);
  }

  onsubmit(event) {
    event.preventDefault();
  }

  className() {
    // super.className();
  }
}
