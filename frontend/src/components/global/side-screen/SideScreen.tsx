import { ArrowRight, Star, Utensils, Users } from "lucide-react"
import { motion } from "framer-motion"

const SideScreen = () => {

    const features = [
        { icon: Utensils, title: "Menu Management", description: "Easily update and organize your menu items" },
        { icon: Star, title: "Customer Reviews", description: "Monitor and respond to customer feedback" },
        { icon: Users, title: "Staff Management", description: "Efficiently manage your restaurant staff" },
        { icon: ArrowRight, title: "Order Tracking", description: "Real-time tracking of customer orders" }
    ]

    return (
        <div className="w-full h-screen bg-primary p-12 flex flex-col justify-center items-center text-white hidden md:flex">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
            >
                <h1 className="text-4xl font-bold mb-6">Welcome to Qree</h1>
                <p className="text-xl mb-12">Manage your restaurant with ease</p>
            </motion.div>
            <div className="grid grid-cols-2 gap-8 w-full max-w-2xl">
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 * (index + 1) }}
                        className="bg-primary-700 p-6 rounded-lg shadow-lg"
                    >
                        <feature.icon className="h-8 w-8 mb-4" />
                        <h2 className="text-lg font-semibold mb-2">{feature.title}</h2>
                        <p className="text-sm opacity-80">{feature.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default SideScreen