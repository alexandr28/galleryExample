'use strict';

var getInitialScroll = function getInitialScroll() {
    return document.body.scrollTop;
};
var getFinalScroll = function getFinalScroll(element) {
    return Math.floor(element.getBoundingClientRect().top + getInitialScroll());
};

var animatedScrollTo = function animatedScrollTo() {
    return function (targetElement, time) {
        var initialPosition = getInitialScroll(),
            finalPosition = getFinalScroll(targetElement),
            distanceToScroll = finalPosition - initialPosition,
            scrollFragment = distanceToScroll / time;
        animateScroll(scrollFragment, finalPosition);
    };
};

var animateScroll = function animateScroll(scrollFragment, finalPosition) {
    var animatedScroll = setInterval(function () {
        document.body.scrollTop += scrollFragment;
        if (document.body.scrollTop > finalPosition - scrollFragment / 2) clearInterval(animatedScroll);
    }, 1);
};

var animatedScrollEvenet = function animatedScrollEvenet(origenElement, time) {
    if (origenElement.tagName === 'A' && origenElement.hash !== '') {

        var targeElement = document.getElementById(origenElement.hash.slice(1));
        origenElement.addEventListener('click', function (e) {
            e.preventDefault();
            animatedScrollTo(targeElement, time);
        });
    }
};

var animatedScrollAllLinks = function animatedScrollAllLinks(time) {
    var links = document.links;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = links[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var link = _step.value;

            animatedScrollEvenet(link, time);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
};

animatedScrollAllLinks(200);

//animatedScrollTo(document.getElementById('cap2'),500);