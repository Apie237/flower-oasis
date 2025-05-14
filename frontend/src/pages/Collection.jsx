import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import ProductItem from '../components/ProductItem';
import { ShopContext } from '../context/shopContext';


const Collection = () => {
  const { products } = useContext(ShopContext);
  const { category } = useParams();

  // Filter products where the category array includes the category param
  const filteredProducts = products.filter((product) =>
    product.category.includes(category)
  );

  return (
    <div className="py-10">
      <h2 className="text-2xl font-semibold mb-6 text-center text-rose-800 capitalize">
        {category.replace(/-/g, ' ')} Collection
      </h2>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductItem
              key={product._id}
              id={product._id}
              image={product.image}
              category={product.category}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No products found in this category.</p>
      )}
    </div>
  );
};

export default Collection;
