import React from 'react'
import { motion } from 'framer-motion'

// export default function GlobalLoader() {
//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-100 to-teal-200">
//             <div className="text-center">
//                 <motion.div
//                     className="relative w-48 h-48 mx-auto mb-8"
//                     animate={{ rotate: 360 }}
//                     transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
//                 >
//                     <svg className="w-full h-full" viewBox="0 0 100 100">
//                         <motion.rect
//                             x="10" y="10" width="80" height="80" rx="10"
//                             fill="none" stroke="#0D9488" strokeWidth="4"
//                             initial={{ pathLength: 0 }}
//                             animate={{ pathLength: 1 }}
//                             transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//                         />

//                         <motion.rect x="25" y="25" width="20" height="20" fill="#0D9488"
//                             initial={{ scale: 0 }}
//                             animate={{ scale: 1 }}
//                             transition={{ duration: 0.5, delay: 0.5, repeat: Infinity, repeatType: "reverse" }}
//                         />
//                         <motion.rect x="55" y="25" width="20" height="20" fill="#0D9488"
//                             initial={{ scale: 0 }}
//                             animate={{ scale: 1 }}
//                             transition={{ duration: 0.5, delay: 0.7, repeat: Infinity, repeatType: "reverse" }}
//                         />
//                         <motion.rect x="25" y="55" width="20" height="20" fill="#0D9488"
//                             initial={{ scale: 0 }}
//                             animate={{ scale: 1 }}
//                             transition={{ duration: 0.5, delay: 0.9, repeat: Infinity, repeatType: "reverse" }}
//                         />
//                         <motion.path
//                             d="M55 55 H75 M55 65 H75 M55 75 H75"
//                             stroke="#0D9488" strokeWidth="4" strokeLinecap="round"
//                             initial={{ pathLength: 0 }}
//                             animate={{ pathLength: 1 }}
//                             transition={{ duration: 1, delay: 1, repeat: Infinity, repeatType: "reverse" }}
//                         />
//                     </svg>
//                 </motion.div>
//                 <motion.h1
//                     className="text-4xl font-bold text-teal-800 mb-4"
//                     initial={{ opacity: 0, y: -20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5 }}
//                 >
//                     Qree
//                 </motion.h1>
//                 <motion.p
//                     className="text-teal-600 text-lg"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5, delay: 0.2 }}
//                 >
//                     Scanning menus, made easy
//                 </motion.p>
//             </div>
//         </div>
//     )
// }



// components/QreeLoader.js
import { QrCode } from 'lucide-react';
// import { motion } from 'framer-motion';

const GlobalLoader = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="inline-block"
                >
                    <QrCode size={48} className="text-blue-600" />
                </motion.div>
                <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-4 text-xl font-semibold text-gray-700"
                >
                    Qree
                </motion.h2>
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-2 text-sm text-gray-500"
                >
                    Scaning Menu , made easy
                </motion.p>
            </div>
        </div>
    );
};

export default GlobalLoader;