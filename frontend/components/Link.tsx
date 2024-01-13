import NextLink from 'next/link';
import { FC } from 'react';
import { usePathname } from 'next/navigation';

interface LinkProps {
  href: string;
  children: React.ReactNode;
}
const Link: FC<LinkProps> = ({ href, children }) => {
  const pathname = usePathname();
  return (
    <NextLink as={href} href={href} className={href.includes(pathname) && pathname.includes(href) ? 'disabled' : ''}>
      {children}
    </NextLink>
  );
};

export default Link;
