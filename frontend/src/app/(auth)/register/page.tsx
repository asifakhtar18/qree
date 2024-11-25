'use client'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setToken, selectUser } from '@/store/slices/authSlice'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "@/components/hooks/use-toast"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { registerSchema, OtpSchema } from '@/lib/schema'
import { ToastAction } from '@/components/ui/toast'
import InputOTPForm from '@/components/global/input/otpInput'
import { registerPageTexts } from '@/lib/contants'

import { useRegisterMutation, useVerifyEmailMutation, useUpdateUserMutation } from '@/store/apis/authApi'
import ProfilePicture from '@/components/global/input/profilePicUpload'

export default function Component() {
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const [register, registerResult] = useRegisterMutation()
    const [verifyEmail, verifyEmailResult] = useVerifyEmailMutation()
    const [updateUser, updateUserResult] = useUpdateUserMutation()




    const user = useSelector(selectUser)
    const router = useRouter()
    const dispatch = useDispatch()

    const registerForm = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
    });


    if (user.email && user.name) {
        router.push('/')
    }




    const otpForm = useForm<z.infer<typeof OtpSchema>>({
        resolver: zodResolver(OtpSchema),
        defaultValues: {
            otp: "",
        },
    })

    const { handleSubmit, control, setValue, formState: { errors } } = registerForm;

    const submitOtp = (data: z.infer<typeof registerSchema>) => {
        console.log(data);
    }

    const handleNext = async () => {
        if (step === 1) {
            if (!registerForm.getValues().email) {
                toast({
                    description: "Please enter email and try again.",
                    variant: "destructive",
                    action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
                })
                return;
            }
            try {
                setLoading(true)
                await register({
                    email: registerForm.getValues().email
                }).unwrap()
                setLoading(false)
                setStep(prev => Math.min(prev + 1, 3))
            }
            catch (err) {
                console.log(err)
                setLoading(false)
            }
        }
        if (step === 2) {
            if (!otpForm.getValues().otp) {
                toast({
                    description: "Please enter OTP and try again.",
                    variant: "destructive",
                    action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
                });
                return;
            }
            try {
                setLoading(true)
                const res = await verifyEmail({
                    email: registerForm.getValues().email,
                    otp: otpForm.getValues().otp,
                })
                setLoading(false)
                if (res.data.token) {
                    console.log("res.data.token", res.data.token)
                    dispatch(setToken(res.data.token))
                    setStep(prev => Math.min(prev + 1, 3))
                }
            } catch (err) {
                console.log(err)
                setLoading(false)
            }
        }
    };
    const handlePrev = () => setStep(prev => Math.max(prev - 1, 1));


    const handleFileChange = (file: File | null) => {
        console.log("file", file)
        if (file) {
            setValue("profilePicture", file);
        }
    }


    useEffect(() => {
        if (errors && Object.keys(errors).length > 0) {
            toast({
                description: "Please fill all required fields and try again.",
                variant: "destructive",
                action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
            });
        }
    }, [errors]);

    const onSubmit = async (data: z.infer<typeof registerSchema>) => {
        const { restaurantName, email, password, profilePicture } = data
        const formData = new FormData();
        formData.append("profilePicture", profilePicture!);
        formData.append("restaurantName", restaurantName);
        formData.append("email", email);
        formData.append("password", password);
        setLoading(true)
        try {
            await updateUser(formData)
            setLoading(false)
        }
        catch (err) {
            console.log(err)
            setLoading(false)
        }
    }


    if (updateUserResult.isSuccess) {
        router.push('/')
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">

            <div className="w-full h-screen bg-primary hidden md:block " />

            <div className="w-full max-w-md ">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">{registerPageTexts[step - 1].title}</CardTitle>
                    <CardDescription className="text-center">{registerPageTexts[step - 1].description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...registerForm}>
                        <form >
                            <div className="space-y-4">
                                {step === 1 && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        className='position-relative z-10 '
                                    >
                                        <FormField
                                            control={control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel htmlFor="email">Email</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            id="email"
                                                            type="email"
                                                            placeholder="xyz@example.com"
                                                            value={field.value || ''}
                                                            onChange={field.onChange}
                                                            required
                                                            autoFocus
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                    </motion.div>
                                )}
                                {step === 2 && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        className='space-y-4'
                                    >
                                        <div>
                                            <InputOTPForm
                                                onSubmit={submitOtp}
                                                form={otpForm}
                                            />
                                        </div>

                                    </motion.div>

                                )}
                                {step === 3 && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        className="text-center"
                                    >
                                        <Label htmlFor="profilePicture" className="block mb-4">Profile Picture</Label>

                                        <ProfilePicture
                                            profilePicture={""}
                                            handleFileChange={(file) => handleFileChange(file)}
                                        />

                                        <FormField
                                            control={control}
                                            name="restaurantName"
                                            render={({ field }) => (
                                                <FormItem className="w-full flex flex-col items-start gap-1 mt-4">
                                                    <FormLabel htmlFor="name">Resturant Name</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            id="name"
                                                            placeholder="Resturant Name"
                                                            {...field}
                                                            required
                                                            autoFocus

                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem className='w-full flex flex-col items-start gap-1 mt-4'>
                                                    <FormLabel htmlFor="password">Password</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            id="password"
                                                            type="password"
                                                            {...field}
                                                            required
                                                            placeholder='●●●●●●●'


                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                    <FormDescription>
                                                        Choose a password of at least 6 characters
                                                    </FormDescription>
                                                </FormItem>
                                            )}
                                        />
                                        <FormMessage />
                                    </motion.div>
                                )}
                            </div>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    {step > 1 && step < 3 && (
                        <Button type="button" variant="outline" onClick={handlePrev}>
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                        </Button>
                    )}
                    {step < 3 ? (
                        <Button type="button" onClick={handleNext} disabled={loading} className="ml-auto ">
                            {
                                loading ?
                                    <>
                                        Loading
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    </>
                                    :
                                    <>
                                        Next
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                            }
                        </Button>
                    ) : (
                        <Button type="submit" disabled={loading} onClick={handleSubmit(onSubmit)} className="ml-auto w-full">
                            {
                                loading ?
                                    <>
                                        Loading
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    </>
                                    :
                                    <>
                                        Confirm
                                    </>
                            }
                        </Button>
                    )}
                </CardFooter>
                {step === 1 && (
                    <div className="flex justify-center mb-4">
                        <p className="text-sm text-muted-foreground">
                            Already have an account?{' '}
                            <Link href="/login" className="text-primary hover:underline">
                                Login
                            </Link>
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
