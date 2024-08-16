import { useLoaderData, Link, redirect } from '@remix-run/react';
import styles from '~/styles/routes/products.$handle.module.css';
import { json } from '@shopify/remix-oxygen';
import ProgressiveImage from '~/components/ProgressiveImage.jsx';
import Button from '~/components/Button.jsx'
import { formatPrice } from '~/utils';
import { VariantSelector, getSelectedProductOptions, CartForm, Image } from '@shopify/hydrogen';
import Select from '~/components/Select';

export async function loader({ params, context, request }) {
    const selectedOptions = getSelectedProductOptions(request);
    const { handle } = params;

    const { product } = await context.storefront.query(PRODUCT_QUERY, {
        variables: {
            handle, // Pass the handle to the GraphQL query
            selectedOptions,
        },
    });

    if (!product?.id) {
        throw new Response(null, { status: 404 });
    }

    //code to redirect to first variant by default
    if (!product?.selectedVariant) {
        const searchParams = new URLSearchParams(new URL(request.url).search);
        const firstVariant = product.variants.edges[0].node;

        for (const option of firstVariant.selectedOptions) {
            searchParams.set(option.name, option.value);
        }

        throw redirect(
            `/products/${product?.handle}?${searchParams.toString()}`,
            302, // Make sure to use a 302, because the first variant is subject to change
        );
    }

    return json({
        product
    });
}

export default function ProductHandle() {
    const { product } = useLoaderData();
    const price = formatPrice(product.variants.edges[0].node.price.amount);
    const { descriptionHtml } = product;
    const model = product.variants.edges[0].node.sku;

    return (
        <div>
            {/* Desktop */}
            <div className="max-[900px]:hidden">
                <div className={`${styles.main_grid}`}>
                    <div className='col-span-3 h-fit sticky mb-12 top-[9.302rem]'>
                        <div className={`${styles.child_grid}`}>
                            <VariantSelector
                                handle={product.handle}
                                options={product.options}
                                variants={product.variants}
                            >
                                {({ option }) => (
                                    <>
                                        <Select option={option}></Select>
                                    </>
                                )}
                            </VariantSelector>
                            <CartForm
                                className="col-span-1 col-start-2"
                                route="/cart"
                                action={CartForm.ACTIONS.LinesAdd}
                                inputs={{
                                    lines: [
                                        {
                                            merchandiseId: product.selectedVariant?.id,
                                        },
                                    ]
                                }}
                            >
                                <button
                                    className={`${styles.button}`}
                                    text="add to cart"
                                >add to cart</button>
                            </CartForm>
                            <div className='flex flex-col'>
                                <h4 className='mt-1'>{product.title}</h4>
                                <h4 className="mt-3">${price}</h4>
                            </div>
                        </div>

                        <div className={`${styles.child_grid} mt-15`}>
                            <div className={`${styles.mini_grid} col-span-2`} dangerouslySetInnerHTML={{ __html: descriptionHtml }}></div>
                            <div>
                                <h5>{product.material?.value}</h5>
                                <h5>{product.secondaryMaterial?.value}</h5>
                                <h5>{product.dimensions?.value}</h5>
                                <h5 className='mt-3'>Domestic Workspace<br></br>Organization System<br></br>(DWOS)</h5>
                            </div>
                        </div>

                        <h5 className='mt-8'>Shipped within 2 business days</h5>
                    </div>

                    <div
                        className={`${styles.image_container} col-start-4 col-span-3 overflow-auto max-h-[100%] mb-6`}
                    >
                        {product.images.nodes.map(image => {
                            return (
                                <Image className='mb-6' data={image} key={image.id}></Image>
                            );
                        })}
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
    query product(
        $handle: String!
        $selectedOptions: [SelectedOptionInput!]!
    ) {
        product(handle: $handle) {
            id
            title
            handle
            vendor
            descriptionHtml
            images(first: 10) {
                nodes {
                    altText
                    height
                    id
                    url
                    width
                }
            }
            productYear: metafield(namespace: "custom", key: "product_year") {
                value
            }
            productSystem: metafield(namespace: "custom", key: "product_system") {
                value
            }
            productCollection: metafield(namespace: "custom", key: "product_collection") {
                value
            }
            productCollectionLong: metafield(namespace: "custom", key: "product_collection_long") {
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
            secondaryMaterial: metafield(namespace: "custom", key: "secondary_material") {
                value
            }
            dimensions: metafield(namespace: "custom", key: "dimensions") {
                value
            }
            weight: metafield(namespace: "custom", key: "weight") {
                value
            }
            options {
                name
                values
                optionValues {
                    name
                    id
                }
            }
            selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions) {
                id
            }
            variants(first: 10) {
                edges {
                    node {
                        id
                        price {
                            amount
                        }
                        sku
                        quantityAvailable
                        availableForSale
                        selectedOptions {
                            name
                            value
                        }
                    }
                }
            }
        }
    }
`;

const PRODUCT_IMAGE_QUERY = `#graphql
    query product(
        $handle: String!
        $selectedOptions: [SelectedOptionInput!]!
    ) {
        product(handle: $handle) {
            images(first: 10) {
                nodes {
                    altText
                    height
                    id
                    url
                    width
                }
            }
        }
    }
`;