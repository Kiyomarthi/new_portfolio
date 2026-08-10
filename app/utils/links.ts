import type { NavigationMenuItem } from '@nuxt/ui'

export const navLinks: NavigationMenuItem[] = [
  {
    label: 'خانه',
    icon: 'i-lucide-home',
    to: '/'
  },
  {
    label: 'مهارت‌ها',
    icon: 'i-lucide-lightbulb',
    to: '/skills'
  },
  {
    label: 'پروژه‌ها',
    icon: 'i-lucide-folder',
    to: '/projects'
  },
  {
    label: 'درباره‌من',
    icon: 'i-lucide-user',
    to: '/about'
  },
  {
    label: 'راه‌ارتباطی',
    icon: 'i-lucide-mic',
    to: '/speaking'
  }
  // {
  //   label: "مقالات",
  //   icon: "i-lucide-file-text",
  //   to: "/blog",
  // },
]
