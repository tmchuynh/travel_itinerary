import { useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import styles from './component.module.scss';

const MapComponent = ({ center }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
          })
        })
      ],
      view: new View({
        center: center || [33.8076787,-117.9731417],
        zoom: 5
      })
    });

    return () => {
      map.setTarget(null);
    };
  }, [center]);

  return <div ref={mapRef} className={styles.map} />;
};

export default MapComponent;
