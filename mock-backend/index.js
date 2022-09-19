import React from "react";
import { initalBalance, initialItems, Item } from "./data";
import { executePurchase } from "./purchase";

// type UseCheckout = {
//   items: Item[];

//   /**
//    * Charges the current account with the `price` in USD and decrements an item's inventory
//    *
//    * @throws if the current account does not have enough or if no inventory
//    *
//    */
//   buy: (itemId: Item['id']) => Promise<void>;
// };

export const useCheckout = () => {
  // @TODO: Not implemented
  const [balance, setBalance] = React.useState(initalBalance);
  const [items, setItems] = React.useState(initialItems);
  const store = React.useRef(null);

  React.useEffect(() => {
    if (!store.current) {
      console.log("setting the ref element");
      store.current = true;
      store.current = { items, balance };
    }
  }, [items, balance]);

  const buyProduct = React.useCallback(
    async (itemId) => {
      console.log("ref", store.current);
      const { updatedItems, remainingBalance } = await executePurchase(itemId, {
        ...store.current,
      });
      const updatedStore = { items: updatedItems, balance: remainingBalance };
      store.current = updatedStore;
      setBalance(remainingBalance);
      setItems(updatedItems);
    },
    [store],
  );

  return {
    buy: buyProduct,
    items, // @TODO: Not implemented // finally implemented
    balance,
  };
};
