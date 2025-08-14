//supabase
import {supabase} from '@/lib/supabase/clients'
import type {Product} from "@/app/types/products"
import Link from 'next/link';

export default async function Product() {
  console.log('PAGE 컴포넌트 환경변수:', {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL,
  key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
});
  const { data, error } = await supabase
  .from('products')
  .select('*');

  if(error) {
    return <h1>데이터를 불러오는데 오류가 발생했습니다.</h1>
  }
  console.log(data)

return (
  <div className="flex flex-col items-center justify-center w-5/10 h-screen">
      <div className='flex w-full items-center justify-between mb-5'>
        <h1 className="text-xl font-bold text-gray-600">Supabase Test</h1>
        <Link 
            href="/product/new" 
            className='bg-gray-300 text-white p-2 rounded-lg'>
            상품추가
          </Link>
      </div>
      <div className='gap-2 w-full border border-gray-400 text-gray-600 rounded-2xl p-10'>
        {
          data && data.map((item: Product) => (
                  <Link href={`/supaproduct/${item.id}`} key={item.id}>
                    <div className='mb-1'>🔹 {item.name}</div>
                  </Link> ))
        }
      </div>
  </div>
);

}