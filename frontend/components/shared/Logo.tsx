import Image from 'next/image';
import { FC } from 'react';

const LOGO_URL = 'https://utfs.io/f/fbeb848a-b67a-4614-aed9-ab5871529b35-x581ka.png';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export const Logo: FC<LogoProps> = ({ className, height, width }) => (
  <Image src={LOGO_URL} className={className} alt="Logo" width={width} height={height} />
);
