import { LoginContainer } from "@/containers/login";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Login",
};

export default function Login() {
  return (
    <Suspense>
      <LoginContainer />
    </Suspense>
  );
}
