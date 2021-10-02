import { useRouter } from "next/router";

const Project = () => {
  const router = useRouter();
  const { slug } = router.query;

  return <div>Project: {slug}</div>;
};

export default Project;
