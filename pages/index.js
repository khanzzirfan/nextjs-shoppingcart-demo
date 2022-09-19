// import CategoryCard from "../components/CategoryCard";
// import styles from "../styles/Home.module.css";

import React from "react";
import styles from "../styles/index.module.css";
import { useCheckout } from "../mock-backend";
import ProductItem from "../components/ProductItem";
import Spinner from "../components/Spinner";

const Index = () => {
  const { items, buy, balance } = useCheckout();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const availableItems = React.useMemo(() => {
    return items.filter((f) => f.inventory > 0);
  }, [items]);

  const outOfStockItems = React.useMemo(() => {
    return items.filter((f) => f.inventory === 0);
  }, [items]);

  const handleOnBuy = React.useCallback(async (itemId) => {
    try {
      setError(null);
      setIsLoading(true);
      await buy(itemId);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.section} data-testid="headerwrapper">
        <h1>Create, Inc. Store</h1>
        <p>Balance Available ${balance}</p>
      </div>

      {/** @TODO: Not implemented */}
      <div className={styles.container} data-testid="custom">
        {isLoading && <Spinner />}
        {error && (
          <div className={styles.error}>
            <h4>{error}</h4>
          </div>
        )}
        <div className={styles.small} data-testid="available-products">
          {availableItems.map((eachItem) => {
            return (
              <ProductItem
                key={eachItem.id}
                product={eachItem}
                disabled={isLoading}
                onAddtoCart={() => handleOnBuy(eachItem.id)}
              />
            );
          })}
          {outOfStockItems.map((eachItem) => {
            return (
              <ProductItem
                key={eachItem.id}
                product={eachItem}
                disabled
                onAddtoCart={() => handleOnBuy(eachItem.id)}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Index;

// const HomePage = () => {
//   return (
//     <main className={styles.container}>
//       <div className={styles.small}>
//         <CategoryCard image="https://imgur.com/uKQqsuA.png" name="Xbox" />
//         <CategoryCard image="https://imgur.com/3Y1DLYC.png" name="PS5" />
//         <CategoryCard image="https://imgur.com/Dm212HS.png" name="Switch" />
//       </div>
//       <div className={styles.large}>
//         <CategoryCard image="https://imgur.com/qb6IW1f.png" name="PC" />
//         <CategoryCard
//           image="https://imgur.com/HsUfuRU.png"
//           name="Accessories"
//         />
//       </div>
//     </main>
//   );
// };

// export default HomePage;
