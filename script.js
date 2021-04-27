const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

// Unsplash API
const count = 10;
const apiKey = 'QyrQ4tkWZffrjF2PrlBZGZDyjgPqBrBj3RrgMxDZPoA';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;



function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function displayPhotos() {
	photosArray.forEach((photo) => {
		// create an anchor <a> to link to splash
		const item = document.createElement('a');
	   	setAttributes(item, {
	      href: photo.links.html,
	      target: '_blank',
	     });
		const img = document.createElement('img');
	    setAttributes(img, {
	      src: photo.urls.regular,
	      alt: photo.alt_description,
	      title: photo.alt_description,
	    });
		item.appendChild(img);
		imageContainer.appendChild(item);
	});
}

// Get Photos from API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {

  }
}

window.addEventListener('scroll', () => {
	if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000){
		getPhotos();
	}
});

// On Load
getPhotos();