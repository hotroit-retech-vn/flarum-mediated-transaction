import UserPage from 'flarum/components/UserPage';
import TransferHistoryList from './TransactionHistoryList';

export default class TransactionHistoryPage extends UserPage {
  oninit(vnode) {
    super.oninit(vnode);
    this.loadUser(m.route.param('username'));
  }

  content() {
    return (
      <div className="TransferHistoryPage">
        {TransferHistoryList.component({
          params: {
            user: this.user,
          },
        })}
      </div>
    );
  }
}
