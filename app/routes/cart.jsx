import { CartForm } from '@shopify/hydrogen';
import { json } from '@remix-run/react';

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
            break;
    }

    // The Cart ID might change after each mutation, so update it each time.
    const headers = cart.setCartId(result.cart.id);

    return json(
        result,
        { status: 200, headers },
    );
}