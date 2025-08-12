'use client'

import {useState,useEffect,use} from 'react'
import type{Product} from "@/app/types/products"
import Link from 'next/link';

export default function ReactProductDetail({
    params,
    }:{ 
    params:Promise<{id : string}>;
    }) {
    const {id} = use(params);
    const [product, setProduct] = useState<Product>({} as Product);

    const getProducts = async() =>{
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const resp = await fetch(`${baseUrl}/api/products/${id}`);
        const data = await resp.json();
        setProduct(data);
    }
    useEffect(()=>{
        if(!id) return;
        getProducts();
    },[id])
    
    
  return (
    <div className=" flex flex-col items-center justify-center w-9/10 h-screen">
          <h1 className="text-xl font-bold mb-10 text-gray-600">{product.name}</h1>
          <div className='grid grid-cols-4 gap-2'>
         <p className="text-sm text-gray-600 mb-4">카테고리: {product.category}</p>
        <p className="text-sm text-gray-600 mb-4">상세설명: {product.description}</p>
          
        </div>
        </div>
  );
}