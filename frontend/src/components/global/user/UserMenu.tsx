import { useRouter } from "next/navigation"
import Image from "next/image"
import { useDispatch, useSelector } from "react-redux"
import { LogOut, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar"
import { Button } from "../../ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "../../ui/dropdown-menu"
import { logout, selectUser } from "@/store/slices/authSlice"

const UserMenu = ({ qrCode }: { qrCode: string }) => {

    const Router = useRouter();
    const dispatch = useDispatch();

    const user = useSelector(selectUser)

    const { email, name, profilePic } = user

    const handleLogout = () => {
        dispatch(logout())
    }

    const gotoProfilePage = () => {
        Router.push('/profile')
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={profilePic} alt="Profile" />
                        <AvatarFallback>{name?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={gotoProfilePage}
                    className="cursor-pointer pt-2 pb-2 "
                >
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="flex flex-col items-center border border-gray-200 cursor-pointer pt-2 pb-2 "
                >
                    <Image
                        src={qrCode}
                        alt="qrCode"
                        width={200}
                        height={200}
                    />
                    <a href={qrCode} target="_blank" download={name + '.png'}>Download QR Code</a>

                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer pt-2 text-red-600 "

                >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserMenu