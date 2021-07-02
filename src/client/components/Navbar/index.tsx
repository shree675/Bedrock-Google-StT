import Link from "next/link";
import { useGetCurrentUserQuery } from "../../graphql/getCurrentUser.generated";

function Navbar() {
  const [{ data }] = useGetCurrentUserQuery();
  // console.log(data);
  const isAuthenticated = !!data?.currentUser;
  // console.log(data?.currentUser);

  return (
    <div style={{ display: `flex`, justifyContent: `space-between` }}>
      {/* <Link href={isAuthenticated ? `/app` : `/`}>SaaS</Link> */}
      {!isAuthenticated ? null : (
        <div>
          <Link href="/">Home</Link>&emsp;
          <Link href="/app">Dashboard</Link>&emsp;
          <Link href="/app/settings">Profile</Link>&emsp;
          <Link href="/app/[slug]">Upgrade</Link>&emsp;
          <Link href="/app/feedback">Feedback</Link>&emsp; |{" "}
          <Link href="/api/auth/logout">Logout</Link> |
        </div>
      )}
      {/* {isAuthenticated && <Link href="/api/auth/logout">Logout</Link>} */}
    </div>
  );
}

export default Navbar;
