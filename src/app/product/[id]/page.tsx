import type { Product } from "@/app/types/products";
import Link from "next/link";
import ProductDel from "@/app/product/productDel"

async function getProduct(id: string): Promise<Product> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const resp = await fetch(`${baseUrl}/api/products/${id}`, {
    cache: "no-store",
  });

  if (!resp.ok) throw new Error("fetch error");
  return resp.json();
}

export default async function ProductId({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params
  const product = await getProduct(id);

  return (
    <div className="flex flex-col items-center justify-center w-9/10 h-screen">
      <div className="border rounded-xl p-5 border-gray-300">
      <h1 className="text-xl font-bold mb-10 text-gray-600">{product.name}</h1>
      <p className="text-sm text-gray-600 mb-2">카테고리: {product.category}</p>
      <p className="text-sm text-gray-600 mb-2">상세설명: {product.description}</p>
     <div className='flex mt-5 gap-1 '>
        <ProductDel id={product.id}/>
        <Link href = {`/product/${id}/edit`} className='bg-orange-300 text-white p-3 rounded-lg'>상품수정</Link>
        <Link href = "/product" className='bg-yellow-300 text-white p-3 rounded-lg'>홈으로</Link>
      </div>
      </div>
       
    </div>
  );
}
