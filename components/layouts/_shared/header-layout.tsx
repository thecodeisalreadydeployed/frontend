import { Header } from "@elements";
import { useRouter } from "next/router";

const HeaderLayout = (page: React.ReactElement) => {
  const router = useRouter();
  const { application, project } = router.query;

  return (
    <>
      <Header application={application as string} project={project as string} />
      {page}
    </>
  );
};

export { HeaderLayout };
