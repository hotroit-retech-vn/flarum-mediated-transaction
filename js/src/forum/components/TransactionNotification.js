import app from 'flarum/forum/app';
import Notification from 'flarum/components/Notification';
import username from 'flarum/common/helpers/username';

export default class TransactionNotification extends Notification {
  icon() {
    return 'fas fa-money-bill';
  }

  href() {
    return app.route('transactions');
  }

  content() {
    const user = this.attrs.notification.fromUser();
    return app.translator.trans('retechvn-mediated-transaction.forum.notifications.user-transfer-money-to-you', {
      user: user,
    });
  }

}
