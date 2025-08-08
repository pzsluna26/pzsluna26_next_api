import { NextRequest, NextResponse } from "next/server"
// API구현방법1.  'ts파일'을 사용하여 타입을 가져옵니다.
// import { products } from "@/app/types/products"

// ---------------------------------------------------------------------------
//                           API 구현 방법 => GET 
//                              : 데이터 조회
// ---------------------------------------------------------------------------  
// API구현방법2. CRUD를 구현할 'JSON파일'의 접근 모듈
import path from "path";
import { promises as fs } from "fs";
import type { Product } from "@/app/types/products";
import { NestedMiddlewareError } from "next/dist/build/utils";

// API구현방법2-1. CRUD를 구현할 'JSON파일'의 경로 만들기
const dataPath = path.join(process.cwd(), 'src/app/data/products.json');
export async function GET(request : NextRequest ) {
    try{

        // API구현방법2-2. json 파일 불러와서 JSON 파싱하기
        const jsonData = await fs.readFile(dataPath, 'utf-8')
        const products : Product[] = JSON.parse(jsonData);
        console.log(jsonData)

        // API구현방법2-3. URL 쿼리 스트링을 통해 요청된 파라미터를 가져오기1
        // (category로 상품조회)
        const {searchParams} = new URL(request.url);
        const category = searchParams.get('category');

        // API구현방법2-3. URL 쿼리 스트링을 통해 요청된 파라미터를 가져오기2
        // (category가 있는 경우, 해당하는 값만 조회)
        if (category) {
            const cProducts = products.filter(item => item.category === category);
            return NextResponse.json(cProducts);
        } 
        
        // 터미널 콘솔에 출력
        //console.log(products);
        return NextResponse.json(products);

    } catch (error) {
        console.error("파일 불러오기 오류: ", error);
        return NextResponse.json({message: "시스템오류"},{status:500});
    }
}

// ---------------------------------------------------------------------------
//                           API 구현 방법 => POST
//                              : 데이터 추가
// ---------------------------------------------------------------------------
export async function POST(request : NextRequest){
    try{

        // API구현방법1. json 파일 불러와서 JSON 파싱하기
        const jsonData = await fs.readFile(dataPath, 'utf-8')
                        // '현재상품목록'
        const products : Product[] = JSON.parse(jsonData);

        // API구현방법2. 요청시 전달한 JSON 자료 가져오기(id제외)
        const {name, category, price, description} = await request.json();

        // API구현방법3. 추가될 자료에 id 생성(현재시간으로)
        const newId = Date.now().toString();

        // API구현방법4. 추가될 상품 객체 생성
        const newProduct : Product = {
            id: newId,
            name,
            category,
            price,
            description
        }

        // API구현방법5. '현재 상품목록'에 추가될 상품 객체를 추가
        products.push(newProduct);

        // API구현방법6. 업데이트된 자료를 JSON 파일에 쓰기(null,2 => 들여쓰기)
        await fs.writeFile(dataPath, JSON.stringify(products, null, 2))

        // API구현방법7. 성공적으로 추가되었음을 응답(post맨 응답창에 표시: 메세지, 추가된상품정보)
        return NextResponse.json({message : "상품이 추가 되었습니다.", product : newProduct})

    } catch (error) {
        console.error("파일 불러오기 오류: ", error);
        return NextResponse.json({message: "시스템오류"},{status:500});
    }
}
