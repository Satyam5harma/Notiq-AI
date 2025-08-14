
import React from 'react';

interface TagProps {
    text: string;
}

const Tag: React.FC<TagProps> = ({ text }) => (
    <span className="bg-slate-700 text-cyan-300 text-xs font-medium px-2.5 py-1 rounded-full">
        {text}
    </span>
);

export default Tag;
