
import { User, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image";
import { useState } from "react";


interface ProfilePictureProps {
    profilePicture: string
    handleFileChange: (file: File | null) => void;
}


const ProfilePicture = ({ profilePicture, handleFileChange }: ProfilePictureProps) => {
    const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(null);
    const handleFileChangeAndSend = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        console.log("file selected", file)
        if (file) {
            setSelectedFileUrl(URL.createObjectURL(file));
            handleFileChange(file)
        }
    }



    return (
        <div className="flex flex-col items-center">
            <div>
                {profilePicture || selectedFileUrl ? (
                    <Image
                        src={selectedFileUrl || profilePicture}
                        width={200}
                        height={200}
                        alt="Profile Picture"
                        className="w-32 h-32 rounded-full"
                        priority={true}
                    />
                ) : (
                    <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="w-12 h-12 text-gray-400" />
                    </div>
                )}
            </div>
            <Input
                id="profilePicture"
                type="file"
                onChange={handleFileChangeAndSend}
                className="hidden"
                accept="image/*"
            />
            <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('profilePicture')?.click()}
                className="mt-4"
            >
                <Upload className="w-4 h-4 mr-2" />
                Upload Picture
            </Button>
        </div>
    )
}


export default ProfilePicture