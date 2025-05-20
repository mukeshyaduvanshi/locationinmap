'use client';

import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/Map'), { ssr: false });

const locations = [
  { lat: 28.61573020427658, lng: 77.36630261836713, label: 'Store 1' },
  { lat: 28.660011454288572, lng: 77.19158694212344, label: 'Store 2' },
  { lat: 28.657048856575695, lng: 77.19332435467433, label: 'Store 3' },
    { lat: 28.6139, lng: 77.2090, label: 'Delhi' },
  { lat: 19.0760, lng: 72.8777, label: 'Mumbai' },
  { lat: 13.0827, lng: 80.2707, label: 'Chennai' },
   { lat: 22.5726, lng: 88.3639, label: 'Kolkata' },
];

export default function Locations() {
  return (
    <div>
      <Map locations={locations} />
    </div>
  );
}
