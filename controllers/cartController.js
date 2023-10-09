const Cart = require('./../models/cartModel');
// const Factory = require('./handlerFactory');

const AppError = require('./../utils/appError');

exports.addItemToCart = async (request, response, next) => {
    try {
        const { userId, productId, quantity, price } = request.body;

        // Check if the product and userId is provided by user
        if(!userId || !productId || !quantity || !price)
            return next(new AppError('userId, productId, quantity or price is required', 404));

        // Check if the cart exists for the given user
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            // If the cart doesn't exist, create a new one
            cart = await Cart.create({ userId, items: [] });
        }

        // Check if the item already exists in the cart
        const existingItem = cart.items.find(
            (item) => item.product.toString() === productId
        );

        if (existingItem) {
            // If the item exists, update its quantity
            await Cart.updateOne(
                { _id: cart._id, 'items.product': productId },
                { $inc: { 'items.$.quantity': quantity } }
            );
        } else {
            // If the item doesn't exist, add it to the cart
            await Cart.updateOne(
                { _id: cart._id },
                { $push: { items: { product: productId, quantity, price } } }
            );
        }

        // Fetch the updated cart after the update
        cart = await Cart.findById(cart._id);

        response.status(200).json({
            status: 'success',
            data: cart
        });
    } catch (error) {
        error.statusCode = 404;
        next(error);
    }
};