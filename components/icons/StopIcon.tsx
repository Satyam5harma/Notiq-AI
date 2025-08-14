
import React from 'react';

interface IconProps {
    className?: string;
}

const StopIcon: React.FC<IconProps> = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <rect x="6" y="6" width="12" height="12"></rect>
    </svg>
);

export default StopIcon;
