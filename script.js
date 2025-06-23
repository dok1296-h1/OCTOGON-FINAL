const canvas = document.getElementById('spiralCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

let spiralCoords = [];

function drawSharpOctagonSpiral() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);

  let angle = 0;
  let length = 15;
  const increment = 10;

  for (let i = 0; i < 100; i++) {
    angle += Math.PI / 4;
    let x = centerX + length * Math.cos(angle);
    let y = centerY + length * Math.sin(angle);
    ctx.lineTo(x, y);
    spiralCoords.push({x, y});
    length += increment;
  }

  ctx.strokeStyle = 'white';
  ctx.setLineDash([5, 10]);
  ctx.stroke();

  placeImages();
}

function placeImages() {
  const mediaLayer = document.getElementById('mediaLayer');
  const imageIndices = [1, 15, 25, 35, 10, 18]; // media5 and media6 now closer to center

  for (let i = 0; i < 6; i++) {
    const img = document.createElement('img');
    img.src = `media${i + 1}.jpg`;
    img.className = 'media-item';
    let coord = spiralCoords[imageIndices[i]];
    img.style.left = `${coord.x - 40}px`;
    img.style.top = `${coord.y - 40}px`;

    if (i === 3) {
      img.style.cursor = 'pointer';
      img.onclick = () => {
        window.open("https://open.spotify.com/artist/42XxoDBpQsLGJyu1LRonl5?si=MJoCkl8AQ12zoa1tLMgPQg", "_blank");
      };
    } else {
      img.onclick = () => openModal(img.src);
    }

    mediaLayer.appendChild(img);
  }
}

function openModal(src) {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modalImg");
  modal.style.display = "block";
  modalImg.src = src;
}

document.querySelector(".close").onclick = function() {
  document.getElementById("modal").style.display = "none";
}

window.onload = drawSharpOctagonSpiral;
