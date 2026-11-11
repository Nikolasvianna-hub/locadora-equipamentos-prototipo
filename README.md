# Protótipo — site de locadora de equipamentos

Protótipo estático (HTML, CSS e JavaScript puro, sem build) de um site para locadora de equipamentos audiovisuais.
Todos os nomes, contatos e equipamentos são **fictícios / placeholders**.

## Páginas
- `index.html` — início: destaque, cupom, equipamento em destaque, vitrines (mais alugados, lançamentos, promoções), kits, como alugar, sobre, depoimentos, FAQ.
- `catalogo.html` — catálogo com busca, filtro por categoria e marca, e ordenação (`?cat=cameras` abre já filtrado).
- `produto.html?id=...` — página do equipamento: preço por diária, itens inclusos, características e similares.
- `carrinho.html` — orçamento: datas de retirada/devolução, quantidade, cupom e envio do pedido formatado pelo WhatsApp.

- `admin.html` — **Área do funcionário**: painel do dia, lista de reservas (busca, filtros, status, anotação interna, WhatsApp do cliente), calendário do mês, ocupação por equipamento com alerta de conflito e exportação CSV. `admin.html#cal` e `admin.html#equip` abrem direto nas abas.

## Reservas — modo demonstração
O carrinho pede nome e telefone e registra a reserva (`assets/js/reservas.js`) antes de abrir o WhatsApp.
No protótipo as reservas ficam **no localStorage do navegador** (cada navegador vê só as suas) e a área do funcionário vem com pedidos fictícios de exemplo.
**Versão real:** trocar as funções do objeto `Reservas` por chamadas a um banco compartilhado (ex.: Supabase) e proteger `admin.html` com login de funcionário.

## Onde editar
- **Dados da empresa, equipamentos, kits e depoimentos:** `assets/js/data.js` (objeto `EMPRESA` e listas `PRODUTOS`, `KITS`, `DEPOIMENTOS`).
- **Cores e fontes:** variáveis no topo de `assets/css/style.css`.
- **Imagens:** os equipamentos usam ilustrações SVG geradas em `assets/js/app.js` (`ICONES`). Para usar fotos, adicione um campo `foto` no produto e troque `ilustracao(...)` por uma `<img>` no `card()`.

## Rodar localmente
Abra `index.html` no navegador ou sirva a pasta: `python -m http.server 8000`.
