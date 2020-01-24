import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import proxy from 'http-proxy-middleware';
import { session } from 'session';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const app = polka();

app.use(compression({ threshold: 0 }), sirv('static', { dev }));

app.use(
  '/api',
  proxy({
    target: 'process.env.URL_API',
    pathRewrite: {
      '^/api/': ''
    },
    changeOrigin: true
  })
);

app.use(session());

app.use(
  sapper.middleware({
    session: req => {
      let user = (req.session && req.session.user) || null;
      return { user };
    }
  })
);

app.listen(PORT, err => {
  if (err) console.log('error', err);
});
