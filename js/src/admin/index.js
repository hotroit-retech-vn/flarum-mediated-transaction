import app from 'flarum/admin/app';
import { extend } from 'flarum/common/extend';
import AdminNav from 'flarum/admin/components/AdminNav';
import LinkButton from 'flarum/common/components/LinkButton';
import TransactionListPage from './components/TransactionListPage';
import PayRequestListPage from './components/PayRequestListPage';

app.initializers.add('retechvn/mediated-transaction', () => {
  app.routes.transactionListPage = {
    path: '/giao-dich-trung-gian',
    component: TransactionListPage,
  };
  app.routes.payRequestListPage = {
    path: '/yeu-cau-rut-tien',
    component: PayRequestListPage,
  };
  extend(AdminNav.prototype, 'items', function (items) {
    items.add(
      'list-scammers',
      <LinkButton href={app.route('transactionListPage')} icon="fas fa-magic" title="Giao dịch trung gian">
        Giao dịch trung gian
      </LinkButton>,
      49
    );
    items.add(
      'pay-requests',
      <LinkButton href={app.route('payRequestListPage')} icon="fas fa-magic" title="Yêu cầu rút tiền">
        Yêu cầu rút tiền
      </LinkButton>,
      49
    );
  });
});
