document.addEventListener('DOMContentLoaded',function(){
  const yrEl = document.getElementById('yr');
  if(yrEl) yrEl.textContent = new Date().getFullYear();

  // Filters
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projects = Array.from(document.querySelectorAll('.project-item'));
  filterBtns.forEach(btn=>{
    btn.addEventListener('click',()=>{
      filterBtns.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      projects.forEach(p=>{
        p.style.display = (cat==='all' || p.dataset.category === cat) ? '' : 'none';
      });
    });
  });

  // Search (local)
  const searchInput = document.getElementById('searchInput');
  if(searchInput){
    searchInput.addEventListener('input', (e)=>{
      const q = e.target.value.toLowerCase().trim();
      projects.forEach(p=>{
        const title = p.querySelector('.proj-title').textContent.toLowerCase();
        const desc = p.querySelector('.proj-desc').textContent.toLowerCase();
        p.style.display = (title.includes(q) || desc.includes(q)) ? '' : 'none';
      });
    });
  }

  // Modal show
  const modal = document.getElementById('modal');
  const modalInner = document.getElementById('modalInner');
  const modalClose = document.getElementById('modalClose');
  document.querySelectorAll('.view-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const id = btn.dataset.id;
      showProjectDetail(id);
    });
  });
  function showProjectDetail(id){
    const mapping = {
      p1:{
        title:'Landing Page Web Festival',
        img:'assets/images/project1.jpg',
        desc:'Detail: Landing page informatif untuk Web Festival yang interaktif',
        tech:'HTML, CSS',
        role:'Front-end Developer'
      },
      p2:{
        title:'Landing Web Penjualan Sepatu',
        img:'assets/images/project2.jpg',
        desc:'Page yang interaktif untuk penjualan Sepatu',
        tech:'HTML, CSS, JS',
        role:'Front-end Developer'
      },
      p3:{
        title:'Page untuk CRUD data produk',
        img:'assets/images/project3.jpg',
        desc:'Detail: Page untuk menambahkan, melihat, mengupdate, dan menghapus data dari php masuk database mysql',
        tech:'HTML, PHP, CSS, MySQL',
        role:'Full-stack Developer'
      }
    };
    const data = mapping[id];
    modalInner.innerHTML = `
      <h2>${data.title}</h2>
      <img style="width:100%;border-radius:8px;margin:0.5rem 0" src="${data.img}" alt="${data.title}">
      <p>${data.desc}</p>
      <p><strong>Peran:</strong> ${data.role}</p>
      <p><strong>Teknologi:</strong> ${data.tech}</p>
    `;
    modal.setAttribute('aria-hidden','false');
  }
  modalClose.addEventListener('click', ()=> modal.setAttribute('aria-hidden','true'));
  modal.addEventListener('click',(e)=>{ if(e.target===modal) modal.setAttribute('aria-hidden','true'); });

  const hero = document.querySelector('.hero');
  if(hero){
    window.addEventListener('scroll', ()=>{
      const sc = window.scrollY;
      hero.style.backgroundPosition = `center ${sc * 0.3}px`;
    });
  }
});
