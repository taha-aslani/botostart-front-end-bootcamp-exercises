const grid = document.getElementById('grid');
const defaultBoxes = 6;
const presets = [
  '#ef4444',
  '#10b981',
  '#f59e0b',
  '#7c3aed',
  '#06b6d4',
  '#f97316',
];

function randHex() {
  const n = Math.floor(Math.random() * 0xffffff);
  return '#' + n.toString(16).padStart(6, '0');
}

function luminance(hex) {
  const c = hex.substring(1);
  const r = parseInt(c.substring(0, 2), 16) / 255;
  const g = parseInt(c.substring(2, 4), 16) / 255;
  const b = parseInt(c.substring(4, 6), 16) / 255;
  const a = [r, g, b].map((v) =>
    v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  );
  const L = 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
  return L > 0.5 ? '#071422' : '#ffffff';
}

function createBox(color) {
  const box = document.createElement('div');
  box.className = 'box';
  box.style.background = color;
  box.style.color = luminance(color);

  const actions = document.createElement('div');
  actions.className = 'box-actions';

  presets.forEach((p) => {
    const b = document.createElement('button');
    b.className = 'preset';
    b.style.background = p;
    b.title = p;
    b.addEventListener('click', (e) => {
      e.stopPropagation();
      setColor(box, p);
    });
    actions.appendChild(b);
  });

  const copy = document.createElement('button');
  copy.className = 'copy';
  copy.innerText = 'کپی کد';
  copy.addEventListener('click', (e) => {
    e.stopPropagation();
    copyHex(box);
  });
  actions.appendChild(copy);

  const hex = document.createElement('div');
  hex.className = 'hex';
  const small = document.createElement('small');
  small.innerText = 'کد رنگ';
  const code = document.createElement('div');
  code.className = 'code';
  code.style.fontFamily = 'monospace';
  code.style.marginTop = '6px';
  code.innerText = color.toUpperCase();

  hex.appendChild(small);
  hex.appendChild(code);

  box.appendChild(actions);
  box.appendChild(hex);

  box.addEventListener('click', () => {
    setColor(box, randHex());
  });

  return box;
}

function setColor(box, hex) {
  box.style.background = hex;
  box.style.color = luminance(hex);
  const code = box.querySelector('.code');
  if (code) code.innerText = hex.toUpperCase();
  box.animate([{ transform: 'scale(0.995)' }, { transform: 'scale(1)' }], {
    duration: 160,
  });
}

function copyHex(box) {
  const code = box.querySelector('.code').innerText;
  navigator.clipboard
    ?.writeText(code)
    .then(() => {
      const btn = document.createElement('div');
      btn.innerText = 'کپی شد!';
      btn.style.position = 'absolute';
      btn.style.right = '12px';
      btn.style.top = '12px';
      btn.style.background = 'rgba(0,0,0,0.35)';
      btn.style.padding = '6px 8px';
      btn.style.borderRadius = '8px';
      box.appendChild(btn);
      setTimeout(() => box.removeChild(btn), 900);
    })
    .catch(() => alert('مرورگر اجازه کپی را نمی‌دهد'));
}

function init(n = defaultBoxes) {
  grid.innerHTML = '';
  for (let i = 0; i < n; i++) {
    const c = randHex();
    grid.appendChild(createBox(c));
  }
}

document.getElementById('randomAll').addEventListener('click', () => {
  Array.from(grid.children).forEach((b) => setColor(b, randHex()));
});

document.getElementById('addBox').addEventListener('click', () => {
  grid.appendChild(createBox(randHex()));
});

document.getElementById('reset').addEventListener('click', () => {
  init();
});

init();
