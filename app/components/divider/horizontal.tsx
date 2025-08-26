type HorizontalDivederProps = {
    className?: string;
};
import clsx from 'clsx';

export const HorizontalDiveder = ({ className }: HorizontalDivederProps) => {
    return(
        <div className={clsx('w-full my-8 border-b bprder-b-gray-800', className)} />
    )
}