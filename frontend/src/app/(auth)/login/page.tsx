'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { useToast } from '@/components/hooks/use-toast'

import { setToken } from '@/store/slices/authSlice'
import { loginSchema } from '@/lib/schema'
import { useLoginMutation } from '@/store/apis/authApi'
import { selectToken } from '@/store/slices/authSlice'

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false)

    const token = useSelector(selectToken)
    const router = useRouter()
    const dispatch = useDispatch()

    const { toast } = useToast()

    if (token) {
        router.push('/')
    }

    const loginForm = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
    })

    const { handleSubmit, control } = loginForm

    const [login, loginResult] = useLoginMutation()


    const onSubmit = async (data: z.infer<typeof loginSchema>) => {
        setIsLoading(true)
        try {
            const response = await login(data).unwrap()
            dispatch(setToken(response?.token))
            setIsLoading(false)
        }
        catch (err) {
            console.log(err)
            setIsLoading(false)
            toast({
                title: "Error",
                description: "Invalid credentials",
                variant: "destructive",
            })
        }
    }


    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
            <div className="w-full h-screen bg-primary hidden md:block" />
            <div className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
                    <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...loginForm}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <motion.div
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -50 }}
                                    >
                                        <FormField
                                            control={control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <Label htmlFor="email">Email</Label>
                                                    <Input
                                                        id="email"
                                                        type="email"

                                                        onChange={field.onChange}
                                                        value={field.value}
                                                        placeholder='xyz@example.com'
                                                    />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                    </motion.div>
                                </div>
                                <div className="space-y-2">
                                    <motion.div
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
                                        exit={{ opacity: 0, x: -50 }}
                                    >

                                        <FormField
                                            control={loginForm.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <Label htmlFor="password">Password</Label>
                                                    <Input
                                                        id="password"
                                                        type="password"

                                                        {...field}
                                                        placeholder='●●●●●●●'
                                                    />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </motion.div>
                                </div>
                            </div>
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0, transition: { delay: 0.4 } }}
                                exit={{ opacity: 0, x: -50 }}
                            >
                                <Button className="w-full mt-6" type="submit" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Logging in...
                                        </>
                                    ) : (
                                        <>
                                            Login
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </>
                                    )}

                                </Button>
                            </motion.div>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <motion.div
                        initial={{ opacity: 0, }}
                        animate={{ opacity: 1, transition: { delay: 0.6, duration: 0.5 } }}
                        exit={{ opacity: 0, x: -50 }}
                    >
                        <p className="text-sm text-muted-foreground">
                            Don&apos;t have an account?{' '}
                            <Link href="/register" className="text-primary hover:underline">
                                Register here
                            </Link>
                        </p>
                    </motion.div>
                </CardFooter>
            </div>
        </div >
    )
}