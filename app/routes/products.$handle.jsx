import { useLoaderData } from '@remix-run/react';
import styles from '~/styles/routes/products.$handle.module.css';
import { json } from '@shopify/remix-oxygen';
import ProgressiveImage from '~/components/ProgressiveImage.jsx';
import Button from '~/components/Button.jsx'
import highResImage from '~/assets/images/DWOS_TRAY_01.webp';
import lowResImage from '~/assets/images/DWOS_TRAY_01_low-res.webp';
import { formatPrice } from '~/utils';

export async function loader({ params, context }) {
    const { handle } = params;
    const { product } = await context.storefront.query(PRODUCT_QUERY, {
        variables: {
            handle, // Pass the handle to the GraphQL query
        },
    });

    if (!product?.id) {
        throw new Response(null, { status: 404 });
    }

    return json({
        product
    });
}

export default function ProductHandle() {
    const { product } = useLoaderData();
    console.log(product)
    const price = formatPrice(product.variants.edges[0].node.price.amount);
    const { descriptionHtml } = product;
    const model = product.variants.edges[0].node.sku;

    return (
        <div>
            {/* Desktop */}
            <div className="max-[900px]:hidden">
                <div className={`${styles.main_grid}`}>
                    <div className='col-span-2 h-fit sticky mb-6 top-[9.302rem]'>
                        <div className={`${styles.child_grid} col-span-2 mb-10`}>
                            <div className='col-span-2'>
                                <h2-n>{product.title}</h2-n>
                            </div>
                            <div className='col-start-4'>
                                <p>$ {price} CAD</p>
                            </div>
                        </div>

                        <div className={`${styles.child_grid} col-span-2 mb-15`}>
                            <p className='text-drizzle'>Description</p>
                            <div className='col-start-2 col-span-3' dangerouslySetInnerHTML={{ __html: descriptionHtml }}></div>
                        </div>

                        <div className={`${styles.child_grid} col-span-2 mb-6`}>
                            <p className='text-drizzle'>Specifications</p>
                            <div className='col-start-2 col-span-3'>
                                <div className={`${styles.mini_grid} mb-1`}>
                                    <p>Model</p>
                                    <p className='col-span-2'>{model}</p>
                                </div>
                                <div className={`${styles.mini_grid} mb-1`}>
                                    <p>Year</p>
                                    <p className='col-span-2'>{product.productYear.value}</p>
                                </div>
                                <div className={`${styles.mini_grid} mb-1`}>
                                    <p>Material</p>
                                    <p className='col-span-2'>{product.material.value}</p>
                                </div>
                                <div className={`${styles.mini_grid} mb-1`}>
                                    <p>Dimensions</p>
                                    <p className='col-span-2'>{product.dimensions.value}<br></br>({product.dimensionsMetric.value})</p>
                                </div>
                                <div className={`${styles.mini_grid}`}>
                                    <p>Collection</p>
                                    <p className='col-span-2'>{product.productCollection.value}</p>
                                </div>
                            </div>
                        </div>

                        <div className={`${styles.child_grid} col-span-2 mb-15`}>
                            <p className='text-drizzle'>Shipping</p>
                            <p className='col-start-2 col-span-3'>Shipped within 2 business days</p>
                        </div>

                        <div className={`${styles.child_grid} col-span-2 mb-6`}>
                            <p></p>
                            <div className='col-start-2 col-span-3'>
                                <Button
                                    text="Add to cart"
                                />
                            </div>
                        </div>
                    </div>

                    <div
                        className={`${styles.image_container} col-start-4 col-span-3 overflow-auto max-h-[100%]`}
                    >
                        <ProgressiveImage
                            className="mb-6"
                            lowResSrc={lowResImage}
                            highResSrc={highResImage}
                            alt="Descriptive Alt Text"
                        />

                        <ProgressiveImage
                            className="mb-12"
                            lowResSrc={lowResImage}
                            highResSrc={highResImage}
                            alt="Descriptive Alt Text"
                        />
                    </div>

                    <div className='col-span-1 h-fit sticky mb-12 top-[9.302rem]'>
                        <p>We designed a versatile modular storage solution that seamlessly integrates into various living areas. Offering endless configuration possibilities, it keeps your belongings organized and accessible, maximizing space and adapting to your unique style and needs.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

const PRODUCT_QUERY = `#graphql
    query product($handle: String!) {
        product(handle: $handle) {
            id
            title
            handle
            vendor
            descriptionHtml
            productYear: metafield(namespace: "custom", key: "product_year") {
                value
            }
            productSystem: metafield(namespace: "custom", key: "product_system") {
                value
            }
            productCollection: metafield(namespace: "custom", key: "product_collection") {
                value
            }
            shortDescription: metafield(namespace: "custom", key: "short_description") {
                value
            }
            productionStage: metafield(namespace: "custom", key: "production_stage") {
                value
            }
            material: metafield(namespace: "custom", key: "material") {
                value
            }
            dimensions: metafield(namespace: "custom", key: "dimensions") {
                value
            }
            dimensionsMetric: metafield(namespace: "custom", key: "dimensions_metric_") {
                value
            }
            weight: metafield(namespace: "custom", key: "weight") {
                value
            }
            variants(first: 1) {
                edges {
                    node {
                        price {
                            amount
                        }
                        sku
                    }
                }
            }
        }
    }
`;