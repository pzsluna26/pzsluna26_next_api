import { supabase } from "@/lib/supabase/clients";
import ProductDel from "@/app/supaproduct/productDel"
import Link from "next/link";

export default async function HelloId({ params }: { params: { id: string } }) {
  const { id } = await params;

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return <p>데이터를 불러오는 중 오류가 발생했습니다.</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center w-9/10 h-screen">
      <div className="border rounded-xl p-8 border-gray-300">
        <h1 className="text-xl font-bold mb-10 text-gray-600"> {data.name}</h1>
        <p className="text-sm text-gray-600 mb-2">카테고리: {data.category}</p>
        <p className="text-sm text-gray-600 mb-2">상세설명: {data.description}</p>
        <p className="text-sm text-gray-600 mb-2">가격: {data.price}</p>    
      <div className='flex mt-5 gap-1 '>
        <ProductDel id={data.id}/>
        <Link href = {`/supaproduct/${id}/edit`} className='bg-orange-300 text-white p-3 rounded-lg'>상품수정</Link>
        <Link href = "/supaproduct" className='bg-yellow-300 text-white p-3 rounded-lg'>홈으로</Link>
      </div>
      </div>
    </div>
  );
}
