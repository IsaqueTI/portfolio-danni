'use strict';

const { projects, collections, home } = window.PORTFOLIO_DATA;

const main = document.querySelector('#main-content');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#primary-nav');
const topButton = document.querySelector('.back-to-top');
const lightbox = document.querySelector('#lightbox');
const lightboxImage = lightbox.querySelector('.lightbox-image');
const lightboxCount = lightbox.querySelector('.lightbox-count');
let currentGallery = [];
let currentImageIndex = 0;

function galleryMarkup(media, title) {
  let imageIndex = 0;

  return `<div class="gallery" data-gallery>${media.map((item, index) => {
    if (item.type === 'video') {
      return `<figure class="gallery-item gallery-video">
        <video controls playsinline preload="metadata" aria-label="${title} — vídeo ${index + 1}">
          <source src="${item.src}" type="video/mp4">
          Seu navegador não suporta a reprodução deste vídeo.
        </video>
      </figure>`;
    }

    const galleryIndex = imageIndex++;
    return `<figure class="gallery-item gallery-image" tabindex="0" data-gallery-index="${galleryIndex}">
      <img src="${item.src}" alt="${title} — imagem ${galleryIndex + 1}" loading="${galleryIndex < 2 ? 'eager' : 'lazy'}">
    </figure>`;
  }).join('')}</div>`;
}

function renderWork() {
  main.innerHTML = `<section class="content-shell" aria-labelledby="work-title">
    <h1 class="visually-hidden" id="work-title">Work</h1>
    <div class="work-grid">${projects.map((project) => `
      <a class="project-card" href="#/${project.slug}">
        <img src="${project.cover}" alt="Capa do projeto ${project.title}" loading="lazy">
        <span class="project-card-copy">
          <span class="project-card-title">${project.title}</span>
          <span class="project-card-year">${project.year}</span>
        </span>
      </a>`).join('')}</div>
  </section>`;
  setGallery([]);
}

function renderCollection(slug) {
  const collection = collections[slug];
  main.innerHTML = `<section class="content-shell" aria-labelledby="page-title">
    <h1 class="page-heading" id="page-title">${collection.title}</h1>
    ${galleryMarkup(collection.media, collection.title)}
  </section>`;
  setGallery(collection.media);
}

function renderHome() {
  main.innerHTML = `<section class="home-shell" aria-labelledby="home-title">
    <video class="home-background" autoplay muted loop playsinline preload="metadata" aria-hidden="true">
      <source src="${home.video}" type="video/mp4">
    </video>
    <div class="home-card">
      <h1 id="home-title">Danni<br>Bsbeats</h1>
      <p>${home.text}</p>
    </div>
  </section>`;
  setGallery([]);
}

function renderProject(project) {
  main.innerHTML = `<article class="content-shell" aria-labelledby="project-title">
    <h1 class="page-heading" id="project-title">${project.title}</h1>
    <p class="project-meta"><span>Projeto</span><span>•</span><span>${project.year}</span></p>
    ${galleryMarkup(project.media, project.title)}
  </article>`;
  setGallery(project.media);
}

function renderNotFound() {
  main.innerHTML = `<section class="not-found"><div><h1>Página não encontrada</h1><p><a href="#/work">Voltar ao portfólio</a></p></div></section>`;
  setGallery([]);
}

function setGallery(media) {
  currentGallery = media.filter((item) => item.type === 'image').map((item) => item.src);
  document.querySelectorAll('[data-gallery-index]').forEach((item) => {
    const open = () => openLightbox(Number(item.dataset.galleryIndex));
    item.addEventListener('click', open);
    item.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(); }
    });
  });
}

function route() {
  const slug = location.hash.replace(/^#\/?/, '') || 'work';
  document.body.classList.toggle('home-view', slug === 'home');
  document.querySelectorAll('[data-route]').forEach((link) => {
    link.classList.toggle('active', link.dataset.route === slug);
    link.toggleAttribute('aria-current', link.dataset.route === slug);
  });

  if (slug === 'work') renderWork();
  else if (slug === 'home') renderHome();
  else if (collections[slug]) renderCollection(slug);
  else {
    const project = projects.find((item) => item.slug === slug);
    project ? renderProject(project) : renderNotFound();
  }

  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  window.scrollTo(0, 0);
  main.focus({ preventScroll: true });
}

function openLightbox(index) {
  if (!currentGallery.length) return;
  currentImageIndex = index;
  lightboxImage.src = currentGallery[index];
  lightboxImage.alt = `Imagem ${index + 1} de ${currentGallery.length}`;
  lightboxCount.textContent = `${index + 1} / ${currentGallery.length}`;
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
  lightbox.querySelector('.lightbox-close').focus();
}

function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = '';
}

function moveLightbox(offset) {
  currentImageIndex = (currentImageIndex + offset + currentGallery.length) % currentGallery.length;
  openLightbox(currentImageIndex);
}

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
lightbox.querySelector('.lightbox-prev').addEventListener('click', () => moveLightbox(-1));
lightbox.querySelector('.lightbox-next').addEventListener('click', () => moveLightbox(1));
lightbox.addEventListener('click', (event) => { if (event.target === lightbox) closeLightbox(); });

document.addEventListener('keydown', (event) => {
  if (lightbox.hidden) return;
  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowLeft') moveLightbox(-1);
  if (event.key === 'ArrowRight') moveLightbox(1);
});

window.addEventListener('scroll', () => topButton.classList.toggle('visible', window.scrollY > 500));
topButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
window.addEventListener('hashchange', route);
route();
