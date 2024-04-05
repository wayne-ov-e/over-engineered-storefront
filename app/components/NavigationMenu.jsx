import styles from '~/styles/components/NavigationMenu.module.css';
import { motion } from 'framer-motion';
import { useLoaderData } from '@remix-run/react';
import { json } from '@shopify/remix-oxygen';

export async function loader({ context }) {
    const { products } = await context.storefront.query(PRODUCTS_QUERY);

    console.log(products);
    return json({
        products: products.nodes,
    })
}

export default function NavigationMenu() {
    const { products } = useLoaderData();
    return (
        <div className={`${styles.table} -z-10`}>
            <div className={`${styles.table_name_row}`}>
                <h3>Unique Identifier</h3>
                <h3 className='col-start-3'>Description</h3>
                <h3 className='col-start-5'>Product System</h3>
                <h3 className='col-start-6'>Year</h3>
                <h3 className='col-start-7'>Production Stage</h3>
            </div>
        </div>
    );
};

const PRODUCTS_QUERY = `#graphql
    query Products {
        products(first: 3) {
            nodes {
                id
                title
                handle
                description
                productYear: metafield(namespace: "custom", key: "product_year") {
                    value
                }
            }
        }
    }
`;