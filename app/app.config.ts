export default defineAppConfig({
  global: {
    picture: {
      dark: "/images/profile.jpg",
      light: "/images/profile.jpg",
      alt: "My profile picture",
    },
    meetingLink: "https://cal.com/abolfazl-kiyomarthi-efdhwm/طراحی-سایت",
    email: "a.kiyomarthi@gmail.com",
    available: true,
  },
  ui: {
    colors: {
      primary: "blue",
      neutral: "neutral",
    },
    pageHero: {
      slots: {
        container: "py-18 sm:py-24 lg:py-32",
        title: "mx-auto max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl",
        description:
          "mt-2 text-md mx-auto max-w-2xl text-pretty sm:text-md text-muted",
      },
    },
  },
  footer: {
    credits: `Built with Aboly • © ${new Date().getFullYear()}`,
    colorMode: false,
    links: [
      {
        icon: "i-simple-icons-telegram",
        to: "https://t.me/AbolyDev",
        target: "_blank",
        "aria-label": "aboly on telegram",
      },
      {
        icon: "i-simple-icons-github",
        to: "https://github.com/Kiyomarthi",
        target: "_blank",
        "aria-label": "aboly on GitHub",
      },
    ],
  },
});
