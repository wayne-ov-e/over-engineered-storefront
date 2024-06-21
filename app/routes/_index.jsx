import styles from '~/styles/routes/_index.module.css';
import highResImage from '~/assets/images/DWOS_TRAY_01.webp';
import lowResImage from '~/assets/images/DWOS_TRAY_01_low-res.webp';
import Button from '~/components/Button.jsx';
import ProgressiveImage from '~/components/ProgressiveImage.jsx';

export function meta() {
    return [
        { title: 'ov_e' },
        { description: '' },
    ];
}

export default function Index() {
    return (
        <div>
            {/* Desktop */}
            <div className="max-[900px]:hidden">
                <div className={`${styles.main_grid}`}>
                    <div className='col-span-3 h-fit sticky mb-6 top-[9.302rem]'>
                        <h2 className='col-span-2'>The first release of DWOS<span className="align-super" style={{ fontSize: "smaller" }}>1</span>, providing a minimal and uncluttered solution for stationery organization.</h2>
                    </div>

                    <div
                        className={`${styles.image_container} col-start-4 col-span-3 overflow-auto max-h-[100%]`}
                    >
                        <ProgressiveImage
                            lowResSrc={lowResImage}
                            highResSrc={highResImage}
                            alt="Descriptive Alt Text"
                        />
                        <h4 className="mb-14 mt-2">DWOS_TRAY_01</h4>
                    </div>

                    <div className="col-start-7 h-fit sticky mb-6 top-[9.302rem]">
                        <p><span className="align-super" style={{ fontSize: "smaller" }}>1</span> DWOS stands for Domestic Workspace Organization System, despite the name we encourage our products to be used beyond the workspace.</p>
                    </div>
                </div>

                {/* <div className="col-start-2">
                    <p>The first release of DWOS<span className="align-super" style={{ fontSize: "smaller" }}>1</span>, providing a minimal and uncluttered solution for stationery organization.</p>
                    <p className="mt-2">Accommodates up to 5 delicate tools or writing instruments beyond just pens and screwdrivers. Perfect for paint brushes, tweezers, knitting needles, or crafting tools.</p>
                    <p className="mt-15">We designed a versatile modular storage solution that seamlessly integrates into various living areas. Offering endless configuration possibilities, it keeps your belongings organized and accessible, maximizing space and adapting to your unique style and needs.</p>
                </div> */}

            </div>

            {/* Mobile */}
            <div className="min-[901px]:hidden ml-[1.6rem] mr-[1.6rem] pt-[8.4rem] pb-[2rem]">
                <h2 className="mb-[2.4rem]">New release</h2>
                <p className="mb-[1.6rem]">The first release of DWOS, providing a minimal and uncluttered solution for stationery organization.</p>

                <ProgressiveImage
                    lowResSrc={lowResImage}
                    highResSrc={highResImage}
                    alt="Descriptive Alt Text"
                />

                <h4 className="mt-[0.4rem] mb-[2.4rem] text-[1.2rem]">DWOS_TRAY_01</h4>

                <p className="pb-[2.4rem]">Accommodates up to 5 delicate tools or writing instruments beyond just pens and screwdrivers. Perfect for paint brushes, tweezers, knitting needles, or crafting tools. </p>
            </div>
        </div>
    );
}
