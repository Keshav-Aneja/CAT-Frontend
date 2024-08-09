"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
// import images from "@/constants/images";
import CreateAccountForm from "@/sections/auth/createAccountForm";
import { INSPECTOR_DASHBOARD, ADMIN_DASHBOARD } from "@/config/routes";
import { useRouter } from "next/navigation";

export type RegistrationData = {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
};
const RecruiterRegistration = () => {
  useState<RegistrationData | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // const verification = VerifyToken("candidate");
    // if (verification) {
    //   router.push(INSPECTOR_DASHBOARD);
    //   return;
    // }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Image
          src={"/next.svg"}
          alt="Skillarena"
          width={600}
          height={400}
          className="w-20 md:w-32 animate-pulse h-auto mb-6"
        />
      </div>
    );
  }
  return (
    <div className="w-full h-screen flex justify-between">
      <div className="hidden lg:block w-[55%] h-full relative">
        <Image
          src="/next.svg"
          className="w-full h-full object-cover"
          width={1000}
          height={1000}
          alt=""
        />
        <div className="w-full h-[30%] absolute bottom-0 left-0 z-[30] bg-gradient-to-t from-[rgba(0,0,0,0.7)] to-[rgba(0,0,0,0)]"></div>
        <div className="text-5xl font-semibold absolute bottom-12 left-12 z-[50] text-white leading-[4rem]">
          Make your hiring
          <br />
          <span className="text-main">Fast</span>,{" "}
          <span className="text-main">Relevant</span> and{" "}
          <span className="text-main">Efficient</span>
        </div>
      </div>
      <div className="w-full lg:w-[45%] h-full max-h-screen overflow-y-auto flex items-center flex-col p-4 md:p-8 px-6 md:px-10 bg-white dark:bg-base_dark">
        <CreateAccountForm />
      </div>
    </div>
  );
};

export default RecruiterRegistration;
