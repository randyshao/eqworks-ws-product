import { useState, useRef } from 'react';
import GoogleMapReact from 'google-map-react';
import styles from './Map.module.css';

const Map = ({ stats }) => {
  const mapRef = useRef();
  const [zoom, setZoom] = useState(4);
  const [bounds, setBounds] = useState(null);

  const LocationPin = ({ children }) => children;

  return (
    <div className={styles.map}>
      <h2 className={styles.mapH2}></h2>

      <div className={styles.GoogleMap}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_GOOGLE_API_KEY }}
          defaultCenter={{ lat: 45, lng: -100 }}
          defaultZoom={4}
        >
          {stats.map((stat) => (
            <LocationPin key={stat.id} lat={stat.lat} lng={stat.lon}>
              <button>POI</button>
            </LocationPin>
          ))}
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default Map;
