// 클라이언트 컴포넌트(클라이언트 이벤트 있어서)
'use client'

// 이미지 => Image 컴포넌트로 사용
import Image from 'next/image';

// Link => Link 'href' 속성 사용
import Link from 'next/link'

// useNavigate => useRouter(주의: next/navigation 사용)
import { useRouter } from 'next/navigation';

// 로그인 => 경로변경 @
import { useAtom } from 'jotai' 
import {isLogin} from "@/atoms/IsLoginAtom"


export default function Nav() {
  
  const [login, setLogin] = useAtom(isLogin);

  // useRouter
  const router = useRouter();

  const handleLogout = () => {
    setLogin(false);
    localStorage.removeItem("id");
    // useRouter
    router.push("/");
  }
  return (
     <header className="w-full min-h-20 flex justify-between items-center bg-blue-200 ">
          <div className="flex ml-10">

            {/* 이미지태그는 src, width, height, alt 속성을 반드시 가짐 */}
            <Image src="/img/react.svg" width={40} height={40} alt='react'/> +
            <Image src="/next.svg" width={60} height={60} alt='nextjs'/>
          </div>
          <div className="text-gray-600 font-bold text-xs">
            <ul className="flex justify-center items-center">
              <Link href = "/"><li className="px-2 hover:bg-amber-100 rounded-xl hover:text-black">홈으로</li></Link>
             
             {login && <Link href ='/myClock'><li className="px-2 hover:bg-amber-100 rounded-xl hover:text-black">시계</li></Link>}
             {login && <Link href ='/lotto'><li className="px-2 hover:bg-amber-100 rounded-xl hover:text-black">로또</li></Link>}
             {login && <Link href ='/foodMain'><li className="px-2 hover:bg-amber-100 rounded-xl hover:text-black">푸드</li></Link>}
             {login && <Link href = "/subway"><li className="px-2 hover:bg-amber-100 rounded-xl hover:text-black">지하철 대기정보</li></Link>}
             {login && <Link href ='/todoList'><li className="px-2 hover:bg-amber-100 rounded-xl hover:text-black">할 일 목록</li></Link>}
            </ul>
          </div>
          <div className="mr-10 text-xs font-bold p-4 bg-blue-300 text-white rounded-xl">
           
           { 
            login ? <span className="cursor-pointer"
                            onClick={handleLogout}>로그아웃</span> 
                            // 홈화면 (로그인폼)
                  :  <Link href="/" className="cursor-pointer text-white">로그인</Link>
            }
          </div>
          
        </header>
  )
}