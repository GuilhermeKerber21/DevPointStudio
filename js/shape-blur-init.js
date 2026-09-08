/* =====================================================
   DEV POINT STUDIO — shape-blur-init.js
   Inicializa o ShapeBlur no hero. Carregado como
   <script type="module">, então roda depois do parsing
   do HTML sem precisar de DOMContentLoaded.
   ===================================================== */

import { createShapeBlur } from "./shape-blur.js";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const mount = document.getElementById("hero_shape_blur");

if (mount && !prefersReducedMotion) {
  createShapeBlur(mount, {
    variation: 0,
    shapeSize: 1,
    roundness: 0.5,
    borderSize: 0.05,
    circleSize: 0.25,
    circleEdge: 1,
  });
}
