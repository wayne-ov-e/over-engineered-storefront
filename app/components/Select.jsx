import styles from '~/styles/components/Select.module.css';
import { Link } from '@remix-run/react';

function Select({ option }) {
    return (
        <div className='relative'>
            <select className={`${styles.select} !outline-none w-full`} name={option.name} id={option.name} defaultValue={option.values[0].value}>
                {option.values.map(({ value, isAvailable, to, isActive }) => {
                    return (
                        <option key={value} value={value} disabled={!isAvailable}>{value}</option>
                    );
                })}
            </select>
            <svg className={`${styles.select_caret}`} aria-hidden="true" focusable="false" role="presentation" viewBox="0 0 10 6">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" fill="currentColor">
                </path>
            </svg>
        </div>
    );
}

export default Select;
