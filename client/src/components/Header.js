import Link from 'next/link';
import { useMemo } from 'react';

const Header = ({ currentUser }) => {
  const links = useMemo(() => {
    const config = [
      !currentUser && { label: 'Sign Up', href: '/auth/signup' },
      !currentUser && { label: 'Sign In', href: '/auth/signin' },
      currentUser && { label: 'Sign Out', href: '/auth/signout' },
    ];

    return config
      .filter((link) => !!link)
      .map(({ label, href }) => (
        <li key={href} className="nav-item">
          <Link href={href}>
            <a className="nav-link">{label}</a>
          </Link>
        </li>
      ));
  }, [currentUser]);

  return (
    <nav className="navbar navbar-light bg-light navbar-expand">
      <Link href="/">
        <a className="navbar-brand">Tickets</a>
      </Link>

      <ul className="navbar-nav ml-auto">{links}</ul>
    </nav>
  );
};

export default Header;
