<<<<<<< HEAD
# Dev Point Studio

Website institucional da **Dev Point Studio** — um software studio brasileiro.
Site estático, construído somente com **HTML5, CSS3 e JavaScript Vanilla**.

> Transformamos ideias em soluções digitais.

---

## Tecnologia

- HTML5 semântico
- CSS3 (variáveis, Flexbox, Grid, keyframes, media queries)
- JavaScript Vanilla (sem frameworks nem bibliotecas)

Sem React, Next.js, Tailwind, Bootstrap ou jQuery. Funciona como site estático.

---

## Estrutura de pastas

```
DEV_POINT_STUDIO/
├── assets/
│   ├── images/      → imagens dos projetos (project_01…04.png)
│   ├── icons/       → favicon.svg
│   └── fonts/       → reservado (fontes carregadas via Google Fonts)
├── css/
│   ├── style.css        → estilos gerais, componentes, layout, animações
│   └── responsive.css   → adaptações para tablet e mobile
├── js/
│   └── script.js        → dados de conteúdo + interações
├── index.html
├── robots.txt
├── sitemap.xml
├── README.md
└── .gitignore
```

---

## Como rodar

O site é 100% estático — basta abrir o `index.html` no navegador.

Para servir localmente com um servidor (recomendado, para caminhos relativos funcionarem):

```bash
pnpm install
pnpm dev
```

Isso sobe o site em `http://localhost:3000` usando o pacote `serve`.

---

## Como editar o conteúdo

Todo o conteúdo dinâmico está centralizado no topo de **`js/script.js`**,
em arrays fáceis de editar — sem precisar mexer no HTML ou no CSS:

| O que editar          | Onde                         |
| --------------------- | ---------------------------- |
| Serviços              | `services_data`              |
| Projetos              | `projects_data`              |
| Diferenciais          | `why_data`                   |
| Etapas do processo    | `process_data`               |
| Equipe                | `team_data`                  |
| Visão de futuro       | `vision_data`                |
| Cores / fontes        | variáveis em `css/style.css` (`:root`) |
| Textos fixos          | `index.html`                 |

### Trocar imagens de projeto

Substitua os arquivos em `assets/images/` (`project_01.png` … `project_04.png`)
ou altere o campo `image` no array `projects_data`. As dimensões são mantidas
via CSS (`aspect-ratio`), evitando layout shift.

### Adicionar um novo projeto / serviço / membro

Basta acrescentar um objeto ao array correspondente em `js/script.js`.
A numeração e a estrutura visual são geradas automaticamente.

---

## Recursos

- Design responsivo (mobile, tablet, desktop e monitores grandes)
- Menu mobile deslizante
- Animações de entrada ao rolar (Intersection Observer)
- Timeline de processo animada
- Pré-visualização interativa de projetos
- Acessibilidade: navegação por teclado, foco visível, `alt`, `aria-*`
- Respeita `prefers-reduced-motion`
- SEO básico: `title`, `meta description`, Open Graph, `robots.txt`, `sitemap.xml`

---

## Contato

- E-mail: devpoint2026@gmail.com
- Telefone: (51) 9266-4141
- Instagram: [@devpoint_](https://instagram.com/devpoint_)
=======
# DevPointStudio
Portfólio de StartUp 
>>>>>>> 17cb6639cc19200d9ea64563c92fa350eea586e5
