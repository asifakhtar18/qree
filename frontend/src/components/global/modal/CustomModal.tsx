import * as React from "react"

import { useMediaQuery } from "@/components/hooks/useMediaQuery"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"


interface CustomModalProps {
    title: string
    description: string
    btnType: "default" | "link" | "destructive" | "outline" | "secondary" | "ghost"
    openModal: boolean
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
    confirmAction: () => void
}



export function CustomModal({ openModal, setOpenModal, title, description, btnType = "default", confirmAction }: CustomModalProps) {
    const [open, setOpen] = React.useState(false)
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
                            variant={btnType} >Confirm</Button>
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
                        variant={btnType} >Confirm</Button>
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}


