import { executePurchase } from "../purchase";
describe("Purchase item", () => {
  const balance = 20;
  const items = [
    {
      id: 0,
      name: "Hair Shampoo",
      price: 5.17,
      inventory: 5,
      image: "https://imgur.com/LXnUnd2.png",
    },
    {
      id: 1,
      name: "Hair Conditioner",
      price: 5.85,
      inventory: 5,
      image: "https://imgur.com/LXnUnd2.png",
    },
  ];

  beforeEach(() => {
    // Todo
  });

  describe("Given when stock is available for item", () => {
    test("it should reduce the balance and inventory by 1 when user has sufficient balance", async () => {
      const itemId = 1;

      const result = await executePurchase(itemId, {
        balance,
        items,
      });

      expect(result).toEqual({
        remainingBalance: 14.15,
        updatedItems: [
          {
            id: 0,
            name: "Hair Shampoo",
            price: 5.17,
            inventory: 5,
            image: "https://imgur.com/LXnUnd2.png",
          },
          {
            id: 1,
            name: "Hair Conditioner",
            price: 5.85,
            inventory: 4,
            image: "https://imgur.com/LXnUnd2.png",
          },
        ],
      });
    });
  });

  describe("Given when stock is not available for an item", () => {
    test("it should throw an error with stock unavailable", async () => {
      const itemId = 1;

      await expect(
        executePurchase(itemId, {
          balance,
          items: [
            {
              id: 0,
              name: "Hair Shampoo",
              price: 5.17,
              inventory: 0,
              image: "https://imgur.com/LXnUnd2.png",
            },
            {
              id: 1,
              name: "Hair Conditioner",
              price: 5.85,
              inventory: 0,
              image: "https://imgur.com/LXnUnd2.png",
            },
          ],
        }),
      ).rejects.toThrowError("Selected items are out of stock currenlty.");
    });
  });
});
