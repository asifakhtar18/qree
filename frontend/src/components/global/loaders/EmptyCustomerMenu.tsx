'use client'

import { motion } from 'framer-motion'
import { ChefHat, Clock, CalendarClock } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function EmptyCustomerMenu() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl w-full bg-white rounded-lg shadow-xl overflow-hidden"
            >
                <div className="p-8 sm:p-12">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
                        className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8"
                    >
                        <ChefHat className="w-12 h-12 text-primary" />
                    </motion.div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">
                        Our Menu is Coming Soon!
                    </h1>
                    <p className="text-lg text-center text-gray-600 mb-8">
                        We're cooking up something special. Our talented chefs are crafting a delicious menu just for you.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex flex-col items-center p-4 bg-gray-50 rounded-lg"
                        >
                            <Clock className="w-8 h-8 text-primary mb-2" />
                            <h2 className="text-lg font-semibold text-gray-900 mb-1">Opening Hours</h2>
                            <p className="text-gray-600 text-center">Mon-Fri: 11am - 10pm<br />Sat-Sun: 10am - 11pm</p>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex flex-col items-center p-4 bg-gray-50 rounded-lg"
                        >
                            <CalendarClock className="w-8 h-8 text-primary mb-2" />
                            <h2 className="text-lg font-semibold text-gray-900 mb-1">Expected Launch</h2>
                            <p className="text-gray-600 text-center">We're aiming to launch our full menu within the next week!</p>
                        </motion.div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <Button variant="outline" className="w-full sm:w-auto">
                            Contact Us
                        </Button>
                        <Button className="w-full sm:w-auto">
                            Get Notified
                        </Button>
                    </div>
                </div>
                <div className="bg-gray-100 px-8 py-4 sm:px-12 sm:py-6">
                    <p className="text-sm text-center text-gray-600">
                        Thank you for your patience. We can't wait to serve you our delicious dishes soon!
                    </p>
                </div>
            </motion.div>
        </div>
    )
}