import styles from '~/styles/components/Button.module.css';
import { Link } from '@remix-run/react';
import { motion } from 'framer-motion';

// Define the animation variants
const buttonVariants = {
    hover: {
        scale: 1.02,
        opacity: 0.9,
        transition: {
            type: 'tween',
            ease: 'easeInOut',
        },
    }
};

function Button({ to, text, style }) {
    return (
        <motion.div
            variants={buttonVariants}
            whileHover="hover"
        >
            <Link to={to} className={`${styles.button} ${style}`}>
                <span>{text}</span>
            </Link>
        </motion.div>
    );
}

export default Button;
