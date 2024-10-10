import app from 'flarum/common/app';

app.initializers.add('retechvn/mediated-transaction', () => {
  console.log('[retechvn/mediated-transaction] Hello, forum and admin!');
});
