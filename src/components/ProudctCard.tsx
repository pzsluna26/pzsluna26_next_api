import React from 'react';
// components/ProductCard.tsx
import Link from 'next/link';
import { Product } from "@/app/types/products"


interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
   
    <div className="items-center bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        <Link href={`/product2/${product.id}`}>{product.name}</Link>
        <Link href={`/product2/${product.id}`}>수정</Link>
        <Link href={`/product2/${product.id}`}>삭제</Link>
      </h2>
      <p className="text-sm text-gray-600 mb-4">{product.description}</p>
      <p className="text-md font-bold text-gray-600">{product.price.toLocaleString()}원</p>
   
    </div>

  );
}

