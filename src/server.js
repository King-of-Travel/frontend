import * as sapper from '@sapper/server';
import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';

import { createSessionConnection } from 'server/session';
import { createApiProxy } from 'server/api-proxy';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const app = polka();

createApiProxy(app);

app.use(compression({ threshold: 0 }), sirv('static', { dev }));

/* Session */

createSessionConnection(app);

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
