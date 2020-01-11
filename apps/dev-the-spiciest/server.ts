import 'zone.js/dist/zone-node';
import * as express from 'express';

// Express server
const awsServerlessExpress = require('aws-serverless-express');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const {AppServerModuleNgFactory, LAZY_MODULE_MAP, ngExpressEngine, provideModuleMap} = require('../../dist/apps/dev-the-spiciest/server/main');
const bootstrap = AppServerModuleNgFactory;
const providers = [provideModuleMap(LAZY_MODULE_MAP)];

// Create the Express app
const app = express();
app.engine('html', ngExpressEngine({ bootstrap, providers }));
app.set('view engine', 'html');
app.set('views', './browser');
app.get('*', (req, res) => res.render('index', { req }));
app.use(awsServerlessExpressMiddleware.eventContext());

// Use the Express app
const serverProxy = awsServerlessExpress.createServer(app);
export const handler = (event, context) => awsServerlessExpress.proxy(serverProxy, event, context);
