import styles from '~/styles/routes/_index.module.css';
import highResImage from '~/assets/images/DWOS_TRAY_01.webp';
import lowResImage from '~/assets/images/DWOS_TRAY_01_low-res.webp';
import Button from '~/components/Button.jsx';
import ProgressiveImage from '~/components/ProgressiveImage.jsx';

export function meta() {
  return [
    {title: 'OV_E'},
    {description: 'WELL'},
  ];
}

export default function Index() {
  return (
  <div>
    <div className={`${styles.main_grid}`}>
      <div
        className={`${styles.image_container} col-start-3 col-span-3 overflow-auto max-h-[100%]`}
      >
        <ProgressiveImage
          lowResSrc={lowResImage}
          highResSrc={highResImage}
          alt="Descriptive Alt Text"
        />
        <h3 className="mb-14 mt-2">DWOS_TRAY_01</h3>
      </div>
    </div>

    <div className={`${styles.fixed_grid} mt-[9.3rem]`}>
      <h2>Under<br></br>Construction</h2>

      <div className="col-start-2">
        <p>We are dedicated to delivering a distinctive and unparalleled online experience to you.</p>
        <p className="mt-2">In the meantime, we invite you to explore and purchase our products through our esteemed retail partner.</p>
        <Button
          to="https://sortdays.com/"
          style="mt-8"
          text="Retail partner"
        />
      </div>

      <div className="col-start-6">
        <p><span className="align-super" style={{ fontSize: "smaller" }}>1</span> DWOS stands for Domestic Workspace Organization System, despite the name we encourage our products to be used even beyond the workspace.</p>
      </div>
    </div>
  </div>
  );
}
