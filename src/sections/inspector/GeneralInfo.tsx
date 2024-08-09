import {
  HeaderSchema,
  HeadersSchemaType,
} from "@/components/inspector/Recorder";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

const GeneralInfo = ({ data }: { data: HeadersSchemaType }) => {
  const form = useForm<HeadersSchemaType>({
    resolver: zodResolver(HeaderSchema),
    defaultValues: data,
  });
  function onSubmit(values: HeadersSchemaType) {
    console.log(values);
  }
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full grid grid-cols-2 relative"
        >
          <FormField
            name="truckSerialNumber"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full md:w-[80%]">
                <FormLabel className="text-sm font-semibold">
                  Truck Serial Number<strong>*</strong>
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter truck serial number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="truckModel"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full md:w-[80%]">
                <FormLabel className="text-sm font-semibold">
                  Truck Model<strong>*</strong>
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter truck model" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="inspectionId"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full md:w-[80%]">
                <FormLabel className="text-sm font-semibold">
                  Inspection ID<strong>*</strong>
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter inspection ID" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="inspectorName"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full md:w-[80%]">
                <FormLabel className="text-sm font-semibold">
                  Inspector Name<strong>*</strong>
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter inspector name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="inspectionEmployeeId"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full md:w-[80%]">
                <FormLabel className="text-sm font-semibold">
                  Inspection Employee ID<strong>*</strong>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter inspection employee ID"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="serviceMeterHours"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full md:w-[80%]">
                <FormLabel className="text-sm font-semibold">
                  Service Meter Hours<strong>*</strong>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    placeholder="Enter service meter hours"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="companyName"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full md:w-[80%]">
                <FormLabel className="text-sm font-semibold">
                  Company Name<strong>*</strong>
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter company name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="CATCustomerId"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full md:w-[80%]">
                <FormLabel className="text-sm font-semibold">
                  CAT Customer ID<strong>*</strong>
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter CAT customer ID" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full  absolute -bottom-8 left-1/2 -translate-x-1/2 flex justify-center">
            <Button type="submit" className="w-1/3 top-8 relative">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default GeneralInfo;
