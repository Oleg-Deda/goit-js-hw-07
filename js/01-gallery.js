import { galleryItems } from './gallery-items.js';

const galleryEl = document.querySelector('.gallery');

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(
      ({ preview, original, description }) =>
        `<li class="gallery__item">
  <a class="gallery__link" href=${original}>
    <img class="gallery__image" src=${preview} data-source=${original} alt=${description}/>
  </a>
</li>`
    )
    .join('');
}

galleryEl.insertAdjacentHTML('afterbegin', createGalleryMarkup(galleryItems));
galleryEl.addEventListener('click', onImageClick);
function onImageClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const largeImage = basicLightbox.create(
    `<img src="${event.target.dataset.source}" alt=${event.target.alt}>`,
    {
      onShow: (largeImage) =>
        galleryEl.addEventListener('keydown', onEscapeKeyPress),
      onClose: (largeImage) =>
        galleryEl.removeEventListener('keydown', onEscapeKeyPress),
    }
  );
  largeImage.show();

  function onEscapeKeyPress(event) {
    if (event.key === 'Escape') {
      largeImage.close();
    }
  }
}
galleryEl.addEventListener('click, onImageClick');
