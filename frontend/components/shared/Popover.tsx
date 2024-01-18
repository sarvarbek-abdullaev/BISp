import {
  Button,
  Popover as ChakraPopover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
} from '@chakra-ui/react';
import React, { FC } from 'react';

interface PopoverProps {
  element: React.ReactNode;
  header?: React.ReactNode;
  body?: React.ReactNode;
}

export const Popover: FC<PopoverProps> = ({ element, header, body }) => {
  return (
    <ChakraPopover>
      <PopoverTrigger>
        <Button colorScheme="none">{element}</Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          {header && (
            <>
              <PopoverHeader>{header}</PopoverHeader>
              <PopoverCloseButton />
            </>
          )}
          {body && <PopoverBody>{body}</PopoverBody>}
        </PopoverContent>
      </Portal>
    </ChakraPopover>
  );
};
