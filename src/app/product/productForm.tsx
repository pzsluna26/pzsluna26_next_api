'use client'
import type {Product} from "@/app/types/products"
import { useActionState } from "react"
import type {FormStatus} from "@/app/actions"
import {createProductAction, updateProductAction} from "@/app/actions"
import SubmitButton from "@/app/product/submitButton"

// 데이터가 있을 수 도 있고 없을 수 도 있을 때 => ?
interface ProductFormProps{
    product?: Product;
}

export default function ProductForm({product}:ProductFormProps) {
    const isEditMode = product != null;
                        // product가 있으면 수정모드, 없으면 입력모드
    const actionUse = isEditMode? updateProductAction : createProductAction;
    const initState : FormStatus = {message: ''};
    //useActionState [상태,폼액션값]
    const [state, formAction] = useActionState(actionUse,initState);

  return (
    <div className="w-fi;; bg-white p-8 rounded-lg shadow-md">
        <form action={formAction} className="grid grid-cols-q">
            {isEditMode && <input type="hidden" name="id" value={product.id}/>}
            <div className="p-4">
                <label htmlFor="name" className="text-gray-600 mr-2">제품명</label>
                <input type="text"
                       id="name"
                       name="name"
                       required
                       defaultValue={isEditMode? product.name:""}
                       className="mt-1 w-full p-2 border boder-gray-300 runded-md"/>

            </div>
            <div className="p-4">
                <label htmlFor="category" className="text-gray-600 mr-2">카테고리</label>
                <input type="text"
                       id="category"
                       name="category"
                       required
                       defaultValue={isEditMode? product.category:""}
                       className="mt-1 w-full p-2 border boder-gray-300 runded-md"/>
                       
            </div>
            <div className="p-4">
                <label htmlFor="price" className="text-gray-600 mr-2">제품가격</label>
                <input type="text"
                       id="price"
                       name="price"
                       required
                       defaultValue={isEditMode? product.price:""}
                       className="mt-1 w-full p-2 border boder-gray-300 runded-md"/>
                       
            </div>
            <div className="p-4">
                <label htmlFor="description" className="text-gray-600 mr-2">제품설명</label>
                <input type="text"
                       id="description"
                       name="description"
                       required
                       defaultValue={isEditMode? product.description:""}
                       className="mt-1 w-full p-2 border boder-gray-300 runded-md"/>
                       
            </div>
            <div className="w-full text-right md:col-span-2 lg:col-span-4">
                <SubmitButton isEditMode={isEditMode}/>
            </div>
        </form>
      
    </div>
  );
}