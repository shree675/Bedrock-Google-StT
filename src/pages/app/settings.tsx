import Link from "next/link";
import Image from "next/Image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUpdateUserMutation } from "../../client/graphql/updateUser.generated";
import toast from "react-hot-toast";
import { useGetCurrentUserQuery } from "../../client/graphql/getCurrentUser.generated";
import { useDeleteUserMutation } from "../../client/graphql/deleteUser.generated";

export default function Dashboard() {
  const [{ data, fetching, error }] = useGetCurrentUserQuery();
  const router = useRouter();
  const [, updateUser] = useUpdateUserMutation();
  const [, deleteUser] = useDeleteUserMutation();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [profilepic, setProfilepic] = useState("");
  const currentUser = data?.currentUser;

  useEffect(() => {
    if (currentUser?.name) setName(currentUser.name);
    if (currentUser?.email) setEmail(currentUser.email);
    if (currentUser?.profilepic) setProfilepic(currentUser.profilepic);
  }, [currentUser]);

  const onChangeImage = (e) => {
    // setProfilepic(event.target.files[0]);
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = function (ev) {
        setProfilepic(ev.target.result);
        console.log(ev.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  if (fetching) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  if (!currentUser) {
    if (process.browser) router.push("/login");
    return (
      <p>
        Redirecting to <Link href="/login">/login</Link>
        ...
      </p>
    );
  }

  return (
    <>
      {/* <h1>{currentUser.name} Settings</h1> */}
      <h1>Profile</h1>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <div>Profile Information</div>
          <div>
            Update your account's profile information and email address.
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div>
            <div>Photo</div>
            <div>
              <img src={profilepic} width={80} height={80}></img>
            </div>
            <div>
              <input
                type="file"
                accept="image/*"
                name="image"
                id="file"
                onChange={onChangeImage}
              />
            </div>
          </div>
          <br></br>
          <div>
            <div>Name</div>
            <div>
              <input
                value={name}
                placeholder="Arnold Schwarzenegger"
                onChange={(evt) => setName(evt.target.value)}
              />
            </div>
          </div>
          <br></br>
          <div>
            <div>Email</div>
            <div>
              <input
                value={email}
                placeholder="me@hello.com"
                onChange={(evt) => setEmail(evt.target.value)}
              />
            </div>
          </div>
          <br></br>
          <button
            onClick={() => {
              // console.log(profilepic);
              toast.promise(
                updateUser({
                  name: name,
                  email: email,
                  userId: currentUser.id,
                  profilepic: profilepic,
                }),
                {
                  loading: `Updating settings...`,
                  success: `Settings updated!`,
                  error: (err) => err,
                }
              );
            }}
          >
            SAVE
          </button>
        </div>
      </div>
      <hr></hr>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <div>Browser Sessions</div>
          <div>
            Manage and logout your active sessions on other browsers and
            devices.
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div>
            If necessary, you may logout of all of your other browser sessions
            across all of your devices. Some of your recent sessions are listed
            below; however, this list may not be exhaustive. If you feel your
            account has been compromised, you should also update your password.
          </div>
          <button>LOGOUT OTHER BROWSER SESSIONS</button>
          <br></br>
        </div>
      </div>
      <hr></hr>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <div>Delete Account</div>
          <div>Permenantly delete your account.</div>
        </div>
        <div style={{ flex: 1 }}>
          <div>
            Once your account is deleted, all of its resources and data will be
            permanently deleted. Before deleting your account, please download
            any data or information that you wish to retain.
          </div>
          <button
            onClick={async () => {
              await toast.promise(
                deleteUser({
                  userId: currentUser.id,
                }),
                {
                  loading: `Deleting account...`,
                  success: `Account deleted! Refresh the browser to apply changes`,
                  error: (err) => {
                    return err;
                  },
                }
              );
            }}
          >
            DELETE ACCOUNT
          </button>
          <br></br>
        </div>
      </div>
    </>
  );
}
