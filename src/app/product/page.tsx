
import type {Product} from '@/app/types/products'
import ProductCard from '@/app/product/prouductCard';
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
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}   
      </div>
    </div>
  );
}