

import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../../../ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup } from "../../../ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogFooter, DialogTitle, DialogDescription } from "../../../ui/dialog"

import { useToast } from "@/components/hooks/use-toast"

import { MenuItemSchema } from "@/lib/schema"
import { useAddMenuItemMutation, useUpdateMenuItemMutation } from "@/store/apis/menuApi"
import { Category, Dish } from "@/types/types"




interface MenuItemFormProps {
    categories: Category[]
    isDishDialogOpen: boolean
    setIsDishDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
    initialValues?: Omit<Dish, 'userId'>
    isEditing?: boolean
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}


const MenuItemForm = ({ categories, isDishDialogOpen, setIsEditing, setIsDishDialogOpen, initialValues, isEditing }: MenuItemFormProps) => {

    const menuItems = useForm<Omit<Dish, 'id'>>({
        resolver: zodResolver(MenuItemSchema),
        defaultValues: {
            name: '',
            description: '',
            price: "",
            category: '',
            isBestSeller: false,
            image: undefined
        }
    })


    const { handleSubmit, control, reset, setValue, formState: { errors } } = menuItems
    const [addMenuItem, addMenuItemResult] = useAddMenuItemMutation()
    const [updateMenuItem, updateMenuItemResult] = useUpdateMenuItemMutation()

    const { toast } = useToast()

    const resetAllFields = () => {
        reset({
            name: '',
            description: '',
            price: "",
            category: '',
            isBestSeller: false,
            image: undefined
        })
    }



    const handleAddDish = async (data: FormData) => {
        try {
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => formData.append(key, value as string));
            if (data && data.hasOwnProperty('_id') && isEditing) {
                await updateMenuItem(formData as any).unwrap();
                setIsDishDialogOpen(false)
            } else {
                await addMenuItem(formData as any).unwrap();
            }
            await resetAllFields()
            setIsEditing(false)
        } catch (err) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Something went wrong",
            })
        }
    }


    useEffect(() => {
        if (initialValues) {
            reset(initialValues)
        }
    }, [initialValues])


    useEffect(() => {
        if (addMenuItemResult.isSuccess) {
            toast({
                title: "Success",
                description: "Menu item added successfully",

            })
        }

        if (updateMenuItemResult.isSuccess) {
            toast({
                title: "Success",
                description: "Menu item updated successfully",
            })
        }

    }, [addMenuItemResult, updateMenuItemResult])



    const handleCloseDialog = () => {
        resetAllFields();
        setIsDishDialogOpen(false);
        setIsEditing(false);
    }


    return (
        <div className="flex flex-wrap justify-center gap-4 mb-8 ">
            <Dialog open={isDishDialogOpen} onOpenChange={handleCloseDialog} >
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New Dish</DialogTitle>
                        <DialogDescription>Enter the details of your new menu item</DialogDescription>
                    </DialogHeader>
                    <Form {...menuItems}>
                        <ScrollArea className="h-96 w-full">
                            <form className="space-y-4 overflow-y-auto p-4">
                                <div className="space-y-2">
                                    <FormField
                                        control={control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Label htmlFor="name">Dish Name</Label>
                                                <Input
                                                    id="name"
                                                    placeholder="Enter dish name"
                                                    {...field}

                                                />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <FormField
                                        control={control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Label htmlFor="description">Dish Description</Label>
                                                <Textarea
                                                    id="description"
                                                    placeholder="Enter dish description"
                                                    {...field}
                                                />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <FormField
                                        control={control}
                                        name="price"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Label htmlFor="price">Dish Price</Label>
                                                <Input
                                                    id="price"
                                                    type="number"
                                                    placeholder="Enter dish price"
                                                    {...field}
                                                    min={1}
                                                    step={1}


                                                />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <FormField
                                        control={control}
                                        name="image"
                                        render={({ field: { onChange, value }, fieldState: { error } }) => {
                                            const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                                                if (e.target.files?.length) {
                                                    onChange(e.target.files[0])
                                                } else {
                                                    onChange(null)
                                                }
                                            }

                                            return (
                                                <FormItem>
                                                    <Label htmlFor="image">Dish Image</Label>
                                                    <Input
                                                        type="file"
                                                        id="image"
                                                        onChange={handleImageChange}
                                                        accept="image/*"
                                                        placeholder="Enter dish image"

                                                    />
                                                    {value && (
                                                        <div className="mt-1 flex flex-col justify-center rounded-md border border-dashed border-gray-300 px-6 pt-5 pb-6 gap-2">
                                                            <img
                                                                src={typeof value === "string" ? value : URL.createObjectURL(value)}
                                                                alt="Dish Image"
                                                                className="h-40 object-cover"
                                                            />
                                                            <div className="flex items-center">
                                                                <Button
                                                                    variant="outline"
                                                                    className="flex items-center"
                                                                    onClick={() => {
                                                                        onChange(null)
                                                                        setValue("image", '')


                                                                    }}
                                                                >
                                                                    Clear
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <FormMessage />
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <FormField
                                        control={control}
                                        name="category"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Label htmlFor="category">Dish Category</Label>
                                                <Select value={field.value} onValueChange={field.onChange}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a category" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    {categories?.length > 0 ? (
                                                        <SelectContent>
                                                            {categories.map((category, index) => (
                                                                <SelectGroup key={index}>
                                                                    <SelectItem key={index} value={category.name}>
                                                                        {category.name}
                                                                    </SelectItem>
                                                                </SelectGroup>
                                                            ))}
                                                        </SelectContent>
                                                    ) : (
                                                        <SelectContent>
                                                            <SelectItem value="No categories found">No categories found</SelectItem>
                                                        </SelectContent>
                                                    )}
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <FormField
                                        control={control}
                                        name="isBestSeller"
                                        render={({ field }) => (
                                            <FormItem >
                                                <div className="flex items-center gap-2">
                                                    <Label htmlFor="isBestSeller">Is Best Seller?</Label>
                                                    <FormControl>
                                                        <Switch
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </form>
                        </ScrollArea>
                    </Form>
                    <DialogFooter>
                        <Button disabled={addMenuItemResult.isLoading || updateMenuItemResult.isLoading} onClick={handleSubmit(handleAddDish as any)} className="bg-black hover:bg-gray-800 text-white">
                            {
                                addMenuItemResult.isLoading || updateMenuItemResult.isLoading ? (
                                    <>
                                        {isEditing ? "Updating..." : "Adding..."}
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    </>
                                ) : (
                                    isEditing ? "Update Dish" : "Add Dish"
                                )
                            }
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default React.memo(MenuItemForm)