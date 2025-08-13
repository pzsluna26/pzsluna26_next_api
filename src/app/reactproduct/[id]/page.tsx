'use client';

import { useState, useEffect, use } from "react";
import type { Product } from "@/app/types/products";
import Link from "next/link";

export default function ReactProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) { 
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  
  const getProduct = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'; 
    const resp = await fetch(`${baseUrl}/api/products/${id}`);

    const data: Product = await resp.json();
    setProduct(data);
  };

  useEffect(() => {
    if (!id) return; 
    getProduct();
  }, [id]);
    
    
return (
    <div className="flex flex-col items-center justify-center w-9/10 h-screen">
      <div className="border rounded-xl p-5 border-gray-300">
      <h1 className="text-xl font-bold mb-10 text-gray-600">{product && product.name}</h1>
      <p className="text-sm text-gray-600 mb-4">카테고리: {product && product.category}</p>
      <p className="text-sm text-gray-600 mb-4">상세설명: {product && product.description}</p>
      </div>
       <div className='flex mt-5 gap-1'>
        <ProductDel id={product && product.id}/>
        <Link href = "/product2/new" className='bg-pink-300 text-white p-3 rounded-lg'>상품추가</Link>
        <Link href = {`/product2/${id}/edit`} className='bg-orange-300 text-white p-3 rounded-lg'>상품수정</Link>
        <Link href = "/product2" className='bg-yellow-300 text-white p-3 rounded-lg'>홈으로</Link>
      </div>
    </div>
  );
}
