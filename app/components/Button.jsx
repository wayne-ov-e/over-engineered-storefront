import styles from '~/styles/components/Button.module.css';
import {Link} from '@remix-run/react';

function Button({ to, text, style }) {
    return (
      <Link to={to} className={`${styles.button} ${style}`}>
            <span>{text}</span>
      </Link>
    );
}

export default Button;
