import { useState } from "react"
import { CookingPot, Edit, Menu, Trash2 } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../ui/card"
import { Category } from "@/types/types"
import { useDeleteFoodCatagoryMutation } from "@/store/apis/foodCatagoryApi"

import { CustomModal } from "../modal/CustomModal"

interface DishCategoriesListProps {
    categories: Category[]
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
    setValueToEdit: (value: {
        _id: string
        name: string
        userId: string
    }) => void
    setIsCategoryDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}



const DishCategoriesList = ({ categories, setIsEditing, setValueToEdit, setIsCategoryDialogOpen }: DishCategoriesListProps) => {

    const [catToDelete, setCatToDelete] = useState({
        _id: '',
        name: '',
    })
    const [isDeletingCat, setIsDeletingCat] = useState(false)



    const [deleteFoodCatagory] = useDeleteFoodCatagoryMutation();

    const handleEditCategory = (category: Category) => {
        setIsEditing(true);
        setValueToEdit(category);
        setIsCategoryDialogOpen(true);
    };

    const handleDeleteCategory = (category: Category) => {
        setCatToDelete(category);
        setIsDeletingCat(true);
    }


    const deleteTheCategory = async () => {
        try {
            await deleteFoodCatagory(catToDelete._id);
            setIsDeletingCat(false);
        }
        catch (error) {
            console.log(error);
        }
    }


    if (isDeletingCat) {
        return (
            <CustomModal
                openModal={isDeletingCat}
                setOpenModal={setIsDeletingCat}
                title={`Delete ${catToDelete.name}`}
                description="Are you sure you want to delete this category?"
                btnType="destructive"
                confirmAction={deleteTheCategory}
            />
        )
    }



    return (
        <Card className="mb-8 bg-white border border-gray-200">
            <CardHeader>
                <CardTitle className="text-2xl text-black flex items-center">
                    <Menu className="mr-2 h-5 w-5" />
                    Categories
                </CardTitle>
                <CardDescription>View and manage categories </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2">
                    {categories?.length === 0 && (
                        <div className="w-full text-center text-gray-500 py-8">
                            <CookingPot className="mx-auto h-12 w-12 mb-4 text-gray-300" />
                            <p>Please start by adding categories of food that you serve. </p>
                        </div>
                    )}
                    {categories?.map((category: Category, index) => (
                        <div
                            key={index}
                            className=" flex items-center bg-gray-100 text-black px-3 py-1 rounded-full text-sm font-medium"
                        >
                            {category.name}
                            <Edit className="ml-2 h-4 w-4 cursor-pointer text-blue-500 "
                                onClick={() => handleEditCategory(category)}
                            />

                            <Trash2 className="ml-2 h-4 w-4 cursor-pointer text-red-500"
                                onClick={() => handleDeleteCategory(category)}
                            />

                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default DishCategoriesList