import React from 'react';

export default async function deleteProductAction(id:string) {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const resp = await fetch(`${baseUrl}/api/produt2/${id}`,{
        method: "DELETE"
    });
    if (!resp.ok){
        const data = resp.json();
        return {message : `API오류 : ${data}`}
        }
        

        // revaildatePath('/product2')
        // redirect('/product2')
    
  return (
    <div>
      
    </div>
  );
}