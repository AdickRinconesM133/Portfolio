interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export const SOCIAL_LINKS = [
  {
    label: "Linkedin",
    href: "https://linkedin.com/in/adickrincones/",
    icon: "/images/linkedin.svg",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/kyddahh/",
    icon: "/images/instagram.svg",
  },
  {
    label: "Github",
    href: "https://github.com/AdickRinconesM133",
    icon: "/images/github.svg",
  },
] as const satisfies readonly SocialLink[];
