'use client'
import { useState,useEffect } from "react";
import RestaurantCard from "../restaurant/restaurantCard";

interface restaurantItem{
  UC_SEQ: number, 
  MAIN_TITLE: string,
  ADDR1: string,
  ITEMCNTNTS: string
}

export default function Restaurant() {
  const [tdata,setTdata] = useState<restaurantItem|null>(null)

  const getFecthdata = async() => {
    const apikey = process.env.NEXT_PUBLIC_API_KEY;
    const resp = await fetch(`https://apis.data.go.kr/6260000/FoodService/getFoodKr?serviceKey=${apikey}&pageNo=1&numOfRows=10&resultType=json`)
    if (!resp.ok){
      throw new Error('fetch error')
    }
    const data = await resp.json();
    console.log("data?",data)
    setTdata(data.getFoodKr.item);
    console.log("item?",data.getFoodKr.item)
  } 

  useEffect(()=>{
    getFecthdata();
  },[])
  
  return (
    <div className="w-9/10 h-screen flex flex-col items-center justify-center">
      <h2 className="text-gray-700 font-bold">부산 맛집 리스트</h2>
      <div className="w-full h-9/10 grid grid-cols-4 mt-10 gap-3">
        {
          tdata && tdata.map((place) =>(
            <RestaurantCard key={place.UC_SEQ} place={place}/>))
        }
      </div>
    </div>
  );
}