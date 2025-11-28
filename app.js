// Datos de las imágenes (Array de objetos)
const animals = [
    { 
        baseName: 'bird-8156308', 
        title: 'Ave Exótica', 
        desc: 'Un pequeño pájaro posado observando su entorno.' 
    },
    { 
        baseName: 'cat-2083492', 
        title: 'Gato Curioso', 
        desc: 'La mirada intensa y felina de una mascota doméstica.' 
    },
    { 
        baseName: 'disparo-vertical-de-un-zorro-caminando-sobre-rocas-en-un-bosque', 
        title: 'Zorro en el Bosque', 
        desc: 'Un zorro rojo caminando ágilmente sobre las rocas.' 
    },
    { 
        baseName: 'guinea-pig-242520', 
        title: 'Cobaya Adorable', 
        desc: 'Un pequeño roedor descansando tranquilamente.' 
    },
    { 
        baseName: 'meerkat-4821484', 
        title: 'Suricata Vigilante', 
        desc: 'Siempre alerta cuidando al resto de la manada.' 
    },
    { 
        baseName: 'primer-plano-de-una-iguana-albina-sobre-madera-iguana-albino-closeup-iguana-albino', 
        title: 'Iguana Albina', 
        desc: 'Un reptil único con texturas y colores fascinantes.' 
    },
    { 
        baseName: 'raccoon-4377383', 
        title: 'Mapache Travieso', 
        desc: 'Con su característico antifaz natural explorando el terreno.' 
    },
    { 
        baseName: 'rana-arborea-blanca-australiana-sentada-en-una-rama-rana-cochambrosa-en-una-rama-las-ranas-arboricolas-en-hojas-verdes-anfibios-primer-plano', 
        title: 'Rana Arbórea', 
        desc: 'Un anfibio verde camuflado perfectamente en su hábitat.' 
    },
    { 
        baseName: 'snake-8282641', 
        title: 'Serpiente Silenciosa', 
        desc: 'Deslizándose con elegancia y misterio por la naturaleza.' 
    },
];

const galleryContainer = document.getElementById('gallery');
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImg');
const captionText = document.getElementById('caption');
const spanClose = document.getElementsByClassName('close')[0];

// Función para generar el HTML de cada imagen
// Uso el formato del script de Jose: nombre-tamaño-densidad.extensión
function createGalleryItem(animal) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    
    
    const ext = '..jpg'; 
    const path = 'img/'; 

    // Construcción del srcset dinámico
    // El navegador elegirá la mejor imagen según el ancho de pantalla y densidad de píxeles
    const srcset = `
        ${path}${animal.baseName}-small-1x${ext} 320w,
        ${path}${animal.baseName}-small-2x${ext} 640w,
        ${path}${animal.baseName}-medium-1x${ext} 640w,
        ${path}${animal.baseName}-medium-2x${ext} 1280w,
        ${path}${animal.baseName}-large-1x${ext} 1280w
    `;

    // Sizes: Cómo de grande se verá la imagen en el CSS 
    const sizes = '(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw';

    // Fuente por defecto 
    const src = `${path}${animal.baseName}-medium-1x${ext}`;

    item.innerHTML = `
        <div class="image-wrapper">
            <img 
                class="gallery-image"
                srcset="${srcset}"
                sizes="${sizes}"
                src="${src}"
                alt="${animal.title}"
                loading="lazy" 
                data-full="${path}${animal.baseName}-xlarge-1x${ext}" 
            >
        </div>
        <div class="image-info">
            <h3>${animal.title}</h3>
            <p>${animal.desc}</p>
        </div>
    `;

    // Evento Click para abrir Modal
    item.addEventListener('click', () => {
        openModal(animal, ext, path);
    });

    return item;
}

// Renderizar la galería
animals.forEach(animal => {
    const galleryItem = createGalleryItem(animal);
    galleryContainer.appendChild(galleryItem);
});

// LÓGICA DEL MODAL 

function openModal(animal, ext, path) {
    modal.style.display = "block";
    // En el modal cargamos la versión más grande (xlarge) para máxima calidad
    modalImg.src = `${path}${animal.baseName}-xlarge-1x${ext}`;
    captionText.innerHTML = `<strong>${animal.title}</strong><br>${animal.desc}`;
}

// Cerrar Modal al dar a la X
spanClose.onclick = function() {
    modal.style.display = "none";
}

// Cerrar Modal al dar clic fuera de la imagen
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}