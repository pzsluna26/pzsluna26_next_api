// 서버 컴포넌트 버전
import Link from "next/link";

interface details{
    CNTCT_TEL: string,
    ADDR1: string,
    USAGE_DAY_WEEK_AND_TIME: string,
    PRSNTV_MENU: string
}

// details
// interface Props{
//     params: {
//         id : string
//     }
// }

async function getPlaceDetails(){
    const apikey = process.env.NEXT_PUBLIC_API_KEY;
    const resp = await fetch(`https://apis.data.go.kr/6260000/FoodService/getFoodKr?serviceKey=${apikey}&pageNo=1&numOfRows=10&resultType=json`,{
        cache:'no-store'
    })
    if(!resp.ok){
        throw new Error('fetch error')
    }
    return await resp.json();
   
}

export default async function PlaceDetails() {
    const data = await getPlaceDetails();
    const details = data.getFoodKr.item;


    return (
        <div className="w-9/10 h-screen flex flex-col justify-center items-center">
            <div className="w-4/10 flex justify-between items-center">
                <h1 className="text-xl text-gray-700 font-bold">상세정보</h1>
                <Link href="/restaurant" className="text-white font-bold bg-blue-400 rounded-xl hover:text-gray-600 p-2">홈으로</Link>
            </div>
            <div className="w-4/10 border border-gray-400 p-40 rounded-2xl mt-5">
                {/* {
                    details.map && details.map((details:details) => 
                    <p className="text-gray-700">
                        {details.CNTCT_TEL}
                    </p>
                    )
                } */}
            </div>
        </div>
    );
}