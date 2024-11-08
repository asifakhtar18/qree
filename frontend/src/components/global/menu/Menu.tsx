import { useState } from "react"
import { Edit, Gem, Image, Trash2, UtensilsCrossed } from "lucide-react"

import { Label } from "../../ui/label"
import { Button } from "../../ui/button"
import { Switch } from "../../ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../ui/card"

import { CustomModal } from "../modal/CustomModal"
import { Category, Dish } from "@/types/types"
import { useDeleteMenuItemMutation, useToggleIsBestSellerMutation } from "@/store/apis/menuApi"




interface MenuProps {
    menu: Dish[]
    categories: Category[]
    setDishToEdit: (dish: Omit<Dish, 'userId'>) => Omit<Dish, 'userId'>
    setIsEditingDish: React.Dispatch<React.SetStateAction<boolean>>
    setIsDishDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Menu = ({ menu, categories, setDishToEdit, setIsEditingDish, setIsDishDialogOpen }: MenuProps) => {

    const [isDeleteItemModalOpen, setIsDeleteItemModalOpen] = useState(false)
    const [dishIdToDelete, setDishIdToDelete] = useState<string | null>(null)


    const groupedDishes = menu.reduce((acc, dish) => {
        if (!acc[dish.category]) {

            acc[dish.category] = []
        }
        acc[dish.category].push(dish)
        return acc
    }, {} as Record<string, Dish[]>)

    const [deleteMenuItem, deleteMenuItemResult] = useDeleteMenuItemMutation();
    const [toggleIsBestSeller, toggleIsBestSellerResult] = useToggleIsBestSellerMutation();




    const handleDeleteDish = async (id: string) => {
        setIsDeleteItemModalOpen(true)
        setDishIdToDelete(id)
    }


    const deleteDish = async () => {
        try {
            dishIdToDelete && await deleteMenuItem(dishIdToDelete)
            setIsDeleteItemModalOpen(false)
        } catch (error) {
            console.error("Failed to delete dish:", error)
        }
    }

    const handleToggleBestSeller = async (id: string) => {
        try {
            await toggleIsBestSeller(id)
        } catch (error) {
            console.error("Failed to toggle best seller:", error)
        }
    }

    const handleEditDish = (dish: Dish) => {
        setDishToEdit(dish)
        setIsEditingDish(true)
        setIsDishDialogOpen(true)
    }



    return (
        <>
            {isDeleteItemModalOpen && (
                <CustomModal
                    btnType="destructive"
                    openModal={isDeleteItemModalOpen}
                    setOpenModal={setIsDeleteItemModalOpen}
                    title="Delete Dish"
                    description="Are you sure you want to delete this dish?"
                    confirmAction={deleteDish}

                />
            )}

            <Card className="bg-white border border-gray-200">
                <CardHeader>
                    <CardTitle className="text-2xl text-black flex items-center">
                        <UtensilsCrossed className="mr-2 h-5 w-5" /> Current Menu
                    </CardTitle>
                    <CardDescription>View and manage your existing menu items</CardDescription>
                </CardHeader>
                <CardContent>
                    {Object.keys(groupedDishes).length === 0 ? (
                        <div className="text-center text-gray-500 py-8">
                            <UtensilsCrossed className="mx-auto h-12 w-12 mb-4 text-gray-300" />
                            <p>No dishes added yet. Start by adding your first dish!</p>
                        </div>
                    ) : (
                        <div className="space-y-8 ">
                            {categories.map((category, index) => (
                                groupedDishes[category.name] && groupedDishes[category.name].length > 0 && (
                                    <div key={index}>
                                        <h3 className="text-xl font-semibold text-black mb-4">{category.name}</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {groupedDishes[category.name].map((dish, index) => (

                                                <Card key={index} className="bg-gray-50 border border-gray-100 flex flex-col justify-between">
                                                    <CardContent className="flex flex-col gap-4 p-4">
                                                        <div>
                                                            <CardTitle className="text-lg text-black flex items-center justify-between pb-4">
                                                                {dish.name}
                                                                {dish.isBestSeller && (
                                                                    <div className="flex bg-yellow-400 px-2 py-1 rounded-md">
                                                                        <p className="text-xs font-semibold text-white">Best Seller</p>
                                                                        <Gem className="ml-2 h-4 w-4 text-white" />
                                                                    </div>
                                                                )}
                                                            </CardTitle>

                                                            {dish.image ? (
                                                                <img
                                                                    className="m-auto w-full h-28  object-cover rounded-md border border-gray-100 shadow-sm"
                                                                    src={typeof dish.image === 'string' ? dish.image : URL.createObjectURL(dish.image)}
                                                                    alt={dish.name}
                                                                />

                                                            ) :
                                                                (
                                                                    <div className="m-auto w-full h-28 bg-gray-200 rounded-md flex items-center justify-center">
                                                                        <Image src="/images/placeholder.png" width={120} height={80} alt="food placeholder" className="object-cover opacity-50 " />
                                                                    </div>
                                                                )
                                                            }

                                                            <p className="text-sm text-gray-600 mb-2 ">{dish.description}</p>
                                                            <p className="font-semibold text-black ">${dish.price}</p>
                                                        </div>
                                                    </CardContent>
                                                    <CardFooter className="flex flex-col space-y-2">
                                                        <div className="flex justify-between items-center w-full">
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() => handleEditDish(dish)}
                                                                className="border-black text-black hover:bg-gray-100">
                                                                <Edit className="h-4 w-4 mr-2" /> Edit
                                                            </Button>
                                                            <div className="flex items-center space-x-2">
                                                                <Switch
                                                                    id={`best-seller-${dish._id}`}
                                                                    checked={dish.isBestSeller}
                                                                    onCheckedChange={() => handleToggleBestSeller(dish._id)}
                                                                />
                                                                <Label htmlFor={`best-seller-${dish._id}`} className="text-xs">Best Seller</Label>
                                                            </div>
                                                        </div>
                                                        <Button
                                                            size="sm"
                                                            variant="destructive"
                                                            onClick={() => handleDeleteDish(dish._id)}
                                                            className="bg-red-600 hover:bg-red-700 text-white w-full">
                                                            <Trash2 className="h-4 w-4 mr-2" /> Delete
                                                        </Button>
                                                    </CardFooter>
                                                </Card>
                                            ))}
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </>
    )
}


export default Menu