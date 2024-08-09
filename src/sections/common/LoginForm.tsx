import { LoginSchema, LoginType } from "@/schemas/createAccountSchema";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Button from "@/components/ui/buttons/Button";
import { MdOutlineArrowForward } from "react-icons/md";
// import { LoginData } from "@/app/recruiter/(auth)/login/page";
import "@/styles/forms.css";
import Link from "next/link";
import postHandler from "@/handlers/post_handler";
import { toast } from "@/components/ui/use-toast";
import { INSPECTOR_REGISTER, ADMIN_REGISTER } from "@/config/routes";
import Cookies from "js-cookie";

const LoginForm = () => {
  const [mutex, setMutex] = useState(false);
  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
  });
  async function onSubmit(values: LoginType) {
    try {
      const response = await postHandler("/auth/login", values);
      console.log(response);
      if (!response.success) {
        throw new Error(response.message);
      }
      toast({
        title: "Success",
        description: response.message,
      });
      const token = response.data.token;
      Cookies.set("token", token);
      const role = response.data.user.role;
      localStorage.setItem("role", role);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    }
  }
  return (
    <div className="w-full h-full flex flex-col gap-16">
      <div className="w-full flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Login</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full md:w-[80%]">
                  <FormLabel className="text-base font-semibold">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your email"
                      className="bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full md:w-[80%]">
                  <FormLabel className="text-base font-semibold">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your password"
                      className="bg-white"
                      type="passsword"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              btnType="submit"
              disabled={mutex}
              className="rounded-full py-3 mx-auto mt-4 px-12 font-semibold text-sm md:text-base text-center flex items-center gap-2 justify-center"
            >
              <p>Next</p>
              <MdOutlineArrowForward />
            </Button>
          </form>
        </Form>
      </div>
      <span className="font-medium text-primary text-sm mx-auto">
        Don&apos;t have an account?{" "}
        <Link
          href={INSPECTOR_REGISTER}
          className="text-main_comp underline underline-offset-4 font-semibold"
        >
          Register
        </Link>
      </span>
    </div>
  );
};

export default LoginForm;
