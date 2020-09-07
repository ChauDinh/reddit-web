import { useRouter } from "next/router";

export const useGetIntegerId = () => {
  const router = useRouter();
  const integerId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  return integerId;
};
