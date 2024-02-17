// import 'promise-polyfill';
// import 'isomorphic-fetch';
import { h, render } from 'preact';
import './style';
import Router from 'preact-router';
import {OpenWeatherMap as OWM} from 'components/api';

import Home from 'components/Home/home';
let root;

let Sun = require('./components/Sun/sun').default;
let Moon = require('./components/Moon/moon').default;
let TimeCycle = require('./components/TimeCycle/time').default;


const Main = () => (
	<Router>
	  <Home path="/" />
	  <Sun path="/sun" />
	  <Moon path="/moon" />
	  <TimeCycle path="/time" />
	</Router>
);

function init() {
	OWM.init();
	root = render(<Main />, document.body, root);
}

// register ServiceWorker via OfflinePlugin, for prod only:
if (process.env.NODE_ENV==='production') {
	require('./pwa');
}

// in development, set up HMR:
if (module.hot) {
	//require('preact/devtools');   // turn this on if you want to enable React DevTools!
	module.hot.accept('./components/Home/home', () => requestAnimationFrame(init) );

	// referesh every 5 seconds
	//window.setInterval(function() {window .location.reload();}, 5000);
}

init();