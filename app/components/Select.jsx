import styles from '~/styles/components/Select.module.css';
import { Link, useNavigate } from '@remix-run/react';
import { useState } from 'react';

function Select({ option }) {
    const navigate = useNavigate();
    let defaultValue = option.values.find(({ isActive }) => isActive)?.to || option.values[0].to;

    const handleChange = (event) => {
        const selectedRoute = event.target.value;
        if (selectedRoute) {
            navigate(selectedRoute);
        }
    };

    return (
        <div className='relative'>
            <select
                className={`${styles.select} !outline-none w-full`}
                name={option.name}
                id={option.name}
                defaultValue={defaultValue}
                onChange={handleChange}
            >
                {option.values.map(({ value, isAvailable, to, isActive }) => {
                    return (
                        <option key={value} value={to} disabled={!isAvailable}>{value}</option>
                    );
                })}
            </select>
            <svg className={`${styles.select_caret}`} aria-hidden="true" focusable="false" role="presentation" viewBox="0 0 10 6">
                <path fillRule="evenodd" clipRule="evenodd" d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" fill="currentColor">
                </path>
            </svg>
        </div>
    );
}

export default Select;
