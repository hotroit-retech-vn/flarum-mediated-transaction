import app from 'flarum/forum/app';
import LinkButton from 'flarum/components/LinkButton';
import { extend } from 'flarum/common/extend';
import IndexPage from 'flarum/components/IndexPage';
import TransactionPage from './components/TransactionPage';
import HeaderSecondary from 'flarum/forum/components/HeaderSecondary';

import UserPage from "flarum/components/UserPage";
import TransactionHistoryPage from './components/TransactionHistoryPage';

app.initializers.add('retechvn/mediated-transaction', () => {
  app.routes.transactionPage = {
    path: '/giao-dich-trung-gian',
    component: TransactionPage,
  };

  app.routes["user.transactionHistory"] = {
    path: "/u/:username/transactionHistory",
    component: TransactionHistoryPage,
  };

  // Thêm nút Giao dịch trung gian ở navItems
  extend(IndexPage.prototype, 'navItems', (items) => {
    if (app.session && app.session.user && app.session.user.isAdmin()) {
    items.add(
      'transactionPage',
      <LinkButton href={app.route('transactionPage')} icon="fas fa-magic">
        {'Giao dịch trung gian'}
      </LinkButton>,
      100
    );
  }
  });

  // Hiển thị tiển ở trên header
  extend(HeaderSecondary.prototype, 'items', function (items) {
    if (app.session && app.session.user && app.session.user.isAdmin()) {
      items.add('techcoin', m('span.rvn__text-piece', [m('i.fas.fa-coins'), ` ${app.session.user.attribute('rvn_point')} RTC`]), 15);
    }
  });
  
  // Hiển thị lịch sử giao dịch trong trang cá nhân
  extend(UserPage.prototype, "navItems", function (items,user) {
    if(app.session.user){
      const currentUserID = app.session.user.id();
      const targetUserID = this.user.id();

      if(currentUserID==targetUserID){
        items.add(
          "transactionMoney",
          LinkButton.component({
              href: app.route("user.transactionHistory", {
                username: this.user.username(),
              }),
              icon: "fas fa-money-bill",
            },
            [
              "Lịch sử giao dịch"
            ]
          ),
          10
        );
      }
    }
});
});
