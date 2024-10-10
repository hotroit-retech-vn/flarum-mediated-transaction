import app from 'flarum/forum/app';
import LinkButton from 'flarum/components/LinkButton';
import { extend } from 'flarum/common/extend';
import IndexPage from 'flarum/components/IndexPage';
import TransactionPage from './components/TransactionPage';

app.initializers.add('retechvn/mediated-transaction', () => {
  app.routes.transactionPage = {
    path: '/giao-dich-trung-gian',
    component: TransactionPage,
  };
  extend(IndexPage.prototype, 'navItems', (items) => {
    items.add(
      'transactionPage',
      <LinkButton href={app.route('transactionPage')} icon="fas fa-magic">
        {'Giao dịch trung gian'}
      </LinkButton>,
      100
    );
  });
});
