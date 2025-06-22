import { ReactNode } from 'react';
import { getRelativeTimeString } from './../../../../utils/get-relative-time';

type Tech = {
    icon: ReactNode;
    name: string;
    startDate: string;
};

type KnowTechProps = {
    tech: Tech;
};

export const KnowTech = ({ tech }: KnowTechProps) => {
    const relativeTime = getRelativeTimeString
    (new Date(tech.startDate), 'pt-BR'
).replace('há', '');
    return (
        <div className='p-6 rounded-lg bg-gray-600/20 text-grey-500 flex flex-col gap-2 hover:text-green-500 hover:bg-gray-600/30 transistion-all'>
            <div className='flex items-center justify-between'>
                <p className='font-medium'>{tech.name}</p>
                {tech.icon}
            </div>
            <span>
                {relativeTime} de experiência
            </span>
        </div>
    );
}