"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from "@/components/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"


export function InputOTPForm({ form, onSubmit }: any) {

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full ">
                <FormField
                    control={form.control}
                    name="otp"
                    render={({ field }) => (
                        <FormItem className="w-full flex flex-col items-center gap-1 " >
                            <FormControl>
                                <InputOTP maxLength={6}
                                    {...field}
                                >
                                    <InputOTPGroup className="gap-2">
                                        <InputOTPSlot className="rounded-lg" index={0} />
                                        <InputOTPSlot className="rounded-lg" index={1} />
                                        <InputOTPSlot className="rounded-lg" index={2} />
                                        <InputOTPSlot className="rounded-lg" index={3} />
                                        <InputOTPSlot className="rounded-lg" index={4} />
                                        <InputOTPSlot className="rounded-lg" index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </FormControl>
                            <FormDescription>
                                Please enter the one-time password sent to your email.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}



export default InputOTPForm