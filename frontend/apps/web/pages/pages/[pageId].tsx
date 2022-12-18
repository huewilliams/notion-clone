import {useRouter} from "next/router";

export default function Page() {
  const router = useRouter();
  const {pageId} = router.query;

  return <div>{pageId}</div>
}
