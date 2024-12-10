import React from "react";
import createGlobe from "cobe";
import { useEffect, useRef, useState } from "react";

interface Marker {
  location: [number, number];
  size: number;
  name: string;
}

interface Point2D {
  x: number;
  y: number;
  visible: boolean;
}

export const Globe = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [labelPositions, setLabelPositions] = useState<Point2D[]>([]);
  const [markers] = useState<Marker[]>([
    { location: [50.0755, 14.4378], size: 0.05, name: "Prague" },
    { location: [35.6895, 139.6917], size: 0.05, name: "Tokyo" },
    { location: [28.6139, 77.209], size: 0.05, name: "New Delhi" },
    { location: [51.5074, -0.1278], size: 0.05, name: "London" },
    { location: [41.0082, 28.9784], size: 0.05, name: "Istanbul" },
    { location: [40.7128, -74.006], size: 0.05, name: "New York" },
    { location: [37.7749, -122.4194], size: 0.05, name: "San Francisco" },
    { location: [29.7604, -95.3698], size: 0.05, name: "Houston" },
    { location: [50.4501, 30.5234], size: 0.05, name: "Kyiv" },
    { location: [41.9028, 12.4964], size: 0.05, name: "Rome" },
    { location: [40.4168, -3.7038], size: 0.05, name: "Madrid" },
  ]);

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
      mapSamples: 64000,
      mapBrightness: 8,
      baseColor: [0.1, 0.6, 1],
      markerColor: [0.8, 1, 1],
      glowColor: [0.5, 0.8, 1],
      markers: markers.map((marker) => ({
        location: marker.location,
        size: marker.size,
      })),
      onRender: (state) => {
        state.phi = phi;
        phi += 0.002;

        if (wrapperRef.current) {
          const canvas = wrapperRef.current;
          const width = canvas.clientWidth;
          const height = canvas.clientHeight;
          const radius = Math.min(width, height) * 0.4;

          const newPositions = markers.map((marker) => {
            const [lat, lon] = marker.location;

            // Convert to radians
            const latRad = (lat * Math.PI) / 180;
            const lonRad = (lon * Math.PI) / 180;

            // Calculate 3D position
            const cosLat = Math.cos(latRad);
            const sinLat = Math.sin(latRad);
            const cosLon = Math.cos(lonRad + phi);
            const sinLon = Math.sin(lonRad + phi);

            const x = cosLat * cosLon;
            const y = sinLat;
            const z = cosLat * sinLon;

            // Check if point is visible (in front of the globe)
            const visible = z <= 0;

            // Project onto 2D screen with adjusted radius
            const scale = radius * 1.05;
            const projectedX = width / 2 + x * scale;
            const projectedY = height / 2 - y * scale;

            return {
              x: projectedX,
              y: projectedY,
              visible,
            };
          });

          setLabelPositions(newPositions);
        }
      },
    });

    return () => {
      globe.destroy();
    };
  }, [markers]);

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "relative",
        width: 800,
        height: 800,
        maxWidth: "100%",
      }}
      className={className}
    >
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", aspectRatio: 1 }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        {labelPositions.map((pos, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              left: `${pos.x}px`,
              top: `${pos.y}px`,
              transform: "translate(-50%, -50%)",
              color: "white",
              fontSize: "12px",
              fontWeight: "bold",
              textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
              whiteSpace: "nowrap",
              opacity: pos.visible ? 1 : 0,
              pointerEvents: "none",
              userSelect: "none",
              padding: "1px 3px",
              backgroundColor: "rgba(0,0,0,0.3)",
              borderRadius: "3px",
              transition: "opacity 0.2s ease-in-out",
            }}
          >
            {markers[index].name}
          </div>
        ))}
      </div>
    </div>
  );
};
