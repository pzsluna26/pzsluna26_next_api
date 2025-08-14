import { supabase } from "@/lib/supabase/clients";
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
        <div className="border rounded-xl p-5 border-gray-300">
            <p>ID: {data.id}</p>
            <p>Name: {data.name}</p>
            <p>Category: {data.category}</p>
            <p>Price: {data.price}</p>
            <p>Description: {data.description}</p>
        </div>
    </div>
  );
}
