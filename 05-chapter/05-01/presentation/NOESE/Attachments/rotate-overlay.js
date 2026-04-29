(function () {
    function injectOverlay() {
        if (document.getElementById('rotate-overlay')) return;

        document.body.insertAdjacentHTML('beforeend', `
            <div id="rotate-overlay">
                <div class="phone-icon"></div>
                <div class="overlay-title">Καλύτερη Εμπειρία Προβολής</div>
                <div class="overlay-text">
                    Παρακαλούμε γυρίστε τη συσκευή σας σε <b>οριζόντια θέση</b>
                    για να δείτε την παρουσίαση.
                </div>
            </div>
        `);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectOverlay);
    } else {
        injectOverlay();
    }
})();
