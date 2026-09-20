/*=========== Cookie Notice ===========
Shows a bar at the bottom of every page until the visitor clicks OK.
The choice is remembered in localStorage, so the bar stays hidden on later visits.
© 2026 Susan M Bernard. All rights reserved. Not licensed for copying, reuse, or redistribution.
======================================*/

(function () {
    var STORE_KEY = 'smb-cookie-notice';

    // hasDismissed: Blocked storage means the bar shows each visit, which is harmless
    function hasDismissed() {
        try {
            return window.localStorage.getItem(STORE_KEY) === 'ok';
        } catch (e) {
            return false;
        }
    }

    function remember() {
        try {
            window.localStorage.setItem(STORE_KEY, 'ok');
        } catch (e) { /* nothing to do */ }
    }

    function showNotice() {
        if (hasDismissed()) { return; }

        var bar = document.createElement('div');
        bar.className = 'cookie-notice';
        bar.setAttribute('role', 'region');
        bar.setAttribute('aria-label', 'Cookie notice');
        bar.innerHTML =
            '<p>This site uses Cloudflare Turnstile, which protects the contact form from spam. ' +
            '<a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener">Cloudflare Privacy Policy</a></p>' +
            '<button type="button" class="btn">OK</button>';

        bar.querySelector('button').addEventListener('click', function () {
            remember();
            bar.parentNode.removeChild(bar);
        });

        document.body.appendChild(bar);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', showNotice);
    } else {
        showNotice();
    }
})();
