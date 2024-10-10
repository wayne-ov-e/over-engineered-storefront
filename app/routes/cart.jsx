import { CartForm } from '@shopify/hydrogen';
import { json, useFetcher, useLoaderData, redirect } from '@remix-run/react';
import styles from '~/styles/routes/cart.module.css';
import { formatPrice } from '~/utils';

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
        case CartForm.ACTIONS.NoteUpdate:
            const note = String(inputs.note || '');
            result = await cart.updateNote(note);
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
    const fetcher = useFetcher();

    const updateCartNote = (event) => ({
        action: CartForm.ACTIONS.NoteUpdate,
        inputs: {
            note: event.target.value,
        }
    });

    const handleCheckout = () => {
        window.location.href = cart.checkoutUrl;
    }

    return (
        <div>
            {/* Desktop */}
            <div className="max-[900px]:hidden">
                {cart ? (
                    <div className={`${styles.main_grid}`}>
                        <div className={`${styles.child_grid_name_row} col-start-4 col-span-5 overflow-auto max-h-[100%] pb-2 mb-10`}>
                            <h3>Product Image</h3>
                            <h3 className='col-start-3'>Unique Identifier</h3>
                            <h3 className='col-start-4'>Quantity</h3>
                            <h3 className='col-start-5 text-right'>Total</h3>
                        </div>

                        {cart.lines.nodes.map((product) => {
                            return product.quantity > 0 ? (
                                <div
                                    key={product.id}
                                    className={`${styles.child_grid_item_row} col-start-4 col-span-5 overflow-auto max-h-[100%] mb-8`}
                                >
                                    <div className='col-start-1 col-span-1'>
                                        <img src={product.merchandise.product.drawing.reference.image.url} alt="aha" draggable="false" />
                                    </div>
                                    <div className='col-start-3 col-span-1'>
                                        <h4 className="mb-2">{product.merchandise.product.title}</h4>
                                        <h4 className="mb-2">-</h4>
                                        <h4 className="mb-2">${formatPrice(product.cost.amountPerQuantity.amount)} {product.cost.amountPerQuantity.currencyCode}</h4>
                                        <h5>{product.merchandise.title}</h5>
                                    </div>
                                    <div className='col-start-5 text-right'>
                                        <h4>${formatPrice(product.cost.totalAmount.amount)} {product.cost.totalAmount.currencyCode}</h4>
                                    </div>
                                </div>
                            ) : undefined;
                        })}

                        <div className={`${styles.child_grid_name_row} col-start-4 col-span-5 overflow-auto max-h-[100%] mt-2 mb-15`}></div>
                        <div className={`${styles.child_grid_item_row} col-start-4 col-span-5 overflow-auto max-h-[100%] mb-12`}>
                            <div className='col-start-1 col-span-1 flex flex-col'>
                                <h5 className='mb-3'>order notes & instructions</h5>
                                <textarea
                                    type='text'
                                    name='note'
                                    className={`${styles.note_area} flex-1`}
                                    onBlur={(event) => {
                                        fetcher.submit(
                                            {
                                                [CartForm.INPUT_NAME]: JSON.stringify(updateCartNote(event)),
                                            },
                                            { method: 'POST', action: '/cart' },
                                        );
                                    }}
                                ></textarea>
                            </div>

                            <div className='col-start-5'>
                                <div className='flex justify-between mb-6'>
                                    <h4>SUBTOTAL</h4>
                                    <h4 className='ml-5 text-right'>${cart.cost.subtotalAmount.amount} {cart.cost.subtotalAmount.currencyCode}</h4>
                                </div>
                                <h5 className='mb-6'>Shipping and tax will be calculated in checkout</h5>
                                <button className={`${styles.button}`} onClick={handleCheckout}>Checkout</button>
                            </div>
                        </div>
                    </div>) : (
                    <div className={`${styles.main_grid}`}>
                        <div className={`col-start-4 col-span-5 overflow-auto max-h-[100%] mt-20`}>
                            <h2>There's nothing here...yet.</h2>
                            <h2 className='mt-4 opacity-60'>There's nothing here...yet.</h2>
                            <h2 className='mt-4 opacity-20'>There's nothing here...yet.</h2>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}