'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// al hacer click en una imagen se abra su version grande
// obtener la galeria de imagenes
var getImagenes = function getImagenes(container) {
    return [].concat(_toConsumableArray(container.querySelectorAll('img')));
};
// Obtener un array de las rutas de las imagenes grandes
var getLargeImagenes = function getLargeImagenes(gallery) {
    return gallery.map(function (el) {
        return el.src;
    }).map(function (el) {
        return el.replace('min', 'large');
    });
};
// obtener las descripciones de las imagenes
var getDescripcion = function getDescripcion(gallery) {
    return gallery.map(function (el) {
        return el.alt;
    });
};
// capturar el eveneto click en la galeria para abrir el lightbox
var openLightboxEvenet = function openLightboxEvenet(container, gallery, larges, descripciones) {
    container.addEventListener('click', function (e) {
        var el = e.target,
            i = gallery.indexOf(el);
        if (el.tagName === 'IMG') {
            openLightBox(gallery, i, larges, descripciones);
        }
    });
};
// imprimir overlay del lightbox en el bodys
var openLightBox = function openLightBox(gallery, i, larges, descripciones) {
    //abrir lightbox al pulsar el parametro de la imagen
    var lightboxElement = document.createElement('div');
    lightboxElement.innerHTML = '\n          <div class="lightbox-overlay">\n            <figure class="lightbox-container">\n              <div class="close-modal">&#88;</div>\n              <img src="' + larges[i] + '" height="500px" width="950px">\n              <figcaption>\n                 <p class="lightbox-descripcion">' + descripciones[i] + '</p>\n                 <nav class="lightbox-navigation">\n                    <a href="#" class="lightbox-navigation_button prev">&#9194;</a>\n                    <span class="lightbox-navigation_counter">Imagen ' + (i + 1) + ' de ' + gallery.length + ' </span>\n                    <a href="#" class="lightbox-navigation_button next">&#9193;</a>\n                 </nav>\n              </figcaption>\n            </figure>\n          </div>\n    ';
    lightboxElement.id = 'lightbox';
    document.body.appendChild(lightboxElement);
    closeModal(lightboxElement);
    navigateLightbox(lightboxElement, i, larges, descripciones);
};

var navigateLightbox = function navigateLightbox(lightboxElement, i, larges, descripciones) {
    var prevButton = lightboxElement.querySelector('.prev'),
        nextButton = lightboxElement.querySelector('.next'),
        image = lightboxElement.querySelector('img'),
        description = lightboxElement.querySelector('p'),
        counter = lightboxElement.querySelector('span'),
        closeButton = lightboxElement.querySelector('.close-modal');
    window.addEventListener('keyup', function (e) {
        if (e.key === 'ArrowRight') nextButton.click();
        if (e.key === 'ArrowLeft') prevButton.click();
        if (e.key === 'Escape') closeButton.click();
    });
    lightboxElement.addEventListener('click', function (e) {
        e.preventDefault();
        var target = e.target;
        if (target === prevButton) {
            if (i > 0) {
                image.src = larges[i - 1];
                i--;
            } else {
                image.src = larges[larges.length - 1];
                i = larges.length - 1;
            }
        } else if (target === nextButton) {
            if (i < larges.length - 1) {
                image.src = larges[i + 1];
                i++;
            } else {
                image.src = larges[0];
                i = 0;
            }
        }
        description.textContent = descripciones[i];
        counter.textContent = 'Imagen ' + (i + 1) + ' de ' + larges.length;
    });
};

var closeModal = function closeModal(modalElement) {
    var closeModal = modalElement.querySelector('.close-modal');
    closeModal.addEventListener('click', function (e) {
        e.preventDefault();
        document.body.removeChild(modalElement);
    });
};

var lightbox = function lightbox(container) {
    var images = getImagenes(container),
        large = getLargeImagenes(images),
        descriptions = getDescripcion(images);
    openLightboxEvenet(container, images, large, descriptions);
};
lightbox(document.getElementById('gallery-container'));