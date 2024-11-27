'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { User, Store, Phone, MapPin, Mail, ArrowLeft, Loader2 } from 'lucide-react'

import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useToast } from '@/components/hooks/use-toast'

import IconInput from '@/components/global/input/IconInput'
import ProfilePicture from '@/components/global/input/profilePicUpload'
import GlobalLoader from '@/components/global/loaders/GlobalLoader'

import { ownerSchema } from '@/lib/schema'
import { useUpdateUserMutation, useGetUserDeatailsQuery } from '@/store/apis/authApi'
import { ToastAction } from '@/components/ui/toast'

type OwnerDetails = z.infer<typeof ownerSchema>

export default function OwnerProfile() {

    const router = useRouter()
    const { toast } = useToast()

    const { control, setValue, handleSubmit, formState: { errors } } = useForm<OwnerDetails>({
        resolver: zodResolver(ownerSchema),
        defaultValues: {
            ownerName: '',
            restaurantName: '',
            phoneNumber: '',
            address: '',
            email: '',
            profilePicture: undefined
        }
    })

    console.log(errors)

    const [updateUser, { isLoading: isUpdating, isSuccess: isUpdated, isError: isFailed, error }] = useUpdateUserMutation()
    const { data: user, isLoading } = useGetUserDeatailsQuery(undefined)


    useEffect(() => {

        if (user) {
            setValue('ownerName', user.user?.ownerName || '')
            setValue('restaurantName', user.user?.restaurantName || '')
            setValue('phoneNumber', user.user?.phoneNumber || '')
            setValue('address', user.user?.address || '')
            setValue('email', user.user?.email || '')
            setValue('profilePicture', user.user?.profilePic || '')
        }
    }, [user])


    useEffect(() => {
        if (isUpdated) {
            toast({
                title: 'Success',
                description: 'Profile updated successfully',
                duration: 3000,
                action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
            })
        }
        if (isFailed) {
            const updateError = error as { data: { message: string } }
            toast({
                title: 'Error',
                description: updateError?.data?.message,
                duration: 3000,
                action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
            })
        }
    }, [isUpdated])



    const onSubmit = async (data: OwnerDetails) => {

        const formData = new FormData();
        formData.append('ownerName', data.ownerName || user?.user?.ownerName || '');
        formData.append('restaurantName', data.restaurantName || user?.user?.restaurantName || '');
        formData.append('phoneNumber', data.phoneNumber || user?.user?.phoneNumber || '');
        formData.append('address', data.address || user?.user?.address || '');
        formData.append('email', data.email || user?.user?.email || '');

        if (data?.profilePicture instanceof File) {
            formData.append('profilePicture', data.profilePicture);
        } else {
            formData.append('profilePicture', user?.user?.profilePic || '');
        }

        await updateUser(formData);

    }

    const handleProfilePictureChange = (file: File) => {
        if (file) {
            setValue('profilePicture', file)
        }
    }


    if (isLoading) {
        return (
            <GlobalLoader />
        )
    }




    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8"
        >

            <div className="max-w-2xl mx-auto">
                <div className='flex items-center gap-4'>
                    <ArrowLeft
                        onClick={() => router.back()}
                        className="text-4xl font-bold text-gray-800 mb-4" />
                    <div className="text-2xl font-bold text-gray-800 mb-4">Profile</div>

                </div>
                <form className="space-y-4 ">
                    <Controller
                        name="profilePicture"
                        control={control}
                        render={({ field }) => (
                            <ProfilePicture
                                profilePicture={user?.user?.profilePic || ''}
                                handleFileChange={(file) => handleProfilePictureChange(file as File)}
                            />
                        )}
                    />
                    <div className="space-y-2">
                        <Label htmlFor="ownerName">Owner Name</Label>
                        <Controller
                            name="ownerName"
                            control={control}
                            render={({ field }) => (
                                <IconInput
                                    icon={User}
                                    placeholder="Enter owner name"
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        {errors.ownerName && <p className="text-red-500 text-sm">{errors.ownerName.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="restaurantName">Restaurant Name</Label>
                        <Controller
                            name="restaurantName"
                            control={control}
                            render={({ field }) => (
                                <IconInput
                                    icon={Store}
                                    placeholder="Enter restaurant name"
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        {errors.restaurantName && <p className="text-red-500 text-sm">{errors.restaurantName.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Controller
                            name="phoneNumber"
                            control={control}
                            render={({ field }) => (
                                <IconInput
                                    icon={Phone}
                                    placeholder="Enter phone number"
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Controller
                            name="address"
                            control={control}
                            render={({ field }) => (
                                <IconInput
                                    icon={MapPin}
                                    placeholder="Enter address"
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <IconInput
                                    icon={Mail}
                                    placeholder="Enter email address"
                                    value={field.value}
                                    onChange={field.onChange}
                                    disabled={true}
                                />
                            )}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>
                </form>
                <Button onClick={handleSubmit(onSubmit)} className="w-full mt-4">
                    {isUpdating ?
                        (
                            <div className="flex items-center justify-center">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                <span>Updating...</span>
                            </div>
                        ) : 'Update'}
                </Button>

            </div>
        </motion.div>
    )
}
