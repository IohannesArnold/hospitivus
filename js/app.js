import '../style/app.scss';
import '../style/common.scss';

import App from '../templates/app.html';

const graphcoolToken = localStorage.getItem('graphcoolToken');
if (!graphcoolToken) {location.assign('/');}

new App({
  target: document.querySelector( 'body' ),
});
