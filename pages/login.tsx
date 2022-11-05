import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState, useRef } from "react";

export default function Home() {
  const [formStatus, setFormStatus] = useState<string>("");
  const idInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  async function submitHandler(event: React.SyntheticEvent) {
    event.preventDefault();

    const enteredId = idInputRef.current?.value;
    const enteredpassword = passwordInputRef.current?.value;

    const result = await signIn("credentials", {
      redirect: false,
      id: enteredId,
      password: enteredpassword,
    });

    if (!result?.error) {
      setFormStatus(`로그인 성공`);
      router.replace("/");
    } else {
      setFormStatus(`${result.error}`);
    }
  }

  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    router.replace("/");
    return <div>이미 로그인 되었습니다. 메인 페이지로 이동합니다.</div>;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-green-200 to-green-500">
      <form onSubmit={submitHandler}>
        <div className="bg-white w-96 p-6 rounded shadow-sm">
          <div className="flex items-center justify-center mb-4">
            <img src="goodluck.svg" className="h-32" />
          </div>
          <label className="text-gray-700">ID</label>
          <input
            className="w-full py-2 bg-green-200 rounded-xl autofill:bg-green-300 text-black px-1 outline-none mb-4"
            type="id"
            ref={idInputRef}
          />
          <label className="text-gray-700">Password</label>
          <input
            className="w-full py-2 bg-green-200 rounded-xl autofill:bg-green-300 text-black px-1 outline-none mb-4"
            type="password"
            ref={passwordInputRef}
          />
          <input id="auto-login" className="mb-6 mx-2" type="checkbox" />
          <label htmlFor="auto-login">자동로그인</label>
          <p className="text-red-500 text-xs italic">{formStatus}</p>
          <button
            type="submit"
            className="bg-green-500 w-full text-white py-2 rounded my-1 hover:bg-green-600 transition-colors"
          >
            로그인
          </button>
          <button
            type="button"
            className="bg-green-500 w-full text-white py-2 rounded my-1 hover:bg-green-600 transition-colors"
            onClick={() => router.replace("/signup")}
          >
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
}
