import { CSSProperties, useEffect, useRef } from 'react';
import * as THREE from 'three';
import './LiquidEther.css';

interface LiquidEtherProps {
  mouseForce?: number;
  cursorSize?: number;
  isViscous?: boolean;
  viscous?: number;
  iterationsViscous?: number;
  iterationsPoisson?: number;
  dt?: number;
  BFECC?: boolean;
  resolution?: number;
  isBounce?: boolean;
  colors?: string[];
  style?: CSSProperties;
  className?: string;
  autoDemo?: boolean;
  autoSpeed?: number;
  autoIntensity?: number;
  takeoverDuration?: number;
  autoResumeDelay?: number;
  autoRampDuration?: number;
}

type UniformValue = {
  value: unknown;
};

type UniformMap = Record<string, UniformValue>;

type PassMaterial = {
  vertexShader: string;
  fragmentShader: string;
  uniforms: UniformMap;
  transparent?: boolean;
  depthWrite?: boolean;
  blending?: THREE.Blending;
};

type PassProps = {
  material?: PassMaterial;
  output?: THREE.WebGLRenderTarget | null;
  output0?: THREE.WebGLRenderTarget;
  output1?: THREE.WebGLRenderTarget;
};

const LiquidEther = ({
  mouseForce = 20,
  cursorSize = 100,
  isViscous = false,
  viscous = 30,
  iterationsViscous = 32,
  iterationsPoisson = 32,
  dt = 0.014,
  BFECC = true,
  resolution = 0.5,
  isBounce = false,
  colors = ['#5227FF', '#FF9FFC', '#B497CF'],
  style = {},
  className = '',
  autoDemo = true,
  autoSpeed = 0.5,
  autoIntensity = 2.2,
  takeoverDuration = 0.25,
  autoResumeDelay = 1000,
  autoRampDuration = 0.6
}: LiquidEtherProps) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const webglRef = useRef<{
    start: () => void;
    pause: () => void;
    resize: () => void;
    dispose: () => void;
  } | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const rafRef = useRef<number | null>(null);
  const intersectionObserverRef = useRef<IntersectionObserver | null>(null);
  const resizeRafRef = useRef<number | null>(null);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    if (!mountRef.current) return;

    function makePaletteTexture(stops: string[]) {
      const paletteStops =
        Array.isArray(stops) && stops.length > 0
          ? stops.length === 1
            ? [stops[0], stops[0]]
            : stops
          : ['#ffffff', '#ffffff'];

      const width = paletteStops.length;
      const data = new Uint8Array(width * 4);

      for (let index = 0; index < width; index += 1) {
        const color = new THREE.Color(paletteStops[index]);
        data[index * 4 + 0] = Math.round(color.r * 255);
        data[index * 4 + 1] = Math.round(color.g * 255);
        data[index * 4 + 2] = Math.round(color.b * 255);
        data[index * 4 + 3] = 255;
      }

      const texture = new THREE.DataTexture(data, width, 1, THREE.RGBAFormat);
      texture.magFilter = THREE.LinearFilter;
      texture.minFilter = THREE.LinearFilter;
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      texture.generateMipmaps = false;
      texture.needsUpdate = true;

      return texture;
    }

    const paletteTex = makePaletteTexture(colors);
    const bgVec4 = new THREE.Vector4(0, 0, 0, 0);

    class CommonClass {
      width = 0;
      height = 0;
      aspect = 1;
      pixelRatio = 1;
      container: HTMLDivElement | null = null;
      renderer: THREE.WebGLRenderer | null = null;
      clock: THREE.Clock | null = null;
      time = 0;
      delta = 0;

      init(container: HTMLDivElement) {
        this.container = container;
        this.pixelRatio = Math.min(window.devicePixelRatio || 1, 1.25);
        this.resize();
        this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
        this.renderer.autoClear = false;
        this.renderer.setClearColor(new THREE.Color(0x000000), 0);
        this.renderer.setPixelRatio(this.pixelRatio);
        this.renderer.setSize(this.width, this.height);
        this.renderer.domElement.style.width = '100%';
        this.renderer.domElement.style.height = '100%';
        this.renderer.domElement.style.display = 'block';
        this.clock = new THREE.Clock();
        this.clock.start();
      }

      resize() {
        if (!this.container) return;
        const rect = this.container.getBoundingClientRect();
        this.width = Math.max(1, Math.floor(rect.width));
        this.height = Math.max(1, Math.floor(rect.height));
        this.aspect = this.width / this.height;
        this.renderer?.setSize(this.width, this.height, false);
      }

      update() {
        this.delta = this.clock?.getDelta() ?? 0;
        this.time += this.delta;
      }
    }

    const Common = new CommonClass();

    class MouseClass {
      mouseMoved = false;
      coords = new THREE.Vector2();
      coordsOld = new THREE.Vector2();
      diff = new THREE.Vector2();
      timer: number | null = null;
      container: HTMLDivElement | null = null;
      docTarget: Document | null = null;
      listenerTarget: Window | null = null;
      isHoverInside = false;
      hasUserControl = false;
      isAutoActive = false;
      autoIntensity = 2.0;
      takeoverActive = false;
      takeoverStartTime = 0;
      takeoverDuration = 0.25;
      takeoverFrom = new THREE.Vector2();
      takeoverTo = new THREE.Vector2();
      onInteract: (() => void) | null = null;

      private onMouseMove = (event: MouseEvent) => {
        if (!this.updateHoverState(event.clientX, event.clientY)) return;
        this.onInteract?.();

        if (this.isAutoActive && !this.hasUserControl && !this.takeoverActive) {
          if (!this.container) return;
          const rect = this.container.getBoundingClientRect();
          if (rect.width === 0 || rect.height === 0) return;
          const nx = (event.clientX - rect.left) / rect.width;
          const ny = (event.clientY - rect.top) / rect.height;
          this.takeoverFrom.copy(this.coords);
          this.takeoverTo.set(nx * 2 - 1, -(ny * 2 - 1));
          this.takeoverStartTime = performance.now();
          this.takeoverActive = true;
          this.hasUserControl = true;
          this.isAutoActive = false;
          return;
        }

        this.setCoords(event.clientX, event.clientY);
        this.hasUserControl = true;
      };

      private onTouchStart = (event: TouchEvent) => {
        if (event.touches.length !== 1) return;
        const touch = event.touches[0];
        if (!this.updateHoverState(touch.clientX, touch.clientY)) return;
        this.onInteract?.();
        this.setCoords(touch.clientX, touch.clientY);
        this.hasUserControl = true;
      };

      private onTouchMove = (event: TouchEvent) => {
        if (event.touches.length !== 1) return;
        const touch = event.touches[0];
        if (!this.updateHoverState(touch.clientX, touch.clientY)) return;
        this.onInteract?.();
        this.setCoords(touch.clientX, touch.clientY);
      };

      private onTouchEnd = () => {
        this.isHoverInside = false;
      };

      private onDocumentLeave = () => {
        this.isHoverInside = false;
      };

      init(container: HTMLDivElement) {
        this.container = container;
        this.docTarget = container.ownerDocument || null;
        const defaultView =
          this.docTarget?.defaultView || (typeof window !== 'undefined' ? window : null);

        if (!defaultView) return;

        this.listenerTarget = defaultView;
        this.listenerTarget.addEventListener('mousemove', this.onMouseMove);
        this.listenerTarget.addEventListener('touchstart', this.onTouchStart, { passive: true });
        this.listenerTarget.addEventListener('touchmove', this.onTouchMove, { passive: true });
        this.listenerTarget.addEventListener('touchend', this.onTouchEnd);
        this.docTarget?.addEventListener('mouseleave', this.onDocumentLeave);
      }

      dispose() {
        this.listenerTarget?.removeEventListener('mousemove', this.onMouseMove);
        this.listenerTarget?.removeEventListener('touchstart', this.onTouchStart);
        this.listenerTarget?.removeEventListener('touchmove', this.onTouchMove);
        this.listenerTarget?.removeEventListener('touchend', this.onTouchEnd);
        this.docTarget?.removeEventListener('mouseleave', this.onDocumentLeave);
        this.listenerTarget = null;
        this.docTarget = null;
        this.container = null;
      }

      isPointInside(clientX: number, clientY: number) {
        if (!this.container) return false;
        const rect = this.container.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return false;
        return clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom;
      }

      updateHoverState(clientX: number, clientY: number) {
        this.isHoverInside = this.isPointInside(clientX, clientY);
        return this.isHoverInside;
      }

      setCoords(x: number, y: number) {
        if (!this.container) return;
        if (this.timer) window.clearTimeout(this.timer);
        const rect = this.container.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        const nx = (x - rect.left) / rect.width;
        const ny = (y - rect.top) / rect.height;
        this.coords.set(nx * 2 - 1, -(ny * 2 - 1));
        this.mouseMoved = true;
        this.timer = window.setTimeout(() => {
          this.mouseMoved = false;
        }, 100);
      }

      setNormalized(nx: number, ny: number) {
        this.coords.set(nx, ny);
        this.mouseMoved = true;
      }

      update() {
        if (this.takeoverActive) {
          const progress = (performance.now() - this.takeoverStartTime) / (this.takeoverDuration * 1000);
          if (progress >= 1) {
            this.takeoverActive = false;
            this.coords.copy(this.takeoverTo);
            this.coordsOld.copy(this.coords);
            this.diff.set(0, 0);
          } else {
            const eased = progress * progress * (3 - 2 * progress);
            this.coords.copy(this.takeoverFrom).lerp(this.takeoverTo, eased);
          }
        }

        this.diff.subVectors(this.coords, this.coordsOld);
        this.coordsOld.copy(this.coords);

        if (this.coordsOld.x === 0 && this.coordsOld.y === 0) {
          this.diff.set(0, 0);
        }

        if (this.isAutoActive && !this.takeoverActive) {
          this.diff.multiplyScalar(this.autoIntensity);
        }
      }
    }

    const Mouse = new MouseClass();

    class AutoDriver {
      mouse: MouseClass;
      manager: WebGLManager;
      enabled: boolean;
      speed: number;
      resumeDelay: number;
      rampDurationMs: number;
      active = false;
      current = new THREE.Vector2(0, 0);
      target = new THREE.Vector2();
      lastTime = performance.now();
      activationTime = 0;
      margin = 0.2;
      tmpDir = new THREE.Vector2();

      constructor(mouse: MouseClass, manager: WebGLManager, options: {
        enabled: boolean;
        speed: number;
        resumeDelay: number;
        rampDuration: number;
      }) {
        this.mouse = mouse;
        this.manager = manager;
        this.enabled = options.enabled;
        this.speed = options.speed;
        this.resumeDelay = options.resumeDelay;
        this.rampDurationMs = options.rampDuration * 1000;
        this.pickNewTarget();
      }

      pickNewTarget() {
        this.target.set(
          (Math.random() * 2 - 1) * (1 - this.margin),
          (Math.random() * 2 - 1) * (1 - this.margin)
        );
      }

      forceStop() {
        this.active = false;
        this.mouse.isAutoActive = false;
      }

      update() {
        if (!this.enabled) return;
        const now = performance.now();
        const idle = now - this.manager.lastUserInteraction;

        if (idle < this.resumeDelay || this.mouse.isHoverInside) {
          if (this.active) this.forceStop();
          return;
        }

        if (!this.active) {
          this.active = true;
          this.current.copy(this.mouse.coords);
          this.lastTime = now;
          this.activationTime = now;
        }

        this.mouse.isAutoActive = true;

        let dtSeconds = (now - this.lastTime) / 1000;
        this.lastTime = now;

        if (dtSeconds > 0.2) dtSeconds = 0.016;

        const dir = this.tmpDir.subVectors(this.target, this.current);
        const distance = dir.length();

        if (distance < 0.01) {
          this.pickNewTarget();
          return;
        }

        dir.normalize();
        let ramp = 1;

        if (this.rampDurationMs > 0) {
          const progress = Math.min(1, (now - this.activationTime) / this.rampDurationMs);
          ramp = progress * progress * (3 - 2 * progress);
        }

        const step = this.speed * dtSeconds * ramp;
        const move = Math.min(step, distance);
        this.current.addScaledVector(dir, move);
        this.mouse.setNormalized(this.current.x, this.current.y);
      }
    }

    const faceVert = `
      attribute vec3 position;
      uniform vec2 px;
      uniform vec2 boundarySpace;
      varying vec2 uv;
      precision highp float;
      void main(){
        vec3 pos = position;
        vec2 scale = 1.0 - boundarySpace * 2.0;
        pos.xy = pos.xy * scale;
        uv = vec2(0.5)+(pos.xy)*0.5;
        gl_Position = vec4(pos, 1.0);
      }
    `;

    const lineVert = `
      attribute vec3 position;
      uniform vec2 px;
      precision highp float;
      varying vec2 uv;
      void main(){
        vec3 pos = position;
        uv = 0.5 + pos.xy * 0.5;
        vec2 n = sign(pos.xy);
        pos.xy = abs(pos.xy) - px * 1.0;
        pos.xy *= n;
        gl_Position = vec4(pos, 1.0);
      }
    `;

    const mouseVert = `
      precision highp float;
      attribute vec3 position;
      attribute vec2 uv;
      uniform vec2 center;
      uniform vec2 scale;
      uniform vec2 px;
      varying vec2 vUv;
      void main(){
        vec2 pos = position.xy * scale * 2.0 * px + center;
        vUv = uv;
        gl_Position = vec4(pos, 0.0, 1.0);
      }
    `;

    const advectionFrag = `
      precision highp float;
      uniform sampler2D velocity;
      uniform float dt;
      uniform bool isBFECC;
      uniform vec2 fboSize;
      uniform vec2 px;
      varying vec2 uv;
      void main(){
        vec2 ratio = max(fboSize.x, fboSize.y) / fboSize;
        if(isBFECC == false){
          vec2 vel = texture2D(velocity, uv).xy;
          vec2 uv2 = uv - vel * dt * ratio;
          vec2 newVel = texture2D(velocity, uv2).xy;
          gl_FragColor = vec4(newVel, 0.0, 0.0);
        } else {
          vec2 spotNew = uv;
          vec2 velOld = texture2D(velocity, uv).xy;
          vec2 spotOld = spotNew - velOld * dt * ratio;
          vec2 velNew1 = texture2D(velocity, spotOld).xy;
          vec2 spotNew2 = spotOld + velNew1 * dt * ratio;
          vec2 error = spotNew2 - spotNew;
          vec2 spotNew3 = spotNew - error / 2.0;
          vec2 vel2 = texture2D(velocity, spotNew3).xy;
          vec2 spotOld2 = spotNew3 - vel2 * dt * ratio;
          vec2 newVel2 = texture2D(velocity, spotOld2).xy;
          gl_FragColor = vec4(newVel2, 0.0, 0.0);
        }
      }
    `;

    const colorFrag = `
      precision highp float;
      uniform sampler2D velocity;
      uniform sampler2D palette;
      uniform vec4 bgColor;
      varying vec2 uv;
      void main(){
        vec2 vel = texture2D(velocity, uv).xy;
        float lenv = clamp(length(vel), 0.0, 1.0);
        vec3 c = texture2D(palette, vec2(lenv, 0.5)).rgb;
        vec3 outRGB = mix(bgColor.rgb, c, lenv);
        float outA = mix(bgColor.a, 1.0, lenv);
        gl_FragColor = vec4(outRGB, outA);
      }
    `;

    const divergenceFrag = `
      precision highp float;
      uniform sampler2D velocity;
      uniform float dt;
      uniform vec2 px;
      varying vec2 uv;
      void main(){
        float x0 = texture2D(velocity, uv-vec2(px.x, 0.0)).x;
        float x1 = texture2D(velocity, uv+vec2(px.x, 0.0)).x;
        float y0 = texture2D(velocity, uv-vec2(0.0, px.y)).y;
        float y1 = texture2D(velocity, uv+vec2(0.0, px.y)).y;
        float divergence = (x1 - x0 + y1 - y0) / 2.0;
        gl_FragColor = vec4(divergence / dt);
      }
    `;

    const externalForceFrag = `
      precision highp float;
      uniform vec2 force;
      uniform vec2 center;
      uniform vec2 scale;
      uniform vec2 px;
      varying vec2 vUv;
      void main(){
        vec2 circle = (vUv - 0.5) * 2.0;
        float d = 1.0 - min(length(circle), 1.0);
        d *= d;
        gl_FragColor = vec4(force * d, 0.0, 1.0);
      }
    `;

    const poissonFrag = `
      precision highp float;
      uniform sampler2D pressure;
      uniform sampler2D divergence;
      uniform vec2 px;
      varying vec2 uv;
      void main(){
        float p0 = texture2D(pressure, uv + vec2(px.x * 2.0, 0.0)).r;
        float p1 = texture2D(pressure, uv - vec2(px.x * 2.0, 0.0)).r;
        float p2 = texture2D(pressure, uv + vec2(0.0, px.y * 2.0)).r;
        float p3 = texture2D(pressure, uv - vec2(0.0, px.y * 2.0)).r;
        float div = texture2D(divergence, uv).r;
        float newP = (p0 + p1 + p2 + p3) / 4.0 - div;
        gl_FragColor = vec4(newP);
      }
    `;

    const pressureFrag = `
      precision highp float;
      uniform sampler2D pressure;
      uniform sampler2D velocity;
      uniform vec2 px;
      uniform float dt;
      varying vec2 uv;
      void main(){
        float step = 1.0;
        float p0 = texture2D(pressure, uv + vec2(px.x * step, 0.0)).r;
        float p1 = texture2D(pressure, uv - vec2(px.x * step, 0.0)).r;
        float p2 = texture2D(pressure, uv + vec2(0.0, px.y * step)).r;
        float p3 = texture2D(pressure, uv - vec2(0.0, px.y * step)).r;
        vec2 v = texture2D(velocity, uv).xy;
        vec2 gradP = vec2(p0 - p1, p2 - p3) * 0.5;
        v = v - gradP * dt;
        gl_FragColor = vec4(v, 0.0, 1.0);
      }
    `;

    const viscousFrag = `
      precision highp float;
      uniform sampler2D velocity;
      uniform sampler2D velocity_new;
      uniform float v;
      uniform vec2 px;
      uniform float dt;
      varying vec2 uv;
      void main(){
        vec2 old = texture2D(velocity, uv).xy;
        vec2 new0 = texture2D(velocity_new, uv + vec2(px.x * 2.0, 0.0)).xy;
        vec2 new1 = texture2D(velocity_new, uv - vec2(px.x * 2.0, 0.0)).xy;
        vec2 new2 = texture2D(velocity_new, uv + vec2(0.0, px.y * 2.0)).xy;
        vec2 new3 = texture2D(velocity_new, uv - vec2(0.0, px.y * 2.0)).xy;
        vec2 newv = 4.0 * old + v * dt * (new0 + new1 + new2 + new3);
        newv /= 4.0 * (1.0 + v * dt);
        gl_FragColor = vec4(newv, 0.0, 0.0);
      }
    `;

    class ShaderPass {
      props: PassProps;
      uniforms?: UniformMap;
      scene: THREE.Scene | null = null;
      camera: THREE.Camera | null = null;
      material: THREE.RawShaderMaterial | null = null;
      geometry: THREE.PlaneGeometry | null = null;
      plane: THREE.Mesh | null = null;

      constructor(props: PassProps) {
        this.props = props;
        this.uniforms = this.props.material?.uniforms;
      }

      init() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.Camera();

        if (this.props.material) {
          this.material = new THREE.RawShaderMaterial(this.props.material);
          this.geometry = new THREE.PlaneGeometry(2.0, 2.0);
          this.plane = new THREE.Mesh(this.geometry, this.material);
          this.scene.add(this.plane);
        }
      }

      update(_options?: unknown) {
        if (!Common.renderer || !this.scene || !this.camera) return;
        Common.renderer.setRenderTarget(this.props.output || null);
        Common.renderer.render(this.scene, this.camera);
        Common.renderer.setRenderTarget(null);
      }
    }

    class Advection extends ShaderPass {
      line?: THREE.LineSegments;

      constructor(simProps: {
        cellScale: THREE.Vector2;
        fboSize: THREE.Vector2;
        dt: number;
        src: THREE.WebGLRenderTarget;
        dst: THREE.WebGLRenderTarget;
      }) {
        super({
          material: {
            vertexShader: faceVert,
            fragmentShader: advectionFrag,
            uniforms: {
              boundarySpace: { value: simProps.cellScale },
              px: { value: simProps.cellScale },
              fboSize: { value: simProps.fboSize },
              velocity: { value: simProps.src.texture },
              dt: { value: simProps.dt },
              isBFECC: { value: true }
            }
          },
          output: simProps.dst
        });
        this.init();
      }

      override init() {
        super.init();
        this.createBoundary();
      }

      createBoundary() {
        if (!this.scene || !this.uniforms) return;
        const boundaryGeometry = new THREE.BufferGeometry();
        const vertices = new Float32Array([
          -1, -1, 0, -1, 1, 0, -1, 1, 0, 1, 1, 0,
          1, 1, 0, 1, -1, 0, 1, -1, 0, -1, -1, 0
        ]);

        boundaryGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

        const boundaryMaterial = new THREE.RawShaderMaterial({
          vertexShader: lineVert,
          fragmentShader: advectionFrag,
          uniforms: this.uniforms
        });

        this.line = new THREE.LineSegments(boundaryGeometry, boundaryMaterial);
        this.scene.add(this.line);
      }

      update(options?: { dt: number; isBounce: boolean; BFECC: boolean }) {
        if (!this.uniforms || !options) return;
        this.uniforms.dt.value = options.dt;
        this.uniforms.isBFECC.value = options.BFECC;
        if (this.line) this.line.visible = options.isBounce;
        super.update();
      }
    }

    class ExternalForce extends ShaderPass {
      mouse?: THREE.Mesh;

      constructor(simProps: {
        cellScale: THREE.Vector2;
        cursorSize: number;
        dst: THREE.WebGLRenderTarget;
      }) {
        super({ output: simProps.dst });
        this.initWithProps(simProps);
      }

      initWithProps(simProps: {
        cellScale: THREE.Vector2;
        cursorSize: number;
        dst: THREE.WebGLRenderTarget;
      }) {
        super.init();
        if (!this.scene) return;

        const mouseGeometry = new THREE.PlaneGeometry(1, 1);
        const mouseMaterial = new THREE.RawShaderMaterial({
          vertexShader: mouseVert,
          fragmentShader: externalForceFrag,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          uniforms: {
            px: { value: simProps.cellScale },
            force: { value: new THREE.Vector2(0.0, 0.0) },
            center: { value: new THREE.Vector2(0.0, 0.0) },
            scale: { value: new THREE.Vector2(simProps.cursorSize, simProps.cursorSize) }
          }
        });

        this.mouse = new THREE.Mesh(mouseGeometry, mouseMaterial);
        this.scene.add(this.mouse);
      }

      update(options?: {
        cursorSize: number;
        mouseForce: number;
        cellScale: THREE.Vector2;
      }) {
        if (!this.mouse || !options) return;
        const forceX = (Mouse.diff.x / 2) * options.mouseForce;
        const forceY = (Mouse.diff.y / 2) * options.mouseForce;
        const cursorSizeX = options.cursorSize * options.cellScale.x;
        const cursorSizeY = options.cursorSize * options.cellScale.y;
        const centerX = Math.min(
          Math.max(Mouse.coords.x, -1 + cursorSizeX + options.cellScale.x * 2),
          1 - cursorSizeX - options.cellScale.x * 2
        );
        const centerY = Math.min(
          Math.max(Mouse.coords.y, -1 + cursorSizeY + options.cellScale.y * 2),
          1 - cursorSizeY - options.cellScale.y * 2
        );

        const uniforms = (this.mouse.material as THREE.RawShaderMaterial).uniforms as UniformMap;
        (uniforms.force.value as THREE.Vector2).set(forceX, forceY);
        (uniforms.center.value as THREE.Vector2).set(centerX, centerY);
        (uniforms.scale.value as THREE.Vector2).set(options.cursorSize, options.cursorSize);
        super.update();
      }
    }

    class Viscous extends ShaderPass {
      constructor(simProps: {
        cellScale: THREE.Vector2;
        boundarySpace: THREE.Vector2;
        viscous: number;
        src: THREE.WebGLRenderTarget;
        dst: THREE.WebGLRenderTarget;
        dstAlt: THREE.WebGLRenderTarget;
        dt: number;
      }) {
        super({
          material: {
            vertexShader: faceVert,
            fragmentShader: viscousFrag,
            uniforms: {
              boundarySpace: { value: simProps.boundarySpace },
              velocity: { value: simProps.src.texture },
              velocity_new: { value: simProps.dstAlt.texture },
              v: { value: simProps.viscous },
              px: { value: simProps.cellScale },
              dt: { value: simProps.dt }
            }
          },
          output: simProps.dst,
          output0: simProps.dstAlt,
          output1: simProps.dst
        });
        this.init();
      }

      update(options?: { viscous: number; iterations: number; dt: number }) {
        if (!this.uniforms || !this.props.output0 || !this.props.output1 || !options) {
          return this.props.output1;
        }
        let fboIn = this.props.output0;
        let fboOut = this.props.output1;

        this.uniforms.v.value = options.viscous;

        for (let index = 0; index < options.iterations; index += 1) {
          if (index % 2 === 0) {
            fboIn = this.props.output0;
            fboOut = this.props.output1;
          } else {
            fboIn = this.props.output1;
            fboOut = this.props.output0;
          }

          this.uniforms.velocity_new.value = fboIn.texture;
          this.uniforms.dt.value = options.dt;
          this.props.output = fboOut;
          super.update();
        }

        return fboOut;
      }
    }

    class Divergence extends ShaderPass {
      constructor(simProps: {
        cellScale: THREE.Vector2;
        boundarySpace: THREE.Vector2;
        src: THREE.WebGLRenderTarget;
        dst: THREE.WebGLRenderTarget;
        dt: number;
      }) {
        super({
          material: {
            vertexShader: faceVert,
            fragmentShader: divergenceFrag,
            uniforms: {
              boundarySpace: { value: simProps.boundarySpace },
              velocity: { value: simProps.src.texture },
              px: { value: simProps.cellScale },
              dt: { value: simProps.dt }
            }
          },
          output: simProps.dst
        });
        this.init();
      }

      update(options?: { vel: THREE.WebGLRenderTarget }) {
        if (!this.uniforms || !options) return;
        this.uniforms.velocity.value = options.vel.texture;
        super.update();
      }
    }

    class Poisson extends ShaderPass {
      constructor(simProps: {
        cellScale: THREE.Vector2;
        boundarySpace: THREE.Vector2;
        src: THREE.WebGLRenderTarget;
        dst: THREE.WebGLRenderTarget;
        dstAlt: THREE.WebGLRenderTarget;
      }) {
        super({
          material: {
            vertexShader: faceVert,
            fragmentShader: poissonFrag,
            uniforms: {
              boundarySpace: { value: simProps.boundarySpace },
              pressure: { value: simProps.dstAlt.texture },
              divergence: { value: simProps.src.texture },
              px: { value: simProps.cellScale }
            }
          },
          output: simProps.dst,
          output0: simProps.dstAlt,
          output1: simProps.dst
        });
        this.init();
      }

      update(options?: { iterations: number }) {
        if (!this.uniforms || !this.props.output0 || !this.props.output1 || !options) {
          return this.props.output1;
        }
        let pressureIn = this.props.output0;
        let pressureOut = this.props.output1;

        for (let index = 0; index < options.iterations; index += 1) {
          if (index % 2 === 0) {
            pressureIn = this.props.output0;
            pressureOut = this.props.output1;
          } else {
            pressureIn = this.props.output1;
            pressureOut = this.props.output0;
          }

          this.uniforms.pressure.value = pressureIn.texture;
          this.props.output = pressureOut;
          super.update();
        }

        return pressureOut;
      }
    }

    class Pressure extends ShaderPass {
      constructor(simProps: {
        cellScale: THREE.Vector2;
        boundarySpace: THREE.Vector2;
        srcPressure: THREE.WebGLRenderTarget;
        srcVelocity: THREE.WebGLRenderTarget;
        dst: THREE.WebGLRenderTarget;
        dt: number;
      }) {
        super({
          material: {
            vertexShader: faceVert,
            fragmentShader: pressureFrag,
            uniforms: {
              boundarySpace: { value: simProps.boundarySpace },
              pressure: { value: simProps.srcPressure.texture },
              velocity: { value: simProps.srcVelocity.texture },
              px: { value: simProps.cellScale },
              dt: { value: simProps.dt }
            }
          },
          output: simProps.dst
        });
        this.init();
      }

      update(options?: { vel: THREE.WebGLRenderTarget; pressure: THREE.WebGLRenderTarget }) {
        if (!this.uniforms || !options) return;
        this.uniforms.velocity.value = options.vel.texture;
        this.uniforms.pressure.value = options.pressure.texture;
        super.update();
      }
    }

    class Simulation {
      options: {
        iterations_poisson: number;
        iterations_viscous: number;
        mouse_force: number;
        resolution: number;
        cursor_size: number;
        viscous: number;
        isBounce: boolean;
        dt: number;
        isViscous: boolean;
        BFECC: boolean;
      };

      fbos: Record<string, THREE.WebGLRenderTarget>;
      fboSize = new THREE.Vector2();
      cellScale = new THREE.Vector2();
      boundarySpace = new THREE.Vector2();
      advection!: Advection;
      externalForce!: ExternalForce;
      viscousPass!: Viscous;
      divergence!: Divergence;
      poisson!: Poisson;
      pressure!: Pressure;

      constructor(options?: Partial<Simulation['options']>) {
        this.options = {
          iterations_poisson: 32,
          iterations_viscous: 32,
          mouse_force: 20,
          resolution: 0.5,
          cursor_size: 100,
          viscous: 30,
          isBounce: false,
          dt: 0.014,
          isViscous: false,
          BFECC: true,
          ...options
        };

        this.fbos = {
          vel_0: null as unknown as THREE.WebGLRenderTarget,
          vel_1: null as unknown as THREE.WebGLRenderTarget,
          vel_viscous0: null as unknown as THREE.WebGLRenderTarget,
          vel_viscous1: null as unknown as THREE.WebGLRenderTarget,
          div: null as unknown as THREE.WebGLRenderTarget,
          pressure_0: null as unknown as THREE.WebGLRenderTarget,
          pressure_1: null as unknown as THREE.WebGLRenderTarget
        };

        this.init();
      }

      init() {
        this.calcSize();
        this.createAllFBO();
        this.createShaderPasses();
      }

      getFloatType() {
        const isIOS = /(iPad|iPhone|iPod)/i.test(navigator.userAgent);
        return isIOS ? THREE.HalfFloatType : THREE.FloatType;
      }

      createAllFBO() {
        const type = this.getFloatType();
        const options = {
          type,
          depthBuffer: false,
          stencilBuffer: false,
          minFilter: THREE.LinearFilter,
          magFilter: THREE.LinearFilter,
          wrapS: THREE.ClampToEdgeWrapping,
          wrapT: THREE.ClampToEdgeWrapping
        };

        Object.keys(this.fbos).forEach((key) => {
          this.fbos[key] = new THREE.WebGLRenderTarget(this.fboSize.x, this.fboSize.y, options);
        });
      }

      createShaderPasses() {
        this.advection = new Advection({
          cellScale: this.cellScale,
          fboSize: this.fboSize,
          dt: this.options.dt,
          src: this.fbos.vel_0,
          dst: this.fbos.vel_1
        });

        this.externalForce = new ExternalForce({
          cellScale: this.cellScale,
          cursorSize: this.options.cursor_size,
          dst: this.fbos.vel_1
        });

        this.viscousPass = new Viscous({
          cellScale: this.cellScale,
          boundarySpace: this.boundarySpace,
          viscous: this.options.viscous,
          src: this.fbos.vel_1,
          dst: this.fbos.vel_viscous1,
          dstAlt: this.fbos.vel_viscous0,
          dt: this.options.dt
        });

        this.divergence = new Divergence({
          cellScale: this.cellScale,
          boundarySpace: this.boundarySpace,
          src: this.fbos.vel_viscous0,
          dst: this.fbos.div,
          dt: this.options.dt
        });

        this.poisson = new Poisson({
          cellScale: this.cellScale,
          boundarySpace: this.boundarySpace,
          src: this.fbos.div,
          dst: this.fbos.pressure_1,
          dstAlt: this.fbos.pressure_0
        });

        this.pressure = new Pressure({
          cellScale: this.cellScale,
          boundarySpace: this.boundarySpace,
          srcPressure: this.fbos.pressure_0,
          srcVelocity: this.fbos.vel_viscous0,
          dst: this.fbos.vel_0,
          dt: this.options.dt
        });
      }

      calcSize() {
        const width = Math.max(1, Math.round(this.options.resolution * Common.width));
        const height = Math.max(1, Math.round(this.options.resolution * Common.height));
        this.cellScale.set(1 / width, 1 / height);
        this.fboSize.set(width, height);
      }

      resize() {
        this.calcSize();
        Object.values(this.fbos).forEach((fbo) => {
          fbo.setSize(this.fboSize.x, this.fboSize.y);
        });
      }

      update() {
        if (this.options.isBounce) {
          this.boundarySpace.set(0, 0);
        } else {
          this.boundarySpace.copy(this.cellScale);
        }

        this.advection.update({
          dt: this.options.dt,
          isBounce: this.options.isBounce,
          BFECC: this.options.BFECC
        });

        this.externalForce.update({
          cursorSize: this.options.cursor_size,
          mouseForce: this.options.mouse_force,
          cellScale: this.cellScale
        });

        let velocity = this.fbos.vel_1;

        if (this.options.isViscous) {
          velocity = this.viscousPass.update({
            viscous: this.options.viscous,
            iterations: this.options.iterations_viscous,
            dt: this.options.dt
          });
        }

        this.divergence.update({ vel: velocity });
        const pressure = this.poisson.update({ iterations: this.options.iterations_poisson });
        this.pressure.update({ vel: velocity, pressure });
      }
    }

    class Output {
      simulation: Simulation;
      scene: THREE.Scene;
      camera: THREE.Camera;
      output: THREE.Mesh;

      constructor() {
        this.simulation = new Simulation({
          iterations_poisson: iterationsPoisson,
          iterations_viscous: iterationsViscous,
          mouse_force: mouseForce,
          resolution,
          cursor_size: cursorSize,
          viscous,
          isBounce,
          dt,
          isViscous,
          BFECC
        });

        this.scene = new THREE.Scene();
        this.camera = new THREE.Camera();
        this.output = new THREE.Mesh(
          new THREE.PlaneGeometry(2, 2),
          new THREE.RawShaderMaterial({
            vertexShader: faceVert,
            fragmentShader: colorFrag,
            transparent: true,
            depthWrite: false,
            uniforms: {
              velocity: { value: this.simulation.fbos.vel_0.texture },
              boundarySpace: { value: new THREE.Vector2() },
              palette: { value: paletteTex },
              bgColor: { value: bgVec4 }
            }
          })
        );

        this.scene.add(this.output);
      }

      resize() {
        this.simulation.resize();
      }

      render() {
        if (!Common.renderer) return;
        Common.renderer.setRenderTarget(null);
        Common.renderer.render(this.scene, this.camera);
      }

      update() {
        this.simulation.update();
        this.render();
      }
    }

    class WebGLManager {
      props: {
        wrapper: HTMLDivElement;
        autoDemo: boolean;
        autoSpeed: number;
        autoIntensity: number;
        takeoverDuration: number;
        autoResumeDelay: number;
        autoRampDuration: number;
      };
      output!: Output;
      autoDriver: AutoDriver;
      lastUserInteraction = performance.now();
      running = false;

      private loopBound = this.loop.bind(this);
      private resizeBound = this.resize.bind(this);
      private visibilityBound = () => {
        if (document.hidden) {
          this.pause();
        } else if (isVisibleRef.current) {
          this.start();
        }
      };

      constructor(props: WebGLManager['props']) {
        this.props = props;
        Common.init(props.wrapper);
        Mouse.init(props.wrapper);
        Mouse.autoIntensity = props.autoIntensity;
        Mouse.takeoverDuration = props.takeoverDuration;
        Mouse.onInteract = () => {
          this.lastUserInteraction = performance.now();
          this.autoDriver.forceStop();
        };

        this.autoDriver = new AutoDriver(Mouse, this, {
          enabled: props.autoDemo,
          speed: props.autoSpeed,
          resumeDelay: props.autoResumeDelay,
          rampDuration: props.autoRampDuration
        });

        this.init();
        window.addEventListener('resize', this.resizeBound);
        document.addEventListener('visibilitychange', this.visibilityBound);
      }

      init() {
        if (Common.renderer) {
          this.props.wrapper.prepend(Common.renderer.domElement);
        }
        this.output = new Output();
      }

      resize() {
        Common.resize();
        this.output.resize();
      }

      render() {
        this.autoDriver.update();
        Mouse.update();
        Common.update();
        this.output.update();
      }

      loop() {
        if (!this.running) return;
        this.render();
        rafRef.current = requestAnimationFrame(this.loopBound);
      }

      start() {
        if (this.running) return;
        this.running = true;
        this.loop();
      }

      pause() {
        this.running = false;
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
      }

      dispose() {
        window.removeEventListener('resize', this.resizeBound);
        document.removeEventListener('visibilitychange', this.visibilityBound);
        Mouse.dispose();

        if (Common.renderer) {
          const canvas = Common.renderer.domElement;
          if (canvas.parentNode) {
            canvas.parentNode.removeChild(canvas);
          }
          Common.renderer.dispose();
          Common.renderer.forceContextLoss();
        }
      }
    }

    const container = mountRef.current;
    container.style.position = container.style.position || 'relative';
    container.style.overflow = container.style.overflow || 'hidden';

    const webgl = new WebGLManager({
      wrapper: container,
      autoDemo,
      autoSpeed,
      autoIntensity,
      takeoverDuration,
      autoResumeDelay,
      autoRampDuration
    });

    webglRef.current = webgl;
    webgl.start();

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const visible = entry.isIntersecting && entry.intersectionRatio > 0;
        isVisibleRef.current = visible;

        if (!webglRef.current) return;

        if (visible && !document.hidden) {
          webglRef.current.start();
        } else {
          webglRef.current.pause();
        }
      },
      { threshold: [0, 0.01, 0.1], rootMargin: '180px 0px' }
    );

    io.observe(container);
    intersectionObserverRef.current = io;

    const ro = new ResizeObserver(() => {
      if (!webglRef.current) return;
      if (resizeRafRef.current) cancelAnimationFrame(resizeRafRef.current);
      resizeRafRef.current = requestAnimationFrame(() => {
        webglRef.current?.resize();
      });
    });

    ro.observe(container);
    resizeObserverRef.current = ro;

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (resizeRafRef.current) cancelAnimationFrame(resizeRafRef.current);
      resizeObserverRef.current?.disconnect();
      intersectionObserverRef.current?.disconnect();
      paletteTex.dispose();
      webglRef.current?.dispose();
      webglRef.current = null;
    };
  }, [
    BFECC,
    autoDemo,
    autoIntensity,
    autoRampDuration,
    autoResumeDelay,
    autoSpeed,
    colors,
    cursorSize,
    dt,
    isBounce,
    isViscous,
    iterationsPoisson,
    iterationsViscous,
    mouseForce,
    resolution,
    takeoverDuration,
    viscous
  ]);

  return (
    <div
      ref={mountRef}
      className={`liquid-ether-container ${className}`.trim()}
      style={style}
      aria-hidden="true"
    />
  );
};

export default LiquidEther;
