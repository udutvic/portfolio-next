"use client";
import React from "react";
import createGlobe from "cobe";
import { useEffect, useRef } from "react";

export const Globe = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 800 * 2,
      height: 800 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 82000,
      mapBrightness: 8,
      baseColor: [0.1, 0.6, 1],
      markerColor: [0.8, 1, 1],
      glowColor: [0.5, 0.8, 1],
      markers:  [
        // longitude latitude
        { location: [50.0755, 14.4378], size: 0.05 },
{ location: [35.6895, 139.6917], size: 0.05},
{ location: [28.6139, 77.209], size: 0.05},
{ location: [51.5074, -0.1278], size: 0.05 },
{ location: [41.0082, 28.9784], size: 0.05 },
{ location: [40.7128, -74.006], size: 0.05 },
{ location: [37.7749, -122.4194], size: 0.05 },
{ location: [29.7604, -95.3698], size: 0.05 },
{ location: [50.4501, 30.5234], size: 0.05 },
{ location: [41.9028, 12.4964], size: 0.05 },
{ location: [40.4168, -3.7038], size: 0.05 },

        
    ],
      onRender: (state) => {
        // Called on every animation frame.
        // state will be an empty object, return updated params.
        state.phi = phi;
        phi += 0.002;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 800, height: 800, maxWidth: "100%", aspectRatio: 1 }}
      className={className}
    />
  );
};