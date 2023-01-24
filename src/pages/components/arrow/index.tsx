import { IconButton, IconButtonProps } from "@chakra-ui/react";
import { JSXElementConstructor, MouseEventHandler, ReactElement } from 'react';

type Props = {
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined
    icon: ReactElement<any, string | JSXElementConstructor<any>> | undefined
    label: string
}

export const Arrow: React.FC<Props> = ({ onClick, icon, label }) => {
    return (
        <IconButton onClick={onClick} icon={icon} aria-label={label} />
    );
}
  