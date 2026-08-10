export function useHashForModal(hash: string = "modal") {
  const router = useRouter();
  const route = useRoute();

  const modal = computed<boolean>({
    get() {
      return route.hash === `#${hash}`;
    },
    set(value) {
      if (value) {
        if (route.hash !== `#${hash}`) {
          router.push({
            path: route.path,
            query: route.query,
            hash: `#${hash}`,
          });
        }
      } else {
        if (route.hash === `#${hash}`) {
          router.replace({
            path: route.path,
            query: route.query,
            hash: "",
          });
        }
      }
    },
  });

  return {
    modal,
  };
}
