/* Lógica compartilhada: cabeçalho, rodapé, ilustrações, cards e carrinho de orçamento */
const brl = v => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0 });
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const waLink = msg => `https://wa.me/${EMPRESA.whatsapp}?text=${encodeURIComponent(msg)}`;
const catNome = id => (CATEGORIAS.find(c => c.id === id) || {}).nome || "";

/* ---------- ilustrações SVG (substituir por fotos reais depois) ---------- */
const ICONES = {
  camera: `<rect x="14" y="30" width="62" height="40" rx="6"/><rect x="76" y="40" width="22" height="20" rx="3"/><circle cx="45" cy="50" r="13"/><circle cx="45" cy="50" r="6"/><rect x="22" y="22" width="16" height="8" rx="2"/>`,
  lente: `<rect x="24" y="28" width="52" height="44" rx="8"/><rect x="18" y="34" width="6" height="32" rx="2"/><line x1="36" y1="28" x2="36" y2="72"/><line x1="50" y1="28" x2="50" y2="72"/><line x1="64" y1="28" x2="64" y2="72"/><circle cx="82" cy="50" r="12"/>`,
  luz: `<path d="M30 30 h40 l10 24 h-60 z"/><line x1="50" y1="54" x2="50" y2="82"/><line x1="36" y1="82" x2="64" y2="82"/><line x1="22" y1="22" x2="30" y2="30"/><line x1="78" y1="22" x2="70" y2="30"/><line x1="50" y1="12" x2="50" y2="22"/>`,
  audio: `<rect x="38" y="16" width="24" height="40" rx="12"/><path d="M28 46 a22 22 0 0 0 44 0"/><line x1="50" y1="68" x2="50" y2="82"/><line x1="38" y1="82" x2="62" y2="82"/>`,
  movimento: `<line x1="50" y1="40" x2="26" y2="84"/><line x1="50" y1="40" x2="74" y2="84"/><line x1="50" y1="40" x2="50" y2="84"/><rect x="34" y="22" width="32" height="18" rx="4"/><circle cx="50" cy="31" r="5"/>`,
  monitor: `<rect x="16" y="24" width="68" height="44" rx="5"/><rect x="22" y="30" width="56" height="32" rx="2"/><line x1="50" y1="68" x2="50" y2="80"/><line x1="36" y1="80" x2="64" y2="80"/>`,
  acessorio: `<rect x="22" y="30" width="56" height="40" rx="4"/><rect x="28" y="36" width="44" height="28" rx="2"/><circle cx="34" cy="24" r="4"/><circle cx="66" cy="24" r="4"/><line x1="34" y1="28" x2="34" y2="30"/><line x1="66" y1="28" x2="66" y2="30"/>`,
  kit: `<rect x="16" y="34" width="68" height="42" rx="6"/><path d="M38 34 v-8 h24 v8"/><line x1="16" y1="50" x2="84" y2="50"/><rect x="44" y="46" width="12" height="8" rx="2"/>`
};
function ilustracao(icone, classe = "") {
  return `<svg class="ilus ${classe}" viewBox="0 0 100 100" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${ICONES[icone] || ICONES.acessorio}</svg>`;
}
const iconeProduto = p => (CATEGORIAS.find(c => c.id === p.cat) || {}).icone || "acessorio";

/* ---------- carrinho (localStorage) ---------- */
const CHAVE = "orcamento_prototipo";
const Carrinho = {
  ler() { try { return JSON.parse(localStorage.getItem(CHAVE)) || []; } catch { return []; } },
  salvar(itens) { try { localStorage.setItem(CHAVE, JSON.stringify(itens)); } catch {} atualizarContador(); },
  adicionar(id, tipo = "produto") {
    const itens = this.ler(); const it = itens.find(i => i.id === id);
    if (it) it.qtd += 1; else itens.push({ id, tipo, qtd: 1 });
    this.salvar(itens); avisar("Adicionado ao orçamento");
  },
  remover(id) { this.salvar(this.ler().filter(i => i.id !== id)); },
  qtd(id, n) { const itens = this.ler(); const it = itens.find(i => i.id === id); if (it) { it.qtd = Math.max(1, n); this.salvar(itens); } },
  total() { return this.ler().reduce((s, i) => s + i.qtd, 0); }
};
function itemInfo(i) { return i.tipo === "kit" ? KITS.find(k => k.id === i.id) : PRODUTOS.find(p => p.id === i.id); }
function atualizarContador() { $$("[data-contador]").forEach(el => { const n = Carrinho.total(); el.textContent = n; el.hidden = n === 0; }); }
function avisar(txt) {
  let t = $("#toast"); if (!t) { t = document.createElement("div"); t.id = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
  t.textContent = txt; t.classList.add("on"); clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove("on"), 1800);
}

/* ---------- componentes ---------- */
function card(p) {
  const selo = p.selo ? `<span class="selo selo-${p.selo === "Promoção" ? "promo" : p.selo === "Lançamento" ? "lanc" : "mais"}">${p.selo}</span>` : "";
  const de = p.precoDe ? `<s>${brl(p.precoDe)}</s>` : "";
  return `<article class="card">
    <a class="card-img cat-${p.cat}" href="produto.html?id=${p.id}" aria-label="${p.nome}">${selo}${ilustracao(iconeProduto(p))}</a>
    <div class="card-corpo">
      <span class="card-cat">${catNome(p.cat)}</span>
      <h3><a href="produto.html?id=${p.id}">${p.nome}</a></h3>
      <p class="preco">${de}<strong>${brl(p.preco)}</strong><span>/ diária</span></p>
      <div class="card-acoes">
        <a class="btn btn-linha btn-p" href="produto.html?id=${p.id}">Detalhes</a>
        <button class="btn btn-primario btn-p" data-add="${p.id}">Adicionar</button>
      </div>
    </div></article>`;
}
function ligarBotoes(raiz = document) {
  $$("[data-add]", raiz).forEach(b => b.onclick = () => Carrinho.adicionar(b.dataset.add, b.dataset.tipo || "produto"));
}

function cabecalho(ativo) {
  const nav = [["index.html", "Início"], ["catalogo.html", "Equipamentos"], ["index.html#kits", "Kits"], ["index.html#como-alugar", "Como alugar"], ["index.html#sobre", "Sobre"]];
  return `<a class="pular" href="#conteudo">Pular para o conteúdo</a>
  <header class="topo">
    <div class="wrap topo-linha">
      <a class="marca" href="index.html"><span class="marca-sel">◉</span> ${EMPRESA.nome}</a>
      <nav class="menu" id="menu" aria-label="Principal">${nav.map(([h, t]) => `<a href="${h}" ${ativo === t ? 'aria-current="page"' : ""}>${t}</a>`).join("")}</nav>
      <div class="topo-acoes">
        <a class="btn btn-wa btn-p esconde-mob" href="${waLink("Olá! Vim pelo site e queria um orçamento.")}" target="_blank" rel="noopener">Fale com a gente</a>
        <a class="carrinho-ico" href="carrinho.html" aria-label="Orçamento">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.5L21 8H6"/><circle cx="10" cy="20" r="1.4"/><circle cx="17" cy="20" r="1.4"/></svg>
          <span class="contador" data-contador hidden>0</span></a>
        <button class="hamburguer" aria-label="Abrir menu" aria-expanded="false" aria-controls="menu"><span></span><span></span><span></span></button>
      </div>
    </div>
    <div class="cats"><div class="wrap cats-linha">
      <a href="catalogo.html" class="cat-chip">${ilustracao("kit")}Catálogo</a>
      ${CATEGORIAS.map(c => `<a href="catalogo.html?cat=${c.id}" class="cat-chip">${ilustracao(c.icone)}${c.nome}</a>`).join("")}
    </div></div>
  </header>`;
}
function rodape() {
  return `<footer class="rodape"><div class="wrap rodape-grid">
    <div><a class="marca" href="index.html"><span class="marca-sel">◉</span> ${EMPRESA.nome}</a>
      <p>Texto curto sobre a empresa: locação de equipamentos audiovisuais com atendimento de quem vive set.</p>
      <p class="sociais"><a href="${EMPRESA.instagram}" aria-label="Instagram">Instagram</a> · <a href="${waLink("Olá!")}" target="_blank" rel="noopener">WhatsApp</a></p></div>
    <div><h4>Equipamentos</h4>${CATEGORIAS.map(c => `<a href="catalogo.html?cat=${c.id}">${c.nome}</a>`).join("")}</div>
    <div><h4>Institucional</h4><a href="index.html#como-alugar">Como alugar</a><a href="index.html#sobre">Quem somos</a><a href="index.html#kits">Kits</a><a href="catalogo.html">Catálogo completo</a><a href="index.html#faq">Perguntas frequentes</a><a href="admin.html">Área do funcionário</a></div>
    <div><h4>Atendimento</h4><a href="${waLink("Olá! Quero falar com o comercial.")}" target="_blank" rel="noopener">Comercial: ${EMPRESA.telefoneExibicao}</a><a href="mailto:${EMPRESA.email}">${EMPRESA.email}</a>
      <p>Seg a sex, 8h às 18h · Sáb, 9h às 13h<br>${EMPRESA.endereco}</p></div>
  </div><div class="wrap legal">${EMPRESA.nome} · CNPJ ${EMPRESA.cnpj} · © ${new Date().getFullYear()} · Protótipo — dados fictícios</div></footer>
  <a class="wa-flutuante" href="${waLink("Olá! Vim pelo site.")}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">
    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4a.5.5 0 0 0 0-.5c-.1-.1-.6-1.4-.8-1.9s-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.1 5.1 0 0 0 1.1 2.7 11.7 11.7 0 0 0 4.5 4c1.7.7 2.3.8 3.1.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .2-1.2c-.1-.1-.3-.2-.5-.3z"/></svg></a>`;
}
function montarLayout(ativo) {
  document.body.insertAdjacentHTML("afterbegin", cabecalho(ativo));
  document.body.insertAdjacentHTML("beforeend", rodape());
  const h = $(".hamburguer"), m = $("#menu");
  h.onclick = () => { const ab = m.classList.toggle("aberto"); h.setAttribute("aria-expanded", ab); };
  atualizarContador();
}
