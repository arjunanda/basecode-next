import { GetDataProducts } from "@/modules/products/usecases/product.usecase";
import React from "react";

const ProductPages = async () => {
  const products = await GetDataProducts();
  
  return (
    <div>
      {products.data?.rows &&
        products.data?.rows.map((v, key) => (
          <div key={key}>
            <h1 className="text-white">{v.product_name}</h1>
          </div>
        ))}
    </div>
  );
};

export default ProductPages;
