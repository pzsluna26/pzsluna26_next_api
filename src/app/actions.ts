'use server'
// 서버액션 지시어
// form -> submit -> use server
import { supabase } from '@/app/lib/supabase/clients'
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation"; 

export interface FormStatus {
    message : string
}

// create (생성)
export async function addProduct(formData:FormData) {
    const name = formData.get('name');
    const category = formData.get('category');
    const price = parseInt(String(formData.get('price')?? '0'));
    const description = formData.get('description');

    // 추가될 자료의 Id 생성
    const newId = Date.now().toString();
    await supabase.from('products').insert({
        id : newId,
        name,
        category,
        price: parseInt(String(price)),
        description
    })
    
    // 서버 컴포넌트에서 라우팅 (경로변경)
    revalidatePath('/supaproduct')
    redirect('/supaproduct')
}

// Update (수정)
export async function updateProduct(formData : FormData) {
    const id = formData.get('id') as string;
    const name = formData.get('name') as string;
    const category = formData.get('category') as string;
    const price =formData.get('price') as string;
    const description = formData.get('description') as string;

    await supabase
        .from('paoducts')
        .update({name, category, price: parseInt(price), description})
        .eq('id', id);

    // 서버 컴포넌트에서 라우팅 (경로변경)
    revalidatePath('/supaproduct')
    redirect('/supaproduct')
}

// Delete (삭제)
export async function deleteProduct(formData : FormData) {
    const id = formData.get('id') as string;

    await supabase
        .from('products')
        .delete()
        .eq('id', id);
        
    // 서버 컴포넌트에서 라우팅 (경로변경)
    revalidatePath('/supaproduct')
    redirect('/supaproduct')
}