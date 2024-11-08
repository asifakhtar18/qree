import { QrCodeIcon } from "lucide-react"
import UserMenu from "../user/UserMenu"

const Header = () => {
    return (
        <header className="flex justify-between items-center mb-8">
            <div>

                <div className="flex items-center item-start">
                    <QrCodeIcon className="mr-2 h-8 w-8" />
                    <h1 className="text-3xl sm:text-4xl font-bold text-black mb-2">Qree</h1>
                </div>
                <p className="text-gray-600">Effortlessly manage your restaurant's menu</p>
            </div>
            <UserMenu />
        </header>
    )
}

export default Header