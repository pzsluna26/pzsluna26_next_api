'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation"; 

export interface FormStatus {
    message : string
}

export async function createProductAction(preState : FormStatus, formData : FormData) : Promise<FormStatus> {
    const name = formData.get('name');
    const category = formData.get('category');
    const price = parseInt(String(formData.get('price')?? '0'));
    const description = formData.get('description');

    console.log('createProductAction', name)
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
    const resp = await fetch(`${baseUrl}/api/products`, 
        {method: "POST",
         headers : {
            'Content-type' : 'application/json'
         },
         body:JSON.stringify({name,category,price,description})   
        });

        if (!resp.ok) {
            const data = resp.json();
            return {message : `API오류 : ${data}`}
        }
        revalidatePath('/product')
        redirect('/product')
}

export async function updateProductAction(preState : FormStatus, formData : FormData) : Promise<FormStatus> {
    const id = formData.get('id');
    const name = formData.get('name');
    const category = formData.get('category');
    const price = parseInt(String(formData.get('price')?? '0'));
    const description = formData.get('description');

    console.log('updateProductAction', name)
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'; 
    const resp = await fetch(`${baseUrl}/api/products/${id}`, 
        {method: "PUT",
         headers : {
            'Content-type' : 'application/json'
         },
         body:JSON.stringify({name,category,price,description})   
        });

        if (!resp.ok) {
            const data = resp.json();
            return {message : `API오류 : ${data}`}
        }
        revalidatePath(`/product/${id}`)
        redirect(`/product`)
}