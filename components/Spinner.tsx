
import React from 'react';
import LoaderIcon from './icons/LoaderIcon';

interface SpinnerProps {
    text?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ text }) => {
    return (
        <div className="flex flex-col items-center justify-center gap-4 p-4 text-cyan-400">
            <LoaderIcon className="w-12 h-12 animate-spin" />
            {text && <p className="text-lg text-slate-300 font-medium">{text}</p>}
        </div>
    );
};

export default Spinner;
