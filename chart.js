const canvas = document.getElementById("cnvs");
const ctx = setupCanvas(canvas);
const minPointsAmount = 2;
const maxPointsAmount = 10;
const sectionLength = 10;
const axisY = 38;
const axisX = 58;
const startPointX = 20;
const startPointY = 20;
const axisLengthX = axisX * sectionLength;
const axisLengthY = axisY * sectionLength;
const indent = 30;
const circleRadius = 5;
const pi = Math.PI;
const coords = [];
const lineColor= "#c26666";
const circleColor = "#f16a6a";
const axeColor = "#723b3b";

drawAxes();
drawChart();

canvas.onclick = function () {
  ctx.clearRect(0, 0, 600, 400);
  coords.length = 0;
  drawAxes();
  drawChart();
};

function drawAxes() {
  ctx.beginPath();
  ctx.strokeStyle = axeColor;
  ctx.lineWidth = 1;
  ctx.moveTo(startPointX, startPointY);
  ctx.lineTo(startPointX, axisLengthY);
  ctx.lineTo(axisLengthX, axisLengthY);
  ctx.stroke();
}

function drawChart() {
  const pointsAmount = getRandomInteger(maxPointsAmount, minPointsAmount);
  const sectionLengthX = (axisLengthX - indent) / (pointsAmount - 1);
  ctx.beginPath();
  ctx.moveTo(startPointX + indent, axisLengthY - indent);
  coords.push({ x: startPointX + indent, y: axisLengthY - indent });

  for (let i = 1; i < pointsAmount; i++) {
    drawChartLine(sectionLengthX, i);
  }
  for (let i = 0; i < coords.length; i++) {
    const x = coords[i].x;
    const y = coords[i].y;
    drawChartCircle(x, y);
  }
  console.log(coords.length);
}

function drawChartLine(sectionLengthX, currentPoint) {
  const x = indent + sectionLengthX * currentPoint;
  const y = getRandomInteger(axisLengthY, startPointY);
  coords.push({ x: x, y: y });
  ctx.strokeStyle = lineColor;
  ctx.lineTo(x, y);
  ctx.stroke();  
}

function drawChartCircle(x, y) {
  ctx.beginPath();
  ctx.fillStyle = circleColor;
  ctx.arc(x, y, circleRadius, 0, 2 * pi, false);
  ctx.stroke();
  ctx.fill();
}

function getRandomInteger(max, min) {
  return Math.round(min - 0.5 + (max - min + 1) * Math.random());
}

function setupCanvas(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  return ctx;
}
