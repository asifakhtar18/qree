'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Utensils, Star, MapPin, Phone, Mail, Globe, Clock, User } from 'lucide-react'
import { Dish } from '@/types/types'
import { useGetUserMenuQuery } from '@/store/apis/getMenuApi'
import EmptyCustomerMenu from '@/components/global/loaders/EmptyCustomerMenu'



export default function CustomerMenu() {
    const [dishes, setDishes] = useState<Dish[]>()
    const [filteredDishes, setFilteredDishes] = useState<Dish[]>()
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedDish, setSelectedDish] = useState<Dish | null>(null)
    const [activeTab, setActiveTab] = useState('all')
    const tabsRef = useRef<HTMLDivElement>(null)


    const { userId } = useParams()
    const router = useRouter()

    const { data, isSuccess, isError, error } = useGetUserMenuQuery(userId as string)



    const user = data?.user



    useEffect(() => {
        if (isSuccess) {
            const { MenuItems } = data
            if (MenuItems.length > 0) {
                setDishes(MenuItems)
                setFilteredDishes(MenuItems)
            }
        }
    }, [isSuccess, data?.MenuItems])


    useEffect(() => {
        filterDishes(activeTab, searchTerm)
    }, [activeTab, searchTerm])

    const filterDishes = (tab: string, search: string) => {
        let filtered = dishes

        if (tab == 'bestseller') {
            filtered = filtered?.filter(dish => dish?.isBestSeller)
        }

        if (search) {
            filtered = filtered?.filter(dish =>
                dish?.name.toLowerCase().includes(search.toLowerCase()) ||
                dish?.description.toLowerCase().includes(search.toLowerCase())
            )
        }

        setFilteredDishes(filtered)
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    const handleTabChange = (value: string) => {
        setActiveTab(value)
        if (tabsRef.current) {
            const activeTabElement = tabsRef.current.querySelector(`[data-value="${value}"]`)
            if (activeTabElement) {
                activeTabElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
            }
        }
    }

    const groupedDishes = filteredDishes?.reduce((acc, dish) => {
        if (!acc[dish?.category]) {
            acc[dish?.category] = []
        }
        acc[dish?.category].push(dish)
        return acc
    }, {} as Record<string, Dish[]>)





    return (
        <div className="min-h-screen bg-gray-50">
            <motion.header
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white shadow-md"
            >
                {user?.profilePic && (
                    <Image
                        src={user?.profilePic}
                        alt={user?.restaurantName}
                        width={200}
                        height={200}
                        className="w-full h-48 object-cover"
                        priority
                    />
                )}
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">{user?.restaurantName}</h1>
                    {user?.ownerName && <div className="flex items-center mt-2">
                        <User className="h-4 w-4 mr-1 text-gray-400" />
                        <h6 className="text-gray-600">{user?.ownerName}</h6>
                    </div>}
                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
                        {user?.address && (
                            <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                                <span>{user?.address}</span>
                            </div>
                        )}
                        {user?.phoneNumber && (
                            <div className="flex items-center">
                                <Phone className="h-4 w-4 mr-2 text-gray-400" />
                                <span>{user?.phoneNumber}</span>
                            </div>
                        )}
                        {
                            user?.email && (
                                <div className="flex items-center">
                                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                                    <span>{user?.email}</span>
                                </div>
                            )
                        }
                    </div>
                </div>
            </motion.header>
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {data?.MenuItems?.length <= 0 ? (
                    <EmptyCustomerMenu />
                ) : (
                    <div className="px-4 py-6 sm:px-0">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <div className="mb-6">
                                <Input
                                    placeholder="Search menu..."
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    className="max-w-md mx-auto"
                                />
                            </div>
                            <div className="relative mb-6 overflow-hidden">
                                <div
                                    ref={tabsRef}
                                    className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide"
                                >
                                    {['all', 'bestseller'].map((tab) => (
                                        <motion.button
                                            key={tab}
                                            onClick={() => handleTabChange(tab)}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ease-in-out flex items-center whitespace-nowrap ${activeTab === tab
                                                ? 'bg-primary text-primary-foreground'
                                                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                                                }`}
                                            data-value={tab}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {tab === 'all' && <Utensils className="h-4 w-4 mr-2" />}
                                            {tab === 'bestseller' && <Star className="h-4 w-4 mr-2" />}
                                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {Object.entries(groupedDishes || {}).map(([category, dishes]) => (
                                    <div key={category} className="mb-12">
                                        <h2 className="text-2xl font-semibold mb-6 text-gray-800">{category}</h2>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {dishes?.map(dish => (
                                                <motion.div
                                                    key={dish?._id}
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                                                        <CardHeader className="p-0">
                                                            {dish?.image ? (
                                                                <Image
                                                                    src={typeof dish.image === 'string' ? dish.image : URL.createObjectURL(dish.image)}
                                                                    alt={dish.name}
                                                                    width={300}
                                                                    height={300}
                                                                    className="w-full h-48 object-cover"
                                                                    priority
                                                                />
                                                            ) : (
                                                                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                                                                    No image
                                                                </div>
                                                            )
                                                            }
                                                        </CardHeader>
                                                        <CardContent className="p-4">
                                                            <div className="flex justify-between items-start mb-2">
                                                                <CardTitle className="text-lg">{dish?.name}</CardTitle>
                                                                {dish?.isBestSeller && (
                                                                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                                                                        <Star className="h-3 w-3 mr-1" fill="currentColor" />
                                                                        Best Seller
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <CardDescription className="text-sm text-gray-600 mb-4">{dish?.description}</CardDescription>
                                                            <div className="flex justify-between items-center">
                                                                <span className="font-semibold text-lg">₹{dish?.price}</span>
                                                                <Dialog>
                                                                    <DialogTrigger asChild>
                                                                        <Button variant="outline" size="sm" onClick={() => setSelectedDish(dish)}>
                                                                            View Details
                                                                        </Button>
                                                                    </DialogTrigger>
                                                                    <DialogContent>
                                                                        <DialogHeader>
                                                                            <DialogTitle>{selectedDish?.name}</DialogTitle>
                                                                        </DialogHeader>
                                                                        <div className="mt-4">
                                                                            <Image
                                                                                width={300}
                                                                                height={300}
                                                                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                                                                // @ts-ignore
                                                                                src={typeof selectedDish?.image === 'string' ? selectedDish?.image : null}
                                                                                alt='Dish Image'
                                                                                className="w-full h-64 object-cover rounded-md mb-4"
                                                                                priority
                                                                            />

                                                                            <p className="text-gray-600 mb-4">{selectedDish?.description}</p>
                                                                            <p className="font-semibold text-lg mb-2">₹{selectedDish?.price}</p>

                                                                            {selectedDish?.isBestSeller && (
                                                                                <p className="text-sm text-yellow-600 flex items-center">
                                                                                    <Star className="h-4 w-4 mr-1" fill="currentColor" /> Best Seller
                                                                                </p>
                                                                            )}
                                                                        </div>
                                                                    </DialogContent>
                                                                </Dialog>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                )}
            </main>
        </div>
    )
}