'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Mail, Loader2, CheckCircle, Lock, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import InputOTPForm from '@/components/global/input/otpInput'
import IconInput from '@/components/global/input/IconInput'

import { useForgotPasswordMutation, useResetPasswordMutation } from '@/store/apis/authApi'
import { useToast } from '@/components/hooks/use-toast'
import { ToastAction } from '@/components/ui/toast'

const emailSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
})

const otpSchema = z.object({
    otp: z.string().length(6, 'OTP must be 6 digits'),
})

type EmailForm = z.infer<typeof emailSchema>
type OTPForm = z.infer<typeof otpSchema>

export default function ForgotPassword() {
    const [step, setStep] = useState<'email' | 'otp' | 'success'>('email')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isPasswordMatched, setIsPasswordMatched] = useState(true)
    const [disableSubmit, setDisableSubmit] = useState(false)
    const [pwLengthErr, setPwLengthErr] = useState(false)
    const [showResendOtp, setShowResendOtp] = useState(false)

    const { toast } = useToast()

    const emailForm = useForm<EmailForm>({
        resolver: zodResolver(emailSchema),
    })

    const otpForm = useForm<OTPForm>({
        resolver: zodResolver(otpSchema),
    })

    const [forgotPassword, forgotPasswordResult] = useForgotPasswordMutation();
    const [resetPassword, resetPasswordResult] = useResetPasswordMutation();

    const onEmailSubmit = async (data: EmailForm) => {
        setIsSubmitting(true)
        setEmail(data.email)
        await forgotPassword(data.email)
        setIsSubmitting(false)
    }

    const onOTPSubmit = async (data: OTPForm) => {
        setIsSubmitting(true)
        await resetPassword({ email, otp: data.otp, password })
        setIsSubmitting(false)
    }


    const onResendOtp = async () => {
        setShowResendOtp(true)
        await forgotPassword(email)
        setShowResendOtp(false)
        resetPasswordResult.reset()
    }


    useEffect(() => {
        if (password !== confirmPassword && confirmPassword !== '' && password !== '') {
            setIsPasswordMatched(false)
        } else {
            setIsPasswordMatched(true)
        }

        if (password.length < 6 && password !== '') {
            setPwLengthErr(true)
        } else {
            setPwLengthErr(false)
        }

    }, [password, confirmPassword])


    useEffect(() => {
        if (isSubmitting || !isPasswordMatched || !otpForm.formState.isValid || password === '' || confirmPassword === '' || pwLengthErr) {
            setDisableSubmit(true)
        } else {
            setDisableSubmit(false)
        }
    }, [isSubmitting, isPasswordMatched, otpForm.formState.isValid, password, confirmPassword, pwLengthErr])


    useEffect(() => {
        if (forgotPasswordResult.isSuccess) {
            setStep('otp')
        }

        if (forgotPasswordResult.isError) {
            const error = forgotPasswordResult?.error as { data: { message: string } }
            if (error?.data) {
                toast({
                    description: error.data.message || "Something went wrong",
                    variant: "destructive",
                    action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
                })
            } else {
                toast({
                    description: "Something went wrong",
                    variant: "destructive",
                    action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
                })
            }
        }

        if (resetPasswordResult.isSuccess) {
            setStep('success')
        }

        if (resetPasswordResult.isError) {
            const error = resetPasswordResult?.error as { data: { message: string } }
            if (error?.data?.message === 'Invalid OTP') {
                setShowResendOtp(true)
            }
            if (error?.data) {
                toast({
                    description: error.data.message || "Something went wrong",
                    variant: "destructive",
                    action: <ToastAction altText="dismiss">Dismiss</ToastAction>,
                })
            }

        }

    }, [forgotPasswordResult, resetPasswordResult])


    return (
        <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                {step === 'email' &&
                    <Link href="/login" className="flex items-center justify-center text-sm text-gray-600 hover:text-gray-900 mb-8">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to login
                    </Link>
                }
                <div className="bg-white py-8 px-4 sm:rounded-lg sm:px-10">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Forgot your password?
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600 max-w">
                            {step === 'email' && "No worries, we'll send you reset instructions."}
                            {step === 'otp' && "We've sent a 6-digit code to your email."}
                            {step === 'success' && "Your password has been reset successfully."}
                        </p>
                    </div>

                    <div className="mt-8">
                        <AnimatePresence mode="wait">
                            {step === 'email' && (
                                <motion.div
                                    key="email"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-6">
                                        <div>
                                            <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                Email address
                                            </Label>
                                            <div className="mt-1 relative rounded-md shadow-sm">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                </div>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    {...emailForm.register('email')}
                                                    className={`pl-10 ${emailForm.formState.errors.email ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                                                    placeholder="Enter your email"
                                                />
                                            </div>
                                            {emailForm.formState.errors.email && (
                                                <p className="mt-2 text-sm text-red-600" id="email-error">
                                                    {emailForm.formState.errors.email.message}
                                                </p>
                                            )}
                                        </div>
                                        <Button type="submit" className="w-full flex justify-center py-2 px-4" disabled={isSubmitting}>
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                'Send reset instructions'
                                            )}
                                        </Button>
                                    </form>
                                </motion.div>
                            )}

                            {step === 'otp' && (
                                <motion.div
                                    key="otp"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <p className="text-sm text-gray-500 text-center">
                                        We've sent a code to {email}
                                    </p>
                                    <form {...otpForm} onSubmit={otpForm.handleSubmit(onOTPSubmit)} className="space-y-4">

                                        <InputOTPForm form={otpForm} onSubmit={onOTPSubmit} />
                                        {showResendOtp && (
                                            <p
                                                className='text-sm text-blue-600 text-center cursor-pointer'
                                                onClick={onResendOtp}
                                            >
                                                Resend OTP
                                            </p>
                                        )
                                        }
                                        <IconInput
                                            type="password"
                                            icon={Lock}
                                            placeholder="New Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            disabled={isSubmitting}
                                            rightIcon={Eye}
                                        />
                                        <IconInput
                                            icon={Lock}
                                            placeholder="Confirm New Password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            disabled={isSubmitting}
                                            rightIcon={EyeOff}
                                        />
                                        {!isPasswordMatched && (
                                            <p className="text-sm text-red-500 ">
                                                Passwords do not match
                                            </p>
                                        )}
                                        {
                                            pwLengthErr && (
                                                <p className="text-sm text-red-500">
                                                    Password should be at least 6 characters long.
                                                </p>
                                            )
                                        }
                                        <Button type="submit" className="w-full flex justify-center py-2 px-4" disabled={disableSubmit} onClick={otpForm.handleSubmit(onOTPSubmit)}>
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Resetting...
                                                </>
                                            ) : (
                                                'Reset Password'
                                            )}
                                        </Button>
                                    </form>
                                </motion.div>
                            )}

                            {step === 'success' && (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="text-center"
                                >
                                    <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                                    <h3 className="mt-2 text-lg font-medium text-gray-900">Password Reset Successful</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Your password has been reset successfully. You can now log in with your new password.
                                    </p>
                                    <Button asChild className="mt-6">
                                        <Link href="/login">Go to Login</Link>
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
                {step !== 'success' && <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500">
                        Remember your password?{' '}
                        <Link href="/login" className="font-medium text-primary hover:text-primary/80">
                            Sign in
                        </Link>
                    </p>
                </div>}
            </div>
        </div >
    )
}