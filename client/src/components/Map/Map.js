import { useState, useRef } from 'react';
import GoogleMapReact from 'google-map-react';
import styles from './Map.module.css';
import useSupercluster from 'use-supercluster';

const Map = ({ stats }) => {
  const mapRef = useRef();
  const [zoom, setZoom] = useState(4);
  const [bounds, setBounds] = useState(null);

  const LocationPin = ({ children }) => children;

  const points = stats.map((stat) => ({
    type: 'Feature',
    properties: {
      cluster: false,
      id: stat.id,
      name: stat.name,
    },
    geometry: { type: 'Point', coordinates: [stat.lon, stat.lat] },
  }));

  const { clusters } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 20 },
  });

  return (
    <div>
      <h2>Points of Interest</h2>

      <div className={styles.GoogleMap}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.NEXT_PUBLIC_REACT_GOOGLE_API_KEY,
          }}
          defaultCenter={{ lat: 45, lng: -100 }}
          defaultZoom={4}
          yesIWantToUseGoogleMapApiInternalsonGoogleApiLoaded={({ map }) => {
            mapRef.current = map;
          }}
          onChange={({ zoom, bounds }) => {
            setZoom(zoom);
            setBounds([
              bounds.nw.lng,
              bounds.se.lat,
              bounds.se.lng,
              bounds.nw.lat,
            ]);
          }}
        >
          {clusters.map((cluster) => {
            const [longitude, latitude] = cluster.geometry.coordinates;
            const {
              cluster: isCluster,
              point_count: pointCount,
            } = cluster.properties;
            if (isCluster) {
              return (
                <LocationPin
                  key={`cluster-${cluster.id}`}
                  lat={latitude}
                  lng={longitude}
                >
                  <div className={styles.Pin}>{pointCount}</div>
                </LocationPin>
              );
            }
            return (
              <LocationPin
                key={`id-${cluster.properties.id}`}
                lat={latitude}
                lng={longitude}
              >
                <div className={styles.Pin}>{cluster.properties.name}</div>
              </LocationPin>
            );
          })}
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default Map;
