console.clear();

var canvas = document.querySelector('#scene');
var ctx = canvas.getContext('2d');
var width, height;
var amount = 500;
var dots = [];
var dpi = window.devicePixelRatio > 1.5 ? 2 : 1;
var ww, wh;
function init () {
  ww = window.innerWidth * dpi;
  wh = window.innerHeight * dpi;
  
  width =  ww < wh ? ww * 0.2 : wh * 0.4;
  height = width;
    
  canvas.width = ww;
  canvas.height = wh;
  canvas.style.width = ww + "px";
  canvas.style.height = wh + "px";
  if (dpi === 2) {
    canvas.style.transform = 'translate(-50%, -50%) scale(0.5)';
  }
  
  dots = [];
  for (var i = 0; i < amount; i++) {
    dots.push(new Dot(i));
  }
}

function Dot (i) {
  var index = (i / amount);
  var ratio = index * Math.PI * 40;
  this.radius = (width / 2 - 60) * index;
  this.index = index;
  this.x = Math.sin(ratio) * this.radius + (ww / 2);
  this.y = Math.cos(ratio) * this.radius + (wh / 2);
  this.r = index * 50;
  this.alpha = index;
  
  TweenMax.to(this, 1.5, {
    r: 1,
    ease: Power1.easeOut,
    yoyo: true,
    repeat: -1,
    delay: index * -4
  });
}
ctx.lineWidth = dpi;
Dot.prototype.draw = function () {
  ctx.beginPath();
  ctx.globalAlpha = this.alpha;
  ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
  ctx.stroke();
}
Dot.prototype.update = function () {
  var ratio = this.index * Math.PI * (40 + mouse.x * 0.3);
  this.x = Math.sin(ratio) * (this.radius + (mouse.y * 40)) + (ww / 2);
  this.y = Math.cos(ratio) * (this.radius + (mouse.y * 40)) + (wh / 2);
}

function render () {
  requestAnimationFrame(render);
  
  ctx.clearRect(0, 0, ww, wh);
  for (var i = 0; i < dots.length; i++) {
    dots[i].update();
    dots[i].draw();
  }
}

var resizeTimeout;
window.addEventListener('resize', () => {
  resizeTimeout = window.clearTimeout(resizeTimeout);
  resizeTimeout = window.setTimeout(init, 500);
})
var mouse = {
  x: 0,
  y: 0
};
window.addEventListener('mousemove', (e) => {
  TweenMax.to(mouse, 3, {
    x: ((e.clientX - (window.innerWidth / 2)) / window.innerWidth) * 2,
    y: (e.clientY / window.innerHeight),
    ease: Power1.easeOut
  });
});
window.addEventListener('touchmove', (e) => {
  TweenMax.to(mouse, 5, {
    x: ((e.touches[0].clientX - (window.innerWidth / 2)) / window.innerWidth) * 2,
    y: (e.touches[0].clientY / window.innerHeight),
    ease: Power1.easeOut
  });
});
init();
requestAnimationFrame(render);