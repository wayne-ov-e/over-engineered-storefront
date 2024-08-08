import { CartForm } from '@shopify/hydrogen';
import { json, useLoaderData } from '@remix-run/react';
import styles from '~/styles/routes/cart.module.css';
import svg1 from '~/assets/images/DWOS_TRAY_01.svg';
import { useMoney } from '@shopify/hydrogen';

export async function action({ request, context }) {
    const { cart } = context;

    const formData = await request.formData();
    const { action, inputs } = CartForm.getFormInput(formData);

    let result;

    switch (action) {
        case CartForm.ACTIONS.LinesAdd:
            result = await cart.addLines(inputs.lines);
            break;
        case CartForm.ACTIONS.LinesUpdate:
            result = await cart.updateLines(inputs.lines);
            break;
        case CartForm.ACTIONS.LinesRemove:
            result = await cart.removeLines(inputs.lineIds);
            break;
        default:
            throw new Response(null, { status: 500 });
    }

    // The Cart ID might change after each mutation, so update it each time.
    const headers = cart.setCartId(result.cart.id);

    return json(
        result,
        { status: 200, headers },
    );
}

export async function loader({ params, context }) {
    const { cart } = context;

    return json(await cart.get());
}

export default function Cart() {
    const cart = useLoaderData();
    const productsInCart = cart.lines.nodes;

    return (
        <div>
            {/* Desktop */}
            <div className="max-[900px]:hidden">
                <div className={`${styles.main_grid}`}>
                    <div className={`${styles.child_grid_name_row} col-start-4 col-span-5 overflow-auto max-h-[100%] pb-2 mb-10`}>
                        <h3>Product Image</h3>
                        <h3 className='col-start-3'>Unique Identifier</h3>
                        <h3 className='col-start-4'>Quantity</h3>
                        <h3 className='col-start-5 text-right'>Total</h3>
                    </div>

                    {productsInCart.map((product) => {
                        const { amountPerQuantity } = product.cost;

                        return product.quantity > 0 ? (
                            <div
                                key={product.id}
                                className={`${styles.child_grid_item_row} col-start-4 col-span-5 overflow-auto max-h-[100%] mb-8`}
                            >
                                <div className='col-start-1 col-span-1'>
                                    <img src={product.merchandise.product.drawing.reference.image.url} alt="aha" draggable="false" />
                                </div>
                                <div className='col-start-3 col-span-1'>
                                    <h4 className="mb-4">{product.merchandise.product.title}</h4>
                                    <h4 className="mb-2">{ }</h4>
                                    <h5>{product.merchandise.title}</h5>
                                </div>
                                <div className='col-start-5 text-right'>
                                    <h4>$76.00 CAD</h4>
                                </div>
                            </div>
                        ) : undefined;
                    })}
                    {/* <div className={`${styles.child_grid_item_row} col-start-4 col-span-5 overflow-auto max-h-[100%]`}>
                        <div className='col-start-1 col-span-1'>
                            <img src={svg1} alt="aha" draggable="false" />
                        </div>
                        <div className='col-start-3 col-span-1'>
                            <h4 className="mb-3">DWOS_TRAY_01</h4>
                            <h4>$76.00 CAD</h4>
                        </div>
                        <div className='col-start-5 text-right'>
                            <h4>$76.00 CAD</h4>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}