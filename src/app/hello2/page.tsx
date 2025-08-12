// 서버 컴포넌트 버전

type helloT = {
  msg : string
}

async function getFetchData() : Promise<helloT[]>{
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  console.log(baseUrl)
  const res = await fetch(`${baseUrl}/api/hello`,{
  // const res = await fetch('http://localhost:3000/api/hello', {
    cache: 'no-store'
  })

  // if(!res.ok){
  //   throw new Error('fetch error')
  // }
  return res.json();
}


export default async function Hello() {
  const tdata = await getFetchData();
 
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