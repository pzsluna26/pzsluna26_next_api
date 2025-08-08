import { NextRequest, NextResponse } from "next/server"
// ---------------------------------------------------------------------------
//                           API 구현 방법 => GET (Id)
//                              : ID 별, 데이터 조회
// ---------------------------------------------------------------------------  

import path from "path";
import { promises as fs } from "fs";
import type { Product } from "@/app/types/products";
import { NestedMiddlewareError } from "next/dist/build/utils";
// API구현방법1. GET (Id)동적라우팅으로 들어오는 params의 데이터 타입
interface ParamsProps{
    params: {
        id: string;
    }
}
// API구현방법1-1. CRUD를 구현할 'JSON파일'의 경로 만들기
const dataPath = path.join(process.cwd(), 'src/app/data/products.json');

// GET함수
async function getProducts() : Promise<Product[]> {
    const jsonData = await fs.readFile(dataPath, 'utf-8')
    return JSON.parse(jsonData);
}

// SAVE함수
async function saveProducts(products: Product[]) {
    await fs.writeFile(dataPath, JSON.stringify(products, null, 2));
}

// ---------------------------------------------------------------------------  

                                            // API구현방법1-2. 동적라우팅[id]
export async function GET(request : NextRequest, {params}: ParamsProps) {
    try{

        // API구현방법2. json 파일 불러와서 JSON 파싱하기(GET함수 호출)
        const products : Product[] = await getProducts();
        

        // API구현방법3. id로 상품찾기(prams await로 가져오기)
        const {id} = await params;
        const product = products.find(item => item.id === id);
        console.log(product)


        // API구현방법4. 필터링1: 상품이 없는경우
        if (!product) {
            return NextResponse.json({message : "상품이 존재하지 않습니다."},{status : 404});
        } 

        // API구현방법4. 필터링2: 상품이 있는 경우
        return NextResponse.json(product);

    } catch (error) {
        console.error("파일 불러오기 오류: ", error);
        return NextResponse.json({message: "시스템오류"},{status:500});
    }
}

// ---------------------------------------------------------------------------
//                           API 구현 방법 => PUT       
//                              : 데이터 전체 수정
// ---------------------------------------------------------------------------

export async function PUT(request : NextRequest, {params}: ParamsProps) {
    try{

        // API구현방법1. json 파일 불러와서 JSON 파싱하기(GET함수 호출)
        const products : Product[] = await getProducts();
        const {id} = await params;

        // API구현방법2. 수정할 ID의 인덱스 값을 찾기
        const productIdx =products.findIndex(item => item.id === id);

        // API구현방법3. 필터링: 수정할 ID가 없는 경우
        if(productIdx === -1){
            return NextResponse.json({message: "상품이 존재하지 않습니다"},{status: 404});
        }

        // API구현방법4. 수정할 자료를 요청시 전달한 JSON 자료 가져오기
        const updateProduct = await request.json();

        // API구현방법5. 수정할 상품 객체 생성(prams await로 가져오기)
        products[productIdx] = { ...updateProduct, id : id };

        // API구현방법6. 수정된 상품목록을 기존목록에 저장(SAVE함수 호출)
        await saveProducts(products);
        console.log(products[productIdx])
        return NextResponse.json({message: "상품이 '전체' 수정 되었습니다.", product: products[productIdx]});
    
    } catch (error) {
        console.error("파일 불러오기 오류: ", error);
        return NextResponse.json({message: "시스템오류"},{status:500});
    }
}

// ---------------------------------------------------------------------------
//                           API 구현 방법 => PATCH
//                              : 데이터 일부 수정  
// ---------------------------------------------------------------------------
export async function PATCH(request : NextRequest, {params}: ParamsProps) {
    try{

    
        const products : Product[] = await getProducts();
        const {id} = await params;
    
        const productIdx =products.findIndex(item => item.id === id);

        if(productIdx === -1){
            return NextResponse.json({message: "상품이 존재하지 않습니다"},{status: 404});
        }

        // API구현방법1. 요청된 값을 가지고 나머지는 선택적으로 만들기
        const updateProduct : Partial<Product>= await request.json();

        // API구현방법2. 선택적으로 수정할 데이터 덮어쓰기
        products[productIdx] = { ...products[productIdx], ...updateProduct};

        // API구현방법3. 수정된 상품목록을 기존목록에 저장(SAVE함수 호출)
        await saveProducts(products);
        console.log(products[productIdx])
        return NextResponse.json({message: "상품이 '일부' 수정 되었습니다.", product: products[productIdx]});
    
    } catch (error) {
        console.error("파일 불러오기 오류: ", error);
        return NextResponse.json({message: "시스템오류"},{status:500});
    }
}

// ---------------------------------------------------------------------------
//                           API 구현 방법 => DELETE
//                              : 데이터 삭제
// ---------------------------------------------------------------------------
export async function DELETE(request : NextRequest, {params}: ParamsProps) {
    try{

        const products = await getProducts();
        const {id} = await params;

        // API구현방법1. 삭제할 ID의 인덱스 값을 찾기
        const updateProduct =products.findIndex(item => item.id !== id);

        // API구현방법2. 필터링: 삭제할 ID가 없는 경우
        if(products.length === updateProduct.length){
            return NextResponse.json({message: "상품이 존재하지 않습니다"},{status: 404});
        }

        // API구현방법3. 삭제된 상품목록을 기존목록에 저장(SAVE함수 호출)
        await saveProducts(products);
        console.log(products[productIdx])
        return NextResponse.json({message: "상품이 삭제 되었습니다.", product: products[productIdx]});
    
    } catch (error) {
        console.error("파일 불러오기 오류: ", error);
        return NextResponse.json({message: "시스템오류"},{status:500});
    }
}
