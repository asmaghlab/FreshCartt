import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router";

import ProductInfo from "../../components/ProductInfo/ProductInfo";
import RelatedProducts from "../../components/RelatedProductDetails/RelatedProductDetails";
import ProductDetailsSkeleton from "../../components/Skeleton/ProductDetailsSkeleton";
import ProductDetailsTabs from "../../components/ProductDetailsTaps/ProductDetailsTaps";
import { getProductById } from "../../services/products-servic";
import useProductDetails from "../../Hooks/useProductDetails";

export default function ProductDetails() {


  const { id } = useParams();

  const { productDetails, isLoading, isError, error } = useProductDetails(id)

  // Loading
  if (isLoading) return <ProductDetailsSkeleton />;

  // Error
  if (isError) {
    return (
      <div className="text-center py-20 text-red-500">
        Something went wrong ❌
      </div>
    );
  }

  // Safety check
  if (!productDetails) return null;

  return (
    <>
      <Helmet>
        <title>{productDetails?.title || "Product Details"}</title>
      </Helmet>
      <ProductInfo productDetails={productDetails} />
      <ProductDetailsTabs productDetails={productDetails} />
      <RelatedProducts productDetails={productDetails} />
    </>
  );
}