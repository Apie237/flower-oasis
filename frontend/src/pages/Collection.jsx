import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import ProductItem, { ProductItemSkeleton } from '../components/ProductItem'; // Import Skeleton
import { ShopContext } from '../context/shopContext';

const Collection = () => {
  const { products, loading } = useContext(ShopContext);
  const { category } = useParams();

  const filteredProducts = products.filter((product) =>
    product.category.includes(category)
  );

  return (
    <div className="py-10 px-4">
      <h2 className="text-2xl font-semibold mb-6 text-center text-rose-800 capitalize">
        {category.replace(/-/g, ' ')} Collection
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {loading ? (
          // Render 8 skeleton cards while loading
          Array.from({ length: 8 }).map((_, index) => (
            <ProductItemSkeleton key={index} />
          ))
        ) : filteredProducts.length > 0 ? (
          // Render actual products once loaded
          filteredProducts.map((product) => (
            <ProductItem
              key={product._id}
              id={product._id}
              image={product.image}
              category={product.category}
              name={product.name}
              price={product.price}
            />
          ))
        ) : (
          // Handle empty state
          <div className="col-span-full text-center text-gray-500 py-10">
            No products found in this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;