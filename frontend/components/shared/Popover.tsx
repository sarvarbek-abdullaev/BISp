import React, { FC } from 'react';

import { Popover as PopoverShadcn, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface PopoverProps {
  element: React.ReactNode;
  header?: React.ReactNode;
  body?: React.ReactNode;
}

export const Popover: FC<PopoverProps> = ({ element, header, body }) => {
  return (
    <PopoverShadcn>
      <PopoverTrigger>{element}</PopoverTrigger>
      <PopoverContent className="w-fit">
        {header && <div className="mb-4">{header}</div>}
        {body}
      </PopoverContent>
    </PopoverShadcn>
  );
};
