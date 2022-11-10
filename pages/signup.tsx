import React, { useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Postcode from "./postcode";

const Signup: React.FC = (props) => {
  const [formStatus, setFormStatus] = useState<string>("");

  const [address, setAddress] = useState<string>("");

  //부서 정할때 toggle
  const [toggle, setToggle] = useState(true);
  const onToggle = () => {
    setToggle(!toggle);
  };

  const onSelect = (id: number) => {
    setDeptid(id);
  };

  //Input tag내에서 사용할 참조값
  //id, password, name, nickname, profile_url, address
  //detail_address, department_id, team_id
  const idInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const nicknameInputRef = useRef<HTMLInputElement>(null);
  const profileUrlInputRef = useRef<HTMLInputElement>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);
  const detailInputRef = useRef<HTMLInputElement>(null);
  const teamIdInputRef = useRef<HTMLInputElement>(null);
  const [deptid, setDeptid] = useState(1);

  const { status } = useSession();
  const router = useRouter();

  async function createUser(
    id: string,
    password: string,
    name: string,
    nickname: string,
    profileImageURL: string,
    address: string,
    detailAddress: string,
    deptid: number,
    teamid: number
  ): Promise<any> {
    const response = await fetch("api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        id,
        password,
        name,
        nickname,
        profileImageURL,
        address,
        detailAddress,
        deptid,
        teamid,
      }),
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

    const enteredID = idInputRef.current?.value;
    const enteredPassword = passwordInputRef.current?.value;
    const enteredName = nameInputRef.current?.value;
    const enteredNickname = nicknameInputRef.current?.value;
    const enteredProfileUrl = profileUrlInputRef.current?.value;
    const enteredAddress = addressInputRef.current?.value;
    const enteredDetailAddress = detailInputRef.current?.value;
    const enteredDeptId = deptid;
    const enteredTeamId = Number(teamIdInputRef.current?.value);
    try {
      const result = await createUser(
        enteredID!,
        enteredPassword!,
        enteredName!,
        enteredNickname!,
        enteredProfileUrl!,
        enteredAddress!,
        enteredDetailAddress!,
        enteredDeptId!,
        enteredTeamId!
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
        <div className="mb-4">
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
            placeholder="Password"
            required
            ref={passwordInputRef}
          />
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mt-2 mb-2"
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
              className="block text-gray-700 text-sm font-bold mt-2 mb-2"
              htmlFor="nickname"
            >
              닉네임
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="nickname"
              type="text"
              placeholder="Nickname"
              required
              ref={nicknameInputRef}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mt-2 mb-2"
              htmlFor="profile"
            >
              프로필
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="profile"
              type="text"
              placeholder="ProfileImage"
              required
              ref={profileUrlInputRef}
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
                readOnly={true}
                value={address}
              />

              <Postcode setAddress={setAddress} />
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="detailaddress"
            >
              상세 주소
            </label>
            <div className="flex flex-auto space-x-4">
              <input
                className="shadow appearance-none border rounded grow py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="detailaddress"
                type="text"
                placeholder="Detail Address"
                required
                ref={detailInputRef}
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mt-2 mb-2"
              htmlFor="department"
            >
              부서
            </label>
            <button
              className="relative flex justify-center items-center bg-white border focus: outline-none shadow text-gray-600 rounded focus:ring ring-gray-200"
              onClick={(e) => {
                e.preventDefault();
                onToggle();
              }}
            >
              <p className="px-4">{deptid}</p>
              <span className=" border-l p-2 hover:bg-gray-100" id="dropdown">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-strokelinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </span>
              <div
                className={`${
                  toggle
                    ? "hidden"
                    : "absolute top-full min-w-full w-max bg-white shadow-md mt-1 rounded"
                }`}
              >
                <ul className="text-left border rounded">
                  <li
                    className="px-4 py-1 hover:bg-gray-100 border-b"
                    onClick={() => onSelect(1)}
                  >
                    1번부서
                  </li>
                  <li
                    className="px-4 py-1 hover:bg-gray-100 border-b"
                    onClick={() => onSelect(2)}
                  >
                    2번부서
                  </li>
                  <li
                    className="px-4 py-1 hover:bg-gray-100 border-b"
                    onClick={() => onSelect(3)}
                  >
                    3번부서
                  </li>
                </ul>
              </div>
            </button>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mt-2 mb-2"
              htmlFor="team"
            >
              팀
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="team"
              type="text"
              placeholder="team"
              required
              ref={teamIdInputRef}
            />
          </div>

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
