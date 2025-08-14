'use client'
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
    isEditMode : boolean
}
export default function SubmitButton({isEditMode}: SubmitButtonProps) {
  const {pending} = useFormStatus();
    return (
    <div>
      <button type="submit"
              disabled={pending}
              className="bg-blue-300 text-white p-3 rounded-lg">
                {isEditMode ? (pending ? '수정중...' : '상품수정')
                            : (pending ? '추가중...' : '상품추가')}
      </button>
    </div>
  );
}