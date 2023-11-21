'use client';

import { useAppSelector } from "@/app/globalRedux/store";
import { Textarea, useToast } from "@chakra-ui/react";
import { Modal, ModalContent, NextUIProvider } from '@nextui-org/react';
import { ErrorMessage, Field, Form, Formik } from 'formik';

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from 'yup';



export default function Onboarding() {
    const toast = useToast()

    const [isOpen, setIsOpen] = useState(true);
    const AuthState = useAppSelector((state) => state.authReducer.value)
    const dispatch = useDispatch();
    const router = useRouter();
    const [errorerrorMessage, setErrorMessage] = useState(null as any)


    const initialValues = {

    };


    const validationSchema = Yup.object().shape({
        // rememberMe: Yup.boolean(),
        // email: Yup.string().email("Invalid email address").required("Email is required"),
        // password: Yup.string().required("Password is required"),
    });

    const handleSubmit = async (values: any) => {
    }


    return (
        <NextUIProvider>
            <Modal
                className="max-w-4xl max-h-5xl"
                isOpen={isOpen}
                backdrop="blur"
                // onOpenChange={() => {
                //     setIsOpen(!isOpen);
                // }}
                // onClose={() => {
                //     setIsOpen(!isOpen);
                // }}
                radius="lg"
                classNames={{
                    closeButton: 'hidden',
                    base: "w-screen",
                    backdrop: "bg-gray-900/50",
                }}
            >
                <ModalContent>
                    {() => (
                        <>
                            <div className="flex flex-col items-center justify-center w-screen bg-gray-900 py-8">
                                <h1 className="text-3xl text-cyan-300 font-semibold mb-4">
                                    Onboarding!
                                </h1>
                                <div className="flex items-center pb-[2rem]">
                                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="inline-block mr-2">
                                        <g fill="none" stroke="#0ea5e9" strokeLinejoin="round">
                                            <path strokeLinecap="round" d="M4 4.001h16v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-14Z" />
                                            <path strokeWidth="1.5" d="M12 8h.01v.01H12z" />
                                            <path strokeLinecap="round" d="M12 12v4" />
                                        </g>
                                    </svg>
                                    <p className="text-sm text-cyan-100 text-center">
                                        Please complete filling out your profile for a better experience.
                                    </p>
                                </div>

                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={handleSubmit}
                                >
                                    {({ values, setFieldValue }) => (
                                        <Form>
                                            <div className="flex flex-col relative mb-8 mx-auto">
                                                <div className="flex items-center justify-center w-full mb-6">
                                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center h-32 w-32 rounded-full cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 border-2 border-gray-300 border-dashed">
                                                        <div className="flex flex-col items-center justify-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="38" height="33" viewBox="0 0 58 53" fill="none">
                                                                <path d="M52.5 13H44.575L40 8H25V13H37.8L42.375 18H52.5V48H12.5V25.5H7.5V48C7.5 50.75 9.75 53 12.5 53H52.5C55.25 53 57.5 50.75 57.5 48V18C57.5 15.25 55.25 13 52.5 13ZM20 33C20 39.9 25.6 45.5 32.5 45.5C39.4 45.5 45 39.9 45 33C45 26.1 39.4 20.5 32.5 20.5C25.6 20.5 20 26.1 20 33ZM32.5 25.5C36.625 25.5 40 28.875 40 33C40 37.125 36.625 40.5 32.5 40.5C28.375 40.5 25 37.125 25 33C25 28.875 28.375 25.5 32.5 25.5ZM12.5 13H20V8H12.5V0.5H7.5V8H0V13H7.5V20.5H12.5V13Z" fill="#C6BCBC" />
                                                            </svg>
                                                        </div>
                                                        <input id="dropzone-file" type="file" className="hidden" />
                                                    </label>
                                                </div>
                                                {/* <div className="flex  justify-center ">


                                                    <label htmlFor="avatar" className="cursor-pointer" style={{
                                                        width: "5rem",
                                                        height: "5rem",
                                                        borderRadius: "50%",
                                                    }}>
                                                        <Avatar
                                                            style={{
                                                                width: "5rem",
                                                                height: "5rem",
                                                                borderRadius: "50%",
                                                            }}
                                                            isBordered
                                                            color="default"
                                                            showFallback
                                                            fallback={
                                                                <>
                                                                    <input
                                                                        type="file"
                                                                        id="avatar"
                                                                        name="avatar"
                                                                        accept="image/*"
                                                                        className="hidden"
                                                                        onChange={(event) => {
                                                                            const file = event.target.files?.[0];
                                                                            if (file) {
                                                                                setFieldValue("avatar", file);
                                                                            }
                                                                        }}
                                                                    />
                                                                    <svg width="48" height="48" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                        <path fill="#ffffff" d="M19 13a1 1 0 0 0-1 1v.38l-1.48-1.48a2.79 2.79 0 0 0-3.93 0l-.7.7l-2.48-2.48a2.85 2.85 0 0 0-3.93 0L4 12.6V7a1 1 0 0 1 1-1h7a1 1 0 0 0 0-2H5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-5a1 1 0 0 0-1-1ZM5 20a1 1 0 0 1-1-1v-3.57l2.9-2.9a.79.79 0 0 1 1.09 0l3.17 3.17l4.3 4.3Zm13-1a.89.89 0 0 1-.18.53L13.31 15l.7-.7a.77.77 0 0 1 1.1 0L18 17.21Zm4.71-14.71l-3-3a1 1 0 0 0-.33-.21a1 1 0 0 0-.76 0a1 1 0 0 0-.33.21l-3 3a1 1 0 0 0 1.42 1.42L18 4.41V10a1 1 0 0 0 2 0V4.41l1.29 1.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42Z" />
                                                                    </svg>
                                                                </>
                                                            }
                                                        />
                                                    </label>
                                                </div> */}
                                            </div>
                                            <div className="flex flex-col relative mb-8">
                                                <div className="absolute top-[-2rem] text-slate-200 text-sm mb-8">Bio</div>


                                                <Field
                                                    name="bio"
                                                    type="text"
                                                    placeholder="Bio"
                                                    component={Textarea}
                                                    rows={4}
                                                    variant="outlined"
                                                    fullWidth
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        backgroundColor: "#1f2937",
                                                        color: "#fff",
                                                    }}
                                                />
                                                <ErrorMessage name="bio" component="div" className="text-red-500 text-sm" />
                                            </div>

                                            <div className="flex flex-col relative mb-8 p-1">
                                                <div className="absolute top-[-2rem] text-slate-200 text-sm mb-8">username</div>
                                                <Field
                                                    name="username"
                                                    type="text"
                                                    placeholder="username"
                                                    className="text-sm font-light w-80 px-4 py-3 text-white bg-gray-900 border border-solid placeholder-slate-600 border-slate-700  rounded pl-10"
                                                />
                                                <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
                                            </div>

                                            <div className="flex flex-col relative mb-8 p-1">
                                                <div className="absolute top-[-2rem] text-slate-200 text-sm mb-8">Phone number</div>
                                                <Field
                                                    name="Phone number"
                                                    type="text"
                                                    placeholder="Phone number"
                                                    className="text-sm font-light w-80 px-4 py-3 text-white bg-gray-900 border border-solid placeholder-slate-600 border-slate-700  rounded pl-10"
                                                />
                                                <ErrorMessage name="Phone number" component="div" className="text-red-500 text-sm" />
                                            </div>

                                            <div className="flex justify-center">

                                                <button
                                                    className="mt-4 bg-indigo-600 w-80 hover:bg-blue-700 px-4 py-3 text-white rounded font-medium text-sm"
                                                    type="submit"
                                                >
                                                    submit
                                                </button>
                                            </div>
                                        </Form>
                                    )}



                                </Formik>
                            </div>

                        </>
                    )}
                </ModalContent>
            </Modal>
        </NextUIProvider>
    )


}