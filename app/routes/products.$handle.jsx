import { useLoaderData } from '@remix-run/react';
import styles from '~/styles/routes/products.$handle.module.css';
import { json } from '@shopify/remix-oxygen';
import ProgressiveImage from '~/components/ProgressiveImage.jsx';
import highResImage from '~/assets/images/DWOS_TRAY_01.webp';
import lowResImage from '~/assets/images/DWOS_TRAY_01_low-res.webp';

export function loader({ params }) {
    const { handle } = params;

    return json({
        handle
    });
}

export default function ProductHandle() {
    const { handle } = useLoaderData();

    return (
        <div>
            {/* Desktop */}
            <div className="max-[900px]:hidden">
                <div className={`${styles.main_grid}`}>
                    <div
                        className={`${styles.image_container} col-start-3 col-span-3 overflow-auto max-h-[100%]`}
                    >
                        <ProgressiveImage
                            lowResSrc={lowResImage}
                            highResSrc={highResImage}
                            alt="Descriptive Alt Text"
                        />
                        <h4 className="mb-14 mt-2">DWOS_TRAY_01</h4>
                    </div>
                </div>

                <div className={`${styles.fixed_grid} mt-[9.302rem]`}>
                    <h2-n>{handle}</h2-n>
                </div>
            </div>
        </div>
    );
}
