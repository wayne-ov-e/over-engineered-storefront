import React, { useState, useEffect } from 'react';
import styles from '~/styles/components/ProgressiveImage.module.css';

export default function ProgressiveImage({ lowResSrc, highResSrc, alt, className }) {
    const [highResImageLoaded, setHighResImageLoaded] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = highResSrc;
        img.onload = () => {
            setHighResImageLoaded(true);
        };
    }, [highResSrc]);

    return (
        <div className={`${styles.image_container} ${className}`}>
            <img
                src={lowResSrc}
                alt={alt}
                width="100%"
                height="auto"
                style={{ display: highResImageLoaded ? 'none' : 'block' }}
            />
            {highResImageLoaded && (
                <img
                    src={highResSrc}
                    alt={alt}
                    width="100%"
                    height="auto"
                    style={{ display: 'block' }}
                />
            )}
        </div>
    );
}
