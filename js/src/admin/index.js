import app from 'flarum/admin/app';
import { extend } from 'flarum/common/extend';
import AdminNav from 'flarum/admin/components/AdminNav';
import LinkButton from 'flarum/common/components/LinkButton';
import TransactionListPage from './components/TransactionListPage';

app.initializers.add('retechvn/mediated-transaction', () => {
  app.routes.transactionListPage = {
    path: '/giao-dich-trung-gian',
    component: TransactionListPage,
  };
  extend(AdminNav.prototype, 'items', function (items) {
    items.add(
      'list-scammers',
      <LinkButton href={app.route('transactionListPage')} icon="fas fa-magic" title="Giao dịch trung gian">
        Giao dịch trung gian
      </LinkButton>,
      49
    );
  });
});
