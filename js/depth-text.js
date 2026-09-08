/* =====================================================
   DEV POINT STUDIO — depth-text.js
   Versão vanilla (sem React) do componente DepthText
   (React Bits).
   ===================================================== */

const MAX_LAYERS = 64;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

function getLayerColor(faceColor, depthColor, index, total) {
  const progress = total <= 1 ? 1 : index / total;
  const eased = progress * progress;
  const faceMix = Math.round((1 - eased) * 72 + 4);
  return `color-mix(in srgb, ${faceColor} ${faceMix}%, ${depthColor})`;
}

function getTransform(rotateX, rotateY) {
  return `rotateX(${rotateX.toFixed(3)}deg) rotateY(${rotateY.toFixed(3)}deg)`;
}

function resolveConfig(root, options) {
  const config = {
    text: root.textContent.trim(),
    layers: 34,
    depth: 2.4,
    faceColor: "#f8fafc",
    depthColor: "#7c3aed",
    tilt: 7.5,
    pointerTracking: true,
    smoothing: 0.14,
    perspective: 900,
    autoOrbit: true,
    orbitSpeed: 0.35,
    fontSize: "clamp(3rem, 12vw, 7rem)",
    fontWeight: 900,
    shadow: true,
    ...options,
  };

  config.safeLayers = clamp(Math.round(Number(config.layers) || 1), 2, MAX_LAYERS);
  config.safeDepth = clamp(Number(config.depth) || 0, 0, 12);
  config.safeTilt = clamp(Number(config.tilt) || 0, 0, 12);
  config.safeSmoothing = clamp(Number(config.smoothing) || 0.14, 0.02, 0.35);
  config.safePerspective = clamp(Number(config.perspective) || 900, 300, 2000);
  config.safeOrbitSpeed = clamp(Number(config.orbitSpeed) || 0, 0, 2);

  return config;
}

// Monta o DOM (camadas + face) de um item, sem iniciar nenhuma animação.
function buildDOM(root, config) {
  root.textContent = "";
  root.classList.add("depth-text");

  root.style.setProperty("--depth-text-perspective", `${config.safePerspective}px`);
  root.style.setProperty("--depth-text-font-size", config.fontSize);
  root.style.setProperty("--depth-text-font-weight", config.fontWeight);
  root.style.setProperty("--depth-text-face-color", config.faceColor);
  root.style.setProperty("--depth-text-depth-color", config.depthColor);
  root.style.setProperty(
    "--depth-text-shadow",
    config.shadow
      ? `0 22px 34px color-mix(in srgb, ${config.depthColor} 36%, transparent), 0 4px 8px rgba(0, 0, 0, 0.28)`
      : "none"
  );

  const stage = document.createElement("span");
  stage.className = "depth-text__stage";

  for (let layerIndex = 0; layerIndex < config.safeLayers; layerIndex++) {
    const index = config.safeLayers - layerIndex;
    const layer = document.createElement("span");
    layer.className = "depth-text__layer";
    layer.setAttribute("aria-hidden", "true");
    layer.style.color = getLayerColor(config.faceColor, config.depthColor, index, config.safeLayers);
    layer.style.transform = `translateZ(${-index * config.safeDepth}px)`;
    layer.textContent = config.text;
    stage.appendChild(layer);
  }

  const face = document.createElement("span");
  face.className = "depth-text__face";
  face.textContent = config.text;
  stage.appendChild(face);

  root.appendChild(stage);

  return stage;
}

/**
 * Transforma UM elemento em texto com efeito de profundidade 3D,
 * com sua própria física de rotação (uso avulso, uma linha só).
 *
 * @param {HTMLElement} root
 * @param {Object} [options]
 * @returns {{ destroy: () => void }}
 */
export function createDepthText(root, options = {}) {
  if (!root) {
    throw new Error("createDepthText: elemento 'root' não encontrado.");
  }
  return createDepthTextGroup([{ root, options }], { trackingRoot: root });
}

/**
 * Transforma vários elementos em texto com efeito de profundidade 3D,
 * todos compartilhando a MESMA física de rotação (um único loop, uma
 * única leitura de posição do mouse) — para que, por exemplo, duas
 * linhas de um título se movam sempre juntas, como um bloco só.
 *
 * @param {Array<{root: HTMLElement, options?: object}>} items
 * @param {Object} [groupOptions]
 * @param {HTMLElement} [groupOptions.trackingRoot] - elemento usado como referência para calcular a posição do mouse (padrão: o elemento pai comum dos itens)
 * @returns {{ destroy: () => void }}
 */
export function createDepthTextGroup(items, groupOptions = {}) {
  if (!items || !items.length) {
    throw new Error("createDepthTextGroup: nenhum item fornecido.");
  }

  const entries = items.map(({ root, options = {} }) => {
    const config = resolveConfig(root, options);
    const stage = buildDOM(root, config);
    return { root, config, stage };
  });

  // Física compartilhada: usa as configurações (tilt, smoothing, orbit...)
  // do primeiro item como referência única para todo o grupo.
  const shared = entries[0].config;
  const trackingRoot = groupOptions.trackingRoot || entries[0].root.parentElement || entries[0].root;

  const baseRotation = { x: -shared.safeTilt * 0.32, y: shared.safeTilt * 0.42 };

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const canTrackPointer = shared.pointerTracking && finePointer && !reducedMotion;

  if (reducedMotion) {
    const staticTransform = getTransform(baseRotation.x, baseRotation.y);
    entries.forEach(({ stage }) => {
      stage.style.transform = staticTransform;
    });
    return { destroy() {} };
  }

  let frameId = 0;
  let activePointer = false;
  let startTime = performance.now();
  const current = { ...baseRotation };
  const target = { ...baseRotation };

  const applyTransform = () => {
    const transform = getTransform(current.x, current.y);
    entries.forEach(({ stage }) => {
      stage.style.transform = transform;
    });
  };

  const handlePointerMove = (event) => {
    const rect = trackingRoot.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    activePointer = true;
    const x = clamp((event.clientX - (rect.left + rect.width / 2)) / (rect.width * 0.8), -1, 1);
    const y = clamp((event.clientY - (rect.top + rect.height / 2)) / (rect.height * 0.8), -1, 1);

    target.x = baseRotation.x - y * shared.safeTilt;
    target.y = baseRotation.y + x * shared.safeTilt;
  };

  const handlePointerLeave = () => {
    activePointer = false;
    target.x = baseRotation.x;
    target.y = baseRotation.y;
  };

  if (canTrackPointer) {
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("blur", handlePointerLeave);
  }

  const tick = (now) => {
    if ((!canTrackPointer || !activePointer) && shared.autoOrbit) {
      const elapsed = (now - startTime) / 1000;
      const orbit = elapsed * shared.safeOrbitSpeed * Math.PI * 2;
      const fallbackAmount = canTrackPointer ? 0.18 : 0.55;
      target.x = baseRotation.x + Math.sin(orbit) * shared.safeTilt * fallbackAmount;
      target.y = baseRotation.y + Math.cos(orbit * 0.85) * shared.safeTilt * fallbackAmount;
    }

    current.x += (target.x - current.x) * shared.safeSmoothing;
    current.y += (target.y - current.y) * shared.safeSmoothing;
    applyTransform();
    frameId = requestAnimationFrame(tick);
  };

  applyTransform();
  frameId = requestAnimationFrame(tick);

  function destroy() {
    if (canTrackPointer) {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("blur", handlePointerLeave);
    }
    cancelAnimationFrame(frameId);
  }

  return { destroy };
}
