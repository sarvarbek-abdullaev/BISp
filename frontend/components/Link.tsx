import NextLink from 'next/link';
import { FC } from 'react';
import { usePathname } from 'next/navigation';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  query?: string;
}
const Link: FC<LinkProps> = ({ href, children, query }) => {
  const pathname = usePathname();
  return (
    <NextLink
      as={href}
      href={href}
      className={href.includes(pathname + query) && pathname.includes(href) ? 'disabled' : ''}
    >
      {children}
    </NextLink>
  );
};

export default Link;
