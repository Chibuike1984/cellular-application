interface CheckActiveLinkProps {
  pathname: string;
  href: string;
  exact?: boolean;
}

/**
 * Checks whether a link is active based on the current pathname.
 *
 * @param params - Object containing pathname, href, and exact match flag.
 * @returns True if the link should be considered active, false otherwise.
 */
export function checkActiveLink(
  { exact, pathname, href }: CheckActiveLinkProps,
) {
  return exact ? pathname === href : pathname.startsWith(href);
}
