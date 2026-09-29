/* =====================================================
   DEV POINT STUDIO — i18n.js
   Alternância de idioma (Português <-> Inglês).

   Como funciona:
   - O português é o texto que já está no HTML e nos
     arrays de js/script.js. Ele é lido do próprio DOM na
     primeira execução, então NÃO precisa ser duplicado aqui.
   - Este arquivo guarda só as traduções em inglês.
   - Elementos com data-i18n="chave" trocam o texto.
   - Elementos com data-i18n-html="chave" trocam o HTML
     (usado onde há <br> ou <span> dentro do texto).
   - data-i18n-attr="atributo:chave;outro:chave" traduz
     atributos (aria-label, title, alt).
   - A escolha fica salva no localStorage.

   Para editar um texto em inglês, mude o valor em
   `en_static` (textos fixos) ou em `en_data` (listas de
   serviços, processo, equipe, visão e projetos).
   ===================================================== */

(function () {
  "use strict";

  var storage_key = "devpoint_lang";
  var supported = ["pt", "en"];

  /* ----------  Traduções: textos fixos do HTML  ---------- */
  var en_static = {
    meta_title: "Dev Point Studio | We turn ideas into digital solutions",
    meta_description:
      "Dev Point Studio is a software studio in Brazil. We build websites, custom systems and digital solutions that turn ideas into concrete results.",
    meta_og_description:
      "Website development, custom systems and digital solutions that turn ideas into results.",

    skip_link: "Skip to content",
    brand_label: "Dev Point Studio, home",
    nav_label: "Main navigation",
    nav_services: "Services",
    nav_projects: "Projects",
    nav_process: "Process",
    nav_about: "About",
    nav_faq: "FAQ",
    cta_start: "Start a project",
    menu_open: "Open menu",
    menu_close: "Close menu",

    hero_lead: "We turn ideas into digital solutions.",
    hero_text:
      "Website development, custom systems and digital solutions that turn ideas into concrete results.",
    hero_see_projects: "See projects",

    services_title: "Digital solutions<br />designed for every<br />need.",
    services_desc:
      "From simple to complex, every project gets attention and care from start to finish.",

    about_ghost: "TECHNOLOGY",
    about_kicker: "> About Dev Point",
    about_title:
      'Technology is not just code. <span class="muted_text">It is a tool to solve problems.</span>',
    about_paragraph:
      "Dev Point is a technology company that helps businesses grow through customized digital solutions. Small enough to be close. Technical enough to deliver.",
    pillar_1_title: "Technology",
    pillar_1_text:
      "Modern tools applied with judgment. Every technical decision has a purpose.",
    pillar_2_title: "Creativity",
    pillar_2_text:
      "Design and code working together to create experiences that stay in memory.",
    pillar_3_title: "Problem solving",
    pillar_3_text:
      "We understand the problem before proposing any solution. Technology serving the business.",

    projects_kicker: "> Projects",
    projects_title: "Projects that went from<br />idea to reality.",
    projects_nav_label: "Select featured project",
    projects_stage_label: "Featured projects",

    process_kicker: "> Process",
    process_title: "From idea to product.",

    team_title: "Behind Dev Point.",

    faq_kicker: "> Frequently asked questions",
    faq_title:
      'Questions? <span class="accent_gradient">We have answers.</span>',

    contact_kicker: "> Next step",
    contact_title:
      'Got an idea?<br /><span class="accent_gradient">Let\'s bring it to life.</span>',
    contact_desc: "Tell us what you need. We will figure out the next step.",
    contact_send_email: "Send an email",

    footer_tagline: "We turn ideas into digital solutions.",
    footer_nav_label: "Footer",
    footer_email_label: "Send an email",
    footer_email_title: "Email",
    footer_whatsapp_label: "Chat on WhatsApp",
    footer_whatsapp_title: "WhatsApp",
    footer_instagram_label: "Dev Point Studio on Instagram",
    footer_linkedin_label: "Dev Point Studio on LinkedIn",
    footer_rights: "© 2026 Dev Point Studio. All rights reserved.",
    footer_built_by: "Website developed by",

    lang_toggle_to_en: "Switch language to English",
    lang_toggle_to_pt: "Change language to Portuguese",
  };

  /* Textos do botão de idioma quando o site está em português. */
  var pt_extra = {
    lang_toggle_to_en: "Mudar idioma para inglês",
    lang_toggle_to_pt: "Mudar idioma para português",
    menu_open: "Abrir menu",
    menu_close: "Fechar menu",
    projects_nav_label: "Selecionar projeto em destaque",
    projects_stage_label: "Projetos em destaque",
  };

  /* ----------  Traduções: dados dinâmicos (mesma ordem do script.js)  ---------- */
  var en_data = {
    services: [
      {
        title: "Corporate Websites",
        text: "Professional, responsive online presence. Your business represented with quality on the web.",
      },
      {
        title: "Landing Pages",
        text: "Conversion-focused pages. Every element designed to turn visitors into customers.",
      },
      {
        title: "Custom Systems",
        text: "Web platforms tailored to the specific reality of your business.",
      },
      {
        title: "Integrations and Automations",
        text: "Connecting tools and automating processes. Less manual work, more efficiency.",
      },
      {
        title: "Databases",
        text: "Structuring and organizing data with security and performance.",
      },
      {
        title: "Tailor-Made Solutions",
        text: "Technology designed for each challenge. If it does not exist, we build it.",
      },
    ],
    projects: [
      {
        name: "Business Hub",
        category: "Financial Services",
        description:
          "Connects clients to financial and business solutions on a single platform.",
      },
      {
        name: "Football Tourism Institute",
        category: "Corporate Website",
        description:
          "Landing page built for a football research institute in the US, presenting the ideas and projects of the institution run by my clients.",
      },
      {
        name: "Jonathan R. Oliveira Portfolio",
        category: "Landing Page",
        description:
          "This website was built to present the research and work of my client, Jonathan, related to football.",
      },
    ],
    process: [
      {
        name: "Understanding",
        tag: "Of the client's need.",
        text: "We talk in depth about the business, goals and challenges. We only start planning once we truly understand the problem.",
      },
      {
        name: "Planning",
        tag: "Of the ideal solution.",
        text: "We define scope, technologies, timeline and stages. We document everything so the project is predictable and transparent.",
      },
      {
        name: "Development",
        tag: "Building the project.",
        text: "Clean, structured, scalable code. Regular updates so the client can follow the progress.",
      },
      {
        name: "Testing and Adjustments",
        tag: "Quality and refinement.",
        text: "Technical and functional validation across multiple devices. Fine adjustments until the result is exactly as expected.",
      },
      {
        name: "Delivery and Support",
        tag: "From launch onward.",
        text: "Guided final delivery and ongoing support. We stay close to make sure everything works in the long run.",
      },
    ],
    team: [
      {
        role: "Development & Project Manager",
        bio: "Responsible for development, project structure, programming and digital solutions. Makes sure every line of code serves the purpose of the business.",
        skills: ["Full-Stack", "Management", "Architecture"],
      },
      {
        role: "Development & Marketing",
        bio: "Responsible for developing projects and digital solutions, and for promoting the company through social media. Combines technique and communication.",
        skills: ["Front-End", "Digital Marketing", "Social Media"],
      },
    ],
    faq: [
      {
        question: "What services does Dev Point offer?",
        answer: "We develop corporate websites, landing pages, custom systems, integrations and automations, databases and other tailor-made solutions for each business.",
      },
      {
        question: "How much does a project cost?",
        answer: "The price depends on the type of project, features and level of customization. We discuss your needs and prepare a proposal based on what actually makes sense for your business.",
      },
      {
        question: "How long does a project take to develop?",
        answer: "The timeline varies according to the scope and complexity. After understanding the project, we define an estimated delivery date and the main development stages.",
      },
      {
        question: "Does Dev Point work with small businesses?",
        answer: "Yes. We work with companies and small businesses that need a more professional digital presence, more efficient processes or a solution created specifically for their reality.",
      },
      {
        question: "Do you provide maintenance after delivery?",
        answer: "Yes. We can continue supporting the project after delivery with adjustments, improvements, updates and ongoing support as needed.",
      },
      {
        question: "How can I start a project with Dev Point?",
        answer: "Just contact us by email or WhatsApp. Tell us a little about what you need and we will discuss the best solution and the next steps.",
      },
    ],
  };

  /* ----------  Estado  ---------- */
  var current = "pt";
  var listeners = [];
  var pt_cache = new WeakMap(); // elemento -> { text, html, attrs }
  var pt_meta = {};

  function read_saved() {
    try {
      var saved = window.localStorage.getItem(storage_key);
      if (supported.indexOf(saved) !== -1) return saved;
    } catch (e) {
      /* localStorage indisponível (modo privado etc.): segue em português */
    }
    return "pt";
  }

  function save(lang) {
    try {
      window.localStorage.setItem(storage_key, lang);
    } catch (e) {
      /* sem persistência, mas a troca continua funcionando */
    }
  }

  /* Texto fixo na língua atual. Português vem do cache do DOM. */
  function t(key) {
    if (current === "en") return en_static[key];
    return pt_extra[key];
  }

  /* Devolve os itens de uma lista já na língua atual.
     Em português, devolve o array original sem alterações. */
  function localize(section, items) {
    if (current !== "en") return items;
    var extra = en_data[section] || [];
    return items.map(function (item, index) {
      var translated = extra[index];
      if (typeof item === "string") return translated != null ? translated : item;
      return Object.assign({}, item, translated || {});
    });
  }

  /* ----------  Aplicação no DOM  ---------- */
  function cache_pt(el) {
    if (pt_cache.has(el)) return pt_cache.get(el);
    var entry = { text: el.textContent, html: el.innerHTML, attrs: {} };
    var spec = el.getAttribute("data-i18n-attr");
    if (spec) {
      spec.split(";").forEach(function (pair) {
        var name = pair.split(":")[0].trim();
        if (name) entry.attrs[name] = el.getAttribute(name);
      });
    }
    pt_cache.set(el, entry);
    return entry;
  }

  function apply_static() {
    var is_en = current === "en";

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var pt = cache_pt(el);
      var key = el.getAttribute("data-i18n");
      el.textContent = is_en && en_static[key] != null ? en_static[key] : pt.text;
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var pt = cache_pt(el);
      var key = el.getAttribute("data-i18n-html");
      el.innerHTML = is_en && en_static[key] != null ? en_static[key] : pt.html;
    });

    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      var pt = cache_pt(el);
      el.getAttribute("data-i18n-attr")
        .split(";")
        .forEach(function (pair) {
          var parts = pair.split(":");
          var name = (parts[0] || "").trim();
          var key = (parts[1] || "").trim();
          if (!name || !key) return;
          var value = is_en && en_static[key] != null ? en_static[key] : pt.attrs[name];
          if (value != null) el.setAttribute(name, value);
        });
    });
  }

  function set_meta(selector, attr, value) {
    var el = document.querySelector(selector);
    if (el && value != null) el.setAttribute(attr, value);
  }

  function apply_meta() {
    var is_en = current === "en";

    if (!pt_meta.captured) {
      pt_meta.title = document.title;
      pt_meta.description = (document.querySelector('meta[name="description"]') || {}).content;
      pt_meta.og_title = (document.querySelector('meta[property="og:title"]') || {}).content;
      pt_meta.og_description = (document.querySelector('meta[property="og:description"]') || {}).content;
      pt_meta.captured = true;
    }

    document.documentElement.lang = is_en ? "en" : "pt-BR";
    document.title = is_en ? en_static.meta_title : pt_meta.title;
    set_meta('meta[name="description"]', "content", is_en ? en_static.meta_description : pt_meta.description);
    set_meta('meta[property="og:title"]', "content", is_en ? en_static.meta_title : pt_meta.og_title);
    set_meta('meta[property="og:description"]', "content", is_en ? en_static.meta_og_description : pt_meta.og_description);
    set_meta('meta[property="og:locale"]', "content", is_en ? "en_US" : "pt_BR");
  }

  function apply_toggle() {
    var toggle = document.getElementById("lang_toggle");
    if (!toggle) return;
    var is_en = current === "en";
    toggle.classList.toggle("is_en", is_en);
    toggle.setAttribute("aria-checked", String(is_en));
    var label = is_en ? t("lang_toggle_to_pt") : t("lang_toggle_to_en");
    toggle.setAttribute("aria-label", label);
    toggle.setAttribute("title", label);
  }

  function apply_all() {
    apply_static();
    apply_meta();
    apply_toggle();
    listeners.forEach(function (fn) {
      fn(current);
    });
  }

  function set(lang) {
    if (supported.indexOf(lang) === -1 || lang === current) return;
    current = lang;
    save(lang);
    apply_all();
  }

  function on_change(fn) {
    listeners.push(fn);
  }

  /* ----------  API pública  ---------- */
  current = read_saved();

  window.i18n = {
    get lang() {
      return current;
    },
    t: t,
    localize: localize,
    set: set,
    toggle: function () {
      set(current === "en" ? "pt" : "en");
    },
    on_change: on_change,
    apply: apply_all,
  };

  /* ----------  Inicialização  ---------- */
  function init() {
    var toggle = document.getElementById("lang_toggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        window.i18n.toggle();
      });
    }
    // Aplica o idioma salvo. Em português isso só garante o estado do botão.
    apply_all();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
