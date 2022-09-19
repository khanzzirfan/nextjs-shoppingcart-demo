import { Item } from "./data";
import { sleep } from "./utils";

// type UserAndItemState = {
//   balance: number,
//   items: Item[],
// };

/**
 * Modifies `state`, given an `itemId` to purchase
 * @returns {UserAndItemState} the updated state if a purchase should succeed
 */
export const executePurchase = async (itemId, state) => {
  // NOTE: the following line intentionally pauses execution in this
  // function and MUST remain in tact for the assignment to replicate a
  // network request.
  console.log("currentState", state);
  await sleep(1000);
  const { balance, items } = state;
  const item = items.find((f) => f.id === itemId);
  const { inventory, price } = item;
  let remainingBalance = 0;
  if (inventory < 1) {
    throw new Error("Selected items are out of stock currenlty.");
  }
  if (balance > price) {
    remainingBalance = Number((Number(balance) - Number(price)).toFixed(2));
    const updatedItems = items.map((f) => {
      return {
        ...f,
        inventory: f.id === itemId ? inventory - 1 : f.inventory,
      };
    });
    console.log("remaining", { remainingBalance, updatedItems });
    return {
      remainingBalance,
      updatedItems,
    };
  } else {
    throw new Error("oops! Insufficient balance");
  }
  // @TODO: Not implemented
};
