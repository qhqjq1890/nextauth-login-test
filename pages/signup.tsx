import React, { useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Signup: React.FC = (props) => {
  const [formStatus, setFormStatus] = useState<string>("");

  const nameInputRef = useRef<HTMLInputElement>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);
  const idInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const { status } = useSession();
  const router = useRouter();

  async function createUser(
    name: string,
    address: string,
    id: string,
    password: string
  ): Promise<any> {
    const response = await fetch("api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ name, address, id, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!");
    }
    return data;
  }

  async function submitHandler(event: React.SyntheticEvent) {
    event.preventDefault();

    const enteredName = nameInputRef.current?.value;
    const enteredAddress = addressInputRef.current?.value;
    const enteredID = idInputRef.current?.value;
    const enteredPassword = passwordInputRef.current?.value;
    try {
      const result = await createUser(
        enteredName!,
        enteredAddress!,
        enteredID!,
        enteredPassword!
      );
      console.log(result);
      setFormStatus(`Sign up Success: ${result.message}`);
      router.replace("/login");
    } catch (error: any) {
      console.log(error);
      setFormStatus(`Error Occured: ${error.message}`);
    }
  }

  if (status === "authenticated") {
    router.replace("/login");
    return (
      <div>
        <h1>Sign Up</h1>
        <div>You are already signed up.</div>
        <div>Now redirect to main page.</div>
      </div>
    );
  }

  return (
    <div className="container px-5 py-10 mx-auto w-2/3">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-4xl text-gray-700 font-semibold">
          Sign Up
        </h1>
      </div>
      <form
        onSubmit={submitHandler}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            이름
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Name"
            required
            ref={nameInputRef}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="address"
          >
            주소
          </label>
          <div className="flex flex-auto space-x-4">
            <input
              className="shadow appearance-none border rounded grow py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="address"
              type="text"
              placeholder="Address"
              required
              ref={addressInputRef}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white flex-none font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => {
                console.log("hi");
              }}
            >
              주소 찾기
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="id"
          >
            ID
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="id"
            type="text"
            placeholder="ID"
            required
            ref={idInputRef}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            required
            ref={passwordInputRef}
          />

          <p className="text-red-500 text-xs italic">{formStatus}</p>
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;