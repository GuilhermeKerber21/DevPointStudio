/* =====================================================
   DEV POINT STUDIO — script.js
   JavaScript vanilla. Sem frameworks nem bibliotecas.

   Todos os dados de conteúdo ficam centralizados aqui,
   para que serviços, projetos, equipe etc. possam ser
   editados sem mexer na estrutura HTML/CSS.
   ===================================================== */

/* ----------  1. Dados de conteúdo (fácil de editar)  ---------- */

const services_data = [
  {
    icon: "globe",
    title: "Sites Institucionais",
    text: "Presença online profissional e responsiva. Seu negócio representado com qualidade na web.",
  },
  {
    icon: "layers",
    title: "Landing Pages",
    text: "Páginas focadas em conversão. Cada elemento pensado para transformar visitante em cliente.",
  },
  {
    icon: "monitor",
    title: "Sistemas Personalizados",
    text: "Plataformas web sob medida para a realidade específica do seu negócio.",
  },
  {
    icon: "workflow",
    title: "Integrações e Automações",
    text: "Conexão de ferramentas e processos automáticos. Menos trabalho manual, mais eficiência.",
  },
  {
    icon: "database",
    title: "Banco de Dados",
    text: "Estruturação e organização de dados com segurança e performance.",
  },
  {
    icon: "star",
    title: "Soluções Sob Medida",
    text: "Tecnologia desenhada para cada desafio. Se não existe, construímos.",
  },
];

const projects_data = [
  {
    number: "01",
    name: "Hub de Negócios",
    category: "Serviços Financeiros",
    description: "Conecta clientes a soluções financeiras e empresariais em uma única plataforma.",
    image: "assets/images/project_01.png",
    technologies: ["CSS", "HTML", "JavaScript"],
    link: "https://vemcomhub.com.br/",
  },
  {
    number: "02",
    name: "Football Tourism Institute",
    category: "Site Institucional",
    description: "Landing Page desenvolvida para um instituto de pesquisa futebolística dos EUA, com intuito de apresentar a ideia e projetos da instituição dos meus clientes.",
    image: "assets/images/project_02.png",
    technologies: ["ReactJs", "Tailwind", "NextJs"],
    link: "https://footballtourisminstitute.com/",
  },
  {
    number: "03",
    name: "Portfólio Jonathan R.Oliveira",
    category: "Landing Page",
    description: "Este site foi desenvolvido para apresentar as pesquisas e os trabalhos do meu cliente, Jonathan, relacionados ao futebol.",
    image: "assets/images/project_03.png",
    technologies: ["HTML", "CSS", "JavaScript"],
    link: "https://www.jonathanroliveira.com/",
  },
  
];

const process_data = [
  {
    number: "01",
    name: "Entendimento",
    tag: "Da necessidade do cliente.",
    text: "Conversamos a fundo sobre o negócio, os objetivos e os desafios. Só começamos a planejar quando entendemos o problema de verdade.",
  },
  {
    number: "02",
    name: "Planejamento",
    tag: "Da solução ideal.",
    text: "Definimos escopo, tecnologias, prazo e etapas. Documentamos tudo para que o projeto seja previsível e transparente.",
  },
  {
    number: "03",
    name: "Desenvolvimento",
    tag: "Construção do projeto.",
    text: "Código limpo, estruturado e escalável. Atualizações regulares para o cliente acompanhar o progresso.",
  },
  {
    number: "04",
    name: "Testes e Ajustes",
    tag: "Qualidade e refino.",
    text: "Validação técnica e funcional em múltiplos dispositivos. Ajustes finos até o resultado estar exatamente como esperado.",
  },
  {
    number: "05",
    name: "Entrega e Suporte",
    tag: "Do lançamento em diante.",
    text: "Entrega final acompanhada e suporte contínuo. Seguimos por perto para garantir que tudo funcione a longo prazo.",
  },
];

const team_data = [
  {
    initials: "YS",
    name: "Ygor Silveira",
    role: "Desenvolvimento & Project Manager",
    bio: "Responsável pelo desenvolvimento, estrutura dos projetos, programação e soluções digitais. Garante que cada linha de código serve ao propósito do negócio.",
    skills: ["Full-Stack", "Gestão", "Arquitetura"],
  },
  {
    initials: "GK",
    name: "Guilherme Severo Kerber",
    role: "Desenvolvimento & Marketing",
    bio: "Responsável pelo desenvolvimento de projetos e soluções digitais, e pela divulgação da empresa através das redes sociais. Une técnica e comunicação.",
    skills: ["Front-End", "Marketing Digital", "Social Media"],
  },
];

const faq_data = [
  {
    question: "Quais serviços a Dev Point oferece?",
    answer: "Desenvolvemos sites institucionais, landing pages, sistemas personalizados, integrações e automações, bancos de dados e outras soluções sob medida para cada negócio.",
  },
  {
    question: "Quanto custa um projeto?",
    answer: "O valor depende do tipo de projeto, das funcionalidades e do nível de personalização. Conversamos sobre sua necessidade e montamos uma proposta de acordo com o que realmente faz sentido para o seu negócio.",
  },
  {
    question: "Quanto tempo leva para desenvolver um projeto?",
    answer: "O prazo varia conforme o escopo e a complexidade. Depois de entendermos o projeto, definimos uma previsão de entrega e as principais etapas do desenvolvimento.",
  },
  {
    question: "A Dev Point atende pequenos negócios?",
    answer: "Sim. Trabalhamos com empresas e pequenos negócios que precisam de uma presença digital mais profissional, processos mais eficientes ou uma solução criada especificamente para sua realidade.",
  },
  {
    question: "Vocês fazem manutenção depois da entrega?",
    answer: "Sim. Podemos continuar acompanhando o projeto depois da entrega para realizar ajustes, melhorias, atualizações e suporte conforme a necessidade.",
  },
  {
    question: "Como posso começar um projeto com a Dev Point?",
    answer: "É só entrar em contato pelo e-mail ou WhatsApp. Você conta um pouco sobre o que precisa e, a partir disso, conversamos sobre a melhor solução e os próximos passos.",
  },
];

/* ----------  2. Ícones SVG (traço) para os serviços  ---------- */

const service_icons = {
  globe: '<svg class="service_icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></svg>',
  layers: '<svg class="service_icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5M3 17l9 5 9-5"/></svg>',
  monitor: '<svg class="service_icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>',
  workflow: '<svg class="service_icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="15" width="6" height="6" rx="1"/><path d="M9 6h6a3 3 0 0 1 3 3v6"/></svg>',
  database: '<svg class="service_icon" viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/></svg>',
  star: '<svg class="service_icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l2.5 6L21 9.5l-5 4 1.5 6.5L12 16.5 6.5 20 8 13.5l-5-4L9.5 9 12 3z"/></svg>',
};

const arrow_icon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M7 7h10v10"/></svg>';

/* ----------  3. Renderização dos componentes  ---------- */

function render_services() {
  const grid = document.getElementById("services_grid");
  if (!grid) return;

  grid.innerHTML = services_data
    .map(function (service, index) {
      const number = String(index + 1).padStart(2, "0");
      return (
        '<article class="service_card reveal" data-reveal>' +
        '<span class="service_number">' + number + "</span>" +
        (service_icons[service.icon] || "") +
        '<h3 class="service_title">' + service.title + "</h3>" +
        '<p class="service_text">' + service.text + "</p>" +
        "</article>"
      );
    })
    .join("");
}

function render_projects() {
  const container = document.getElementById("projects_card_swap");
  const nav = document.getElementById("projects_swap_nav");
  if (!container) return;

  if (typeof window.initCardSwap === "function") {
    window.initCardSwap(container, projects_data, nav);
  }
}

function render_process() {
  const timeline = document.getElementById("process_timeline");
  if (!timeline) return;

  timeline.innerHTML = process_data
    .map(function (step) {
      return (
        '<li class="process_step reveal" data-reveal>' +
        "<div>" +
        '<span class="step_number">' + step.number + "</span>" +
        '<h3 class="step_name">' + step.name + "</h3>" +
        '<span class="step_tag">' + step.tag + "</span>" +
        "</div>" +
        '<p class="step_text">' + step.text + "</p>" +
        "</li>"
      );
    })
    .join("");
}

function render_team() {
  const grid = document.getElementById("team_grid");
  if (!grid) return;

  grid.innerHTML = team_data
    .map(function (member) {
      const skills = member.skills
        .map(function (skill) {
          return '<span class="team_skill">' + skill + "</span>";
        })
        .join("");
      return (
        '<article class="team_member reveal" data-reveal>' +
        '<div class="team_avatar_wrap">' +
        '<span class="team_avatar">' + member.initials + "</span>" +
        "</div>" +
        '<div class="team_body">' +
        '<h3 class="team_name">' + member.name + "</h3>" +
        '<p class="team_role">' + member.role + "</p>" +
        '<p class="team_bio">' + member.bio + "</p>" +
        '<div class="team_skills">' + skills + "</div>" +
        "</div></article>"
      );
    })
    .join("");
}

function render_faq() {
  const list = document.getElementById("faq_list");
  if (!list) return;

  list.innerHTML = faq_data
    .map(function (item, index) {
      const is_open = index === 0;
      return (
        '<article class="faq_item reveal' + (is_open ? ' is_open' : '') + '" data-reveal>' +
        '<button class="faq_question" type="button" aria-expanded="' + is_open + '" aria-controls="faq_answer_' + index + '">' +
        '<span class="faq_question_number">' + String(index + 1).padStart(2, "0") + '</span>' +
        '<span class="faq_question_text">' + item.question + '</span>' +
        '<span class="faq_toggle" aria-hidden="true"><span></span><span></span></span>' +
        '</button>' +
        '<div class="faq_answer_wrap" id="faq_answer_' + index + '">' +
        '<div class="faq_answer"><p>' + item.answer + '</p></div>' +
        '</div>' +
        '</article>'
      );
    })
    .join("");

  list.querySelectorAll(".faq_question").forEach(function (button) {
    button.addEventListener("click", function () {
      const item = button.closest(".faq_item");
      const is_open = item.classList.contains("is_open");

      list.querySelectorAll(".faq_item.is_open").forEach(function (open_item) {
        open_item.classList.remove("is_open");
        const open_button = open_item.querySelector(".faq_question");
        if (open_button) open_button.setAttribute("aria-expanded", "false");
      });

      if (!is_open) {
        item.classList.add("is_open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });
}

/* ----------  4. Menu mobile  ---------- */

function menu_label(is_open) {
  const key = is_open ? "menu_close" : "menu_open";
  const label = window.i18n ? window.i18n.t(key) : null;
  return label || (is_open ? "Fechar menu" : "Abrir menu");
}

function setup_mobile_menu() {
  const toggle = document.getElementById("menu_toggle");
  const nav = document.getElementById("main_nav");
  if (!toggle || !nav) return;

  function close_menu() {
    nav.classList.remove("is_open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", menu_label(false));
    document.body.classList.remove("menu_open");
  }

  toggle.addEventListener("click", function () {
    const is_open = nav.classList.toggle("is_open");
    toggle.setAttribute("aria-expanded", String(is_open));
    toggle.setAttribute("aria-label", menu_label(is_open));
    document.body.classList.toggle("menu_open", is_open);
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", close_menu);
  });
}

/* ----------  5. Header com fundo ao rolar  ---------- */

function setup_header_scroll() {
  const header = document.getElementById("site_header");
  if (!header) return;

  function on_scroll() {
    header.classList.toggle("is_scrolled", window.scrollY > 20);
  }
  on_scroll();
  window.addEventListener("scroll", on_scroll, { passive: true });
}

/* ----------  6. Reveal ao rolar (Intersection Observer)  ---------- */

function setup_scroll_reveal() {
  const targets = document.querySelectorAll("[data-reveal]");
  if (!targets.length) return;

  // Respeita a preferência de redução de movimento.
  const reduce_motion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce_motion || !("IntersectionObserver" in window)) {
    targets.forEach(function (el) {
      el.classList.add("is_visible");
    });
    return;
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is_visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );

  targets.forEach(function (el) {
    observer.observe(el);
  });
}

/* ----------  7. Idioma (PT / EN)  ---------- */

/* Os arrays acima ficam em português. Ao trocar de idioma, os textos já
   renderizados são atualizados no lugar (sem recriar os cards), assim as
   animações de entrada e o carrossel de projetos não reiniciam. */

function localized(section, items) {
  return window.i18n ? window.i18n.localize(section, items) : items;
}

function set_text(parent, selector, value) {
  const el = parent.querySelector(selector);
  if (el && value != null) el.textContent = value;
}

function apply_services_language() {
  const items = localized("services", services_data);
  document.querySelectorAll("#services_grid .service_card").forEach(function (card, i) {
    if (!items[i]) return;
    set_text(card, ".service_title", items[i].title);
    set_text(card, ".service_text", items[i].text);
  });
}

function apply_process_language() {
  const items = localized("process", process_data);
  document.querySelectorAll("#process_timeline .process_step").forEach(function (step, i) {
    if (!items[i]) return;
    set_text(step, ".step_name", items[i].name);
    set_text(step, ".step_tag", items[i].tag);
    set_text(step, ".step_text", items[i].text);
  });
}

function apply_team_language() {
  const items = localized("team", team_data);
  document.querySelectorAll("#team_grid .team_member").forEach(function (member, i) {
    if (!items[i]) return;
    set_text(member, ".team_role", items[i].role);
    set_text(member, ".team_bio", items[i].bio);
    member.querySelectorAll(".team_skill").forEach(function (skill, j) {
      if (items[i].skills[j] != null) skill.textContent = items[i].skills[j];
    });
  });
}

function apply_faq_language() {
  const items = localized("faq", faq_data);
  document.querySelectorAll("#faq_list .faq_item").forEach(function (item, i) {
    if (!items[i]) return;
    set_text(item, ".faq_question_text", items[i].question);
    set_text(item, ".faq_answer p", items[i].answer);
  });
}

function apply_projects_language() {
  const is_en = window.i18n && window.i18n.lang === "en";
  const items = localized("projects", projects_data);

  document.querySelectorAll("#projects_card_swap [data-card-index]").forEach(function (card) {
    const p = items[Number(card.dataset.cardIndex)];
    if (!p) return;
    set_text(card, ".card-swap-name", p.name);
    set_text(card, ".card-swap-category", p.category);
    card.setAttribute("aria-label", (is_en ? "Open " : "Abrir ") + p.name);

    const img = card.querySelector("img");
    if (img) {
      img.alt = is_en
        ? "Preview of " + p.name + ", " + p.category
        : "Pré-visualização do " + p.name + " — " + p.category;
    }
    const cta = card.querySelector(".card-swap-cta");
    if (cta) cta.setAttribute("aria-label", (is_en ? "View " : "Ver ") + p.name);
  });

  document.querySelectorAll("#projects_swap_nav .projects_swap_nav_btn").forEach(function (btn) {
    const p = items[Number(btn.dataset.navIndex)];
    if (!p) return;
    set_text(btn, ".projects_swap_nav_number", p.number + "- " + p.name);
    btn.setAttribute("aria-label", (is_en ? "View " : "Ver ") + p.name);
  });
}

function apply_data_language() {
  apply_services_language();
  apply_process_language();
  apply_team_language();
  apply_faq_language();
  apply_projects_language();

  const menu = document.getElementById("menu_toggle");
  if (menu) {
    menu.setAttribute("aria-label", menu_label(menu.getAttribute("aria-expanded") === "true"));
  }
}

// Registrado já no carregamento: o i18n.js avisa aqui a cada troca de idioma.
if (window.i18n) {
  window.i18n.on_change(apply_data_language);
}

/* ----------  8. Inicialização  ---------- */

function init() {
  render_services();
  render_projects();
  render_process();
  render_team();
  render_faq();

  setup_mobile_menu();
  setup_header_scroll();

  // Se o visitante já tinha escolhido inglês, traduz o conteúdo recém-renderizado.
  apply_data_language();

  // Reveal precisa rodar depois da renderização dos componentes,
  // pois os cards são criados dinamicamente com [data-reveal].
  setup_scroll_reveal();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
