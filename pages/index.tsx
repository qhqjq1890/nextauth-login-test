import { useSession, signOut, signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  if (session) {
    return (
      <>
        Signed in as {session.user?.id}
        <br />
        <button onClick={() => signOut()}>로그아웃</button>
      </>
    );
  }

  return (
    <>
      아직 로그인 되지 않았습니다
      <br />
      <button onClick={() => router.replace("/login")}>로그인</button>
    </>
  );
}
