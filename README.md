# Portfólio local — Dani Bsbeats

Recriação independente do portfólio em HTML5, Bootstrap 5 e JavaScript puro. O site usa arquivos locais para imagens, estilos, scripts e Bootstrap; não depende da Adobe Portfolio para funcionar.

## Estrutura

- `index.html` — ponto de entrada e estrutura HTML5.
- `assets/css/style.css` — identidade visual e responsividade.
- `assets/js/app.js` — navegação por hash, páginas, galerias e lightbox.
- `assets/js/content-data.js` — inventário completo das páginas e da ordem das mídias.
- `assets/vendor/` — Bootstrap 5.3.3 local.
- `assets/images/` — capas e imagens organizadas por coleção/projeto.
- `assets/videos/` — vídeos locais organizados por página/projeto.
- `server.js` — servidor estático local opcional (Node.js).

O conteúdo abrange as 14 páginas identificadas no portfólio original: as páginas principais `CBPC`, `Conexão`, `Home` e `Work`, além dos dez projetos exibidos em `Work`. Foram preservadas 578 imagens e 56 vídeos, na ordem observada na fonte.

## Executar localmente

### Opção rápida

Abra `index.html` diretamente no navegador. A navegação interna funciona com URLs em hash e não requer servidor.

### Opção recomendada

Na pasta deste projeto, execute:

```text
node server.js
```

Depois acesse <http://localhost:8000>.

Também é possível usar qualquer outro servidor HTTP estático.

## Testar

1. Abra `#/work` e confirme a grade de dez projetos.
2. Abra cada projeto e teste as imagens, os vídeos e o lightbox.
3. Confira `#/cbpc`, `#/conexao` e `#/home`.
4. Redimensione a janela para validar o menu móvel e a grade de uma coluna.

## Observações

- O conteúdo foi consultado no Adobe Portfolio apenas em modo de leitura; nada foi alterado nem publicado.
- As imagens e os vídeos foram copiados para as pastas locais de assets; o site não precisa acessar a Adobe em tempo de execução.
- Os vídeos usam uma versão otimizada para publicação estática, preservando o conteúdo com um tamanho compatível com o GitHub Pages.
