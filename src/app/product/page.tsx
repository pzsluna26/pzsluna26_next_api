
import type {Product} from '@/app/types/products'
import Link from 'next/link';     

async function getProducts() : Promise<Product[]> {
    const res = await fetch('http://localhost:3000/api/products',{
        cache: 'no-store'
    });

    if (!res.ok) {
        throw new Error('fetch error');
    }
    return res.json();
}

export default async function Product() {
    const products = await getProducts();
  return (
    <div className="flex flex-col items-center justify-center w-9/10 h-screen">
      <h1 className="text-xl font-bold mb-10 text-gray-600">상품 목록</h1>
      <div className='grid grid-cols-4 gap-4'>
        {
            products.map((product : Product)=>(
                <ul key={product.id} className='border rounded-xl p-4 border-gray-400 text-gray-600 '>
                    <li className='text-small font-bold text-gray-700 mb-5 text-gray-600'>{product.name}</li>
                    <li className='text-small mb-2 text-gray-600'>{product.description}</li>
                    <li className='text-small text-gray-600'>{product.price}</li>
                </ul>
            ))
        }
      </div>
    </div>
  );
}