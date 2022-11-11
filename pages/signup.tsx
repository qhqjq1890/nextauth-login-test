import { useRouter } from "next/router";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Postcode from "./postcode";

export interface FormValue {
  id: string;
  password: string;
  name: string;
  nickname: string;
  profileImageURL: string;
  address: string;
  detailAddress: string;
  deptid: number;
  teamid: number;
}

const ReactHookForms: React.FC = () => {
  const { register, handleSubmit } = useForm<FormValue>();
  const [formStatus, setFormStatus] = useState<string>("");
  const router = useRouter();
  const [address, setAddress] = useState<string>("");

  async function createUser(obj: FormValue): Promise<any> {
    const response = await fetch("api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        id: obj.id,
        password: obj.password,
        name: obj.name,
        nickname: obj.nickname,
        profileImageURL: obj.profileImageURL,
        address: address,
        detailAddress: obj.detailAddress,
        deptid: Number(obj.deptid),
        teamid: Number(obj.teamid),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(obj);
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!");
    }
    return data;
  }

  //회원가입 버튼 눌렀을 때 값 받아옴
  const onSubmitHandler: SubmitHandler<FormValue> = async (data) => {
    try {
      const result = await createUser(data);
      setFormStatus(`Sign up Success: ${result.message}`);
      router.push("/login");
    } catch (error: any) {
      setFormStatus(`Error Occured: ${error.message}`);
    }
  };

  return (
    <div className="container px-5 py-10 mx-auto w-2/3">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-4xl text-gray-700 font-semibold">
          Sign Up
        </h1>
      </div>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            아이디
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("id")}
            placeholder="ID"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            비밀번호
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            {...register("password")}
            placeholder="PASSWORD"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            이름
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("name")}
            placeholder="NAME"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            닉네임
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("nickname")}
            placeholder="NICKNAME"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            프로필이미지
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("profileImageURL")}
            placeholder="ProfileImage"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            주소
          </label>
          <div className="flex  space-x-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register("address")}
              placeholder="ADDRESS"
              value={address}
              readOnly={true}
            />
            <Postcode setAddress={setAddress} />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            상세주소
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("detailAddress")}
            placeholder="DetailAdress"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            부서
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("deptid", { required: true })}
          >
            <option value="1">부서1</option>
            <option value="2">부서2</option>
            <option value="3">부서3</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            팀
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("teamid", { required: true })}
          >
            <option value="1">팀1</option>
            <option value="2">팀2</option>
            <option value="3">팀3</option>
          </select>
        </div>
        <p className="text-red-500 text-xs italic">{formStatus}</p>
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

export default ReactHookForms;
