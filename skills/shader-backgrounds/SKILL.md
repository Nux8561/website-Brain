---
name: shader-backgrounds
version: 1.0
triggers:
  - "shader"
  - "glsl"
  - "fragment shader"
  - "fluid gradient"
  - "webgl hintergrund"
  - "flammen"
  - "fire shader"
depends_on: []
description: >
  GLSL-Fragment-Shader als Hintergrund oder Akzent. Von animierten Gradienten
  (Fluid-Noise, mesh-gradient) bis Flammen-Shader für Pizza-Öfen. Läuft auf
  Raw-WebGL oder eingebettet in R3F per <shaderMaterial>.
---

# Shader Backgrounds — Skill

## Wann einsetzen

- **Flammen im Ofen** (Ristorante-Rezept).
- **Pasta-Dampf** (Perlin-Noise + Transparenz).
- **Animierter Weinfluss** als CTA-Hintergrund.
- **Ambient Fluid-Gradient** statt statischem `bg-gradient`.

## Zwei Pfade

| Pfad | Wann | Vorteil |
|------|------|---------|
| **Raw WebGL** (ohne Three.js) | Single-Shader-Hintergrund | 0 Extra-Deps, < 10 KB |
| **R3F `<shaderMaterial>`** | In einer 3D-Szene | Integriert sich in bestehenden Canvas |

## Pfad A — Raw WebGL Fluid Gradient

```tsx
// src/components/ShaderBG.tsx
import { useEffect, useRef } from "react";

const FRAG = `
precision highp float;
uniform vec2  u_res;
uniform float u_time;
uniform vec3  u_c1;
uniform vec3  u_c2;
uniform vec3  u_c3;

// Simplex noise (Ashima, gekürzt)
vec3 permute(vec3 x){return mod(((x*34.0)+1.0)*x, 289.0);}
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g = vec3(a0.x * x0.x + h.x * x0.y,
                a0.yz * x12.xz + h.yz * x12.yw);
  return 130.0 * dot(m, g);
}

void main(){
  vec2 uv = gl_FragCoord.xy / u_res;
  float n  = snoise(uv * 1.6 + u_time * 0.07);
  float n2 = snoise(uv * 2.8 - u_time * 0.09);
  vec3 col = mix(u_c1, u_c2, smoothstep(-0.2, 0.4, n));
  col      = mix(col,  u_c3, smoothstep(0.15, 0.7, n2));
  gl_FragColor = vec4(col, 1.0);
}
`;

const VERT = `
attribute vec2 a_pos;
void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

export function ShaderBG({
  colors = [[0.08, 0.05, 0.04], [0.25, 0.14, 0.08], [0.55, 0.32, 0.12]],
}: { colors?: [number, number, number][] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src); gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog); gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes  = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uC1 = gl.getUniformLocation(prog, "u_c1");
    const uC2 = gl.getUniformLocation(prog, "u_c2");
    const uC3 = gl.getUniformLocation(prog, "u_c3");

    gl.uniform3fv(uC1, colors[0]);
    gl.uniform3fv(uC2, colors[1]);
    gl.uniform3fv(uC3, colors[2]);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width  = canvas.clientWidth  * dpr;
      canvas.height = canvas.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize(); window.addEventListener("resize", resize);

    let raf = 0, start = performance.now();
    const tick = (t: number) => {
      gl.uniform1f(uTime, (t - start) / 1000);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [colors]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 w-full h-full"
      style={{ filter: "blur(0)" }}
    />
  );
}
```

**Nutzung in CtaFooter (statt `<video>`):**

```tsx
<ShaderBG colors={[
  [0.08, 0.05, 0.04],  // ink
  [0.38, 0.22, 0.12],  // terra
  [0.70, 0.48, 0.28],  // ochre
]} />
```

## Pfad B — R3F Shader-Plane

```tsx
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { ShaderMaterial } from "three";

export function FirePlane() {
  const mat = useRef<ShaderMaterial>(null);
  useFrame((_, dt) => {
    if (mat.current) mat.current.uniforms.u_time.value += dt;
  });
  return (
    <mesh position={[0, 0.6, 0]}>
      <planeGeometry args={[1, 1.2, 32, 32]} />
      <shaderMaterial
        ref={mat}
        transparent
        uniforms={{ u_time: { value: 0 } }}
        vertexShader={VERT}
        fragmentShader={FIRE_FRAG}
      />
    </mesh>
  );
}
```

## Shader-Rezepte

### Flammen (für Holzofen)
- Fractal Brownian Motion (FBM) auf Noise, vertikaler Bias, Farbverlauf Orange → Rot → Transparent oben.

### Dampf (für Pasta-Teller)
- Zeitlich verschobenes Noise, `mix(alpha, 0, uv.y)` für Fade nach oben.

### Fluid-Gradient (für Ambient-Hintergrund)
- Siehe Code oben — zwei Noise-Layer, Farb-Mix.

## Perf-Regeln

- Shader-Hintergrund nie über den ganzen Viewport + zusätzliches Video. Eins oder das andere.
- `precision highp` nur wenn nötig. `mediump` reicht für Gradients.
- Bei sichtbarem Banding: Dithering-Pattern im Shader (`+ hash(uv) / 255`).
- FPS-Cap auf Mobile (rAF-Throttle auf 30fps).

## Anti-Slop

- Keine Standard-Shadertoy-Exporte (meist unoptimiert und zu grell).
- Palette aus `index.css` in die `uniform vec3` durchreichen — nicht hardcoden.
- Immer `prefers-reduced-motion` respektieren (Shader durch Standbild ersetzen).
