import React, { FC } from 'react';

interface CenteredTextProps {
  text?: string;
  children?: any;
}

const CenteredText: FC<CenteredTextProps> = ({ text, children }) => (
  <div className="w-full h-full flex items-center justify-center">
    <p className="text-xl">{text}</p>
    {children}
  </div>
);

export default CenteredText;
