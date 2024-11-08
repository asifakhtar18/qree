import { Input } from "@/components/ui/input";

interface IconInputProps {
    icon: React.ElementType;
    placeholder: string;
    value: string | undefined;
    disabled?: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const IconInput = ({ icon: Icon, placeholder, value, onChange, disabled }: IconInputProps) => {
    return (
        <div className="relative w-full flex items-center">
            <Icon className="absolute left-3 top-2.5 h-4 w-4 text-gray-500 pointer-events-none" />
            <Input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="pl-10 pr-4 py-2  border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={disabled}
            />
        </div>
    );
};

export default IconInput;