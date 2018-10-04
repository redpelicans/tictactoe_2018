import debug from 'debug';
import logger from 'morgan-debug';
import cors from 'cors';
import express from 'express';

const loginfo = debug('ttt');
const getUrl = server => `http://${server.address().address}:${server.address().port}`;

const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const red = '#cd4436';
const colors = [
  '#F34235',
  '#E81D62',
  '#9B26AF',
  '#6639B6',
  '#3E50B4',
  '#2095F2',
  '#02A8F3',
  '#00BBD3',
  '#009587',
  '#4BAE4F',
  '#FE5621',
  '#785447',
  '#9D9D9D',
  '#5F7C8A',
];
const icons = [
  'ambulance',
  'paper-plane',
  'globe',
  'plane',
  'angry',
  'bicycle',
  'train',
  'truck-monster',
  'motorcycle',
  'bell',
  'bone',
  'bus',
  'bug',
];

const getFruit = (req, res) => {
  const icon = icons[random(0, icons.length - 1)];
  const color = icon === 'paper-plane' ? red : colors[random(0, colors.length - 1)];
  res.json({ icon, color });
};

const initApp = ctx => {
  const app = express();
  app.use(cors());
  app.use(logger('ttt:http', 'dev'));
  app.use('/api/healthcheck', (req, res) => res.json({ message: 'Feel good' }));
  app.use('/api/fruit', getFruit);
  return Promise.resolve({ ...ctx, app });
};

const runServer = ctx =>
  new Promise((resolve, reject) => {
    const {
      app,
      config: { host, port },
    } = ctx;
    const server = app.listen(port, host, err => {
      if (err) return reject(err);
      const url = getUrl(server);
      server.url = url;
      return resolve({ ...ctx, server });
    });
  });

const config = { host: 'localhost', port: 9999 };
initApp({ config })
  .then(runServer)
  .then(({ server: { url } }) => loginfo(`Server started on ${url}`));
