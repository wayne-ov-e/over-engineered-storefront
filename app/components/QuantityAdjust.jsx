import { json } from '@remix-run/server-runtime';
import { CartForm } from '@shopify/hydrogen';
import styles from '~/styles/components/QuantityAdjust.module.css';
import { useState, useEffect } from 'react';

function QuantityAdjust({ fetcher, quantity, lineId, updateQuantity }) {
    // Local state to handle optimistic UI updates
    const [localQuantity, setLocalQuantity] = useState(quantity);

    // Sync local state with the quantity prop when it changes (e.g., from server updates)
    useEffect(() => {
        setLocalQuantity(quantity);
    }, [quantity]);

    // Function to validate and submit the updated quantity to the server
    const handleQuantityChange = (newQuantity) => {
        // Check if the new quantity is a valid number greater than or equal to 1
        if (newQuantity < 0 || isNaN(newQuantity)) return;

        // Optimistically update the local state
        setLocalQuantity(newQuantity);

        // Submit the new quantity to the server
        fetcher.submit(
            {
                [CartForm.INPUT_NAME]: JSON.stringify(updateQuantity({ target: { value: newQuantity } }, lineId)),
            },
            { method: 'POST', action: '/cart' },
        );
    };

    return (
        <div className={`${styles.wrapper}`}>
            <div
                className={`${styles.minus}`}
                onClick={() => handleQuantityChange(localQuantity - 1)}
            >
                -
            </div>
            <input
                className={`${styles.quantity_input}`}
                type='number'
                value={localQuantity}
                onChange={(event) => handleQuantityChange(parseInt(event.target.value, 10))}
            />
            <div
                className={`${styles.plus}`}
                onClick={() => handleQuantityChange(localQuantity + 1)}
            >
                +
            </div>
        </div>
    );
};

export default QuantityAdjust;