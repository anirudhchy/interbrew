import { auth } from "@/auth";

const AuthTest = async () => {
  const session = await auth();

  console.log("session", session);

  return <div>AuthTest</div>;
};

export default AuthTest;
