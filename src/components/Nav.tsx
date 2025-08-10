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
            <Image src="/img/react.svg" width={40} height={40} alt='react' className='mr-2'/> 
            <Image src="/next.svg" width={60} height={60} alt='nextjs'/>
          </div>
          <div className="text-gray-600 font-bold text-xs">
            <ul className="flex justify-center items-center">
              <Link href = "/Home"><li className="px-2 hover:bg-amber-100 rounded-xl hover:text-black">홈으로</li></Link>
              {login && <Link href="/product">상품목록</Link>}
            </ul>
          </div>
          <div className="mr-10 text-xs font-bold p-4 bg-blue-300 text-white rounded-xl">
           
           { 
            login ? <span className="cursor-pointer"
                            onClick={handleLogout}>로그아웃</span> 
                            // 홈화면 (로그인폼)
                  :  <Link href="/Login" className="cursor-pointer text-white">로그인</Link>
            }
          </div>
          
        </header>
  )
}