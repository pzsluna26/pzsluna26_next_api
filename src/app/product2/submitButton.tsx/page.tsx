'use client'
import { useActionState } from "react";
import { useFormState, useFormStatus } from "react-dom";

interface SubmitButtonProps {
    isEditMode : boolean
}
export default async function SubmitButton({isEditMode}: SubmitButtonProps) {
  const {pending} = useFormStatus();
    return (
    <div>
      <button type="submit"
              disabled={pending}
              className="bg-blue-300 text-white p-3 rounded-lg">
                {isEditMode ? (pending ? '수정중...' : '수정하기...')
                            : (pending ? '추가중...' : '추가하기...')}
      </button>
    </div>
  );
}