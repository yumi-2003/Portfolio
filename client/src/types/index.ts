export interface AdminLink {
  name: string;
  path: string;
}

export interface SocialLinks {
  github: string;
  discord: string;
  linkedin: string;
  facebook: string;
  instagram: string;
  email: string;
}

export interface NavLinkItem {
  name: string;
  path: string;
}

export interface SiteConfig {
  firstName: string;
  lastName: string;
  position: string;
  socialLinks: SocialLinks;
  navLinks: NavLinkItem[];
}
