import * as React from "react"

import { useMediaQuery } from "@/components/hooks/useMediaQuery"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,

} from "@/components/ui/dialog"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,

} from "@/components/ui/drawer"
import { Loader2 } from "lucide-react"


interface CustomModalProps {
    title: string
    description: string
    btnType: "default" | "link" | "destructive" | "outline" | "secondary" | "ghost"
    openModal: boolean
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
    confirmAction: () => void
    isLoading?: boolean
}



export function CustomModal({ openModal, setOpenModal, title, description, btnType = "default", confirmAction, isLoading }: CustomModalProps) {

    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (isDesktop) {
        return (
            <Dialog open={openModal} onOpenChange={setOpenModal}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>
                            {description}
                        </DialogDescription>
                    </DialogHeader>
                    <DrawerFooter className="pt-2">
                        <Button
                            onClick={confirmAction}
                            variant={btnType}
                            disabled={isLoading}
                        >
                            {
                                isLoading ?
                                    <div className="flex items-center">
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Loading...
                                    </div> : "Confirm"
                            }
                        </Button>
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={openModal} onOpenChange={setOpenModal}>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>{title}</DrawerTitle>
                    <DrawerDescription>
                        {description}
                    </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter className="pt-2">
                    <Button
                        onClick={confirmAction}
                        variant={btnType}
                        disabled={isLoading}
                    >
                        {isLoading ?
                            <div className="flex items-center">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Loading...
                            </div> :
                            'Confirm'
                        }
                    </Button>
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}


