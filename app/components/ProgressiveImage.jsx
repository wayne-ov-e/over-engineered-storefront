import React, { useState, useEffect } from 'react';
import styles from '~/styles/components/ProgressiveImage.module.css';

export default function ProgressiveImage({ lowResSrc, highResSrc, alt }) {
  const [highResImageLoaded, setHighResImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = highResSrc;
    img.onload = () => {
      setHighResImageLoaded(true);
    };
  }, [highResSrc]);

  return (
    <div className="image-container">
      <img
        src={lowResSrc}
        alt={alt}
        style={{ display: highResImageLoaded ? 'none' : 'block' }}
      />
      {highResImageLoaded && (
        <img
          src={highResSrc}
          alt={alt}
          style={{ display: 'block' }}
        />
      )}
    </div>
  );
}
