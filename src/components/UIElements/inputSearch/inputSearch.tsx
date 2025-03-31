import React from "react";
import { InputProps } from "../../../types/types";
export const Input: React.FC<InputProps> = ({
    type,
    value,
    onChange,
    placeholder,
    className,
    onKeyDown,
    disabled,
}) => {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={className}
            onKeyDown={onKeyDown}
            disabled={disabled}
        />
    );
};