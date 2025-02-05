import { environment } from 'environments/environment';

// // for requiring a script loaded asynchronously.
async function loadAsync(src) {
	const script = document.createElement('script');
	script.src = src;
	return new Promise((resolve, reject) => {
		script.onreadystatechange = function () {
			if (script.readyState === 'loaded' || script.readyState === 'complete') {
				script.onreadystatechange = null;
				resolve(true);
			}
		};
		document.getElementsByTagName('head')[0].appendChild(script);
	});
}

(function (c, a) {
	if (!a.__SV) {
		let b = window; let d, m, j, k = b.location; try { let f = k.hash; d = function (a, b) { return (m = a.match(RegExp(b + '=([^&]*)'))) ? m[1] : null; }; f && d(f, 'state') && (j = JSON.parse(decodeURIComponent(d(f, 'state'))), 'mpeditor' === j.action && (b.sessionStorage.setItem('_mpcehash', f), history.replaceState(j.desiredHash || '', c.title, k.pathname + k.search))); } catch (n) { } let l, h; window.mixpanel = a; a._i = []; a.init = function (b, d, g) {
			function c(b, i) {
				const a = i.split('.'); 2 == a.length && (b = b[a[0]], i = a[1]); b[i] = function () {
					b.push([i].concat(Array.prototype.slice.call(arguments,
						0)));
				};
			} let e = a; 'undefined' !== typeof g ? e = a[g] = [] : g = 'mixpanel'; e.people = e.people || []; e.toString = function (b) { let a = 'mixpanel'; 'mixpanel' !== g && (a += '.' + g); b || (a += ' (stub)'); return a; }; e.people.toString = function () { return e.toString(1) + '.people (stub)'; }; l = 'disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove'.split(' ');
			for (h = 0; h < l.length; h++)c(e, l[h]); const f = 'set set_once union unset remove delete'.split(' '); e.get_group = function () { function a(c) { b[c] = function () { call2_args = arguments; call2 = [c].concat(Array.prototype.slice.call(call2_args, 0)); e.push([d, call2]); }; } for (let b = {}, d = ['get_group'].concat(Array.prototype.slice.call(arguments, 0)), c = 0; c < f.length; c++)a(f[c]); return b; }; a._i.push([b, d, g]);
		}; a.__SV = 1.2; b = c.createElement('script'); b.type = 'text/javascript'; b.async = !0; b.src = 'undefined' !== typeof MIXPANEL_CUSTOM_LIB_URL ?
			MIXPANEL_CUSTOM_LIB_URL : 'file:' === c.location.protocol && '//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js'.match(/^\/\//) ? 'https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js' : '//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js'; d = c.getElementsByTagName('script')[0]; d.parentNode.insertBefore(b, d);
	}
})(document, window.mixpanel || []);
mixpanel.init(environment.mixPanelKey);
const hubspotPromise = loadAsync(`https://js.hs-scripts.com/${environment.hubspotKey}.js`);

export const allAnalyticsLoaded = Promise.all([]);
