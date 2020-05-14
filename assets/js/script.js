const imgUrl = "https://cdn.revendamais.com.br/FC/2913/1756767_0_M_dee6c468ac.jpg";
let imgDataUrl = '';

const image = new Image();
const today = new Date();
const fontColor = "#FFF";

function DrawImage(fisrtLineText, secondLineText) {
	GetImage(imgUrl).then(function(blob) {
      DrawCanvas(URL.createObjectURL(blob), fisrtLineText, secondLineText);
    });
}
async function GetImage(imgUrl) {
  return fetch(imgUrl)
    .then(function(response) {
      return response.blob();
    })
}

function DrawCanvas(blop, fisrtLineText, secondLineText) {
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
    ctx.fillText(fisrtLineText, 0, fontSize);
    ctx.fillText(secondLineText, 0, (fontSize * 2));

    const dataURL = c.toDataURL();
    document.getElementById("image").setAttribute("src", dataURL);
  }
}

DrawImage(today.toLocaleString("pt-BR", {
    	timeZone: 'America/Sao_Paulo'
    }),
    "Second line of information");
