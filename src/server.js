import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import proxy from 'http-proxy-middleware';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const app = polka();

app.use(compression({ threshold: 0 }), sirv('static', { dev }));

app.use(
	'/api',
	proxy({
		target: process.env.URL_API,
		pathRewrite: {
			'^/api/': ''
		},
		changeOrigin: true
	})
);

app.listen(PORT, err => {
	if (err) console.log('error', err);
});
