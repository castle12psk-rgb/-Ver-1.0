import React, { useEffect, useRef } from 'react';

declare const L: any;

interface LeafletMapProps {
  outbreaks: any[];
  onMarkerClick: (outbreak: any) => void;
  selectedOutbreak: any | null;
  center: [number, number];
  zoom: number;
  onMapReady: (map: any) => void;
}

const LeafletMap: React.FC<LeafletMapProps> = ({ outbreaks, onMarkerClick, selectedOutbreak, center, zoom, onMapReady }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: center,
        zoom: zoom,
        zoomControl: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      mapRef.current = map;
      onMapReady(map);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [center, zoom, onMapReady]);

  useEffect(() => {
    if (mapRef.current) {
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];

      outbreaks.forEach(outbreak => {
        const isSelected = selectedOutbreak?.id === outbreak.id;
        const markerSize = isSelected ? (outbreak.size || 16) * 1.5 : (outbreak.size || 16);
        const pulseClass = outbreak.pulse && !isSelected ? 'leaflet-marker-icon-pulse' : '';
        const selectedClass = isSelected ? 'is-selected' : '';

        const iconHtml = `
          <div class="leaflet-marker-icon-container">
            <div class="${pulseClass}" style="background-color: ${outbreak.riskColor};"></div>
            <div class="leaflet-marker-icon-dot" style="background-color: ${outbreak.riskColor};"></div>
          </div>
        `;

        const customIcon = L.divIcon({
          html: iconHtml,
          className: `custom-leaflet-marker ${selectedClass}`,
          iconSize: [markerSize, markerSize],
          iconAnchor: [markerSize / 2, markerSize / 2],
        });

        const marker = L.marker([outbreak.lat, outbreak.lng], { icon: customIcon }).addTo(mapRef.current);
        marker.on('click', () => {
          onMarkerClick(outbreak);
        });
        markersRef.current.push(marker);
      });
    }
  }, [outbreaks, onMarkerClick, selectedOutbreak]);

  return (
    <>
      <style>{`
        .leaflet-container { 
          height: 100%; 
          width: 100%; 
          background-color: #f0f9ff;
        }
        .custom-leaflet-marker {
            background: none;
            border: none;
        }
        .leaflet-marker-icon-container {
            position: relative;
            width: 100%;
            height: 100%;
        }
        .leaflet-marker-icon-dot {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 1px 3px rgba(0,0,0,0.4);
            transition: all 0.2s ease-in-out;
        }
        .custom-leaflet-marker.is-selected .leaflet-marker-icon-dot {
            border: 3px solid #1E88E5;
            box-shadow: 0 0 12px rgba(30, 136, 229, 0.8);
        }
        .leaflet-marker-icon-pulse {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            animation: pulse-animation 2s infinite;
            opacity: 0.75;
        }
        @keyframes pulse-animation {
            0% { transform: scale(0.95); opacity: 0.7; }
            70% { transform: scale(2.5); opacity: 0; }
            100% { transform: scale(0.95); opacity: 0; }
        }
      `}</style>
      <div ref={mapContainerRef} />
    </>
  );
};

export default LeafletMap;
