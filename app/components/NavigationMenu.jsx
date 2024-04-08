import styles from '~/styles/components/NavigationMenu.module.css';
import { motion } from 'framer-motion';
import { useLoaderData } from '@remix-run/react';

export default function NavigationMenu() {
    const { productList } = useLoaderData();
    const { products } = productList;

    console.log(products);
    return (
        <div className={`${styles.table} -z-10`}>
            <div className={`${styles.table_name_row} mb-[0.625rem]`}>
                <h3>Unique Identifier</h3>
                <h3 className='col-start-3'>Description</h3>
                <h3 className='col-start-5'>Product System</h3>
                <h3 className='col-start-6'>Year</h3>
                <h3 className='col-start-7'>Production Stage</h3>
            </div>

            {products.nodes.map((product) => {
                return (
                    <div className={`${styles.table_item_row} pt-[0.375rem]`} key={product.id}>
                        <h4>{product.title}</h4>
                        <h3 className='col-start-3 col-span-2'>{product.shortDescription.value}</h3>
                        <h3 className='col-start-5'>{product.productSystem.value}</h3>
                        <h3 className='col-start-6'>{product.productYear.value}</h3>
                        <h3 className='col-start-7'></h3>
                    </div>
                );
            })}
        </div>
    );
};