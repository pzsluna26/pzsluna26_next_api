//상품수정
'use client'
import type {Product} from "@/app/types/products"
import Link from "next/link";
import ProductForm from "@/app/product2/productForm"

async function getProduct(id: string): Promise<Product> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const resp = await fetch(`${baseUrl}/api/products/${id}`, {
    cache: "no-store",
  });

  if (!resp.ok) throw new Error("fetch error");
  return resp.json();
}

export default async function EditProduct({
  params
}: {
  params: { id: string }
}) {
  const { id } = params;
  const product = await getProduct(id);

  return (
    <div className="flex flex-col items-center justify-center w-9/10 h-screen">
      <div className="border rounded-xl p-5 border-gray-300">
      <h1 className="text-xl font-bold mb-10 text-gray-600">상품수정[{product.id}:{product.name}]</h1>

      </div>
       <div className='flex mt-5 gap-1'>
    
        <Link href = "/product2" className='bg-yellow-300 text-white p-3 rounded-lg'>홈으로</Link>
      </div>
      <ProductForm product={product}/>
    </div>
  );
}
