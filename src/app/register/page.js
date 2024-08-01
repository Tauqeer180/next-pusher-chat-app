"use client";
import * as Yup from "yup";

import { Input } from "@/components/common/Input";
import { H3 } from "@/components/common/Typography";
import { Form, Formik } from "formik";
import { useState } from "react";
import Button from "@/components/common/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Cookies from "js-cookie";
import useUser from "@/Hooks/useUser";
import { useAuth } from "@/Providers/AuthContext";
import Link from "next/link";
import Loader from "@/components/common/Loader";
import { useQueryClient } from "@tanstack/react-query";

export const RegisterSchema = Yup.object().shape({
  fName: Yup.string().required("Required"),
  lName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(5, "Enter valid password").required("Required"),
});
export default function Register() {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { refreshAuth } = useUser();
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleSubmit = async (values) => {
    // e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...values }),
    });
    const data = await res.json();
    if (data?.success) {
      queryClient.invalidateQueries({ queryKey: ["chatUsers"] });

      login(data?.token, data?.user);

      setLoading(false);
    } else {
    }
    console.log(data);
    toast(data?.message);
    setLoading(false);
    // router.push('/')
  };

  return (
    <div className=" ">
      {loading && <Loader />}
      <div className="   max-w-7xl lg:px-11 sm:px-4 px-2 mx-auto pb-24 ">
        <H3 className="text-center">Register</H3>
        <Formik
          initialValues={{
            password: "",
            email: "",
          }}
          validationSchema={RegisterSchema}
          validateOnBlur={false}
          validateOnChange={false}
          enableReinitialize={true}
          onSubmit={handleSubmit}
        >
          {({ values, handleBlur, handleChange, errors, setFieldValue }) => (
            <Form>
              <>
                <div className=" py-4 md:px-4 px-2 grid   grid-cols-1 gap-x-4 max-w-md mx-auto border rounded-lg mt-10 shadow">
                  <div className="">
                    <Input
                      name="fName"
                      value={values?.fName}
                      onChange={handleChange}
                      label="first Name"
                      errors={errors}
                    />
                  </div>

                  <div className="">
                    <Input
                      name="lName"
                      value={values?.lName}
                      onChange={handleChange}
                      label="last Name"
                      errors={errors}
                    />
                  </div>

                  <div className="">
                    <Input
                      name="email"
                      value={values?.email}
                      type="email"
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
                      href="/login"
                      className="text-gray-400 hover:text-blue-800 font-fredoka text-xs"
                    >
                      Have an account? Login Here
                    </Link>
                  </div>
                  <div className="flex justify-end gap-4 pb-3 md:px-4 px-2 sm:mt-10 mt-6">
                    <Button type="submit">Register</Button>
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
