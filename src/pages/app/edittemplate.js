import { useRouter } from "next/router";

const EditTemplate = () => {
  const router = useRouter();
  const {
    query: { transcript },
  } = router;
  return <div></div>;
};

export default EditTemplate;
