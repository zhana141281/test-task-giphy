// our Api_KEY
const apiKey = 'O3iJIz4KNHqyrwfM88y7Abn9WA2607z0';

// create html-elements
const gridBox = document.createElement('div');
const gridBoxImg = document.createElement('img');
const infoPanel = document.createElement('div');
const infoIcon = document.createElement('div');
const infoPage = document.createElement('div');

// set css classes for them
gridBox.className = 'grid-container__block';
gridBoxImg.className = 'grid-container__block__img';
infoPanel.className = 'grid-container__block__info-panel';
infoIcon.className = 'link-info';
infoPage.className = 'grid-container__info-page';

// listener to hide info block
document.addEventListener('click', (e) => {
  if (!e.target.classList.contains('link-info')) {
    if (document.querySelector('.grid-container__info-page.active')) {
      document.querySelector('.grid-container__info-page.active')
        .classList.remove('active');
    }
  }
});

// function for handling icon INFO
const handleInfoIcon = (el) => {
  if (document.querySelector('.grid-container__info-page.active')) {
    document.querySelector('.grid-container__info-page.active')
      .classList.remove('active');
  }
  document.getElementById(`${el.id}`).classList.add('active');
};

// function creating new element for gallery
const buildGalleryImage = (el) => {
  const newGridBox = gridBox.cloneNode();
  const newGridBoxImg = gridBoxImg.cloneNode();
  const newInfoPanel = infoPanel.cloneNode();
  const newInfoPage = infoPage.cloneNode();
  const newInfoIcon = infoIcon.cloneNode();

  newInfoIcon.addEventListener('click', () => handleInfoIcon(el));

  newInfoPage.id = `${el.id}`;
  newGridBoxImg.src = `${el.images.downsized.url}`;
  newGridBoxImg.alt = 'gif';

  const inner = `
    <span class="grid-container__block__info-span">${el.title} </span>
  `;

  const innerInfo = `
   <p class="sizes">${el.images.downsized.width} х ${el.images.downsized.height}</p>
   <a class="origin-link" target="_blank"  href="${el.url}">Origin</a>
  `;

  newInfoPage.innerHTML = innerInfo;
  newInfoPanel.innerHTML = inner;
  newGridBox.appendChild(newInfoIcon);
  newGridBox.appendChild(newGridBoxImg);
  newGridBox.appendChild(newInfoPanel);
  newGridBox.appendChild(newInfoPage);

  document.querySelector('.grid-container').appendChild(newGridBox);
};

// async function for fetch requests
const getGifs = async (value) => {
  if (document.querySelector('.grid-container').childNodes) {
    document.querySelector('.grid-container').innerHTML = '';
  }
  const xhr = await fetch(`http://api.giphy.com/v1/gifs/search?q=${value}&api_key=${apiKey}&limit=8`);
  const response = await xhr.json();
  const gifData = await response.data;
  await gifData.map((el) => buildGalleryImage(el));
  };
