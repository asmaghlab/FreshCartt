import React from 'react'
import { Helmet } from "react-helmet";
import HomeSlider from '../../components/HomeSlider/HomeSlider';
import HomeFeatures from '../../components/HomeFeatures/HomeFeatures';
import HomeCategories from '../../components/HomeCategories/HomeCategories';
import HomeDeals from '../../components/HomeDeals/HomeDeals';
import FeaturedProduct from '../../components/FeaturedProduct/FeaturedProduct';
import Newsletter from '../../components/Newsletter/Newsletter';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>FreshCart - Your Trusty Online Store</title>
      </Helmet>
      <HomeSlider />
      <HomeFeatures />
      <HomeCategories/>
      <HomeDeals/>
      <FeaturedProduct/>
      <Newsletter />
    </>
  )
}
