import styles from '~/styles/components/NavigationMenu.module.css';
import { motion } from 'framer-motion';
import { useLoaderData } from '@remix-run/react';

export default function NavigationMenu() {
    const { productList } = useLoaderData();
    console.log(productList.products);

    return (
        <div className={`${styles.table} -z-10`}>
            <div className={`${styles.table_name_row} mb-1`}>
                <h3>Unique Identifier</h3>
                <h3 className='col-start-3'>Description</h3>
                <h3 className='col-start-5'>Product System</h3>
                <h3 className='col-start-6'>Year</h3>
                <h3 className='col-start-7'>Production Stage</h3>
            </div>

            {/* {products.nodes.map((product) => {
                return (
                    <h3></h3>
                );
            })} */}
        </div>
    );
};