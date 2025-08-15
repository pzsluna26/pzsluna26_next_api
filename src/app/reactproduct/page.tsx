'use client'
import { useEffect, useState } from 'react';
import type { Product } from '@/app/types/products';
import Link from 'next/link';
import ProductCard from '../product/prouductCard';

export default function ReactProduct() {
    const [tdata, setTdata] = useState<Product[] | null>(null);

    const getFetchdata = async () => {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
        const res = await fetch(`${baseUrl}/api/products`);
        if (!res.ok) {
            throw new Error('fetch Error');
        }
        const data = await res.json();
        setTdata(data);
        console.log(data);
    }

    useEffect(() => {
        getFetchdata();
    }, [])

    return (

        <div className="flex flex-col items-center justify-center w-9/10 h-screen">
            <div className='flex w-full items-center justify-between mb-10'>
                <h1 className="text-xl font-bold text-gray-600">상품 목록</h1>
                <Link
                    href="/product/new"
                    className='bg-pink-300 text-white p-3 rounded-lg'>
                    상품추가
                </Link>
            </div>
            <div className='grid grid-cols-4 gap-2 w-full'>
                {
                    tdata && tdata.map((product: Product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
            </div>
        </div>
    );
}