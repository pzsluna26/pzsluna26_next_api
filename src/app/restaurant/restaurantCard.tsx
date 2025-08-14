import Link from 'next/link';



interface RestaurantCardProps {
  item : { 
    UC_SEQ: number,
    MAIN_TITLE: string,
    ADDR1:string,
    CNTCT_TEL:string,
    ITEMCNTNTS: string,
  }
}

export default function  RestaurantCard({ item }: RestaurantCardProps) {
  return (
    <div>
      <div className="items-center bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          <Link href={`/restaurant/${item.UC_SEQ}`}>{item.MAIN_TITLE}</Link>
        </h2>
        <p className="text-sm text-gray-600 mb-4">{item.ITEMCNTNTS}</p>
        <p className="text-md font-bold text-gray-600">{item.ADDR1}</p>
      </div>
    </div>
  );
}

