import React, { FC } from 'react';

interface CenteredTextProps {
  text: string;
}

const CenteredText: FC<CenteredTextProps> = ({ text }) => (
  <div className="w-full h-full flex items-center justify-center">
    <p className="text-xl">{text}</p>
  </div>
);

export default CenteredText;
