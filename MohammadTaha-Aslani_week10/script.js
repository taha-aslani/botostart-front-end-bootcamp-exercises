const progress = document.getElementById('progress');
const circles = document.querySelectorAll('.circle');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let currentStep = localStorage.getItem('step')
  ? Number(localStorage.getItem('step'))
  : 1;

updateUI();

nextBtn.addEventListener('click', () => {
  currentStep++;
  updateUI();
});

prevBtn.addEventListener('click', () => {
  currentStep--;
  updateUI();
});

circles.forEach((circle, index) => {
  circle.addEventListener('click', () => {
    currentStep = index + 1;
    updateUI();
  });
});

function updateUI() {
  circles.forEach((circle, index) => {
    circle.classList.toggle('active', index < currentStep);
  });

  progress.style.width = ((currentStep - 1) / (circles.length - 1)) * 100 + '%';

  prevBtn.disabled = currentStep === 1;
  nextBtn.disabled = currentStep === circles.length;

  localStorage.setItem('step', currentStep);
}
