const image = document.getElementById('dogImage');
const statusText = document.getElementById('statusText');
const reloadBtn = document.getElementById('reloadBtn');

async function fetchDog() {
  statusText.style.display = 'block';
  statusText.textContent = 'Loading...';
  image.style.display = 'none';

  try {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');

    if (!response.ok) {
      throw new Error('Request failed');
    }

    const data = await response.json();

    image.src = data.message;
    image.onload = () => {
      statusText.style.display = 'none';
      image.style.display = 'block';
    };
  } catch (error) {
    statusText.textContent = 'Failed to load image ❌';
  }
}

fetchDog();
reloadBtn.addEventListener('click', fetchDog);
