'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import Header from '@/components/global/header/Header'
import DishCategoriesList from '@/components/global/menu/Catagories'
import Menu from '@/components/global/menu/Menu'
import { selectToken, setUser, selectUser } from '@/store/slices/authSlice'
import MenuItemForm from '@/components/global/menu/forms/MenuItemForm'
import MenuCatagoriesForm from '@/components/global/menu/forms/MenuCatagoriesForm'
import { useGetUserDeatailsQuery } from '@/store/apis/authApi'
import GlobalLoader from '@/components/global/loaders/GlobalLoader'
import { useGetFoodCatagoryQuery } from '@/store/apis/foodCatagoryApi'
import { useGetMenuItemsQuery } from '@/store/apis/menuApi'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { Dish } from '@/types/types'
import Image from 'next/image'



export default function HomePage() {
  const [isDishDialogOpen, setIsDishDialogOpen] = useState(false)
  const [isCatagoryDialogOpen, setIsCatagoryDialogOpen] = useState(false)
  const [isEditingDish, setIsEditingDish] = useState(false)
  const [initialValues, setInitialValues] = useState<Omit<Dish, 'userId'>>({
    _id: '',
    name: '',
    category: '',
    description: '',
    price: '',
    isBestSeller: false,
    image: '',
  })

  const [isEditingCatagory, setIsEditingCatagory] = useState(false)
  const [initialCatagoryValues, setInitialCatagoryValues] = useState({
    _id: '',
    name: '',
    userId: ''
  })

  const router = useRouter()
  const dispatch = useDispatch()

  const token = useSelector(selectToken)
  const user = useSelector(selectUser)


  if (!token) {
    router.push('/login',)
  }


  const { data, isLoading: userDetailsLoading } = useGetUserDeatailsQuery(undefined, { skip: !token })
  const { data: foodCatagories, isLoading: foodCatagoriesLoading } = useGetFoodCatagoryQuery(user._id, { skip: !user })
  const { data: menu, isLoading: menuLoading } = useGetMenuItemsQuery(user._id, { skip: !token })



  useEffect(() => {
    if (data && data.user) {
      dispatch(setUser(data?.user))
    }
  }, [data])

  if (userDetailsLoading || foodCatagoriesLoading || menuLoading) {
    return <GlobalLoader />
  }

  return (
    <div className="min-h-screen bg-white p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <Header qrCode={data?.user?.qrCode} />

        <h1 className="text-xl font-bold text-zinc-800 m-2 mb-4 text-center">
          Effortlessly manage your restaurant&apos;s menu
        </h1>
        <div className='flex gap-4 justify-center'>
          <Button
            onClick={() => setIsDishDialogOpen(true)}
            className="bg-black hover:bg-gray-800 text-white">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Dish
          </Button>
          <Button variant="outline" className="border-black text-black hover:bg-gray-100"
            onClick={() => setIsCatagoryDialogOpen(true)}
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add Category
          </Button>
        </div>



        <div className="flex gap-4 justify-center">
          <MenuItemForm
            categories={foodCatagories ?? []}
            isDishDialogOpen={isDishDialogOpen}
            setIsDishDialogOpen={setIsDishDialogOpen}
            isEditing={isEditingDish}
            initialValues={initialValues}
            setIsEditing={setIsEditingDish}
          />
          <MenuCatagoriesForm
            setIsEditing={setIsEditingCatagory}
            categories={foodCatagories ?? []}
            isCategoryDialogOpen={isCatagoryDialogOpen}
            setIsCategoryDialogOpen={setIsCatagoryDialogOpen}
            isEditing={isEditingCatagory}
            value={initialCatagoryValues}
          />
        </div>
        <DishCategoriesList
          categories={foodCatagories ?? []}
          setValueToEdit={setInitialCatagoryValues}
          setIsEditing={setIsEditingCatagory}
          setIsCategoryDialogOpen={setIsCatagoryDialogOpen}
        />
        <Menu
          menu={menu ?? []}
          categories={foodCatagories ?? []}
          setDishToEdit={(data) => {
            setInitialValues(data)
            return data
          }}
          setIsEditingDish={setIsEditingDish}
          setIsDishDialogOpen={setIsDishDialogOpen}

        />
      </motion.div>
    </div>
  )
}