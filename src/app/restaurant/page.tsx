'use client';

import { useEffect, useState } from 'react';
import RestaurantCard from './restaurantCard';

export default function FoodData() {
  const [items, setItems] = useState<any[]>([]);

  // 데이터 가져오는 함수
  const fetchFoodData = async () => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;
      const res = await fetch(
        `https://apis.data.go.kr/6260000/FoodService/getFoodKr?serviceKey=${apiKey}&pageNo=1&numOfRows=10&resultType=json`
      );
      const json = await res.json();
      console.log(json); // 구조 확인
      setItems(json.getFoodKr?.item || []);
    } catch (error) {
      console.error('데이터 불러오기 실패:', error);
    }
  };

  useEffect(() => {
    fetchFoodData();
  }, []);

  return (
    <>
      <h1 className="text-xl font-bold text-gray-600 mb-10 ">부산 맛집 리스트👩🏻‍🍳</h1>
      <div className="grid grid-cols-4 gap-2 w-9/10 ">
        {items.length > 0 ? (
          items.map((item) => (
            <RestaurantCard key={item.UC_SEQ} item={item} />
          ))
        ) : (
          <p>로딩 중...</p>
        )}
      </div>
    </>

  );
}
