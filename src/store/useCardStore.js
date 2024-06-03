import {create} from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
    persist(
      (set) => ({
        cart: [],
        totalPrice: 0,
        addToCart: (product) => set((state) => {
          const existingProduct = state.cart.find(item => item.id === product.id);
          const productPrice = parseFloat(product.price);
          if (existingProduct) {
            return {
              cart: state.cart.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
              ),
              totalPrice: state.totalPrice + productPrice
            };
          } else {
            return {
              cart: [...state.cart, { ...product, quantity: 1 }],
              totalPrice: state.totalPrice + productPrice
            };
          }
        }),
        removeFromCart: (productId) => set((state) => {
          const productToRemove = state.cart.find(item => item.id === productId);
          return {
            cart: state.cart.filter(item => item.id !== productId),
            totalPrice: state.totalPrice - (parseFloat(productToRemove.price) * productToRemove.quantity)
          };
        }),
        incrementQuantity: (productId) => set((state) => {
          const productToUpdate = state.cart.find(item => item.id === productId);
          return {
            cart: state.cart.map(item =>
              item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
            ),
            totalPrice: state.totalPrice + parseFloat(productToUpdate.price)
          };
        }),
        decrementQuantity: (productId) => set((state) => {
          const productToUpdate = state.cart.find(item => item.id === productId);
          if (productToUpdate.quantity === 1) {
            return {
              cart: state.cart.filter(item => item.id !== productId),
              totalPrice: state.totalPrice - parseFloat(productToUpdate.price)
            };
          }
          return {
            cart: state.cart.map(item =>
              item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
            ),
            totalPrice: state.totalPrice - parseFloat(productToUpdate.price)
          };
        }),
      }),
      {
        name: 'cart-storage',
        getStorage: () => localStorage,
      }
    )
  );
  
  export default useCartStore;