import app from 'flarum/forum/app';
import Notification from 'flarum/components/Notification';
import username from 'flarum/common/helpers/username';

export default class TransactionNotification extends Notification {
  icon() {
    return 'fas fa-exchange-alt';
  }

  href() {
    return app.route.transaction(this.attrs.notification.subject());
  }

  content() {
    return app.translator.trans('retechvn-mediated-transaction.forum.notifications.transaction_created_text', {
      user: this.attrs.notification.fromUser(),
      transaction: this.attrs.notification.subject(),
    });
  }
}
