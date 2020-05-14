const imgUrl = "https://cdn.revendamais.com.br/FC/2913/1756767_0_M_dee6c468ac.jpg";
let imgDataUrl = '';

const image = new Image();
const today = new Date();
const fontColor = "#FFF";

let texts = [];

function DrawImage() {
    if (arguments.length > 0) {
        texts = arguments;
    }
	GetImage(imgUrl).then(function(blob) {
      DrawCanvas(URL.createObjectURL(blob));
    });
}
async function GetImage(imgUrl) {
  return fetch(imgUrl)
    .then(function(response) {
      return response.blob();
    })
}

function DrawCanvas(blop) {
  const img = new Image();
  const c = document.createElement("canvas");
  const ctx = c.getContext("2d");

  img.src = blop;
  img.onload = function() {
    c.setAttribute("width", this.width);
    c.setAttribute("height", this.height);
    const fontSize = this.width / 100 * 3;
    ctx.drawImage(img, 0, 0, this.width, this.height);
    ctx.font = fontSize + "px Arial";
    ctx.fillStyle = fontColor;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 3;
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";

    Array.from(texts).map((t, i) => {
        const topMargin = fontSize * (i + 1);
        ctx.fillText(t, 0, topMargin);
    });

    const dataURL = c.toDataURL();
    document.getElementById("image").setAttribute("src", dataURL);
  }
}
