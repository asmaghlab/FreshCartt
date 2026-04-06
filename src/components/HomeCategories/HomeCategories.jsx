import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router';
import CategoryGridSkeleton from '../Skeleton/CategoryGridSkeleton';
import useCategories from '../../Hooks/useCategories';

export default function HomeCategories() {
   const {categories,isLoading,isError}=useCategories()

    if (isLoading) {
        return (
            <div className="container py-8">
                <CategoryGridSkeleton count={6} />
            </div>
        );
    }

    return (
        <>
            <div className="container">
                <div className="flex justify-between items-center">
                    <h2 className='font-bold text-2xl'>Shop by Category</h2>
                    <Link to={`/categories`} className='flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors duration-200'>
                        <span>View All Categories</span>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </Link>
                </div>



                <div className='py-8 grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4'>
                    {categories.map((category) =>
                        <Link to={`/category/${category._id}`} key={category._id} className="card cursor-pointer p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col gap-2 items-center bg-white">
                            <img src={category.image} alt="" className='size-16 rounded-full object-cover' />
                            <h3>{category.name}</h3>
                        </Link>)}

                </div>

            </div>
        </>
    )
}
