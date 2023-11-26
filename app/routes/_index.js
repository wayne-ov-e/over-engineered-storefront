import styles from '~/styles/routes/_index.module.css';
import {Image} from '@shopify/hydrogen-react';
import landing from '~/assets/images/DWOS_TRAY_01.webp';

export function meta() {
  return [
    {title: 'OV_E'},
    {description: 'WELL'},
  ];
}

export default function Index() {
  return (
    <div className={styles.main_grid}>
      <h2>Under<br></br>Construction</h2>

      <div className="col-start-2">
        <p>We are dedicated to delivering a distinctive and unparalleled online experience to you.</p>
        <p className="mt-2">In the meantime, we invite you to explore and purchase our products through our esteemed retail partner.</p>
      </div>

      <div
        className={`${styles.image_container} col-start-3 col-span-3 overflow-auto max-h-[100%]`}
      >
        <img
          className="mb-[3rem]"
          src={landing}
        />
      </div>

      <div className="col-start-6">
        <p><span className="align-super" style={{ fontSize: "smaller" }}>1</span> DWOS stands for Domestic Workspace Organization System, despite the name we encourage our products to be used even beyond the workspace.</p>
      </div>
    </div>
  );
}
