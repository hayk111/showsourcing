import { environment } from 'environments/environment';

// // for requiring a script loaded asynchronously.
// async function loadAsync(src: string) {
// 	const script = document.createElement('script') as any;
// 	script.src = src;
// 	return new Promise((resolve, reject) => {
// 		script.onreadystatechange = function () {
// 			if (script.readyState === 'loaded' || script.readyState === 'complete') {
// 				script.onreadystatechange = null;
// 				resolve(true);
// 			}
// 		};
// 		document.getElementsByTagName('head')[0].appendChild(script);
// 	});
// }

// declare const mixpanel: any;

// // const mixpanelPromise = loadAsync('http://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js').then(_ => { debugger; mixpanel.init(environment.mixPanelKey); });
// const hubspotPromise = loadAsync(`https://js.hs-scripts.com/${environment.hubspotKey}.js`);

export const allAnalyticsLoaded = Promise.all([]);
