/* =====================================================
   DEV POINT STUDIO — ripple-grid.js
   Versão vanilla (sem React) do componente RippleGrid
   (React Bits), usando ogl via ES module + import map.
   ===================================================== */

import { Renderer, Program, Triangle, Mesh } from "ogl";

const vert = `
attribute vec2 position;
varying vec2 vUv;
void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
}`;

const frag = `precision highp float;
uniform float iTime;
uniform vec2 iResolution;
uniform bool enableRainbow;
uniform vec3 gridColor;
uniform float rippleIntensity;
uniform float gridSize;
uniform float gridThickness;
uniform float fadeDistance;
uniform float vignetteStrength;
uniform float glowIntensity;
uniform float opacity;
uniform float gridRotation;
uniform bool mouseInteraction;
uniform vec2 mousePosition;
uniform float mouseInfluence;
uniform float mouseInteractionRadius;
uniform bool lightMode;
varying vec2 vUv;

float pi = 3.141592;

mat2 rotate(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
}

void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;

    if (gridRotation != 0.0) {
        uv = rotate(gridRotation * pi / 180.0) * uv;
    }

    float dist = length(uv);
    float func = sin(pi * (iTime - dist));
    vec2 rippleUv = uv + uv * func * rippleIntensity;

    if (mouseInteraction && mouseInfluence > 0.0) {
        vec2 mouseUv = (mousePosition * 2.0 - 1.0);
        mouseUv.x *= iResolution.x / iResolution.y;
        float mouseDist = length(uv - mouseUv);

        float influence = mouseInfluence * exp(-mouseDist * mouseDist / (mouseInteractionRadius * mouseInteractionRadius));

        float mouseWave = sin(pi * (iTime * 2.0 - mouseDist * 3.0)) * influence;
        rippleUv += normalize(uv - mouseUv) * mouseWave * rippleIntensity * 0.3;
    }

    vec2 a = sin(gridSize * 0.5 * pi * rippleUv - pi / 2.0);
    vec2 b = abs(a);

    float aaWidth = 0.5;
    vec2 smoothB = vec2(
        smoothstep(0.0, aaWidth, b.x),
        smoothstep(0.0, aaWidth, b.y)
    );

    vec3 color = vec3(0.0);
    color += exp(-gridThickness * smoothB.x * (0.8 + 0.5 * sin(pi * iTime)));
    color += exp(-gridThickness * smoothB.y);
    color += 0.5 * exp(-(gridThickness / 4.0) * sin(smoothB.x));
    color += 0.5 * exp(-(gridThickness / 3.0) * smoothB.y);

    if (glowIntensity > 0.0) {
        color += glowIntensity * exp(-gridThickness * 0.5 * smoothB.x);
        color += glowIntensity * exp(-gridThickness * 0.5 * smoothB.y);
    }

    float ddd = exp(-2.0 * clamp(pow(dist, fadeDistance), 0.0, 1.0));

    vec2 vignetteCoords = vUv - 0.5;
    float vignetteDistance = length(vignetteCoords);
    float vignette = 1.0 - pow(vignetteDistance * 2.0, vignetteStrength);
    vignette = clamp(vignette, 0.0, 1.0);

    vec3 t;
    if (enableRainbow) {
        t = vec3(
            uv.x * 0.5 + 0.5 * sin(iTime),
            uv.y * 0.5 + 0.5 * cos(iTime),
            pow(cos(iTime), 4.0)
        ) + 0.5;
    } else {
        t = gridColor;
    }

    float finalFade = ddd * vignette;
    float alpha = length(color) * finalFade * opacity;
    vec3 effect = color * t * finalFade * opacity;
    if (lightMode) {
        float peak = max(effect.r, max(effect.g, effect.b));
        vec3 chroma = pow(clamp(effect / max(peak, 0.0001), 0.0, 1.0), vec3(1.2));
        gl_FragColor = vec4(mix(vec3(1.0), chroma, clamp(alpha * 0.94, 0.0, 0.94)), 1.0);
    } else {
        gl_FragColor = vec4(effect, alpha);
    }
}`;

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255]
    : [1, 1, 1];
}

/**
 * Cria uma instância do efeito RippleGrid dentro de um elemento container.
 *
 * @param {HTMLElement} mount - elemento que vai receber o canvas (precisa ter position relative/absolute + tamanho definido via CSS)
 * @param {Object} [options]
 * @returns {{ destroy: () => void, setOptions: (opts: object) => void }}
 */
export function createRippleGrid(mount, options = {}) {
  if (!mount) {
    throw new Error("createRippleGrid: elemento 'mount' não encontrado.");
  }

  const config = {
    enableRainbow: false,
    gridColor: "#ffffff",
    rippleIntensity: 0.05,
    gridSize: 10.0,
    gridThickness: 15.0,
    fadeDistance: 1.5,
    vignetteStrength: 2.0,
    glowIntensity: 0.1,
    opacity: 1.0,
    gridRotation: 0,
    mouseInteraction: true,
    mouseInteractionRadius: 1,
    lightMode: false,
    ...options,
  };

  const mousePosition = { x: 0.5, y: 0.5 };
  const targetMouse = { x: 0.5, y: 0.5 };
  let mouseInfluenceTarget = 0;

  const renderer = new Renderer({
    dpr: Math.min(window.devicePixelRatio, 2),
    alpha: true,
  });
  const gl = renderer.gl;
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.canvas.style.width = "100%";
  gl.canvas.style.height = "100%";
  mount.appendChild(gl.canvas);

  const uniforms = {
    iTime: { value: 0 },
    iResolution: { value: [1, 1] },
    enableRainbow: { value: config.enableRainbow },
    gridColor: { value: hexToRgb(config.gridColor) },
    rippleIntensity: { value: config.rippleIntensity },
    gridSize: { value: config.gridSize },
    gridThickness: { value: config.gridThickness },
    fadeDistance: { value: config.fadeDistance },
    vignetteStrength: { value: config.vignetteStrength },
    glowIntensity: { value: config.glowIntensity },
    opacity: { value: config.opacity },
    gridRotation: { value: config.gridRotation },
    mouseInteraction: { value: config.mouseInteraction },
    mousePosition: { value: [0.5, 0.5] },
    mouseInfluence: { value: 0 },
    mouseInteractionRadius: { value: config.mouseInteractionRadius },
    lightMode: { value: config.lightMode },
  };

  const geometry = new Triangle(gl);
  const program = new Program(gl, { vertex: vert, fragment: frag, uniforms });
  const mesh = new Mesh(gl, { geometry, program });

  const resize = () => {
    const w = mount.clientWidth || 1;
    const h = mount.clientHeight || 1;
    renderer.setSize(w, h);
    uniforms.iResolution.value = [w, h];
  };

  const handleMouseMove = (e) => {
    if (!config.mouseInteraction) return;
    const rect = mount.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = 1.0 - (e.clientY - rect.top) / rect.height;
    targetMouse.x = x;
    targetMouse.y = y;
  };

  const handleMouseEnter = () => {
    if (!config.mouseInteraction) return;
    mouseInfluenceTarget = 1.0;
  };

  const handleMouseLeave = () => {
    if (!config.mouseInteraction) return;
    mouseInfluenceTarget = 0.0;
  };

  window.addEventListener("resize", resize);
  if (config.mouseInteraction) {
    mount.addEventListener("mousemove", handleMouseMove);
    mount.addEventListener("mouseenter", handleMouseEnter);
    mount.addEventListener("mouseleave", handleMouseLeave);
  }
  resize();

  const ro = new ResizeObserver(() => resize());
  ro.observe(mount);

  let active = true;
  let animationFrameId;
  const render = (t) => {
    if (!active) return;
    uniforms.iTime.value = t * 0.001;

    const lerpFactor = 0.1;
    mousePosition.x += (targetMouse.x - mousePosition.x) * lerpFactor;
    mousePosition.y += (targetMouse.y - mousePosition.y) * lerpFactor;

    uniforms.mouseInfluence.value += (mouseInfluenceTarget - uniforms.mouseInfluence.value) * 0.05;
    uniforms.mousePosition.value = [mousePosition.x, mousePosition.y];

    renderer.render({ scene: mesh });
    animationFrameId = requestAnimationFrame(render);
  };
  animationFrameId = requestAnimationFrame(render);

  function destroy() {
    if (!active) return;
    active = false;
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener("resize", resize);
    ro.disconnect();
    if (config.mouseInteraction) {
      mount.removeEventListener("mousemove", handleMouseMove);
      mount.removeEventListener("mouseenter", handleMouseEnter);
      mount.removeEventListener("mouseleave", handleMouseLeave);
    }
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    if (mount.contains(gl.canvas)) {
      mount.removeChild(gl.canvas);
    }
  }

  function setOptions(opts = {}) {
    Object.assign(config, opts);
    if (opts.enableRainbow !== undefined) uniforms.enableRainbow.value = opts.enableRainbow;
    if (opts.gridColor !== undefined) uniforms.gridColor.value = hexToRgb(opts.gridColor);
    if (opts.rippleIntensity !== undefined) uniforms.rippleIntensity.value = opts.rippleIntensity;
    if (opts.gridSize !== undefined) uniforms.gridSize.value = opts.gridSize;
    if (opts.gridThickness !== undefined) uniforms.gridThickness.value = opts.gridThickness;
    if (opts.fadeDistance !== undefined) uniforms.fadeDistance.value = opts.fadeDistance;
    if (opts.vignetteStrength !== undefined) uniforms.vignetteStrength.value = opts.vignetteStrength;
    if (opts.glowIntensity !== undefined) uniforms.glowIntensity.value = opts.glowIntensity;
    if (opts.opacity !== undefined) uniforms.opacity.value = opts.opacity;
    if (opts.gridRotation !== undefined) uniforms.gridRotation.value = opts.gridRotation;
    if (opts.mouseInteraction !== undefined) uniforms.mouseInteraction.value = opts.mouseInteraction;
    if (opts.mouseInteractionRadius !== undefined) uniforms.mouseInteractionRadius.value = opts.mouseInteractionRadius;
    if (opts.lightMode !== undefined) uniforms.lightMode.value = opts.lightMode;
  }

  return { destroy, setOptions };
}
