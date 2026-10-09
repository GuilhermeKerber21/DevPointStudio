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
    firstName: "Ygor",
    lastName: "Silveira",
    photo:"assets/images/ygor.jpg",
    name: "Ygor Silveira",
    linkedin: "https://www.linkedin.com/in/ygorsoliveira/",
    role: "Desenvolvimento & Project Manager",
    bio: "Responsável pelo desenvolvimento, estrutura dos projetos, programação e soluções digitais. Garante que cada linha de código serve ao propósito do negócio.",
    skills: ["Full-Stack", "Gestão", "Arquitetura"],
  },
  {
    initials: "GK",
    firstName: "Guilherme",
    lastName: "Kerber",
    name: "Guilherme Severo Kerber",
    linkedin: "https://www.linkedin.com/in/guilherme-severo-kerber-552263389/",
    photo:"assets/images/guilherme.jpg",
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

// =========================
// PROCESSO — ETAPA ATIVA
// =========================

function setup_process_active() {
  const processSteps = document.querySelectorAll(".process_step");

  if (!processSteps.length) return;

  function updateActiveProcessStep() {
    const screenCenter = window.innerHeight / 2;

    let closestStep = null;
    let closestDistance = Infinity;

    processSteps.forEach(function (step) {
      const rect = step.getBoundingClientRect();
      const stepCenter = rect.top + rect.height / 2;
      const distance = Math.abs(screenCenter - stepCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestStep = step;
      }
    });

    processSteps.forEach(function (step) {
      step.classList.toggle("active", step === closestStep);
    });
  }

  window.addEventListener("scroll", updateActiveProcessStep);
  window.addEventListener("resize", updateActiveProcessStep);

  updateActiveProcessStep();
}

function render_team() {
  const grid = document.getElementById("team_grid");
  if (!grid) return;

  grid.innerHTML = team_data
    .map(function (member, index) {
      const skills = member.skills
        .map(function (skill) {
          return '<span class="team_skill">' + skill + "</span>";
        })
        .join("");
      return (
        '<article class="team_member reveal" data-reveal>' +
        '<div class="team_signature" aria-hidden="true"><span>DEV POINT STUDIO<br>DESENVOLVIMENTO WEB</span><span class="team_index">0' + (index + 1) + ' / 02</span></div>' +
        '<div class="team_avatar_wrap">' +
        (member.photo
          ? '<img class="team_avatar team_avatar_img" src="' + member.photo + '" alt="' + member.name + '" loading="lazy">'
          : '<span class="team_avatar">' + member.initials + "</span>") +
        "</div>" +
        '<div class="team_body">' +
        '<h3 class="team_name" aria-label="' + member.name + '"><span>' + member.firstName + '</span><span class="team_surname">' + member.lastName + '</span></h3>' +
        '<p class="team_role">' + member.role + "</p>" +
        '<p class="team_bio">' + member.bio + "</p>" +
        '<div class="team_skills">' + skills +
        '<a class="team_linkedin" href="' + member.linkedin + '" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn — ' + member.name + '"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96C2 21.32 2.69 22 3.55 22h16.9c.86 0 1.55-.68 1.55-1.52V3.52C22 2.68 21.31 2 20.45 2ZM7.93 18.75H4.98V9.2h2.95v9.55ZM6.45 7.9a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12.3 10.85H15.8v-4.64c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.72H9.51V9.2h2.83v1.3h.04c.39-.74 1.36-1.52 2.79-1.52 2.98 0 3.58 1.96 3.58 4.51v5.26Z"/></svg></a></div>' +
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
        '<h3 class="faq_heading"><button class="faq_question" id="faq_question_' + index + '" type="button" aria-expanded="' + is_open + '" aria-controls="faq_answer_' + index + '">' +
        '<span class="faq_question_number" aria-hidden="true">' + String(index + 1).padStart(2, "0") + '</span>' +
        '<span class="faq_question_text">' + item.question + '</span>' +
        '<span class="faq_toggle" aria-hidden="true"><span></span><span></span></span>' +
        '</button></h3>' +
        '<div class="faq_answer_wrap" role="region" aria-labelledby="faq_question_' + index + '" id="faq_answer_' + index + '"' + (is_open ? '' : ' hidden') + '>' +
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
        open_item.querySelector(".faq_answer_wrap").hidden = true;
      });

      if (!is_open) {
        item.classList.add("is_open");
        button.setAttribute("aria-expanded", "true");
        item.querySelector(".faq_answer_wrap").hidden = false;
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
  const header = document.getElementById("site_header");
  const breakpoint = window.matchMedia("(max-width: 720px)");
  if (!toggle || !nav) return;
  const background = [document.getElementById("main_content"), document.querySelector(".site_footer")];

  function close_menu(restoreFocus = false) {
    nav.classList.remove("is_open");
    nav.inert = breakpoint.matches;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", menu_label(false));
    document.body.classList.remove("menu_open");
    background.forEach(element => { if (element) element.inert = false; });
    if (restoreFocus) toggle.focus();
  }
  close_menu();
  toggle.addEventListener("click", function () {
    if (nav.classList.contains("is_open")) { close_menu(true); return; }
    nav.inert = false;
    nav.classList.add("is_open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", menu_label(true));
    document.body.classList.add("menu_open");
    background.forEach(element => { if (element) element.inert = true; });
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (nav.classList.contains("is_open")) nav.querySelector("a").focus();
    }));
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => close_menu(true)));
  header.querySelector('.brand').addEventListener('click', () => close_menu());
  document.addEventListener("keydown", function (event) {
    if (!nav.classList.contains("is_open")) return;
    if (event.key === "Escape") { close_menu(true); return; }
    if (event.key !== "Tab") return;
    const controls = Array.from(header.querySelectorAll('a[href], button:not([disabled])')).filter(el => el.getClientRects().length && !el.closest('[inert]'));
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  breakpoint.addEventListener("change", function () { close_menu(); });
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
    card.setAttribute("aria-label", p.name);

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
    set_text(btn, ".projects_swap_nav_number", p.number);
    set_text(btn, ".projects_swap_nav_name", p.name);
    set_text(btn, ".projects_swap_nav_category", p.category);
    btn.removeAttribute("aria-label");
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

// BorderGlow compartilhado pelos pilares e cards de serviços.
function setup_border_glow() {
  document.querySelectorAll(".about_pillar, .service_card").forEach(function (card) {
    if (card.classList.contains("border-glow-card")) return;
    card.classList.add("border-glow-card");
    const light = document.createElement("span");
    light.className = "edge-light";
    light.setAttribute("aria-hidden", "true");
    card.prepend(light);

    card.addEventListener("pointermove", function (event) {
      if (event.pointerType === "touch") return;
      const rect = card.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      if (!cx || !cy) return;
      const dx = event.clientX - rect.left - cx;
      const dy = event.clientY - rect.top - cy;
      const edge = Math.min(Math.max(Math.abs(dx) / cx, Math.abs(dy) / cy), 1);
      const angle = (Math.atan2(dy, dx) * 180 / Math.PI + 450) % 360;
      card.style.setProperty("--edge-proximity", (edge * 100).toFixed(3));
      card.style.setProperty("--cursor-angle", angle.toFixed(3) + "deg");
    });

    card.addEventListener("pointerleave", function () {
      card.style.setProperty("--edge-proximity", "0");
    });
    card.addEventListener("pointercancel", function () {
      card.style.setProperty("--edge-proximity", "0");
    });
  });
}

function init() {
  render_services();
  render_projects();
  render_process();
  setup_process_active();
  render_team();
  render_faq();

  setup_mobile_menu();
  setup_header_scroll();
  setup_border_glow();

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
