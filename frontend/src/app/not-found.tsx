'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ChefHat, Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <ChefHat className="mx-auto h-24 w-24 text-primary" />
                    <h1 className="mt-6 text-4xl font-extrabold text-gray-900 sm:text-5xl">
                        Oops! Page not found
                    </h1>
                    <p className="mt-4 text-lg text-gray-600">
                        It seems the page you're looking for has vanished like a perfectly plated dish!
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="mt-8 space-y-4"
                >
                    <Button asChild className="w-full sm:w-auto">
                        <Link href="/" className="flex items-center justify-center">
                            <Home className="mr-2 h-4 w-4" />
                            Go to Homepage
                        </Link>
                    </Button>

                    <div className="mt-4">
                        <Link
                            href="javascript:history.back()"
                            className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Go back to previous page
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}