
import type {Product} from '@/app/types/products'
import ProductCard from '@/components/ProudctCard';
import Link from 'next/link';     

async function getProducts() : Promise<Product[]> {
    const res = await fetch('http://localhost:3000/api/products',{
        cache: 'no-store'
    });

    if (!res.ok) {
        throw new Error('fetch error');
    }
    return await res.json();
}

export default async function Product() {
    const products = await getProducts();
  return (
    <div className=" flex flex-col items-center justify-center w-9/10 h-screen">
      <h1 className="text-xl font-bold mb-10 text-gray-600">상품 목록</h1>
      <div className='grid grid-cols-4 gap-2'>
      {
        products.map((product:Product) => 
        <ProductCard key={product.id} product={product} />
      )
    }   
    </div>
    </div>
  );
}