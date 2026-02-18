import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";
import { trackFetch } from "../utils/fetchTracker";

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    const info = trackFetch();
    console.log("Fetch info:", info);

    try {
      const response = await fetch(
        "https://dummyjson.com/products"
      );

      // Promise chain example
      response
        .json()
        .then((data) => {
          setProducts(data.products);
          setLoading(false);
        })
        .catch((err) => console.error(err));
    } catch (error) {
      console.error("Fetch failed:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="grid">
      {loading
        ? Array.from({ length: 6 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))
        : products.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              price={product.price}
              thumbnail={product.thumbnail}
            />
          ))}
    </div>
  );
};

export default ProductContainer;
