'use client'
import { useRouter } from "next/navigation";

interface ProductDelProps {
  id : string
}

export default function ProductDel({id}:ProductDelProps) {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm("이상품을 삭제하시겠습니까?")){
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      const resp = await fetch(`${baseUrl}/api/products/${id}`, {
        method: "DELETE"
      });
      if(resp.ok){
        alert("정상적으로 삭제되었습니다");
        router.push("/product")
        router.refresh();
      }
      else {
        const data=await resp.json();
        alert(`삭제오류 : ${data.message || "알수없는 오류"}`)
      }
    }
  }
  return (
    <button className="bg-blue-300 text-white p-3 rounded-lg mr-"
            onClick={handleDelete}>
      삭제
    </button>
  );
}