import { useLoaderData } from '@remix-run/react';
import styles from '~/styles/routes/products.$handle.module.css';
import { json } from '@shopify/remix-oxygen';
import ProgressiveImage from '~/components/ProgressiveImage.jsx';
import Button from '~/components/Button.jsx'
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
                    <div className='col-span-2 h-fit sticky mb-6 top-[9.302rem]'>
                        <div className={`${styles.child_grid} col-span-2 mb-10`}>
                            <div className='col-span-2'>
                                <h2-n>{handle}</h2-n>
                            </div>
                            <div className='col-start-4'>
                                <p>$ 76.00 CAD</p>
                            </div>
                        </div>

                        <div className={`${styles.child_grid} col-span-2 mb-16`}>
                            <p className='text-drizzle'>Description</p>
                            <div className='col-start-2 col-span-3'>
                                <p>The first release of DWOS<span className="align-super" style={{ fontSize: "smaller" }}>1</span>, providing a minimal and uncluttered solution for stationery organization.</p>
                                <p className="mt-2">Accommodates up to 5 delicate tools or writing instruments beyond just pens and screwdrivers. Perfect for paint brushes, tweezers, knitting needles, or crafting tools.</p>
                            </div>
                        </div>

                        <div className={`${styles.child_grid} col-span-2 mb-6`}>
                            <p className='text-drizzle'>Specifications</p>
                            <div className='col-start-2 col-span-3'>
                                <div className={`${styles.mini_grid} mb-1`}>
                                    <p>Model</p>
                                    <p className='col-span-2'>DWOS_TRAY_01</p>
                                </div>
                                <div className={`${styles.mini_grid} mb-1`}>
                                    <p>Year</p>
                                    <p className='col-span-2'>2023</p>
                                </div>
                                <div className={`${styles.mini_grid} mb-1`}>
                                    <p>Material</p>
                                    <p className='col-span-2'>Aluminum 6063 / Silicone</p>
                                </div>
                                <div className={`${styles.mini_grid}`}>
                                    <p>Collection</p>
                                    <p className='col-span-2'>Domestic Workspace
                                        Organization System (DWOS)</p>
                                </div>
                            </div>
                        </div>

                        <div className={`${styles.child_grid} col-span-2 mb-6`}>
                            <p className='text-drizzle'>Shipping</p>
                            <p className='col-start-2 col-span-3'>Shipped within 2 business days</p>
                        </div>

                        <div className={`${styles.child_grid} col-span-2 mb-6`}>
                            <p></p>
                            <div className='col-start-2 col-span-3'>
                                <Button
                                    text="Add to cart"
                                />
                            </div>
                        </div>
                    </div>

                    <div
                        className={`${styles.image_container} col-start-3 col-span-3 overflow-auto max-h-[100%]`}
                    >
                        <ProgressiveImage
                            className="mb-6"
                            lowResSrc={lowResImage}
                            highResSrc={highResImage}
                            alt="Descriptive Alt Text"
                        />

                        <ProgressiveImage
                            className="mb-12"
                            lowResSrc={lowResImage}
                            highResSrc={highResImage}
                            alt="Descriptive Alt Text"
                        />
                    </div>

                    <div className='col-start-6 col-span-1 h-fit sticky mb-12 top-[9.302rem]'>
                        <p>We designed a versatile modular storage solution that seamlessly integrates into various living areas. Offering endless configuration possibilities, it keeps your belongings organized and accessible, maximizing space and adapting to your unique style and needs.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
