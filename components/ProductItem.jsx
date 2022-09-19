import Image from "next/image";
import styles from "../styles/ProductItem.module.css";

const ProductItem = ({ product, onAddtoCart, disabled }) => {
  const productKey = `productitem-${product.id}`;
  return (
    <div className={styles.card} data-testid={productKey}>
      <Image src={product.image} height={300} width={220} alt="nextimage" />
      <h4 className={styles.title}>{product.name}</h4>
      <h5 className={styles.category}>
        <span className={styles.inventory}>Stock Available</span>
        <span>{product.inventory}</span>
      </h5>
      <p>$ {product.price}</p>
      <button
        disabled={!!disabled}
        {...(!disabled && { onClick: onAddtoCart })}
        data-testid={`button-${product.id}`}
        className={`${styles.button} ${disabled ? styles.disabled : ""}`}
      >
        Buy Now
      </button>
    </div>
  );
};

export default ProductItem;
