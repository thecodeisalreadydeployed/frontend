import { Header } from "@elements";
import { useRouter } from "next/router";

const HeaderLayout = (page: React.ReactElement) => {
  const router = useRouter();
  const { organization, project } = router.query;

  return (
    <>
      <Header
        organization={organization as string}
        project={project as string}
      />
      {page}
    </>
  );
};

export { HeaderLayout };
