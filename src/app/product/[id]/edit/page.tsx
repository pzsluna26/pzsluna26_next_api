//상품수정
import type {Product} from "@/app/types/products"
import Link from "next/link";
import ProductForm from "@/app/product/productForm"

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
   <div className="flex flex-col justify-start w-9/10 h-screen p-5">
      <div className="w-full flex items-center justify-between mb-10">
        <h1 className="text-xl font-bold text-gray-700">상품 수정</h1>
        <Link href="/product" className="bg-blue-400 text-white p-3 rounded-lg">
          상품목록
        </Link>
      </div>
      <ProductForm product={product} />
    </div>
  );
}
