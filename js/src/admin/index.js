import app from 'flarum/admin/app';

app.initializers.add('retechvn/mediated-transaction', () => {
  console.log('[retechvn/mediated-transaction] Hello, admin!');
});
