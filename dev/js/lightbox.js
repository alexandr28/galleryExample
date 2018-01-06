// al hacer click en una imagen se abra su version grande
// obtener la galeria de imagenes
const  getImagenes= container =>[...container.querySelectorAll('img')];
// Obtener un array de las rutas de las imagenes grandes
const  getLargeImagenes = gallery => gallery
    .map(el => el.src)
    .map(el =>el.replace('min','large'));
// obtener las descripciones de las imagenes
const getDescripcion = gallery => gallery.map(el => el.alt);
// capturar el eveneto click en la galeria para abrir el lightbox
const  openLightboxEvenet = (container,gallery,larges,descripciones)=>{
    container.addEventListener('click',e =>{
        let el = e.target,
            i = gallery.indexOf(el);
        if(el.tagName === 'IMG'){
            openLightBox(gallery,i,larges,descripciones);
        }
    })
};
// imprimir overlay del lightbox en el bodys
const openLightBox = (gallery,i,larges,descripciones) =>{
    //abrir lightbox al pulsar el parametro de la imagen
    let lightboxElement = document.createElement('div');
    lightboxElement.innerHTML=`
          <div class="lightbox-overlay">
            <figure class="lightbox-container">
              <div class="close-modal">&#88;</div>
              <img src="${larges[i]}" height="500px" width="950px">
              <figcaption>
                 <p class="lightbox-descripcion">${descripciones[i]}</p>
                 <nav class="lightbox-navigation">
                    <a href="#" class="lightbox-navigation_button prev">&#9194;</a>
                    <span class="lightbox-navigation_counter">Imagen ${i+1} de ${gallery.length} </span>
                    <a href="#" class="lightbox-navigation_button next">&#9193;</a>
                 </nav>
              </figcaption>
            </figure>
          </div>
    `;
    lightboxElement.id='lightbox';
    document.body.appendChild(lightboxElement);
    closeModal(lightboxElement);
    navigateLightbox(lightboxElement,i,larges,descripciones);
};

const navigateLightbox = (lightboxElement,i,larges,descripciones)=>{
    let prevButton = lightboxElement.querySelector('.prev'),
    nextButton = lightboxElement.querySelector('.next'),
    image= lightboxElement.querySelector('img'),
    description= lightboxElement.querySelector('p'),
    counter=lightboxElement.querySelector('span'),
    closeButton= lightboxElement.querySelector('.close-modal');
    window.addEventListener('keyup', e => {
        if(e.key === 'ArrowRight') nextButton.click();
        if(e.key ==='ArrowLeft') prevButton.click();
        if(e.key === 'Escape') closeButton.click();
    });
    lightboxElement.addEventListener('click', e =>{
        e.preventDefault();
        let target =e.target;
        if(target=== prevButton){
            if(i>0){
                image.src=larges[i - 1];
                i--;
            }else{
                image.src= larges[larges.length - 1];
                i= larges.length-1;
            }

        }else if(target===nextButton){
            if(i< larges.length -1){
                image.src=larges[i+1];
                i++;
            }else{
                image.src= larges[0];
                i=0;
            }

        }
        description.textContent= descripciones[i];
        counter.textContent= `Imagen ${i+1} de ${larges.length}`;

    })
};

const closeModal = modalElement => {
    let closeModal = modalElement.querySelector('.close-modal');
    closeModal.addEventListener('click', e => {
        e.preventDefault();
        document.body.removeChild(modalElement);
    });
};

const lightbox = container => {
    let images= getImagenes(container),
        large=getLargeImagenes(images),
        descriptions=getDescripcion(images);
    openLightboxEvenet(container,images,large,descriptions);
};
lightbox(document.getElementById('gallery-container'));