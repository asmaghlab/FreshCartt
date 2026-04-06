import React from 'react';
import SkeletonLib from 'react-loading-skeleton';

const Skeleton = ({ className, variant = 'rectangle', height, width, ...props }) => {
  return (
    <SkeletonLib 
      className={className}
      circle={variant === 'circle'}
      height={height}
      width={width}
      borderRadius={variant === 'rounded' ? '0.75rem' : undefined}
      baseColor="#f3f4f6"
      highlightColor="#ffffff"
      {...props}
    />
  );
};

export default Skeleton;
