//상품추가
import Link from "next/link";
import ProductForm from "@/app/product/productForm"

export default async function NewProduct() {
  return (
    <div className="flex flex-col justify-start w-9/10 h-screen p-5">
      <div className="w-full flex items-center justify-between mb-10">
        <h1 className="text-xl font-bold text-gray-700">상품 수</h1>
        <Link href="/product" className="bg-blue-400 text-white p-3 rounded-lg">
          상품목록
        </Link>
      </div>
      <ProductForm />
    </div>

  );
}