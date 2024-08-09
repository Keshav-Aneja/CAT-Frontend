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
import {
  createAccountSchema,
  createAccountType,
} from "@/schemas/createAccountSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import Button from "@/components/ui/buttons/Button";
import Link from "next/link";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import "@/styles/forms.css";
import postHandler from "@/handlers/post_handler";
import Dropdown from "@/components/Dropdown";
import Cookies from "js-cookie";
export default function CreateAccountForm() {
  const [mutex, setMutex] = useState(false);
  const form = useForm<createAccountType>({
    resolver: zodResolver(createAccountSchema),
  });
  async function onSubmit(values: createAccountType) {
    setMutex(true);
    const data = {
      ...values,
      role: "Inspector",
    };
    if (data.password !== data.confirmPassword) {
      toast({
        title: "Password Mismatch",
        variant: "destructive",
      });
      setMutex(false);
      return;
    }
    try {
      const response = await postHandler("/auth/register", data);
      if (!response.success) {
        toast({
          title: "Error",
          description: response.message,
          variant: "destructive",
        });
        return;
      }
      const token = response.data.token;
      const role = response.data.user.role;
      localStorage.setItem("role", role);
      Cookies.set("token", token);
      toast({
        title: "Success",
        description: response.message,
      });
      setMutex(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message ?? "Error in registration",
        variant: "destructive",
      });
    }
  }
  return (
    <div className="w-full h-full flex flex-col gap-6 ">
      <div className="w-full flex flex-col gap-3">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full md:w-[80%]">
                  <FormLabel className="text-sm font-semibold">
                    Your Name<strong>*</strong>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your name"
                      className="bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full md:w-[80%]">
                  <FormLabel className="text-sm font-semibold">
                    Email<strong>*</strong>
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
              name="contactNumber"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full md:w-[80%]">
                  <FormLabel className="text-sm font-semibold">
                    Phone Number<strong>*</strong>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter Phone Number"
                      className="bg-white"
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="employeeID"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full md:w-[80%]">
                  <FormLabel className="text-sm font-semibold">
                    Employee ID<strong>*</strong>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter Employee ID"
                      className="bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Dropdown
              form={form}
              data={["Inspector", "Admin"]}
              label="Select Role"
              id="role"
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full md:w-[80%]">
                  <FormLabel className="text-sm font-semibold">
                    Password<strong>*</strong>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter password"
                      className="bg-white"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="confirmPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full md:w-[80%]">
                  <FormLabel className="text-sm font-semibold">
                    Confirm Password<strong>*</strong>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Re-enter your password"
                      className="bg-white"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              btnType="submit"
              disabled={mutex}
              className="rounded-full py-3 mx-auto mt-4 w-[50%] flex justify-center "
            >
              <p>Create Account</p>
            </Button>
          </form>
        </Form>
      </div>
      <span className="font-medium text-primary text-sm mx-auto pb-6 md:pb-0">
        Already have an account?{" "}
        <Link
          href="/recruiter/login"
          className="text-main_comp font-bold underline underline-offset-4"
        >
          Login Now
        </Link>
      </span>
    </div>
  );
}
