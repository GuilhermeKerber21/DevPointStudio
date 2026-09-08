/* =====================================================
   DEV POINT STUDIO — ripple-grid-init.js
   Inicializa o RippleGrid como fundo do hero. Carregado
   como <script type="module">, então roda depois do
   parsing do HTML sem precisar de DOMContentLoaded.
   ===================================================== */

import { createRippleGrid } from "./ripple-grid.js";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const mount = document.getElementById("hero_ripple_grid");

if (mount && !prefersReducedMotion) {
  createRippleGrid(mount, {
    enableRainbow: false,
    gridColor: "#9b031d",
    rippleIntensity: 0.05,
    gridSize: 10,
    gridThickness: 15,
    mouseInteraction: true,
    mouseInteractionRadius: 0.8,
    opacity: 1,
    fadeDistance: 1.5,
    vignetteStrength: 2,
    glowIntensity: 0.1,
    gridRotation: 0,
  });
}
