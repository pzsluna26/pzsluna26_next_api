//supabase
import {supabase} from '@/app/lib/supabase/clients'
import type {Product} from "@/app/types/products"
import Link from 'next/link';

export default async function Hello() {
  console.log('PAGE 컴포넌트 환경변수:', {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL,
  key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
});
  const { data, error } = await supabase
  .from('products')
  .select('*');

  if(error) {
    return <div>Error.message</div>
  }
  console.log(data)

return (
  <div className="flex flex-col justify-center items-center w-full h-screen">
    <h1 className="text-2xl">
      Supabase test
      {data && data.map((item: Product) => (
        <Link href={`/hello/${item.id}`} key={item.id}>
          <div>{item.name}</div>
        </Link>
      ))}
    </h1>
  </div>
);

}