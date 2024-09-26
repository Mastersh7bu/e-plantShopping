import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      // Convert cost from string to number and multiply by quantity
      const itemCost = parseFloat(item.cost.replace('$', '')) * item.quantity;
      return total + itemCost; // Accumulate total cost
    }, 0).toFixed(2); // Return total cost formatted to 2 decimal places
  };

  const handleContinueShopping = (e) => {
    e.preventDefault(); // Prevent default button behavior
    onContinueShopping(); // Call the function passed from the parent component
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 })); // Increment quantity
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 })); // Decrement quantity
    } else {
      dispatch(removeItem(item.name)); // Remove item if quantity is 0
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name)); // Dispatch removeItem action to remove the item from the cart
  };

  const handleAddBackToCart = (item) => {
    dispatch(addItem(item)); // Dispatch addItem action to add the item back to the cart
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    // Convert cost from string to number and multiply by quantity
    return (parseFloat(item.cost.replace('$', '')) * item.quantity).toFixed(2); // Return total cost formatted to 2 decimal places
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


