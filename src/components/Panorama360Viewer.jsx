import React, { useEffect, useRef, useState, useCallback } from "react";

const VERTEX_SHADER = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = (a_position + 1.0) * 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;
const FRAGMENT_SHADER = `
  precision highp float;
  uniform sampler2D u_texture;
  uniform vec2 u_resolution;
  uniform float u_yaw;
  uniform float u_pitch;
  uniform float u_fov;

  #define PI 3.14159265358979323846

  void main() {
    vec2 ndc = (gl_FragCoord.xy / u_resolution.xy) * 2.0 - 1.0;
    float aspect = u_resolution.x / u_resolution.y;

    float tanHalfFov = tan(u_fov * 0.5);
    vec3 ray = normalize(vec3(ndc.x * aspect * tanHalfFov, ndc.y * tanHalfFov, 1.0));

    float cp = cos(u_pitch);
    float sp = sin(u_pitch);
    vec3 rPitch = vec3(ray.x, ray.y * cp - ray.z * sp, ray.y * sp + ray.z * cp);

    float cy = cos(u_yaw);
    float sy = sin(u_yaw);
    vec3 rWorld = vec3(rPitch.x * cy + rPitch.z * sy, rPitch.y, -rPitch.x * sy + rPitch.z * cy);

    float phi = atan(rWorld.x, rWorld.z);
    float theta = asin(clamp(rWorld.y, -1.0, 1.0));

    vec2 uv = vec2(0.5 + phi / (2.0 * PI), 0.5 + theta / PI);
    uv.x = fract(uv.x);

    gl_FragColor = texture2D(u_texture, uv);
  }
`;

export default function Panorama360Viewer({
  src,
  alt = "360° Panorama View",
  autoRotate: defaultAutoRotate = true,
  allowZoom = true,
  className = "",
  initialFov = 75,
  initialYaw = 0,
  initialPitch = 0,
  showControls = true,
  onExpand = null,
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const glRef = useRef(null);
  const programRef = useRef(null);
  const textureRef = useRef(null);
  const animFrameRef = useRef(null);

  const stateRef = useRef({
    yaw: (initialYaw * Math.PI) / 180,
    pitch: (initialPitch * Math.PI) / 180,
    fov: (initialFov * Math.PI) / 180,
    targetFov: (initialFov * Math.PI) / 180,
    vx: 0,
    vy: 0,
    isDragging: false,
    lastX: 0,
    lastY: 0,
    lastTime: 0,
    autoRotate: defaultAutoRotate,
    userInteracting: false,
    idleTimer: null,
  });

  const [isLoaded, setIsLoaded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(defaultAutoRotate);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    stateRef.current.autoRotate = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext("webgl", { alpha: false, depth: false, antialias: true }) ||
      canvas.getContext("experimental-webgl");

    if (!gl) {
      console.warn("WebGL not supported for 360 viewer");
      return;
    }
    glRef.current = gl;

    function createShader(glContext, type, source) {
      const shader = glContext.createShader(type);
      glContext.shaderSource(shader, source);
      glContext.compileShader(shader);
      if (!glContext.getShaderParameter(shader, glContext.COMPILE_STATUS)) {
        glContext.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vsShaderObj = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fsShaderObj = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    const program = gl.createProgram();
    gl.attachShader(program, vsShaderObj);
    gl.attachShader(program, fsShaderObj);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      return;
    }
    programRef.current = program;
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const aPosition = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const texture = gl.createTexture();
    textureRef.current = texture;
    gl.bindTexture(gl.TEXTURE_2D, texture);

    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([20, 20, 20, 255])
    );

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      if (!glRef.current) return;
      const glCtx = glRef.current;
      glCtx.bindTexture(glCtx.TEXTURE_2D, texture);
      glCtx.pixelStorei(glCtx.UNPACK_FLIP_Y_WEBGL, true);
      glCtx.texImage2D(glCtx.TEXTURE_2D, 0, glCtx.RGBA, glCtx.RGBA, glCtx.UNSIGNED_BYTE, img);

      const isPowerOf2 = (val) => (val & (val - 1)) === 0;
      if (isPowerOf2(img.width) && isPowerOf2(img.height)) {
        glCtx.generateMipmap(glCtx.TEXTURE_2D);
        glCtx.texParameteri(glCtx.TEXTURE_2D, glCtx.TEXTURE_MIN_FILTER, glCtx.LINEAR_MIPMAP_LINEAR);
        glCtx.texParameteri(glCtx.TEXTURE_2D, glCtx.TEXTURE_MAG_FILTER, glCtx.LINEAR);
        glCtx.texParameteri(glCtx.TEXTURE_2D, glCtx.TEXTURE_WRAP_S, glCtx.REPEAT);
        glCtx.texParameteri(glCtx.TEXTURE_2D, glCtx.TEXTURE_WRAP_T, glCtx.CLAMP_TO_EDGE);
      } else {
        glCtx.texParameteri(glCtx.TEXTURE_2D, glCtx.TEXTURE_MIN_FILTER, glCtx.LINEAR);
        glCtx.texParameteri(glCtx.TEXTURE_2D, glCtx.TEXTURE_MAG_FILTER, glCtx.LINEAR);
        glCtx.texParameteri(glCtx.TEXTURE_2D, glCtx.TEXTURE_WRAP_S, glCtx.CLAMP_TO_EDGE);
        glCtx.texParameteri(glCtx.TEXTURE_2D, glCtx.TEXTURE_WRAP_T, glCtx.CLAMP_TO_EDGE);
      }

      setIsLoaded(true);
    };
    img.src = src;

    let lastT = performance.now();
    const render = (time) => {
      const dt = Math.min((time - lastT) / 1000, 0.1);
      lastT = time;
      const s = stateRef.current;

      if (s.autoRotate && !s.isDragging && !s.userInteracting) {
        s.yaw += 0.08 * dt;
      }

      if (!s.isDragging) {
        s.yaw += s.vx * dt;
        s.pitch += s.vy * dt;
        s.vx *= Math.pow(0.05, dt);
        s.vy *= Math.pow(0.05, dt);
      }

      const maxPitch = (85 * Math.PI) / 180;
      s.pitch = Math.max(-maxPitch, Math.min(maxPitch, s.pitch));
      s.fov += (s.targetFov - s.fov) * 0.15;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayWidth = Math.floor(canvas.clientWidth * dpr);
      const displayHeight = Math.floor(canvas.clientHeight * dpr);
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, displayWidth, displayHeight);
      }

      gl.useProgram(program);
      const uRes = gl.getUniformLocation(program, "u_resolution");
      const uYaw = gl.getUniformLocation(program, "u_yaw");
      const uPitch = gl.getUniformLocation(program, "u_pitch");
      const uFov = gl.getUniformLocation(program, "u_fov");

      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uYaw, s.yaw);
      gl.uniform1f(uPitch, s.pitch);
      gl.uniform1f(uFov, s.fov);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (gl && texture) gl.deleteTexture(texture);
      if (gl && program) gl.deleteProgram(program);
    };
  }, [src]);

  const onPointerDown = useCallback((e) => {
    const s = stateRef.current;
    s.isDragging = true;
    s.userInteracting = true;
    s.vx = 0;
    s.vy = 0;
    s.lastX = e.clientX;
    s.lastY = e.clientY;
    s.lastTime = performance.now();
    setIsDragging(true);
    setHasInteracted(true);

    try {
      e.target.setPointerCapture(e.pointerId);
    } catch {}

    if (s.idleTimer) clearTimeout(s.idleTimer);
  }, []);

  const onPointerMove = useCallback((e) => {
    const s = stateRef.current;
    if (!s.isDragging) return;

    const dx = e.clientX - s.lastX;
    const dy = e.clientY - s.lastY;
    const now = performance.now();
    const dt = Math.max((now - s.lastTime) / 1000, 0.001);

    const sens = (s.fov / Math.PI) * 0.0035;
    s.yaw -= dx * sens;
    s.pitch += dy * sens;

    s.vx = (-dx * sens) / dt;
    s.vy = (dy * sens) / dt;

    s.lastX = e.clientX;
    s.lastY = e.clientY;
    s.lastTime = now;
  }, []);

  const onPointerUp = useCallback((e) => {
    const s = stateRef.current;
    s.isDragging = false;
    setIsDragging(false);
    try {
      e.target.releasePointerCapture(e.pointerId);
    } catch {}

    if (s.idleTimer) clearTimeout(s.idleTimer);
    s.idleTimer = setTimeout(() => {
      s.userInteracting = false;
    }, 2500);
  }, []);

  const onWheel = useCallback(
    (e) => {
      if (!allowZoom) return;
      e.preventDefault();
      const s = stateRef.current;
      const zoomDelta = e.deltaY * 0.0015;
      const minFov = (35 * Math.PI) / 180;
      const maxFov = (100 * Math.PI) / 180;
      s.targetFov = Math.max(minFov, Math.min(maxFov, s.targetFov + zoomDelta));
      setHasInteracted(true);
    },
    [allowZoom]
  );

  const zoomIn = () => {
    const s = stateRef.current;
    const minFov = (35 * Math.PI) / 180;
    s.targetFov = Math.max(minFov, s.targetFov - 0.18);
    setHasInteracted(true);
  };

  const zoomOut = () => {
    const s = stateRef.current;
    const maxFov = (100 * Math.PI) / 180;
    s.targetFov = Math.min(maxFov, s.targetFov + 0.18);
    setHasInteracted(true);
  };

  const resetView = () => {
    const s = stateRef.current;
    s.targetFov = (initialFov * Math.PI) / 180;
    s.yaw = (initialYaw * Math.PI) / 180;
    s.pitch = (initialPitch * Math.PI) / 180;
    s.vx = 0;
    s.vy = 0;
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`interoviz-panorama360-stage ${className} ${isFullscreen ? "is-fullscreen" : ""}`}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundColor: "#0a0a0a",
        cursor: "grab",
        touchAction: "none",
        userSelect: "none",
      }}
    >
      <canvas
        ref={canvasRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onWheel={onWheel}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          cursor: isDragging ? "grabbing" : "grab",
        }}
        aria-label={alt}
      />

      {!isLoaded && (
        <div className="interoviz-panorama360-loader">
          <div className="card-3d-spinner" />
          <span>Loading 360° VR Environment...</span>
        </div>
      )}

      <div className="interoviz-panorama360-badge">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20M12 2a14.5 14.5 0 0 1 0 20M2 12h20" />
        </svg>
        <span>360° LIVE VR</span>
      </div>

      {!hasInteracted && isLoaded && (
        <div className="interoviz-panorama360-prompt">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 11V7a5 5 0 0 1 10 0v4M4 11h16a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2z" />
          </svg>
          <span>Drag to orbit 360°</span>
        </div>
      )}

      {showControls && (
        <div className="interoviz-panorama360-controls" onClick={(e) => e.stopPropagation()}>
          <button
            className={`p360-btn ${autoRotate ? "is-active" : ""}`}
            onClick={() => setAutoRotate(!autoRotate)}
            title={autoRotate ? "Pause 360° Auto-Pan" : "Start 360° Auto-Pan"}
            aria-label="Toggle auto rotation"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
          </button>

          {allowZoom && (
            <>
              <button className="p360-btn" onClick={zoomIn} title="Zoom In" aria-label="Zoom in">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
              <button className="p360-btn" onClick={zoomOut} title="Zoom Out" aria-label="Zoom out">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
            </>
          )}

          <button className="p360-btn" onClick={resetView} title="Reset View" aria-label="Reset view">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
            </svg>
          </button>

          <button
            className="p360-btn"
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen 360° View"}
            aria-label="Toggle fullscreen"
          >
            {isFullscreen ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 3v3a2 2 0 0 1-2 2H3M21 8h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3M16 21v-3a2 2 0 0 1 2-2h3" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3" />
              </svg>
            )}
          </button>

          {onExpand && (
            <button
              className="p360-btn p360-btn--expand"
              onClick={onExpand}
              title="Open in Inspection Lightbox"
              aria-label="Open in Lightbox"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 3 21 3 21 9" />
                <polyline points="9 21 3 21 3 15" />
                <line x1="21" y1="3" x2="14" y2="10" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
