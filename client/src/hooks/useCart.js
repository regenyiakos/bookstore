import { useDispatch, useSelector } from 'react-redux';
import {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  selectCartItems,
  selectCartTotalQuantity,
  selectCartTotalPrice,
} from '@store/slices/cartSlice';

// Custom hook for cart management
export const useCart = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectCartTotalQuantity);
  const totalPrice = useSelector(selectCartTotalPrice);

  const add = item => dispatch(addItem(item));
  const remove = itemId => dispatch(removeItem(itemId));
  const update = (itemId, quantity) => dispatch(updateQuantity({ id: itemId, quantity }));
  const clear = () => dispatch(clearCart());

  return {
    items,
    totalQuantity,
    totalPrice,
    add,
    remove,
    update,
    clear,
  };
};
