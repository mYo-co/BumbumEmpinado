(() => {
  document.getElementById('year').textContent = new Date().getFullYear();

  // Para ligar ao checkout real, substitui este valor pelo teu URL.
  // Ex.: const CHECKOUT_URL = 'https://...';
  const CHECKOUT_URL = '';

  document.querySelectorAll('.checkout').forEach(btn => {
    if (CHECKOUT_URL) btn.href = CHECKOUT_URL;
    else btn.addEventListener('click', e => {
      // Sem checkout definido: mantém o utilizador dentro da página.
      e.preventDefault();
      document.querySelector('#oferta')?.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });

  document.querySelectorAll('[data-carousel]').forEach(carousel => {
    const track = carousel.querySelector('.slides');
    const slides = [...track.children];
    const dots = carousel.querySelector('.dots');
    let index = 0;
    let timer;
    let startX = 0;
    let deltaX = 0;

    slides.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => go(i, true));
      dots.appendChild(dot);
    });
    const dotEls = [...dots.children];

    function render() {
      track.style.transform = `translate3d(-${index * 100}%,0,0)`;
      dotEls.forEach((d,i) => d.classList.toggle('active', i === index));
    }
    function go(i, manual=false){
      index = (i + slides.length) % slides.length;
      render();
      if(manual) restart();
    }
    function next(){go(index+1)}
    function restart(){clearInterval(timer); timer=setInterval(next, 4300)}

    carousel.querySelector('.prev').addEventListener('click',()=>go(index-1,true));
    carousel.querySelector('.next').addEventListener('click',()=>go(index+1,true));
    carousel.addEventListener('mouseenter',()=>clearInterval(timer));
    carousel.addEventListener('mouseleave',restart);
    carousel.addEventListener('touchstart',e=>{startX=e.touches[0].clientX; deltaX=0; clearInterval(timer)},{passive:true});
    carousel.addEventListener('touchmove',e=>{deltaX=e.touches[0].clientX-startX},{passive:true});
    carousel.addEventListener('touchend',()=>{if(Math.abs(deltaX)>45) go(index+(deltaX<0?1:-1)); restart()});
    restart();
  });
})();
