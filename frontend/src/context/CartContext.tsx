import { ReactNode, createContext, useContext, useState } from 'react';
import {CartItem} from '../types/cart'

interface CartContextType{

    cart: CartItem[];
    addToCart: (item: CartItem)=> void; 
    removeFromCart:(bookID: number) => void;
    clearCart: () => void;

}

const CartContext = createContext<CartContextType | undefined >(undefined);

export const CartProvider = ({children}: {children: ReactNode})=> {

    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
      
        
        setCart((prevCart)=> {
            const existingItem = prevCart.find((c) => c.bookID === item.bookID);
            //Builds an updated cart if there's new iteams.
            const updatedCart = prevCart.map((c) => 
                c.bookID === item.bookID? {...c, quantityAmount: c.quantityAmount + item.quantityAmount} : c

            );

            return existingItem ? updatedCart :   [...prevCart, item]
        });
    };

        //Function to remove stuff from Cart
    const removeFromCart = (bookID: number) => {
        setCart((prevCart) => prevCart.filter((c) => c.bookID === bookID));
    }

    const clearCart = () => {
        setCart(() = []);
    };

    return(
        <CartContext.Provider value ={{cart, addToCart, removeFromCart, clearCart}}>

            {children}
        </CartContext.Provider>
    )

};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context){
        throw new Error ("useCart must be used within a CartProvider")
    }
    return context; 
}