"use client";
import useUser from "@/Hooks/useUser";
import { useAuth } from "@/Providers/AuthContext";
import { Input } from "@/components/common/Input";
import Loader from "@/components/common/Loader";
import { H3 } from "@/components/common/Typography";
import Button from "@/components/common/button";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
// import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(5, "Enter valid password").required("Required"),
});
export default function Login() {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { refreshAuth } = useUser();
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleSubmit = async (values) => {
    setLoading(true);
    console.log("Login Value ", values);
    // e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    console.log(data);
    if (data?.success) {
      login(data?.token, data?.user);
      queryClient.invalidateQueries({ queryKey: ["chatUsers"] });
      // Cookies.set("token", data?.token);
      // Cookies.set("user", JSON.stringify(data?.user));
      setLoading(false);
      router.replace("/");
      // refreshAuth();
    } else {
      setLoading(false);
    }
    console.log(data);
    toast(data?.message);
  };

  return (
    <div className=" ">
      {loading && <Loader />}
      <div className="   max-w-7xl lg:px-11 sm:px-4 px-2 mx-auto pb-24 ">
        <H3 className="text-center">Login</H3>
        <Formik
          initialValues={{
            password: "",
            email: "",
          }}
          validationSchema={LoginSchema}
          validateOnBlur={false}
          validateOnChange={false}
          enableReinitialize={true}
          onSubmit={handleSubmit}
        >
          {({ values, handleBlur, handleChange, errors, setFieldValue }) => (
            <Form>
              <>
                <div className=" overflow-y-auto py-4 md:px-4 px-2 grid   grid-cols-1 gap-x-4 max-w-md mx-auto border rounded-lg mt-10 shadow">
                  <div className="">
                    <Input
                      name="email"
                      value={values?.email}
                      onChange={handleChange}
                      label="email"
                      errors={errors}
                    />
                  </div>
                  <div className="">
                    <Input
                      name="password"
                      value={values?.password}
                      onChange={handleChange}
                      label="password"
                      type="password"
                      errors={errors}
                    />
                  </div>
                  <div className="text-end">
                    <Link
                      href="/register"
                      className="text-gray-400 hover:text-blue-800 font-fredoka text-xs"
                    >
                      {`Don't`} have an account? Register Here
                    </Link>
                  </div>
                  <div className="flex justify-end gap-4 pb-3 md:px-4 px-2 sm:mt-10 mt-6">
                    <Button type="submit">Login</Button>
                  </div>
                </div>
              </>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
