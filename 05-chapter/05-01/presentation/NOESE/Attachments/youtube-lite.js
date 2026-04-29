(function () {

    function getYouTubeId(url) {
        var match = url.match(/embed\/([a-zA-Z0-9_-]{11})/);
        return match ? match[1] : null;
    }

    function createPlayButton() {
        var play = document.createElement('div');
        play.style.cssText = 'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:80px;height:80px;background:rgba(255,0,0,0.85);border-radius:50%;display:flex;align-items:center;justify-content:center;transition:background 0.2s;z-index:2;';
        play.innerHTML = '<svg viewBox="0 0 24 24" style="width:36px;height:36px;fill:white;margin-left:4px"><polygon points="5,3 19,12 5,21"/></svg>';
        return play;
    }

    function createPlaceholder(iframe) {
        if (iframe.getAttribute('data-yt-processed')) return;

        var src = iframe.getAttribute('src') || iframe.getAttribute('data-src') || '';
        var videoId = getYouTubeId(src);
        if (!videoId) return;

        iframe.setAttribute('data-yt-processed', '1');
        iframe.setAttribute('data-yt-src', src);
        iframe.setAttribute('src', '');

        var ytWrapper = iframe.closest('.yt-wrapper, .yt-wrapper-portrait');

        var thumb = document.createElement('img');
        thumb.src = 'https://img.youtube.com/vi/' + videoId + '/maxresdefault.jpg';
        thumb.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;object-fit:fill;display:block;';
        thumb.onerror = function () {
            thumb.src = 'https://img.youtube.com/vi/' + videoId + '/hqdefault.jpg';
        };

        var play = createPlayButton();

        if (ytWrapper) {
            // Περίπτωση με .yt-wrapper
            ytWrapper.style.position = 'relative';

            var overlay = document.createElement('div');
            overlay.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;cursor:pointer;background:transparent;overflow:hidden;z-index:10;';

            overlay.addEventListener('mouseenter', function () { play.style.background = 'rgba(255,0,0,1)'; });
            overlay.addEventListener('mouseleave', function () { play.style.background = 'rgba(255,0,0,0.85)'; });
            overlay.addEventListener('click', function () {
                var realSrc = iframe.getAttribute('data-yt-src');
                realSrc += (realSrc.indexOf('?') !== -1 ? '&' : '?') + 'autoplay=1';
                iframe.src = realSrc;
                overlay.style.display = 'none';
            });

            overlay.appendChild(thumb);
            overlay.appendChild(play);
            ytWrapper.appendChild(overlay);

        } else {
            // Χωρίς .yt-wrapper: το overlay παίρνει ακριβώς τα ίδια
            // style/width/height attributes με το iframe ώστε να
            // βρίσκεται στο ίδιο scaled περιβάλλον
            var overlay2 = document.createElement('div');
            overlay2.style.cssText = iframe.style.cssText;
            overlay2.setAttribute('width', iframe.getAttribute('width'));
            overlay2.setAttribute('height', iframe.getAttribute('height'));
            overlay2.style.position = 'absolute';
            overlay2.style.top = iframe.style.top || '0';
            overlay2.style.left = iframe.style.left || '0';
            overlay2.style.width = (iframe.getAttribute('width') || iframe.style.width);
            overlay2.style.height = (iframe.getAttribute('height') || iframe.style.height);
            overlay2.style.cursor = 'pointer';
            overlay2.style.overflow = 'hidden';
            overlay2.style.zIndex = '10';
            overlay2.style.background = 'transparent';

            // Κάνουμε το parent relative αν δεν είναι
            var parent = iframe.parentNode;
            var parentPos = window.getComputedStyle(parent).position;
            if (parentPos === 'static') {
                parent.style.position = 'relative';
            }

            overlay2.addEventListener('mouseenter', function () { play.style.background = 'rgba(255,0,0,1)'; });
            overlay2.addEventListener('mouseleave', function () { play.style.background = 'rgba(255,0,0,0.85)'; });
            overlay2.addEventListener('click', function () {
                var realSrc = iframe.getAttribute('data-yt-src');
                realSrc += (realSrc.indexOf('?') !== -1 ? '&' : '?') + 'autoplay=1';
                iframe.src = realSrc;
                overlay2.style.display = 'none';
            });

            overlay2.appendChild(thumb);
            overlay2.appendChild(play);
            iframe.parentNode.insertBefore(overlay2, iframe);
        }
    }

    function processSlide(slide) {
        if (!slide) return;
        slide.querySelectorAll('iframe').forEach(function (iframe) {
            var src = iframe.getAttribute('src') || iframe.getAttribute('data-src') || '';
            if (src.indexOf('youtube.com/embed') !== -1) {
                createPlaceholder(iframe);
            }
        });
    }

    function init() {
        if (window.Reveal) {
            processSlide(window.Reveal.getCurrentSlide());
            window.Reveal.on('slidechanged', function (event) {
                processSlide(event.currentSlide);
            });
            window.Reveal.on('ready', function (event) {
                processSlide(event.currentSlide);
            });
        } else {
            document.querySelectorAll('iframe[src*="youtube.com/embed"]').forEach(createPlaceholder);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        setTimeout(init, 100);
    }

})();
