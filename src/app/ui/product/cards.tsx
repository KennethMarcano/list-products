import React from 'react';
import Image from 'next/image';

interface Props {
    imageUrl: string;
    brand: string;
    productName: string;
    price: number;
}

export default function ProductCard ({ imageUrl, brand, productName, price }: Props)  {
    return (
        <div className=" w-full max-w-[270px] bg-secondary rounded-2xl shadow-md p-4 ">
            <Image 
            layout='responsive' 
            priority height={100} 
            width={160} 
            src={imageUrl} 
            alt={productName} 
            className="w-full h-48 object-cover rounded-md"
            aria-label={`Imagen del producto ${productName}`}
            />
            <h2 className="text-lg font-bold mt-2">{brand}</h2>
            <p className="text-gray-600 overflow-hidden text-ellipsis line-clamp-2">{productName}</p>
            <p className="text-xl font-semibold mt-2">{`$${price}`}</p>
        </div>
    );
};
