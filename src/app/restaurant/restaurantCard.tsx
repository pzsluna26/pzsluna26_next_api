import Link from 'next/link';

interface RestaurantCardProps {
  item: {
    UC_SEQ: number;
    MAIN_TITLE?: string;
    MAIN_IMG_THUMB: string;
    ADDR1?: string;
    CNTCT_TEL?: string;
    ITEMCNTNTS?: string;
  };
}

export default function RestaurantCard({ item }: RestaurantCardProps) {
  const title = item.MAIN_TITLE || '이름 없음';
  const description = item.ITEMCNTNTS || '설명이 없습니다.';
  const address = item.ADDR1 || '주소 정보 없음';

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
          <img
          src={item.MAIN_IMG_THUMB}
          alt={item.MAIN_TITLE}
          className="w-full h-48 object-cover rounded-md mb-4"/>
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        <Link href={`/restaurant/${item.UC_SEQ}`}>{title}</Link>
      </h2>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <p className="text-md font-bold text-gray-600">{address}</p>
    </div>
  );
}
