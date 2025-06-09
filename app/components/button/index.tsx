import { ButtonHTMLAttributes, ReactNode } from "react"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode
    className?: string
}

export const Button = ({ children, className, ...props }: ButtonProps) => {
    return (
        <button
            className={`bg-green-600 py-3 px-4 rounded-lg text-gray-50 flex items-center justify-center gap-2 houver:bg-green-500 transistion-all ${className ?? ''}`}
            {...props}
        >
            {children}
        </button>
    )
}