import { useEffect, useState } from "react"
import { CircleDashedIcon } from "lucide-react"
import { Button } from "../../../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "../../../ui/dialog"
import { Input } from "../../../ui/input"
import { Label } from "../../../ui/label"

import { useAddFoodCatagoryMutation } from "@/store/apis/foodCatagoryApi"
import Toast from "@/components/global/notification/CustomToast"
import { Category } from "@/types/types"



interface MenuCatagoriesFormProps {
    categories: Category[]
    isCategoryDialogOpen: boolean
    setIsCategoryDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
    isEditing: boolean
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
    value?: {
        _id: string
        name: string
    }
}




const MenuCatagoriesForm = ({ isCategoryDialogOpen, setIsCategoryDialogOpen, isEditing, setIsEditing, value }: MenuCatagoriesFormProps) => {
    const [newCategory, setNewCategory] = useState('')
    const [addFoodCatagory, addFoodCatagoryResult] = useAddFoodCatagoryMutation()

    const handleAddCategory = async () => {
        await addFoodCatagory({ name: newCategory })
        setNewCategory('')

    }

    useEffect(() => {
        if (isEditing && value) {
            setNewCategory(value.name)
        }
    }, [isEditing, value])



    const handleCloseDialog = () => {
        setIsCategoryDialogOpen(false);
        setIsEditing(false);
        setNewCategory('');
    }

    return (
        <Dialog open={isCategoryDialogOpen} onOpenChange={() => handleCloseDialog()}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Category</DialogTitle>
                    <DialogDescription>Enter a new category for your menu</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="newCategory">Category Name</Label>
                        <Input
                            id="newCategory"
                            value={newCategory}
                            onChange={(e) => {
                                setNewCategory(e.target.value);
                                addFoodCatagoryResult.reset();
                            }}
                            placeholder="Enter category name"
                            type="text"
                            autoFocus
                            required
                        />
                    </div>
                </div>
                {(addFoodCatagoryResult.isSuccess || addFoodCatagoryResult.isError) && (
                    <Toast
                        variant={addFoodCatagoryResult.isSuccess ? "success" : "error"}
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        message={addFoodCatagoryResult.isSuccess ? "Category added successfully" : addFoodCatagoryResult.error.data.error}
                    />
                )}
                <DialogFooter>
                    <Button disabled={!newCategory || addFoodCatagoryResult.isLoading} onClick={handleAddCategory} className="bg-black hover:bg-gray-800 text-white">
                        {addFoodCatagoryResult.isLoading ?
                            <>
                                Adding
                                <CircleDashedIcon className="mr-2 h-4 w-4 text-white animate-spin " />
                            </>
                            : isEditing ? "Save Changes" : "Add Category"
                        }
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


export default MenuCatagoriesForm