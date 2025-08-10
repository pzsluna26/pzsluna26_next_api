'use client'
import { useAtom } from "jotai";
import { isLogin } from "@/atoms/IsLoginAtom";
import { useEffect, useState } from "react";
import Login from "../Login/page";

export default function Home() {
  const [login] = useAtom(isLogin);
  const [id, setId] = useState<string | null>(null);

    useEffect(() => {
    if (login) {
      const storedId = localStorage.getItem("id");
      setId(storedId);
    }
  }, [login]);

  return (
    <div>
      {login ? (
        <div className="mt-50 text-gray-600">{id} 님 로그인이 되었습니다☺️</div>
      ) : (
        <Login />
      )}
    </div>
  );
}
