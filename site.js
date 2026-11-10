(function app() {
  'use strict';
  const { families, products } = window.CATALOG;
  const company = 'گروه صنعتی بازرگانی آئین تهویه';
  const sales = { mobile: '989124781367', officeMobile: '989123483042', office: ['982186190169', '982186190177'] };
  const docs = {
    general19: ['کاتالوگ عمومی توحید ۲۰۱۹', 55, 'دریچه‌ها، دمپرها، لوورها و تجهیزات توزیع هوا'],
    general18: ['کاتالوگ عمومی توحید ۲۰۱۸', 68, 'مجموعه محصولات تهویه مطبوع'],
    selected: ['منتخب محصولات توحید', 4, 'مرور تصویری تجهیزات'],
    tech: ['اطلاعات فنی تجهیزات', 45, 'نقشه‌ها و اطلاعات فنی برای انتخاب محصول'],
    access: ['دریچه بازدید سقف و دیوار', 4, 'پنل‌های دسترسی و جزئیات ساخت'],
    flex: ['کانال‌های فلکسیبل', 4, 'انواع کانال انعطاف‌پذیر و اتصالات'],
    insulation: ['عایق الاستومری COOLFLEX', 9, 'مشخصات عایق‌های رولی و لوله‌ای']
  };
  const artwork = {
    home:'<path d="m3 10 9-7 9 7v10h-7v-6h-4v6H3z"/>',
    expand:'<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/>',
    arrow:'<path d="M19 12H5m6 6-6-6 6-6"/>',
    diag:'<path d="M18 6 6 18M6 7v11h11"/>',
    external:'<path d="M7 17 17 7M7 7h10v10"/>',
    down:'<path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4"/>',
    book:'<path d="M4 4h12l4 4v13H4zM15 4v5h5M7 13h10M7 17h7"/>',
    phone:'<path d="m6 3 4 4-2 3c1.4 2.8 3.3 4.6 6 6l3-2 4 4-2.5 3c-1.5 1.5-6.5-.8-11.2-5.5S.9 6.8 3 5z"/>',
    search:'<circle cx="10" cy="10" r="6.5"/><path d="m15 15 5.5 5.5"/>',
    bag:'<path d="M5 8h14l1 13H4L5 8Zm3.5 0V6a3.5 3.5 0 0 1 7 0v2"/>',
    plus:'<path d="M5 12h14m-7-7v14"/>', minus:'<path d="M5 12h14"/>',
    close:'<path d="m6 6 12 12M18 6 6 18"/>',
    trash:'<path d="M4 6h16M8 6V3h8v3M6 6l1 15h10l1-15M10 10v7m4-7v7"/>',
    chat:'<path d="M21 11a9 9 0 0 1-13 8l-5 2 1.2-5A9 9 0 1 1 21 11Z"/><path d="M8 10h8m-8 4h5"/>',
    pin:'<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 0 1 14 0Z"/><circle cx="12" cy="10" r="2.4"/>',
    grilles:'<rect x="2" y="5" width="20" height="14"/><path d="M5 8h14M5 11h14M5 14h14M5 17h14"/>',
    control:'<path d="M3 4h18v16H3zM5 9l12-3M5 13l14-3M6 17l13-3"/>',
    access:'<path d="M3 3h18v18H3zM6 6h12v12H6zM8 11v2"/>',
    ducts:'<path d="M3 15c3-6 9 1 16-9M3 20c7-8 12 0 19-11M4 13l3 5m1-6 3 5m1-6 3 4m1-8 3 5"/>',
    insulation:'<ellipse cx="8" cy="14" rx="5" ry="6"/><ellipse cx="8" cy="14" rx="1.6" ry="2.3"/><path d="m5.5 8.8 9-5c7-2 10 9 4 12l-8 4"/>'
  };
  const icon = (id, cls='') => `<svg aria-hidden="true" class="ico ${cls}" viewBox="0 0 24 24">${artwork[id]}</svg>`;
  const fa = value => new Intl.NumberFormat('fa-IR').format(value);
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const main = document.getElementById('main');
  const findProduct = id => products.find(p => p.id === id);
  const familyName = id => families.find(f => f.id === id)?.name || '';
  const catalogLink = id => '#/catalog' + (id ? '?family=' + encodeURIComponent(id) : '');
  const docLink = (id, page) => `assets/catalogs/${id}.pdf${page ? '#page='+page : ''}`;
  const productLink = id => '#/product/' + encodeURIComponent(id);
  const button = (href, label, glyph='arrow', cls='solid') => `<a class="btn ${cls}" href="${href}">${label}${icon(glyph)}</a>`;
  const divider = '<span aria-hidden="true" class="crumb-sep">/</span>';
  const crumbs = (items) => `<nav class="crumbs" aria-label="مسیر صفحه"><a href="#/">صفحه نخست</a>${items.map(item => divider + (item[1] ? `<a href="${item[1]}">${esc(item[0])}</a>` : `<span>${esc(item[0])}</span>`)).join('')}</nav>`;
  function card(p) {
    return `<a class="product-card" href="${productLink(p.id)}">
      <div class="card-photo"><img src="${p.image}" alt="" width="420" height="270" loading="lazy"></div>
      <div class="card-caption"><bdi class="model">${esc(p.model)}</bdi><h3>${esc(p.name)}</h3><span class="card-arrow">${icon('arrow')}</span></div>
    </a>`;
  }
  function blueprint() {
    let ticks = '';
    for(let i=0;i<=60;i++) {
      const angle=i*6*Math.PI/180;
      const inner=i%5===0?188:193;
      ticks += `<line x1="${260+inner*Math.cos(angle)}" y1="${204+inner*Math.sin(angle)}" x2="${260+197*Math.cos(angle)}" y2="${204+197*Math.sin(angle)}"/>`;
    }
    return `<svg class="drawing-lines" viewBox="0 0 520 410" fill="none" aria-hidden="true">
      <g stroke="currentColor" stroke-width=".7"><circle cx="260" cy="204" r="178"/><circle cx="260" cy="204" r="198" stroke-dasharray="1 8"/>
      <path d="M4 204h512M260 0v408" stroke-dasharray="5 8"/><path d="M62 4v399m396-399v399M14 26h491M14 382h491" opacity=".38"/>
      <g opacity=".8">${ticks}</g><path d="M16 31v-9m-4 4h9m477 0h10m-5-5v10M12 382h9m-5-4v9m483-5h9m-5-4v9"/></g>
    </svg>`;
  }
  function homePage() {
    const selected = ['tfrcd','trbd','combi','access-panel'].map(findProduct).filter(Boolean);
    return `<section class="hero"><div class="wrap hero-inner">
      <div class="hero-copy">
        <p class="hero-intro"><i></i>${company}</p>
        <h1>تجهیزات توزیع<br>و کنترل هوا<span class="title-dot">.</span></h1>
        <p class="lead">از دریچه و دمپر تا کانال و عایق؛ تجهیزات پروژه را با مشخصات فنی انتخاب کنید و پیش‌فاکتور بگیرید.</p>
        <div class="actions">${button('#/catalog','مشاهده محصولات','arrow','light')}<a class="simple-light" href="#/library">${icon('book')}کاتالوگ‌های فنی</a></div>
      </div>
      <figure class="hero-figure"><div class="drawing">${blueprint()}
        <img class="hero-product" src="assets/brand/hero.webp" alt="نمای مایل حلقه‌های دریچه سقفی گرد برجسته مدل TRCDSD" width="410" height="299" fetchpriority="high">
        <div class="callout top-call"><span>حلقه‌های هم‌مرکز</span></div>
        <div class="callout bottom-call"><span>قاب بیرونی</span></div>
      </div><figcaption><a href="#/product/trcdsd"><span>دریچه سقفی گرد برجسته</span>${icon('diag')}</a><span class="figure-id" dir="ltr">FIG. TRCDSD</span></figcaption></figure>
    </div></section>
    <nav class="family-strip" aria-label="خانواده‌های محصول"><div class="wrap family-inner">${families.map(f=>`<a href="${catalogLink(f.id)}">${icon(f.id)}<span>${esc(f.name)}</span></a>`).join('')}</div></nav>
    <section class="wrap section"><div class="section-heading"><h2>منتخب کاتالوگ</h2><a class="text-link" href="#/catalog">همهٔ محصولات ${icon('arrow')}</a></div><div class="cards">${selected.map(card).join('')}</div></section>
    <section class="library-teaser"><div class="wrap teaser-inner"><div><p class="eyeline">مستندات محصولات</p><h2>کتابخانه فنی</h2><p>کاتالوگ‌های توحید، نقشه‌ها و مشخصات فنی را برای انتخاب تجهیزات پروژه ورق بزنید.</p>${button('#/library','مشاهده ۷ سند فنی','arrow','outline')}</div><div class="book-stack" aria-hidden="true">${['general18','flex','general19'].map(id=>`<img src="assets/catalogs/${id}.webp" width="174" height="230" alt="" loading="lazy">`).join('')}</div></div></section>`;
  }
  function normalize(s) { return s.toLowerCase().replace(/ي/g,'ی').replace(/ك/g,'ک').replace(/[\u064b-\u065f]/g,'').replace(/[\s\u200c-]+/g,''); }
  function catalogPage(query) {
    const family = families.some(f=>f.id===query.get('family')) ? query.get('family') : '';
    return `<div class="wrap subpage">${crumbs([['کاتالوگ محصولات']])}<div class="page-heading"><h1>کاتالوگ محصولات</h1><p>بر اساس خانوادهٔ محصول یا کد مدل، تجهیزات مورد نیاز پروژه را پیدا کنید.</p></div>
      <div class="catalog-tools"><div class="search-field">${icon('search')}<input id="search" type="search" aria-label="جست‌وجو در محصولات" placeholder="جست‌وجوی نام یا کد محصول…" value="${esc(query.get('q')||'')}"></div>
      <label class="filter">خانواده محصول<select id="family"><option value="">همه خانواده‌ها</option>${families.map(f=>`<option value="${f.id}" ${f.id===family?'selected':''}>${esc(f.name)}</option>`).join('')}</select></label></div>
      <p id="result-count" class="counts" role="status"></p><div id="results" class="cards"></div></div>`;
  }
  function updateResults(sync=false) {
    const query=document.getElementById('search').value;
    const family=document.getElementById('family').value;
    const result=products.filter(p=>(!family||p.family===family)&&normalize([p.name,p.model,p.en,familyName(p.family)].join(' ')).includes(normalize(query)));
    document.getElementById('results').innerHTML=result.length ? result.map(card).join('') : `<div class="empty"><h2>محصولی پیدا نشد</h2><p>کد مدل یا کلمهٔ کوتاه‌تری وارد کنید.</p><button class="btn outline" data-action="reset">نمایش همه محصولات</button></div>`;
    document.getElementById('result-count').textContent=fa(result.length)+' محصول';
    if(sync){ const params=new URLSearchParams(); if(family)params.set('family',family); if(query)params.set('q',query); history.replaceState(null,'', '#/catalog'+(params.size?'?'+params:'')); }
  }
  function detailViews(p) {
    const sheets=[{label:'تصویر محصول',src:p.image}];
    function sheet(label,doc,page) {
      sheets.push({label,src:`assets/sheets/${doc}-${page}.webp`,doc,page});
    }
    sheet('صفحهٔ کاتالوگ',p.doc,p.page);
    if(window.TECHNICAL_PAGES?.[p.id])sheet('برگهٔ فنی','tech',window.TECHNICAL_PAGES[p.id]);
    return sheets;
  }
  function detail(p) {
    const views=detailViews(p);
    const examples={grilles:'مثلاً ابعاد دهانه یا قطر دریچه',control:'مثلاً ابعاد مقطع یا قطر کانال',access:'مثلاً طول و عرض بازشو',ducts:'مثلاً قطر و طول کانال',insulation:'مثلاً ضخامت و متراژ مورد نیاز'};
    const gallery=views.map((v,i)=>`<button type="button" class="view-choice" data-view="${i}" aria-pressed="${i===0}"><img src="${v.src}" width="46" height="38" alt="" loading="lazy"><span>${v.label}</span></button>`).join('');
    const documents=views.filter(v=>v.doc).map(v=>`<a class="reference-file" href="${docLink(v.doc,v.page)}" target="_blank" rel="noopener"><img src="${v.src}" alt="" width="55" height="72" loading="lazy"><span><strong>${docs[v.doc][0]}</strong><small>صفحهٔ ${fa(v.page)} از ${fa(docs[v.doc][1])} · PDF</small></span>${icon('external')}</a>`).join('');
    return `<article class="wrap product-page subpage" data-detail="${p.id}">
      ${crumbs([['کاتالوگ محصولات','#/catalog'],[familyName(p.family),catalogLink(p.family)],[p.name]])}
      <section class="product-intro">
        <header class="product-heading"><a class="family-label" href="${catalogLink(p.family)}">${icon(p.family)}${esc(familyName(p.family))}</a>
          <h1>${esc(p.name)}</h1><div class="part-ident"><bdi>${esc(p.model)}</bdi><span dir="ltr" lang="en">${esc(p.en)}</span></div>
          <p class="part-description">${esc(p.description)}</p>
        </header>
        <div class="product-gallery">
          <div class="plate" id="plate"><div class="plate-top"><span class="view-label">تصویر محصول</span><span dir="ltr">${esc(p.model)}</span></div>
            <button type="button" class="plate-open" data-action="expand" aria-label="نمایش بزرگ تصویر محصول"><img id="plate-image" src="${p.image}" alt="${esc(p.name)}" width="650" height="425" fetchpriority="high"><span class="expand-icon">${icon('expand')}</span></button>
            <div class="plate-baseline" aria-hidden="true"></div>
          </div>
          <div class="view-choices" aria-label="نماهای ${esc(p.name)}">${gallery}</div>
        </div>
        <form class="spec-order" id="add-form" data-product="${p.id}">
          <h2>درخواست پیش‌فاکتور</h2>
          <div class="order-fields"><label for="quantity">تعداد</label><label for="part-note">ابعاد یا مشخصات درخواستی <small>(اختیاری)</small></label>
            <div class="amount-step"><button type="button" data-step="1" aria-label="افزایش تعداد">${icon('plus')}</button><input type="number" id="quantity" min="1" max="9999" inputmode="numeric" required value="1"><button type="button" data-step="-1" aria-label="کاهش تعداد">${icon('minus')}</button></div>
            <input id="part-note" maxlength="160" placeholder="${examples[p.family]}">
          </div>
          <div class="order-actions"><button class="btn solid" type="submit">${icon('bag')}افزودن به سبد استعلام</button><a class="to-bag" href="#/quote">مشاهده سبد ${icon('arrow')}</a></div>
        </form>
      </section>
      <div class="product-record"><section><h2>مشخصات محصول</h2><dl class="record-table"><div><dt>مدل</dt><dd><bdi>${esc(p.model)}</bdi></dd></div>${p.specs.map(([k,v])=>`<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl></section>
        <section><h2>مدارک فنی</h2><div class="reference-files">${documents}</div></section></div>
      <div class="section-heading related"><h2>تجهیزات همین خانواده</h2><a class="text-link" href="${catalogLink(p.family)}">مشاهده همه ${icon('arrow')}</a></div>
      <div class="cards">${products.filter(other=>other.family===p.family&&other.id!==p.id).slice(0,4).map(card).join('')}</div>
      <dialog id="view-dialog" aria-labelledby="viewer-title"><div class="viewer-bar"><h2 id="viewer-title"></h2><form method="dialog"><button class="icon-btn" aria-label="بستن نمای بزرگ">${icon('close')}</button></form></div><div class="viewer-image"><img alt=""></div></dialog>
    </article>`;
  }
  function changeView(p,index) {
    const v=detailViews(p)[index];if(!v)return;
    const plate=document.getElementById('plate');
    const label=v.label+(v.page?' · صفحهٔ '+fa(v.page):'');
    plate.querySelector('.view-label').textContent=label;
    plate.classList.toggle('paper',Boolean(v.doc));
    const img=document.getElementById('plate-image');
    img.src=v.src;img.alt=v.label+'، '+p.name;
    plate.querySelector('.plate-open').setAttribute('aria-label','نمایش بزرگ '+label);
    main.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.view)===index)));
  }
  function showViewer(p) {
    const v=detailViews(p)[Number(main.querySelector('[data-view][aria-pressed=true]').dataset.view)];
    const dialog=document.getElementById('view-dialog');
    dialog.querySelector('h2').textContent=v.label+' · '+p.name;
    const img=dialog.querySelector('img');img.src=v.src;img.alt=v.label+'، '+p.name;
    dialog.classList.toggle('paper-viewer',Boolean(v.doc));
    dialog.showModal();
  }
  function libraryPage() {
    return `<div class="wrap subpage">${crumbs([['کتابخانه فنی']])}<div class="page-heading"><h1>کتابخانه فنی</h1><p>هفت سند مرجع توحید برای بررسی مشخصات و انتخاب تجهیزات تهویه.</p></div><div class="library-grid">${Object.entries(docs).map(([id,[name,pages,desc]])=>`<article class="document"><div class="doc-visual"><a href="${docLink(id)}" target="_blank" rel="noopener" aria-label="باز کردن ${name}"><img src="assets/catalogs/${id}.webp" loading="lazy" alt="" width="150" height="205"></a></div><div class="doc-body"><small>PDF · ${fa(pages)} صفحه</small><h2>${name}</h2><p>${desc}</p><div class="doc-actions"><a href="${docLink(id)}" target="_blank" rel="noopener">مشاهده سند ${icon('external')}</a><a href="${docLink(id)}" download aria-label="دانلود ${name}">${icon('down')}</a></div></div></article>`).join('')}</div></div>`;
  }
  const tel = (number, label) => `<a href="tel:+${number}"><bdi>${label}</bdi></a>`;
  function contactPage() {
    return `<div class="wrap subpage">${crumbs([['تماس با فروش']])}<div class="page-heading"><h1>تماس با آئین تهویه</h1><p>برای انتخاب مدل، اعلام ابعاد و دریافت پیش‌فاکتور با فروش تماس بگیرید.</p></div>
      <div class="contact-layout"><section class="sales-block">${icon('phone')}<h2>مشاوره و فروش</h2><a class="big-phone" dir="ltr" href="tel:+${sales.mobile}">۰۹۱۲ ۴۷۸ ۱۳۶۷</a><div class="actions">${button('https://wa.me/'+sales.mobile,'گفت‌وگو در واتساپ','chat','light')}</div></section>
      <div class="addresses"><section><h2>${icon('pin')} دفتر</h2><address>خیابان جلال آل‌احمد، مسیر شرق به غرب، بعد از فروزانفر، پلاک ۱۱۱، ساختمان مهرگان، طبقهٔ دوم، واحد ۳</address><div class="phones">${tel(sales.office[0],'۰۲۱ ۸۶۱۹ ۰۱۶۹')}${tel(sales.office[1],'۰۲۱ ۸۶۱۹ ۰۱۷۷')}${tel(sales.officeMobile,'۰۹۱۲ ۳۴۸ ۳۰۴۲')}</div></section>
      <section><h2>${icon('pin')} کارگاه</h2><address>خیابان میهن، خیابان وطن ۱، فرعی اول سمت چپ، پلاک ۱۰/۱</address><div class="phones">${tel(sales.officeMobile,'۰۹۱۲ ۳۴۸ ۳۰۴۲')}</div></section></div></div></div>`;
  }
  const cartKey='aein-tahvie.quote.v1';
  function readCart() {
    try {
      const raw=JSON.parse(localStorage.getItem(cartKey)) || {};
      const lines=(Array.isArray(raw.lines)?raw.lines:[]).filter(l=>l && findProduct(l.id)&&Number.isInteger(l.qty)&&l.qty>0&&l.qty<=9999).map(l=>({id:l.id,qty:l.qty,note:String(l.note||'').slice(0,160)}));
      return {lines,project:String(raw.project||'').slice(0,90),message:String(raw.message||'').slice(0,500)};
    } catch { return {lines:[],project:'',message:''}; }
  }
  let cart=readCart(), timer;
  function announce(message) {
    const el=document.getElementById('notice'); el.textContent=message; el.classList.add('show'); clearTimeout(timer); timer=setTimeout(()=>el.classList.remove('show'),3200);
  }
  function installDock() {
  const links=[['home','#/','خانه','home'],['catalog','#/catalog','محصولات','search'],['library','#/library','اسناد','book'],['contact','#/contact','تماس','phone']];
  document.getElementById('dock').innerHTML=`<div class="dock-tray">${links.map(([id,href,label,glyph])=>`<a href="${href}" data-nav="${id}" aria-label="${label}">${icon(glyph)}<span>${label}</span></a>`).join('')}</div><a class="dock-bag" data-nav="quote" href="#/quote" aria-label="سبد استعلام">${icon('bag')}<b id="dock-count"></b></a>`;
}
  installDock();
  function updateCount() {
    const count=fa(cart.lines.length);
    document.getElementById('bag-count').textContent=count;
    const badge=document.getElementById('dock-count');badge.textContent=count;badge.hidden=cart.lines.length===0;
    badge.parentElement.setAttribute('aria-label','سبد استعلام، '+count+' ردیف');
  }
  function save() {
    try { localStorage.setItem(cartKey,JSON.stringify(cart)); } catch { announce('سبد در این صفحه نگه داشته می‌شود. ذخیره در مرورگر ممکن نیست.'); }
    updateCount();
  }
  function quoteText() {
    const lines=cart.lines.map((l,i)=>{const p=findProduct(l.id);return `${fa(i+1)}. ${p.name} | ${p.model} | تعداد: ${fa(l.qty)}${l.note?' | '+l.note:''}`;});
    return ['سلام، لطفاً برای اقلام زیر پیش‌فاکتور صادر کنید.',cart.project?'نام یا پروژه: '+cart.project:'',...lines,cart.message?'توضیحات: '+cart.message:''].filter(Boolean).join('\n');
  }
  function quotePage() {
    if(!cart.lines.length) return `<div class="wrap subpage">${crumbs([['سبد استعلام']])}<div class="empty empty-bag">${icon('bag')}<h1>سبد استعلام شما خالی است</h1><p>برای درخواست پیش‌فاکتور، محصول و تعداد مورد نیازتان را انتخاب کنید.</p>${button('#/catalog','انتخاب محصول')}</div></div>`;
    return `<div class="wrap subpage">${crumbs([['سبد استعلام']])}<div class="page-heading"><h1>سبد استعلام</h1><p>تعداد، ابعاد و توضیحات را بررسی کنید و فهرست را برای واحد فروش بفرستید.</p></div><div class="quote-layout"><div class="quote-lines">${cart.lines.map((l,index)=>{const p=findProduct(l.id);return `<article class="quote-row" data-line="${index}"><a class="line-img" href="${productLink(p.id)}"><img src="${p.image}" width="108" height="90" alt="${esc(p.name)}"></a><div class="line-detail"><bdi class="model">${esc(p.model)}</bdi><a href="${productLink(p.id)}"><h2>${esc(p.name)}</h2></a><div class="qty-wrap"><button data-action="more" aria-label="افزایش تعداد ${esc(p.name)}" ${l.qty>=9999?'disabled':''}>${icon('plus')}</button><span>${fa(l.qty)}</span><button data-action="less" aria-label="کاهش تعداد ${esc(p.name)}" ${l.qty<=1?'disabled':''}>${icon('minus')}</button></div></div><button data-action="remove" class="remove icon-btn" aria-label="حذف ${esc(p.name)}">${icon('trash')}</button><label class="line-note">ابعاد یا مشخصات درخواستی<input maxlength="160" data-note value="${esc(l.note)}" placeholder="مثلاً ابعاد دهانه و رنگ"></label></article>`;}).join('')}</div>
      <aside class="quote-summary"><h2>درخواست پیش‌فاکتور</h2><label>نام یا عنوان پروژه <small>(اختیاری)</small><input id="project" maxlength="90" value="${esc(cart.project)}"></label><label>توضیحات سفارش <small>(اختیاری)</small><textarea id="message" rows="3" maxlength="500">${esc(cart.message)}</textarea></label>
      <p>فهرست محصولات در واتساپ باز می‌شود. با ارسال پیام به فروش آئین تهویه، قیمت و زمان تحویل را استعلام کنید.</p>
      <a id="send-quote" class="btn solid" href="https://wa.me/${sales.mobile}?text=${encodeURIComponent(quoteText())}" target="_blank" rel="noopener">${icon('chat')}ارسال به واتساپ فروش</a><button class="btn plain" data-action="download">${icon('down')}ذخیره فهرست خرید</button></aside></div></div>`;
  }
  let current='';
  function render(focus=false) {
    const [rawPath,search=''] = (location.hash.slice(1)||'/').split('?');
    const [,section='home',id] = rawPath.split('/');
    current=section || 'home'; const q=new URLSearchParams(search);
    let html,title;
    const p=current==='product' ? findProduct(id) : null;
    if(current==='home'){html=homePage();title='کاتالوگ تجهیزات تهویه';}
    else if(current==='catalog'){html=catalogPage(q);title='کاتالوگ محصولات';}
    else if(current==='product'&&p){html=detail(p);title=p.name+' '+p.model;}
    else if(current==='library'){html=libraryPage();title='کتابخانه فنی';}
    else if(current==='quote'){html=quotePage();title='سبد استعلام';}
    else if(current==='contact'){html=contactPage();title='تماس با فروش';}
    else {html=`<div class="wrap subpage empty"><h1>صفحه پیدا نشد</h1>${button('#/catalog','بازگشت به محصولات')}</div>`;title='صفحه پیدا نشد';}
    main.innerHTML=html; document.title=title+' | '+company;
    if(current==='catalog')updateResults();
    for(const a of document.querySelectorAll('[data-nav],.quote-link')){
      const active=a.dataset.nav===(current==='product'?'catalog':current)||(a.classList.contains('quote-link')&&current==='quote');
      if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');
    }
    if(focus){main.focus({preventScroll:true});window.scrollTo(0,0);}
  }
  document.querySelector('.skip').addEventListener('click',e=>{e.preventDefault();main.focus();});

  main.addEventListener('input',e=>{
    const el=e.target;
    if(el.id==='search'||el.id==='family'){updateResults(true);return;}
    if(el.matches('[data-note]')){const l=cart.lines[Number(el.closest('[data-line]').dataset.line)];if(l)l.note=el.value;}
    else if(el.id==='project'||el.id==='message'){cart[el.id]=el.value;}
    else return;
    save();document.getElementById('send-quote').href=`https://wa.me/${sales.mobile}?text=${encodeURIComponent(quoteText())}`;
  });
  main.addEventListener('submit',e=>{
    if(e.target.id!=='add-form')return;
    e.preventDefault();const id=e.target.dataset.product;const qty=Number(document.getElementById('quantity').value);
    if(!Number.isInteger(qty)||qty<1||qty>9999)return;
    const note=document.getElementById('part-note').value.trim();
    const line=cart.lines.find(l=>l.id===id && l.note===note);
    if(line&&line.qty+qty>9999){announce('حداکثر تعداد هر محصول ۹۹۹۹ است.');return;}
    if(line)line.qty+=qty;else cart.lines.push({id,qty,note});
    save();announce('محصول به سبد استعلام افزوده شد.');
  });
  main.addEventListener('click',e=>{
    const page=e.target.closest('[data-detail]');
    if(page){
      const product=findProduct(page.dataset.detail);
      const view=e.target.closest('[data-view]'),step=e.target.closest('[data-step]');
      if(view){changeView(product,Number(view.dataset.view));return;}
      if(step){const qty=page.querySelector('#quantity');qty.value=String(Math.max(1,Math.min(9999,(Number(qty.value)||0)+Number(step.dataset.step))));return;}
      if(e.target.closest('[data-action="expand"]')){showViewer(product);return;}
    }
    const control=e.target.closest('[data-action]');if(!control)return;
    const action=control.dataset.action;
    if(action==='reset'){document.getElementById('search').value='';document.getElementById('family').value='';updateResults(true);document.getElementById('search').focus();return;}
    if(action==='download'){
      const url=URL.createObjectURL(new Blob(['\ufeff'+quoteText()],{type:'text/plain;charset=utf-8'}));
      const a=document.createElement('a');a.href=url;a.download='استعلام-آئین-تهویه.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);return;
    }
    const row=control.closest('[data-line]');if(!row)return;
    const l=cart.lines[Number(row.dataset.line)];if(!l)return;
    if(action==='more'&&l.qty<9999)l.qty++;
    if(action==='less'&&l.qty>1)l.qty--;
    if(action==='remove')cart.lines=cart.lines.filter(line=>line!==l);
    save(); main.innerHTML=quotePage();
    const next=main.querySelector(`[data-line="${row.dataset.line}"] [data-action="${action}"]:not(:disabled)`) || main.querySelector('[data-action]:not(:disabled),.empty .btn');
    next?.focus({preventScroll:true});
    if(action==='remove')announce('محصول از سبد حذف شد.');
  });
  window.addEventListener('hashchange',()=>render(true));
  window.addEventListener('storage',e=>{if(e.key===cartKey){cart=readCart();updateCount();if(current==='quote')render();}});
  updateCount();
  render();
})();
