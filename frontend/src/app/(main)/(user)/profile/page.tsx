'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { User, Store, Phone, MapPin, Mail, Loader2, ArrowLeft } from 'lucide-react'
import IconInput from '@/components/global/input/IconInput'
import ProfilePicture from '@/components/global/input/profilePicUpload'
import { useUpdateUserMutation, useGetUserDeatailsQuery } from '@/store/apis/authApi'
import { ownerSchema } from '@/lib/schema'

type OwnerDetails = z.infer<typeof ownerSchema>

export default function OwnerProfile() {
    const [dataChanged, setDataChanged] = useState(false)
    const router = useRouter()

    const { control, setValue, handleSubmit, formState: { errors, isDirty } } = useForm<OwnerDetails>({
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

    const [updateUser, updateUserResult] = useUpdateUserMutation()
    const { data, isLoading } = useGetUserDeatailsQuery(undefined)


    useEffect(() => {
        if (data) {
            setValue('ownerName', data.user?.name || '')
            setValue('restaurantName', data.user?.restaurantName || '')
            setValue('phoneNumber', data.user?.phoneNumber || '')
            setValue('address', data.user?.address || '')
            setValue('email', data.user?.email || '')
            setValue('profilePicture', data.user?.profilePic || '')
        }
    }, [data])


    useEffect(() => {
        if (isDirty) {
            setDataChanged(true)
        }
    }, [isDirty])


    const onSubmit = async (data: OwnerDetails) => {


        console.log(data)

        const formData = new FormData();
        formData.append('name', data.ownerName || '');
        formData.append('restaurantName', data.restaurantName || '');
        formData.append('phoneNumber', data.phoneNumber || '');
        formData.append('address', data.address || '');
        formData.append('email', data.email || '');

        if (data.profilePicture instanceof File) {
            formData.append('profilePicture', data.profilePicture);
        }

        const response = await updateUser(formData);
        console.log(response)
    }

    const handleProfilePictureChange = (file: File) => {
        if (file) {
            setValue('profilePicture', file)
            setDataChanged(true)
        }
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
                    <ProfilePicture
                        profilePicture={data?.user?.profilePic || ''}
                        handleFileChange={(file: any) => handleProfilePictureChange(file)}
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
                        <Label htmlFor="phoneNumber">phoneNumber Number</Label>
                        <Controller
                            name="phoneNumber"
                            control={control}
                            render={({ field }) => (
                                <IconInput
                                    icon={Phone}
                                    placeholder="Enter phoneNumber number"
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
                    Save
                </Button>
            </div>
        </motion.div>
    )
}
