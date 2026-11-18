// Site-wide settings.
export const site = {
  title: "Notebook",
  author: "Kevin Driver",
  role: "Cryptography and Key Management",
  affiliation: "IBM Hashicorp Vault Arc",
  description: "Essays, photographs and notes by Kevin Driver, a security architect working on cryptography and key management.",
  // Shown on the home page only when set.
  email: "",
  // Profiles, linked with rel="me" so Mastodon and others can verify the site.
  links: [
    { label: "GitHub", href: "https://github.com/driverkt" },
    { label: "Mastodon", href: "https://infosec.exchange/@driverkt" },
    { label: "Bluesky", href: "https://bsky.app/profile/driverkt.bsky.social" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/driverkt" },
  ],
  nav: [
    {
      label: "Posts",
      href: "/posts/",
      // Also highlighted on these sections, which belong to the stream.
      also: ["/essays/", "/photos/", "/notes/", "/links/", "/videos/", "/tags/"],
    },
    { label: "About", href: "/about/" },
    // No web CV for now; point this at the résumé PDF when there is one.
    { label: "CV", href: "#" },
  ],
};
