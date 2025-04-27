 // LED lights circle around
 const thorana = document.querySelector('.surrounding-circle');
 const lights = 20;
 for (let i = 0; i < lights; i++) {
   const light = document.createElement('div');
   light.classList.add('light');
   const angle = (360 / lights) * i;
   const radius = 250;
   const x = Math.cos(angle * Math.PI / 180) * radius + 290;
   const y = Math.sin(angle * Math.PI / 180) * radius + 290;
   light.style.left = x + 'px';
   light.style.top = y + 'px';
   light.style.animationDelay = (i * 0.1) + 's';
   thorana.appendChild(light);
 }