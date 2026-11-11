/* Camada de dados das reservas.
   PROTÓTIPO: grava no localStorage do navegador (modo demonstração).
   Versão real: trocar as funções de Reservas por chamadas a um banco (ex.: Supabase) mantendo a mesma interface. */
const CHAVE_RES = "reservas_prototipo";
const STATUS = {
  pendente:   { rotulo: "Pendente",   cor: "#b7791f" },
  confirmada: { rotulo: "Confirmada", cor: "#2856d6" },
  retirada:   { rotulo: "Retirada",   cor: "#7c3aed" },
  devolvida:  { rotulo: "Devolvida",  cor: "#15803d" },
  cancelada:  { rotulo: "Cancelada",  cor: "#9ca3af" }
};
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const dataISO = d => { const x = new Date(d); x.setMinutes(x.getMinutes() - x.getTimezoneOffset()); return x.toISOString().slice(0, 10); };
const dataBR = iso => iso ? iso.split("-").reverse().join("/") : "";
const diasEntre = (a, b) => Math.max(1, Math.round((new Date(b) - new Date(a)) / 864e5) || 1);

const Reservas = {
  listar() { try { return JSON.parse(localStorage.getItem(CHAVE_RES)) || []; } catch { return []; } },
  _gravar(lista) { try { localStorage.setItem(CHAVE_RES, JSON.stringify(lista)); } catch {} },
  criar(dados) {
    const lista = this.listar();
    const codigo = "R" + String(1000 + lista.length + 1);
    const r = { id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()), codigo, criadoEm: new Date().toISOString(), status: "pendente", ...dados };
    lista.push(r); this._gravar(lista); return r;
  },
  atualizar(id, campos) { const lista = this.listar(); const r = lista.find(x => x.id === id); if (r) Object.assign(r, campos); this._gravar(lista); return r; },
  remover(id) { this._gravar(this.listar().filter(x => x.id !== id)); },
  semearDemo(forcar = false) {
    if (!forcar && this.listar().length) return;
    const hoje = new Date(); const d = n => dataISO(new Date(hoje.getTime() + n * 864e5));
    const nomes = ["Cliente Exemplo 1", "Produtora Exemplo", "Cliente Exemplo 2", "Coletivo Audiovisual Exemplo", "Cliente Exemplo 3", "Agência Exemplo", "Cliente Exemplo 4", "Estúdio Exemplo", "Cliente Exemplo 5", "Cliente Exemplo 6"];
    const pedidos = [
      [-6, -4, ["cam-cine-6k", "lente-24-70", "bateria-vmount"], "devolvida"], [-3, -1, ["painel-rgb", "tubo-rgb"], "devolvida"],
      [-1, 1, ["cam-mirrorless-4k", "mic-lapela"], "retirada"], [0, 2, ["gimbal-pro", "monitor-7"], "retirada"],
      [0, 1, ["kit-entrevista"], "confirmada"], [1, 3, ["cam-cine-6k", "kit-cine-primes", "follow-focus"], "confirmada"],
      [2, 4, ["luz-led-600", "softbox-120"], "pendente"], [3, 5, ["cam-cine-8k", "cam-cine-6k", "transmissor-video", "monitor-diretor"], "pendente"],
      [5, 6, ["mic-shotgun", "gravador-32bit"], "confirmada"], [8, 11, ["kit-documentario"], "pendente"], [12, 13, ["cam-compacta"], "cancelada"]
    ];
    const lista = pedidos.map(([a, b, ids, status], i) => {
      const itens = ids.map(id => ({ id, tipo: KITS.some(k => k.id === id) ? "kit" : "produto", qtd: 1 }));
      const dias = diasEntre(d(a), d(b));
      const total = itens.reduce((s, it) => s + ((it.tipo === "kit" ? KITS : PRODUTOS).find(x => x.id === it.id)?.preco || 0) * it.qtd * dias, 0);
      return { id: "demo-" + i, codigo: "R" + (1001 + i), criadoEm: new Date(hoje.getTime() + (a - 3) * 864e5).toISOString(), status,
        cliente: { nome: nomes[i % nomes.length], telefone: "(00) 9" + String(1000 + i * 37).padStart(4, "0") + "-0000", producao: i % 3 === 0 ? "Nome do projeto exemplo" : "" },
        retirada: d(a), devolucao: d(b), itens, cupom: i === 4 ? EMPRESA.cupom : "", total: i === 4 ? total * (1 - EMPRESA.desconto) : total, obs: "", demo: true };
    });
    this._gravar(lista);
  }
};
function nomeItem(it) { const x = (it.tipo === "kit" ? KITS : PRODUTOS).find(p => p.id === it.id); return x ? x.nome : it.id; }
