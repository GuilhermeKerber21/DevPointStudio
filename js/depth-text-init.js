/* =====================================================
   DEV POINT STUDIO — depth-text-init.js
   Aplica o efeito DepthText nas duas linhas do título
   do hero ("Dev Point" / "Studio"), com a MESMA física
   de rotação para as duas (createDepthTextGroup).
   ===================================================== */

import { createDepthTextGroup } from "./depth-text.js";

const sharedOptions = {
  layers: 34,
  depth: 2.4,
  faceColor: "#f8fafc",
  depthColor: "#ef0029",
  tilt: 7.5,
  pointerTracking: true,
  smoothing: 0.14,
  perspective: 900,
  autoOrbit: true,
  orbitSpeed: 0.35,
  fontSize: "clamp(3.5rem, 11vw, 8rem)",
  fontWeight: 800,
  shadow: true,
};

const line1 = document.getElementById("hero_depth_line_1");
const line2 = document.getElementById("hero_depth_line_2");
const heroTitle = document.querySelector(".hero_title");

if (line1 && line2) {
  createDepthTextGroup(
    [
      { root: line1, options: sharedOptions },
      { root: line2, options: sharedOptions },
    ],
    { trackingRoot: heroTitle || line1.parentElement }
  );
}
