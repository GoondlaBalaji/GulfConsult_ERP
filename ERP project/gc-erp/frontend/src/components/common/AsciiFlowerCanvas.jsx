import React, { useEffect, useRef } from 'react';

/**
 * AsciiFlowerCanvas
 * Renders a procedural 3D blooming flower converted into real-time ASCII characters,
 * matching the Framer ASCII Video Effect aesthetic.
 * Positioned on the right / bottom-right with full dark and light theme support.
 */
export default function AsciiFlowerCanvas({
  theme = 'dark',
  charSet = ' .:;!i?u01$#@',
  contrast = 1.9,
  resolutionWidth = 145,
  resolutionHeight = 92,
  interactive = true,
  className = '',
}) {
  const containerRef = useRef(null);
  const hiddenCanvasRef = useRef(null);
  const visibleCanvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  const isDark = theme === 'dark';
  const chars = React.useMemo(() => charSet.split(''), [charSet]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!interactive) return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      mouseRef.current.targetX = nx;
      mouseRef.current.targetY = ny;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [interactive]);

  useEffect(() => {
    const hiddenCanvas = hiddenCanvasRef.current;
    const visibleCanvas = visibleCanvasRef.current;
    const container = containerRef.current;
    if (!hiddenCanvas || !visibleCanvas || !container) return;

    const hCtx = hiddenCanvas.getContext('2d', { willReadFrequently: true });
    const vCtx = visibleCanvas.getContext('2d');
    if (!hCtx || !vCtx) return;

    hiddenCanvas.width = resolutionWidth;
    hiddenCanvas.height = resolutionHeight;

    const resizeVisibleCanvas = () => {
      const rect = container.getBoundingClientRect();
      visibleCanvas.width = Math.floor(rect.width);
      visibleCanvas.height = Math.floor(rect.height);
    };

    resizeVisibleCanvas();
    const resizeObserver = new ResizeObserver(() => resizeVisibleCanvas());
    resizeObserver.observe(container);

    let startTime = performance.now();
    let isVisible = true;

    const onVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    // Color cache for quick lookup
    // Dark mode: Eerie Black (#212223) + Pumpkin Orange (#FE7F2D)
    // Light mode: Warm Beige (#F4ECE1) + Rich Pumpkin Orange & Terracotta
    const darkColorCache = new Array(256);
    const lightColorCache = new Array(256);

    for (let i = 0; i < 256; i++) {
      const t = i / 255;

      // Dark Mode: glowing pumpkin orange (#FE7F2D) into golden amber
      let dr, dg, db;
      if (t < 0.65) {
        const sub = t / 0.65;
        dr = Math.floor(55 + sub * (254 - 55));
        dg = Math.floor(18 + sub * (127 - 18));
        db = Math.floor(10 + sub * (45 - 10));
      } else {
        const sub = (t - 0.65) / 0.35;
        dr = 254 + Math.floor(sub * (255 - 254));
        dg = Math.floor(127 + sub * (210 - 127));
        db = Math.floor(45 + sub * (140 - 45));
      }
      darkColorCache[i] = `rgb(${dr},${dg},${db})`;

      // Light Mode: rich, punchy pumpkin orange (#FE7F2D) & deep terracotta for crisp contrast on beige
      let lr, lg, lb;
      if (t < 0.5) {
        const sub = t / 0.5;
        // Deep burnt terracotta / mahogany for shadow contours
        lr = Math.floor(120 + sub * (220 - 120));
        lg = Math.floor(45 + sub * (95 - 45));
        lb = Math.floor(12 + sub * (25 - 12));
      } else {
        const sub = (t - 0.5) / 0.5;
        // Vibrant saturated pumpkin orange (#FE7F2D) for lit petal areas
        lr = Math.floor(220 + sub * (254 - 220));
        lg = Math.floor(95 + sub * (135 - 95));
        lb = Math.floor(25 + sub * (50 - 25));
      }
      lightColorCache[i] = `rgb(${lr},${lg},${lb})`;
    }

    const render = (now) => {
      if (!isVisible) {
        animFrameRef.current = requestAnimationFrame(render);
        return;
      }

      const elapsed = (now - startTime) * 0.001;

      // Smooth mouse lerping
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

      // 1. Draw 3D Shaded Flower on offscreen hidden canvas
      hCtx.fillStyle = '#000000';
      hCtx.fillRect(0, 0, resolutionWidth, resolutionHeight);

      // Ambient background particles / cybernetic digital noise (subtle)
      const particleSeed = Math.floor(elapsed * 4);
      for (let p = 0; p < 28; p++) {
        const px = ((p * 47 + particleSeed * 11) % resolutionWidth);
        const py = ((p * 31 + particleSeed * 7) % resolutionHeight);
        hCtx.fillStyle = 'rgba(45, 45, 50, 0.4)';
        hCtx.fillRect(px, py, 1, 1);
      }

      // Flower Center & Scale: Anchored on the right / bottom-right
      const flowerCenterX = resolutionWidth * 0.68;
      const flowerCenterY = resolutionHeight * 0.58;
      const baseFlowerScale = Math.min(resolutionWidth, resolutionHeight) * 0.38;

      // 3D Rotations
      const rotY = elapsed * 0.28 + mouseX * 0.45;
      const rotX = 0.52 + Math.sin(elapsed * 0.35) * 0.12 - mouseY * 0.35;
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      // Light direction vector (from top-left-front)
      const lx = -0.45;
      const ly = -0.65;
      const lz = -0.62;
      const lLen = Math.hypot(lx, ly, lz);
      const nlx = lx / lLen;
      const nly = ly / lLen;
      const nlz = lz / lLen;

      // Helper to project 3D point (x, y, z) into screen (sx, sy, depth)
      const project = (x, y, z) => {
        // Rotate around Y
        const x1 = x * cosY + z * sinY;
        const z1 = -x * sinY + z * cosY;
        // Rotate around X
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;

        const distance = 4.2;
        const pz = z2 + distance;
        const fov = 3.6;
        const factor = fov / Math.max(1.0, pz);

        const sx = flowerCenterX + x1 * factor * baseFlowerScale;
        const sy = flowerCenterY + y2 * factor * baseFlowerScale;
        return { sx, sy, z: z2 };
      };

      // Draw Stem and calyx curving down towards bottom-right
      hCtx.strokeStyle = 'rgba(160, 160, 160, 0.8)';
      hCtx.lineWidth = 2.2;
      hCtx.beginPath();
      const stemStart = project(0, 0.2, 0);
      const stemMid = project(0.15, 0.9, 0.2);
      const stemEnd = project(0.35, 1.8, 0.4);
      hCtx.moveTo(stemStart.sx, stemStart.sy);
      hCtx.quadraticCurveTo(stemMid.sx, stemMid.sy, stemEnd.sx, stemEnd.sy);
      hCtx.stroke();

      // Flower Petals Layers: Concentric whorls from outer to inner
      const layers = [
        { petals: 13, radius: 1.15, tilt: 0.85, width: 0.42, curl: 0.28, lift: 0.12 },
        { petals: 11, radius: 0.98, tilt: 0.72, width: 0.38, curl: 0.32, lift: 0.05 },
        { petals: 9,  radius: 0.82, tilt: 0.58, width: 0.34, curl: 0.35, lift: -0.02 },
        { petals: 8,  radius: 0.65, tilt: 0.42, width: 0.30, curl: 0.38, lift: -0.08 },
        { petals: 7,  radius: 0.48, tilt: 0.28, width: 0.25, curl: 0.42, lift: -0.14 },
        { petals: 6,  radius: 0.32, tilt: 0.15, width: 0.20, curl: 0.45, lift: -0.20 },
      ];

      // Collect all petal polygon patches to sort by depth (Painter's algorithm)
      const polygons = [];
      const bloomCycle = 1.0 + Math.sin(elapsed * 0.8) * 0.04;

      layers.forEach((layer, layerIdx) => {
        const { petals, radius: rawRadius, tilt, width: rawWidth, curl, lift } = layer;
        const radius = rawRadius * bloomCycle;
        const widthScale = rawWidth;
        const layerAngleOffset = layerIdx * 0.38;

        for (let pIdx = 0; pIdx < petals; pIdx++) {
          const petalBaseAngle = (pIdx / petals) * Math.PI * 2 + layerAngleOffset;
          const uSteps = 6;
          const vSteps = 4;

          // Build a curved 3D grid of points for this petal
          const grid = [];
          for (let u = 0; u <= uSteps; u++) {
            const uFrac = u / uSteps;
            const r = uFrac * radius;

            // Scalloped wavy edge profile matching reference
            const edgeWiggle = 1.0 + 0.18 * Math.sin(uFrac * Math.PI * 4);
            const w = widthScale * Math.sin(Math.pow(uFrac, 0.65) * Math.PI) * edgeWiggle;

            const row = [];
            for (let v = 0; v <= vSteps; v++) {
              const vFrac = (v / vSteps) * 2 - 1; // -1 to 1

              // Local Petal Coordinates
              const localX = vFrac * w;
              const localY = -r * Math.cos(tilt) + (uFrac * uFrac * curl) + lift;
              const localZ = r * Math.sin(tilt) + (1 - Math.abs(vFrac) * 0.5) * 0.15 * Math.sin(uFrac * Math.PI);

              // Rotate in petal plane around base angle
              const cosA = Math.cos(petalBaseAngle);
              const sinA = Math.sin(petalBaseAngle);
              const worldX = localX * cosA - localZ * sinA;
              const worldY = localY;
              const worldZ = localX * sinA + localZ * cosA;

              row.push({
                x: worldX,
                y: worldY,
                z: worldZ,
                u: uFrac,
                v: vFrac,
                proj: project(worldX, worldY, worldZ)
              });
            }
            grid.push(row);
          }

          // Generate quads from the grid
          for (let u = 0; u < uSteps; u++) {
            for (let v = 0; v < vSteps; v++) {
              const p00 = grid[u][v];
              const p10 = grid[u + 1][v];
              const p11 = grid[u + 1][v + 1];
              const p01 = grid[u][v + 1];

              // Normal vector estimation
              const e1x = p10.x - p00.x;
              const e1y = p10.y - p00.y;
              const e1z = p10.z - p00.z;
              const e2x = p01.x - p00.x;
              const e2y = p01.y - p00.y;
              const e2z = p01.z - p00.z;

              let nx = e1y * e2z - e1z * e2y;
              let ny = e1z * e2x - e1x * e2z;
              let nz = e1x * e2y - e1y * e2x;
              const nLen = Math.hypot(nx, ny, nz) || 1;
              nx /= nLen;
              ny /= nLen;
              nz /= nLen;

              // Lighting calculations
              const dot = -(nx * nlx + ny * nly + nz * nlz);
              const diffuse = Math.max(0, dot);
              const ambient = 0.22 + (1.0 - (layerIdx / layers.length)) * 0.18;
              const tipHighlight = Math.pow(p11.u, 1.4) * 0.35;
              const totalLight = Math.min(1.0, ambient + diffuse * 0.7 + tipHighlight);

              // Average depth for sorting
              const avgZ = (p00.proj.z + p10.proj.z + p11.proj.z + p01.proj.z) * 0.25;

              polygons.push({
                pts: [p00.proj, p10.proj, p11.proj, p01.proj],
                avgZ,
                light: totalLight,
                u: p00.u
              });
            }
          }
        }
      });

      // Sort polygons from back to front
      polygons.sort((a, b) => b.avgZ - a.avgZ);

      // Render polygon patches on offscreen canvas
      for (let i = 0; i < polygons.length; i++) {
        const poly = polygons[i];
        const val = Math.floor(poly.light * 255);
        hCtx.fillStyle = `rgb(${val}, ${val}, ${val})`;
        hCtx.beginPath();
        hCtx.moveTo(poly.pts[0].sx, poly.pts[0].sy);
        hCtx.lineTo(poly.pts[1].sx, poly.pts[1].sy);
        hCtx.lineTo(poly.pts[2].sx, poly.pts[2].sy);
        hCtx.lineTo(poly.pts[3].sx, poly.pts[3].sy);
        hCtx.closePath();
        hCtx.fill();
      }

      // Center core / stamen glowing disk
      const centerProj = project(0, -0.22, 0);
      const radGrad = hCtx.createRadialGradient(
        centerProj.sx,
        centerProj.sy,
        1,
        centerProj.sx,
        centerProj.sy,
        baseFlowerScale * 0.18
      );
      radGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      radGrad.addColorStop(0.5, 'rgba(210, 210, 210, 0.6)');
      radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      hCtx.fillStyle = radGrad;
      hCtx.beginPath();
      hCtx.arc(centerProj.sx, centerProj.sy, baseFlowerScale * 0.18, 0, Math.PI * 2);
      hCtx.fill();

      // 2. Read Pixel Data & Convert to ASCII on Visible Canvas
      try {
        const imgData = hCtx.getImageData(0, 0, resolutionWidth, resolutionHeight);
        const data = imgData.data;

        const vWidth = visibleCanvas.width;
        const vHeight = visibleCanvas.height;

        // Clear visible canvas
        // Dark mode: Eerie Black (#212223)
        // Light mode: Warm Beige (#F4ECE1)
        vCtx.fillStyle = isDark ? '#212223' : '#F4ECE1';
        vCtx.fillRect(0, 0, vWidth, vHeight);

        const cellWidth = vWidth / resolutionWidth;
        const cellHeight = vHeight / resolutionHeight;
        const fontSize = Math.max(9, Math.min(cellWidth * 1.45, cellHeight * 1.45));

        vCtx.font = `bold ${fontSize}px 'Courier New', Courier, monospace`;
        vCtx.textAlign = 'center';
        vCtx.textBaseline = 'middle';

        const charsLen = chars.length;
        const colorCache = isDark ? darkColorCache : lightColorCache;

        for (let y = 0; y < resolutionHeight; y++) {
          const posY = y * cellHeight + cellHeight * 0.5;
          const rowOffset = y * resolutionWidth;

          for (let x = 0; x < resolutionWidth; x++) {
            const posX = x * cellWidth + cellWidth * 0.5;
            const idx = (rowOffset + x) * 4;

            let brightness = 0.2126 * data[idx] + 0.7152 * data[idx + 1] + 0.0722 * data[idx + 2];

            // Contrast enhancement
            if (contrast !== 1.0) {
              brightness = ((brightness / 255 - 0.5) * contrast + 0.5) * 255;
              if (brightness < 0) brightness = 0;
              if (brightness > 255) brightness = 255;
            }

            // Background subtle grid matrix characters in warm orange
            if (brightness <= 14) {
              // Faint ambient dots/grid on empty background
              if ((x + y * 2) % 6 === 0) {
                const ambientChar = (x % 3 === 0) ? '.' : (y % 4 === 0) ? ':' : '·';
                vCtx.fillStyle = isDark ? 'rgba(254, 127, 45, 0.12)' : 'rgba(232, 93, 4, 0.11)';
                vCtx.fillText(ambientChar, posX, posY);
              }
              continue;
            }

            // Map brightness to ASCII character
            const charIdx = Math.floor((brightness / 255) * (charsLen - 1));
            const char = chars[charIdx] || ' ';

            // Select color based on theme
            const colorIndex = Math.min(255, Math.max(0, Math.floor(brightness)));
            vCtx.fillStyle = colorCache[colorIndex];
            vCtx.fillText(char, posX, posY);
          }
        }
      } catch (err) {
        console.error('ASCII rendering error:', err);
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      resizeObserver.disconnect();
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [resolutionWidth, resolutionHeight, chars, contrast, isDark, theme]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none ${className}`}
      style={{
        backgroundColor: isDark ? '#212223' : '#F4ECE1',
      }}
    >
      {/* Hidden offscreen canvas for frame synthesis */}
      <canvas
        ref={hiddenCanvasRef}
        className="absolute w-px h-px opacity-0 pointer-events-none"
        aria-hidden="true"
      />
      {/* Visible high-DPI ASCII Canvas */}
      <canvas
        ref={visibleCanvasRef}
        className="w-full h-full block"
      />
    </div>
  );
}
