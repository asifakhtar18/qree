import { Input } from "@/components/ui/input";

interface IconInputProps {
    type?: string;
    icon: React.ElementType;
    placeholder: string;
    value: string | undefined;
    disabled?: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    rightIcon?: React.ElementType;
    minLength?: number;

}

const IconInput = ({ icon: Icon, placeholder, value, onChange, disabled, rightIcon: RightIcon, type, minLength }: IconInputProps) => {
    return (
        <div className="relative w-full flex items-center">
            <Icon className="absolute left-3 top-2.5 h-4 w-4 text-gray-500 pointer-events-none" />
            <Input
                type={type || "text"}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="pl-10 pr-4 py-2  border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={disabled}
                minLength={minLength}
            />
            {RightIcon && (
                <RightIcon className="absolute right-4 top-2.5 h-4 w-4 text-gray-500 pointer-events-none" />
            )}
        </div>
    );
};

export default IconInput;