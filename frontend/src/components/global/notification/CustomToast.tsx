
import { CircleCheckBig, CircleAlert } from "lucide-react"


type ToastVariant = "success" | "error" | "warning" | "info"
type ToastType = {
    variant: ToastVariant;
    message: string;
}

const Toast = ({ variant, message }: ToastType) => {
    const iconMap: Record<ToastVariant, React.ElementType> = {
        success: CircleCheckBig,
        error: CircleAlert,
        warning: CircleAlert,
        info: CircleAlert,
    }
    const Icon = iconMap[variant]
    const classNameMap: Record<ToastVariant, string> = {
        success: "bg-green-50 text-green-800",
        error: "bg-red-50 text-red-800",
        warning: "bg-yellow-50 text-yellow-800",
        info: "bg-blue-50 text-blue-800",
    }

    return (
        <div className={`rounded-md p-4 mt-4 ${classNameMap[variant]}`}>
            <div className="w-full flex items-center">
                <div className="flex-shrink-0">
                    <p className="text-sm font-medium">
                        {message}
                    </p>
                </div>
                <div className="ml-3">
                    <Icon className="h-5 w-5" />
                </div>
            </div>
        </div>
    )
}

export default Toast
