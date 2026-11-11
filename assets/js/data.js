/* Dados fictícios do protótipo — substituir pelo acervo real */
const EMPRESA = {
  nome: "Nome da Empresa",
  slogan: "Slogan da empresa aqui",
  cidade: "Cidade/UF",
  whatsapp: "5500000000000",           // DDI + DDD + número, só dígitos
  telefoneExibicao: "(00) 00000-0000",
  email: "contato@nomedaempresa.com.br",
  endereco: "Rua Exemplo, 000 — Bairro, Cidade/UF",
  cnpj: "00.000.000/0000-00",
  instagram: "#",
  cupom: "BEMVINDO10",
  desconto: 0.10
};

const CATEGORIAS = [
  { id: "cameras", nome: "Câmeras", icone: "camera" },
  { id: "lentes", nome: "Lentes", icone: "lente" },
  { id: "luz", nome: "Luz & Difusão", icone: "luz" },
  { id: "audio", nome: "Áudio", icone: "audio" },
  { id: "movimento", nome: "Movimento", icone: "movimento" },
  { id: "monitores", nome: "Monitores & Transmissão", icone: "monitor" },
  { id: "acessorios", nome: "Acessórios", icone: "acessorio" }
];

const PRODUTOS = [
  { id: "cam-cine-6k", nome: "Câmera Cinema Full Frame 6K", marca: "Marca A", cat: "cameras", preco: 450, selo: "Mais Alugado", grupo: ["mais"],
    specs: { "Sensor": "Full Frame 6K", "Faixa dinâmica": "15+ stops", "Gravação": "6K 30p / 4K 120p", "Encaixe": "Montagem L" },
    inclusos: ["2 baterias", "Cartão de memória 512 GB", "Leitor de cartão", "Carregador duplo"],
    desc: "Corpo de cinema compacto para produções que pedem imagem limpa em baixa luz, com codec robusto e perfil de cor plano para correção." },
  { id: "cam-mirrorless-4k", nome: "Câmera Mirrorless 4K Pro", marca: "Marca B", cat: "cameras", preco: 280, selo: "Mais Alugado", grupo: ["mais"],
    specs: { "Sensor": "Full Frame 33 MP", "Vídeo": "4K 60p 10-bit", "Estabilização": "IBIS 5 eixos", "Encaixe": "Montagem E" },
    inclusos: ["2 baterias", "Cartão de memória 256 GB", "Carregador"], desc: "Versátil para vídeo e foto, ideal para conteúdo, eventos e documentário." },
  { id: "cam-cine-8k", nome: "Câmera Cinema 8K Raw", marca: "Marca C", cat: "cameras", preco: 890, selo: "Lançamento", grupo: ["lanc"],
    specs: { "Sensor": "Super 35 8K", "Faixa dinâmica": "16 stops", "Gravação": "Raw interno", "Encaixe": "PL / EF" },
    inclusos: ["4 baterias V-Mount", "2 mídias 1 TB", "Monitor de topo", "Case rígido"], desc: "Para longas, publicidade e clipes com fluxo Raw e muita latitude na finalização." },
  { id: "cam-compacta", nome: "Câmera Compacta para Vlog", marca: "Marca B", cat: "cameras", preco: 120, selo: "Promoção", grupo: ["promo"], precoDe: 150,
    specs: { "Sensor": "1 polegada", "Vídeo": "4K 30p", "Tela": "Articulada", "Áudio": "Entrada P2" }, inclusos: ["Bateria extra", "Cartão 128 GB"], desc: "Leve e prática para bastidores, redes sociais e gravações rápidas." },
  { id: "lente-24-70", nome: "Lente Zoom 24-70mm f/2.8", marca: "Marca A", cat: "lentes", preco: 140, selo: "Mais Alugado", grupo: ["mais"],
    specs: { "Distância focal": "24-70mm", "Abertura": "f/2.8", "Encaixe": "Montagem L / E", "Filtro": "82mm" }, inclusos: ["Tampas", "Para-sol", "Bolsa"], desc: "A lente coringa do set: cobre do plano aberto ao retrato." },
  { id: "kit-cine-primes", nome: "Kit Lentes Cine Prime (5 un.)", marca: "Marca D", cat: "lentes", preco: 520, selo: "Lançamento", grupo: ["lanc"],
    specs: { "Focais": "18, 25, 35, 50, 85mm", "Abertura": "T1.5", "Encaixe": "PL", "Anel": "Foco/íris com engrenagem" }, inclusos: ["Case rígido", "Tampas"], desc: "Conjunto cinematográfico com cor consistente entre todas as focais." },
  { id: "lente-70-200", nome: "Lente Tele 70-200mm f/2.8", marca: "Marca B", cat: "lentes", preco: 160, grupo: [],
    specs: { "Distância focal": "70-200mm", "Abertura": "f/2.8", "Estabilização": "Sim", "Encaixe": "Montagem E" }, inclusos: ["Para-sol", "Colar de tripé"], desc: "Compressão bonita para entrevistas, shows e esportes." },
  { id: "lente-anamorfica", nome: "Lente Anamórfica 50mm 1.33x", marca: "Marca D", cat: "lentes", preco: 230, selo: "Promoção", grupo: ["promo"], precoDe: 280,
    specs: { "Focal": "50mm", "Fator": "1.33x", "Abertura": "T2", "Flare": "Azul" }, inclusos: ["Tampas", "Engrenagem de foco"], desc: "Look widescreen com flares e bokeh oval." },
  { id: "luz-led-600", nome: "Refletor LED 600W Bicolor", marca: "Marca E", cat: "luz", preco: 210, selo: "Mais Alugado", grupo: ["mais"],
    specs: { "Potência": "600W", "Temperatura": "2700-6500K", "Encaixe": "Bowens", "Controle": "App / DMX" }, inclusos: ["Refletor parabólico", "Cabo de força", "Bolsa"], desc: "Luz principal potente para externas e grandes ambientes." },
  { id: "painel-rgb", nome: "Painel LED RGB 2x1", marca: "Marca E", cat: "luz", preco: 260, selo: "Lançamento", grupo: ["lanc"],
    specs: { "Tamanho": "2x1", "Cor": "RGBWW", "Efeitos": "Fogo, TV, polícia", "Controle": "DMX / App" }, inclusos: ["Grid", "Softbox", "Fonte"], desc: "Luz suave e colorida para clipes, publicidade e cenas noturnas." },
  { id: "tubo-rgb", nome: "Kit 4 Tubos LED RGB", marca: "Marca F", cat: "luz", preco: 150, grupo: [],
    specs: { "Quantidade": "4 tubos", "Tamanho": "120 cm", "Cor": "RGB pixel", "Bateria": "Interna" }, inclusos: ["Carregador", "Suportes", "Case"], desc: "Práticos para compor fundos e luz prática em cena." },
  { id: "softbox-120", nome: "Softbox Octogonal 120cm", marca: "Marca F", cat: "luz", preco: 45, selo: "Promoção", grupo: ["promo"], precoDe: 60,
    specs: { "Diâmetro": "120 cm", "Encaixe": "Bowens", "Difusão": "Dupla", "Grid": "Incluso" }, inclusos: ["Bolsa"], desc: "Difusão generosa para retratos e entrevistas." },
  { id: "mic-lapela", nome: "Kit Microfone de Lapela Sem Fio", marca: "Marca G", cat: "audio", preco: 90, selo: "Mais Alugado", grupo: ["mais"],
    specs: { "Canais": "2 transmissores", "Alcance": "200 m", "Gravação": "Interna backup", "Saída": "P2 / USB-C" }, inclusos: ["Case de carga", "Espumas", "Cabos"], desc: "Áudio limpo para entrevistas, podcasts e documentário." },
  { id: "mic-shotgun", nome: "Microfone Shotgun + Vara Boom", marca: "Marca G", cat: "audio", preco: 110, grupo: [],
    specs: { "Padrão": "Supercardioide", "Conexão": "XLR", "Vara": "Carbono 3 m", "Proteção": "Zeppelin + dead cat" }, inclusos: ["Cabo XLR 10 m", "Suporte anti-vibração"], desc: "Captação direcional para set de ficção." },
  { id: "gravador-32bit", nome: "Gravador de Áudio 32-bit 8 Canais", marca: "Marca H", cat: "audio", preco: 170, selo: "Lançamento", grupo: ["lanc"],
    specs: { "Canais": "8 entradas", "Resolução": "32-bit float", "Timecode": "Sim", "Mídia": "SD" }, inclusos: ["Bolsa", "Baterias", "Cartão 64 GB"], desc: "Sem preocupação com clipagem: ganho resolvido na pós." },
  { id: "gimbal-pro", nome: "Gimbal Estabilizador Pro", marca: "Marca I", cat: "movimento", preco: 180, selo: "Mais Alugado", grupo: ["mais"],
    specs: { "Carga": "Até 4,5 kg", "Bateria": "14 h", "Foco": "Motor incluso", "Controle": "Wireless" }, inclusos: ["Case", "Placas de engate", "Cabos de controle"], desc: "Movimento fluido para câmeras de cinema compactas." },
  { id: "slider", nome: "Slider Motorizado 1,2 m", marca: "Marca I", cat: "movimento", preco: 130, grupo: [],
    specs: { "Curso": "1,2 m", "Motor": "Pan + slide", "Carga": "8 kg", "Controle": "App" }, inclusos: ["Pés", "Bolsa"], desc: "Movimentos precisos e repetíveis para produto e timelapse." },
  { id: "tripe-fluido", nome: "Tripé Cabeça Fluida 100mm", marca: "Marca J", cat: "movimento", preco: 95, selo: "Promoção", grupo: ["promo"], precoDe: 120,
    specs: { "Carga": "18 kg", "Bowl": "100 mm", "Altura": "Até 1,8 m", "Spreader": "Médio" }, inclusos: ["Bolsa", "Placa rápida"], desc: "Pans suaves e travamento firme para câmeras pesadas." },
  { id: "monitor-7", nome: "Monitor de Campo 7\" 2000 nits", marca: "Marca K", cat: "monitores", preco: 120, grupo: [],
    specs: { "Tela": "7 polegadas", "Brilho": "2000 nits", "Entradas": "SDI / HDMI", "LUTs": "3D LUT" }, inclusos: ["Para-sol", "2 baterias", "Braço articulado"], desc: "Visível em externa com sol forte, com ferramentas de exposição." },
  { id: "transmissor-video", nome: "Transmissor de Vídeo Sem Fio", marca: "Marca K", cat: "monitores", preco: 240, selo: "Lançamento", grupo: ["lanc"],
    specs: { "Alcance": "300 m", "Latência": "< 1 ms", "Entradas": "SDI / HDMI", "Receptores": "2" }, inclusos: ["Case", "Antenas", "Baterias"], desc: "Imagem ao vivo para direção, foco e cliente." },
  { id: "monitor-diretor", nome: "Monitor do Diretor 17\"", marca: "Marca L", cat: "monitores", preco: 200, grupo: [],
    specs: { "Tela": "17 polegadas", "Resolução": "Full HD", "Entradas": "SDI", "Alimentação": "V-Mount" }, inclusos: ["Case", "Suporte"], desc: "Conforto para o video village." },
  { id: "bateria-vmount", nome: "Kit 4 Baterias V-Mount 150Wh", marca: "Marca M", cat: "acessorios", preco: 110, selo: "Promoção", grupo: ["promo"], precoDe: 140,
    specs: { "Capacidade": "150 Wh", "Saídas": "D-Tap / USB", "Quantidade": "4", "Carregador": "Quádruplo" }, inclusos: ["Carregador quádruplo", "Bolsa"], desc: "Autonomia para o dia inteiro de diária." },
  { id: "follow-focus", nome: "Follow Focus Sem Fio", marca: "Marca N", cat: "acessorios", preco: 150, grupo: [],
    specs: { "Motores": "2", "Alcance": "100 m", "Controle": "Handwheel", "Compatível": "Lentes com engrenagem" }, inclusos: ["Case", "Cabos", "Engrenagens"], desc: "Foco remoto preciso para planos em movimento." },
  { id: "cage", nome: "Cage + Top Handle + Base", marca: "Marca N", cat: "acessorios", preco: 60, grupo: [],
    specs: { "Material": "Alumínio", "Rosca": "1/4 e 3/8", "Rail": "15 mm", "Compatível": "Câmeras do acervo" }, inclusos: ["Chaves", "Parafusos"], desc: "Estrutura para montar a câmera do jeito que o set pede." }
];

const KITS = [
  { id: "kit-entrevista", nome: "Kit 01 — Entrevista", preco: 390, itens: ["Câmera Mirrorless 4K Pro", "Lente Zoom 24-70mm", "Kit Microfone de Lapela", "Painel LED + Softbox", "Tripé Cabeça Fluida"] },
  { id: "kit-documentario", nome: "Kit 02 — Documentário", preco: 620, itens: ["Câmera Cinema Full Frame 6K", "Lente Zoom 24-70mm", "Gimbal Estabilizador Pro", "Gravador 32-bit", "Kit 4 Baterias V-Mount"] },
  { id: "kit-luz-rgb", nome: "Kit 03 — Luz RGB", preco: 450, itens: ["Painel LED RGB 2x1", "Kit 4 Tubos LED RGB", "Refletor LED 600W", "Tripés de luz", "Controle DMX"] }
];

const DEPOIMENTOS = [
  { nome: "Nome do Cliente", cargo: "Diretor(a) de Fotografia", texto: "Equipamento revisado, equipe que entende de set e atendimento rápido. Virou nossa locadora de confiança." },
  { nome: "Nome do Cliente", cargo: "Produtor(a) Executivo(a)", texto: "Orçamento resolvido em minutos pelo WhatsApp e retirada sem burocracia. Facilitou muito a pré." },
  { nome: "Nome do Cliente", cargo: "Criador(a) de Conteúdo", texto: "Me ajudaram a montar o kit certo para o meu canal sem gastar com o que eu não precisava." }
];
