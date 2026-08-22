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
    name: "Projeto 01",
    category: "Site Institucional",
    description: "Presença digital de uma marca do início ao fim.",
    image: "assets/images/project_01.png",
    technologies: ["React", "Next.js", "Tailwind CSS"],
    link: "#contact",
  },
  {
    number: "02",
    name: "Projeto 02",
    category: "Sistema Personalizado",
    description: "Plataforma sob medida para um fluxo de trabalho específico.",
    image: "assets/images/project_02.png",
    technologies: ["Node.js", "PostgreSQL", "API REST"],
    link: "#contact",
  },
  {
    number: "03",
    name: "Projeto 03",
    category: "Landing Page",
    description: "Página de alta conversão para lançamento de produto.",
    image: "assets/images/project_03.png",
    technologies: ["HTML", "CSS", "JavaScript"],
    link: "#contact",
  },
  {
    number: "04",
    name: "Projeto 04",
    category: "Integração & Automação",
    description: "Automação de processos entre ferramentas do cliente.",
    image: "assets/images/project_04.png",
    technologies: ["Webhooks", "Zapier", "API"],
    link: "#contact",
  },
];

const why_data = [
  {
    title: "Atendimento próximo",
    text: "Relação direta e personalizada com cada cliente. Sem intermediários, sem respostas genéricas. Você fala com quem desenvolve.",
  },
  {
    title: "Soluções sob medida",
    text: "Cada projeto é pensado para uma realidade específica. Não aplicamos templates prontos quando o problema exige uma solução própria.",
  },
  {
    title: "Tecnologias modernas",
    text: "Ferramentas atuais para produtos de qualidade. Escolhemos o que faz sentido para cada projeto, não o que está na moda.",
  },
  {
    title: "Compromisso com qualidade",
    text: "Cuidado em cada etapa, do código à entrega. Não entregamos algo que não usaríamos nós mesmos.",
  },
  {
    title: "Evolução constante",
    text: "Estudo contínuo e melhoria a cada projeto. O que entregamos hoje é melhor do que o que entregamos ontem.",
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

const vision_data = [
  "Crescer como empresa de tecnologia",
  "Criar soluções cada vez mais completas",
  "Ajudar mais empresas através da tecnologia",
  "Construir uma marca reconhecida pela qualidade",
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
  const list = document.getElementById("projects_list");
  if (!list) return;

  list.innerHTML = projects_data
    .map(function (project, index) {
      return (
        '<li class="project_item reveal' + (index === 0 ? " is_active" : "") + '"' +
        ' data-reveal data-index="' + index + '" tabindex="0" role="button"' +
        ' aria-label="Ver ' + project.name + '">' +
        '<span class="project_number">' + project.number + "</span>" +
        '<span class="project_name">' + project.name + "</span>" +
        '<span class="project_category">' + project.category + "</span>" +
        '<span class="project_arrow">' + arrow_icon + "</span>" +
        "</li>"
      );
    })
    .join("");

  update_project_preview(0);

  const items = list.querySelectorAll(".project_item");
  items.forEach(function (item) {
    const index = Number(item.dataset.index);
    item.addEventListener("mouseenter", function () {
      set_active_project(items, index);
    });
    item.addEventListener("focus", function () {
      set_active_project(items, index);
    });
    item.addEventListener("click", function () {
      set_active_project(items, index);
    });
    item.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        set_active_project(items, index);
      }
    });
  });
}

function set_active_project(items, index) {
  items.forEach(function (el) {
    el.classList.remove("is_active");
  });
  items[index].classList.add("is_active");
  update_project_preview(index);
}

function update_project_preview(index) {
  const project = projects_data[index];
  const image = document.getElementById("project_preview_image");
  const name = document.getElementById("project_preview_name");
  const tags = document.getElementById("project_preview_tags");
  if (!project || !image) return;

  image.src = project.image;
  image.alt = "Pré-visualização do " + project.name + " — " + project.category;
  name.textContent = project.name;
  tags.innerHTML = project.technologies
    .map(function (tech) {
      return '<span class="project_tag">' + tech + "</span>";
    })
    .join("");
}

function render_why() {
  const list = document.getElementById("why_list");
  if (!list) return;

  list.innerHTML = why_data
    .map(function (item, index) {
      const number = String(index + 1).padStart(2, "0");
      return (
        '<li class="why_item reveal" data-reveal>' +
        '<span class="why_number">' + number + "</span>" +
        "<div>" +
        '<h3 class="why_title">' + item.title + "</h3>" +
        '<p class="why_text">' + item.text + "</p>" +
        "</div></li>"
      );
    })
    .join("");
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

function render_vision() {
  const list = document.getElementById("vision_list");
  if (!list) return;

  list.innerHTML = vision_data
    .map(function (text, index) {
      const number = String(index + 1).padStart(2, "0");
      return (
        '<li class="vision_item reveal" data-reveal>' +
        '<span class="vision_number">' + number + "</span>" +
        '<span class="vision_text">' + text + "</span>" +
        "</li>"
      );
    })
    .join("");
}

/* ----------  4. Menu mobile  ---------- */

function setup_mobile_menu() {
  const toggle = document.getElementById("menu_toggle");
  const nav = document.getElementById("main_nav");
  if (!toggle || !nav) return;

  function close_menu() {
    nav.classList.remove("is_open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu");
    document.body.classList.remove("menu_open");
  }

  toggle.addEventListener("click", function () {
    const is_open = nav.classList.toggle("is_open");
    toggle.setAttribute("aria-expanded", String(is_open));
    toggle.setAttribute("aria-label", is_open ? "Fechar menu" : "Abrir menu");
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

/* ----------  7. Inicialização  ---------- */

function init() {
  render_services();
  render_projects();
  render_why();
  render_process();
  render_team();
  render_vision();

  setup_mobile_menu();
  setup_header_scroll();

  // Reveal precisa rodar depois da renderização dos componentes,
  // pois os cards são criados dinamicamente com [data-reveal].
  setup_scroll_reveal();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
