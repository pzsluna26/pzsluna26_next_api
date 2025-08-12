//클라이언트 컴포넌트 버전

'use client'
import { useState, useEffect } from 'react';

type helloT = {
  msg : string
}

export default function Hello() {
  const [tdata, setTdata] = useState<helloT[]|null>(null);
  
  const getFetchData = async () => {
    // 환경변수에 api주소 넣기 
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    const resp = await fetch(`${baseUrl}/api/hello`)
    const data = await resp.json();
    setTdata(data);
  }

  useEffect(() => {
    getFetchData();
  },[])

  useEffect(()=>{

  },[tdata])
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <h1 className="text-2xl">
        {
        tdata && tdata.map(
                          (item:helloT) =>
                                   <div key={item.msg}>
                                      {item.msg}
                                   </div>
                          )
        }
      </h1>
    </div>
  );
}