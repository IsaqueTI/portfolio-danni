'use strict';

const projects = [
  { slug: 'cbpc-1', title: 'CBPC', year: '2021', cover: 'assets/images/work/01.jpeg', ext: 'jpeg' },
  { slug: 'personale-odontologia', title: 'Personale Odontologia', year: '2021', cover: 'assets/images/work/02.jpg', ext: 'jpg' },
  { slug: 'trato-top', title: 'Trato Top', year: '2020', cover: 'assets/images/work/03.jpg', ext: 'jpeg' },
  { slug: 'ibls', title: 'IBLS', year: '2020', cover: 'assets/images/work/04.jpg', ext: 'jpeg' },
  { slug: 'instituto-espaco-luz', title: 'Instituto Espaço Luz', year: '2020', cover: 'assets/images/work/05.jpg', ext: 'jpeg' },
  { slug: 'fabricio-reis-engenharia', title: 'Fabrício Reis Engenharia', year: '2020', cover: 'assets/images/work/06.jpeg', ext: 'jpeg' },
  { slug: 'sushi-house', title: 'Sushi House', year: '2020', cover: 'assets/images/work/07.jpeg', ext: 'jpeg' },
  { slug: 'igreja-evangelica-el-shadai', title: 'Igreja Evangélica El Shadai', year: '2020', cover: 'assets/images/work/08.jpg', ext: 'jpeg' },
  { slug: 'radio-opcao', title: 'Rádio Opção', year: '2020', cover: 'assets/images/work/09.jpeg', ext: 'jpeg' },
  { slug: 'ibmh', title: 'IBMH', year: '2020', cover: 'assets/images/work/10.jpeg', ext: 'jpeg' }
];

const collections = {
  cbpc: {
    title: 'CBPC',
    images: ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.png']
  },
  conexao: {
    title: 'Conexão',
    images: ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg']
  }
};

const projectImages = Object.fromEntries(projects.map((project) => [
  project.slug,
  Array.from({ length: 6 }, (_, index) =>
    `assets/images/${project.slug}/${String(index + 1).padStart(2, '0')}.${project.ext}`
  )
]));

const main = document.querySelector('#main-content');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#primary-nav');
const topButton = document.querySelector('.back-to-top');
const lightbox = document.querySelector('#lightbox');
const lightboxImage = lightbox.querySelector('.lightbox-image');
const lightboxCount = lightbox.querySelector('.lightbox-count');
let currentGallery = [];
let currentImageIndex = 0;

function galleryMarkup(images, title) {
  return `<div class="gallery" data-gallery>${images.map((src, index) => `
    <figure class="gallery-item" tabindex="0" data-gallery-index="${index}">
      <img src="${src}" alt="${title} — imagem ${index + 1}" loading="${index < 2 ? 'eager' : 'lazy'}">
    </figure>`).join('')}</div>`;
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
  const images = collection.images.map((name) => `assets/images/${slug}/${name}`);
  main.innerHTML = `<section class="content-shell" aria-labelledby="page-title">
    <h1 class="page-heading" id="page-title">${collection.title}</h1>
    ${galleryMarkup(images, collection.title)}
  </section>`;
  setGallery(images);
}

function renderHome() {
  main.innerHTML = `<section class="home-shell" aria-labelledby="home-title">
    <div class="home-card">
      <h1 id="home-title">Danni<br>Bsbeats</h1>
      <p>Formada e Publicidade e Propaganda, foi Sócia da agência Karisma Marketing, trabalhou na agência Gaas, sou Media Social e web Design Gráfico foi Sócia da Produtora Ventura e hoje atualmente trabalha na área de marketing da CBPC (Convenção Batista Planalto Central</p>
    </div>
  </section>`;
  setGallery([]);
}

function renderProject(project) {
  const images = projectImages[project.slug];
  main.innerHTML = `<article class="content-shell" aria-labelledby="project-title">
    <h1 class="page-heading" id="project-title">${project.title}</h1>
    <p class="project-meta"><span>Projeto</span><span>•</span><span>${project.year}</span></p>
    ${galleryMarkup(images, project.title)}
  </article>`;
  setGallery(images);
}

function renderNotFound() {
  main.innerHTML = `<section class="not-found"><div><h1>Página não encontrada</h1><p><a href="#/work">Voltar ao portfólio</a></p></div></section>`;
  setGallery([]);
}

function setGallery(images) {
  currentGallery = images;
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
