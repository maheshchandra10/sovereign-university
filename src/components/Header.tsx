import { useRouter } from "next/router";
import Link from "next/link";
import { api } from "utils/api";
import { Navbar, Dropdown, Avatar, Button } from "flowbite-react";
import AcademyLogo from "components/icons/AcademyLogo";

export default function Header() {
  const router = useRouter();

  const userQuery = api.user.getUser.useQuery();
  const logoutMutation = api.auth.logout.useMutation({
    onSuccess: async () => {
      router.reload();
      await router.push("/login");
    },
  });

  const user = userQuery.data;

  return (
    <>
      <header>
        <Navbar fluid={false} rounded={false} className="bg-blue">
          <Navbar.Brand href="http://localhost:3000">
            <AcademyLogo size={60} />
          </Navbar.Brand>
          <div className="flex md:order-2">
            {user?.isLoggedIn === true && (
              <>
                <Dropdown
                  arrowIcon={false}
                  inline={true}
                  label={
                    <Avatar
                      alt="User settings"
                      img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      rounded={true}
                    />
                  }
                >
                  <Dropdown.Header>
                    <span className="block text-sm">{user.username}</span>
                    <span className="block truncate text-sm font-medium">
                      {user.email}
                    </span>
                  </Dropdown.Header>
                  <Dropdown.Item>Dashboard</Dropdown.Item>
                  <Dropdown.Item>Settings</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={() => logoutMutation.mutate()}>
                    Sign out
                  </Dropdown.Item>
                </Dropdown>
                <Navbar.Toggle />
              </>
            )}
            {user?.isLoggedIn === false && (
              <>
                <Link href="/login" className="mr-3">
                  <Button color="gray">Login</Button>
                </Link>
                <Link href="/register">
                  <Button color="gray">Register</Button>
                </Link>
              </>
            )}
          </div>
          <Navbar.Collapse>
            <Navbar.Link href="/" active={true} className="text-lg text-white">
              Home
            </Navbar.Link>
            <Navbar.Link href="/courses" className="text-lg text-white">
              Courses
            </Navbar.Link>
            <Navbar.Link href="/resources" className="text-lg text-white">
              Resources
            </Navbar.Link>
          </Navbar.Collapse>
        </Navbar>
      </header>
    </>
  );
}
