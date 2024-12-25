// "use client";
// import React, { useEffect, useRef, useState, useMemo } from "react";
// import createGlobe from "cobe";
// import { debounce } from "lodash";

// export const Globe = () => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const phi = useRef(0);

//   // Оптимізована функція для обчислення розміру
//   const calculateSize = () => {
//     if (typeof window === "undefined") {
//       return {
//         width: 1600,
//         height: 1600,
//         devicePixelRatio: 2,
//       };
//     }
//     const isLargeScreen = window.innerWidth >= 498;
//     const size = isLargeScreen ? 800 * 2 : 600 * 2;
//     return {
//       width: size,
//       height: size,
//       devicePixelRatio: isLargeScreen ? 2 : 4,
//     };
//   };

//   const size = useMemo(() => calculateSize(), []);
//   const [currentSize, setCurrentSize] = useState(size);

//   useEffect(() => {
//     if (typeof window === "undefined") return;

//     const handleResize = debounce(() => {
//       const newSize = calculateSize();
//       setCurrentSize((prevSize) =>
//         prevSize.width === newSize.width && prevSize.height === newSize.height
//           ? prevSize
//           : newSize
//       );
//     }, 200);

//     window.addEventListener("resize", handleResize);
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   useEffect(() => {
//     let lastRenderTime = 0;
//     const frameInterval = 1000 / 60; // 60 FPS

//     if (!canvasRef.current) return;

//     const globe = createGlobe(canvasRef.current, {
//       devicePixelRatio: currentSize.devicePixelRatio,
//       width: currentSize.width,
//       height: currentSize.height,
//       phi: 0,
//       theta: 0,
//       dark: 1,
//       diffuse: 1.2,
//       mapSamples: 40000, // Знижено кількість вибірок
//       mapBrightness: 8,
//       baseColor: [0.1, 0.6, 1],
//       markerColor: [0.8, 1, 1],
//       glowColor: [0.5, 0.8, 1],
//       markers: [
//         { location: [50.0755, 14.4378], size: 0.05 }, // Prague
//         { location: [35.6895, 139.6917], size: 0.05 }, // Tokyo
//         { location: [28.6139, 77.209], size: 0.05 }, // Delhi
//         { location: [51.5074, -0.1278], size: 0.05 }, // London
//         { location: [41.0082, 28.9784], size: 0.05 }, // Istanbul
//         { location: [40.7128, -74.006], size: 0.05 }, // New York
//         { location: [37.7749, -122.4194], size: 0.05 }, // San Francisco
//         { location: [29.7604, -95.3698], size: 0.05 }, // Houston
//         { location: [50.4501, 30.5234], size: 0.05 }, // Kyiv
//         { location: [41.9028, 12.4964], size: 0.05 }, // Rome
//         { location: [40.4168, -3.7038], size: 0.05 }, // Madrid
//       ],
//       onRender: (state) => {
//         const now = performance.now();
//         if (now - lastRenderTime >= frameInterval) {
//           lastRenderTime = now;
//           state.phi = phi.current;
//           phi.current += 0.002;
//         }
//       },
//     });

//     return () => {
//       globe.destroy();
//     };
//   }, [currentSize]);

//   return (
//     <canvas
//       ref={canvasRef}
//       className="lg:w-[800px] lg:h-[800px] md:w-[600px] md:h-[600px] max-w-full aspect-[1/1]"
//     />
//   );
// };

"use client";
import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import createGlobe from "cobe";
import debounce from "lodash/debounce";

export const Globe = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phi = useRef(0);

  const calculateSize = useMemo(() => {
    if (typeof window === "undefined") {
      return { width: 1600, height: 1600, devicePixelRatio: 2 };
    }
    const isLargeScreen = window.innerWidth >= 498;
    const size = isLargeScreen ? 800 * 2 : 600 * 2;
    return { width: size, height: size, devicePixelRatio: isLargeScreen ? 2 : 4 };
  }, []);

  const [currentSize, setCurrentSize] = useState(calculateSize);

  const handleResize = useCallback(
    debounce(() => {
      const newSize = calculateSize;
      setCurrentSize((prevSize) =>
        prevSize.width === newSize.width && prevSize.height === newSize.height
          ? prevSize
          : newSize
      );
    }, 200),
    [calculateSize]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: currentSize.devicePixelRatio,
      width: currentSize.width,
      height: currentSize.height,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 40000,
      mapBrightness: 8,
      baseColor: [0.1, 0.6, 1],
      markerColor: [0.8, 1, 1],
      glowColor: [0.5, 0.8, 1],
      markers: [
        { location: [50.0755, 14.4378], size: 0.05 }, // Prague
        { location: [35.6895, 139.6917], size: 0.05 }, // Tokyo
        { location: [28.6139, 77.209], size: 0.05 }, // Delhi
        { location: [51.5074, -0.1278], size: 0.05 }, // London
        { location: [41.0082, 28.9784], size: 0.05 }, // Istanbul
        { location: [40.7128, -74.006], size: 0.05 }, // New York
        { location: [37.7749, -122.4194], size: 0.05 }, // San Francisco
        { location: [29.7604, -95.3698], size: 0.05 }, // Houston
        { location: [50.4501, 30.5234], size: 0.05 }, // Kyiv
        { location: [41.9028, 12.4964], size: 0.05 }, // Rome
        { location: [40.4168, -3.7038], size: 0.05 }, // Madrid
      ],
      onRender: (state) => {
        state.phi = phi.current;
        phi.current += 0.002;
      },
    });

    return () => globe.destroy();
  }, [currentSize]);

  return (
    <canvas
      ref={canvasRef}
      className="lg:w-[800px] lg:h-[800px] md:w-[600px] md:h-[600px] max-w-full aspect-[1/1]"
    />
  );
};
