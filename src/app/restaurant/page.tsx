
"use client";

import React, { useEffect, useState } from "react";


export default function FoodData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(
      "https://apis.data.go.kr/6260000/FoodService/getFoodKr?serviceKey=3%2BE64HB9bUOY0%2BkENLpf5w9Uk98vLoG4XULi9AjodZWxJpAFaeggyJGYnMdjYepgzAO%2Bjv%2FAty5BZhgDBQfdyw%3D%3D&pageNo=1&numOfRows=10&resultType=json"
    )
      .then((res) => res.json())
      .then((json) => {
        console.log("받아온 데이터:", json);
        setData(json);
      })
      .catch((err) => console.error("에러 발생:", err));
  }, []);

  return (
   
    <div className="flex flex-col items-center justify-center w-9/10 h-screen">
            <div className='flex w-full items-center justify-between mb-10'>
                <h1 className="text-xl font-bold text-gray-600">부산 맛집 리스트</h1>
            </div>
            <div className='grid grid-cols-4 gap-2 w-full'>
                {/* {
                    data && data.map(item => (
                        <ProductCard key={.id} product={product} />
                    ))} */}
            </div>
        </div>
  );
}
