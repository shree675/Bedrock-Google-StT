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
  const [profilepic, setProfilepic] = useState(
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  );
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
        // console.log(ev.target.result);
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
    <div className="mx-40 mt-8">
      <h1 className="text-4xl font-bold mb-4">Profile</h1>
      <br></br>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <div className="mb-2 text-2xl">Profile Information</div>
          <div>
            Update your account's profile information and email address.
          </div>
        </div>
        <div
          style={{
            flex: 1,
            borderLeft: "1px solid #cecece",
            paddingLeft: "20px",
          }}
        >
          <div>
            <div>
              <b>Photo</b>
            </div>
            <div>
              <img src={profilepic} width={80} height={80}></img>
            </div>
            <div class="flex bg-grey-lighter">
              <label class="w-48 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
                <svg
                  class="w-8 h-8"
                  fill="blue"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <div style={{ fontSize: "12px", paddingBottom: "0px" }}>
                  Upload an image
                </div>
                <input
                  className="hidden"
                  type="file"
                  id="img"
                  name="img"
                  accept="image/*"
                  onChange={onChangeImage}
                />
              </label>
            </div>
          </div>
          <br></br>
          <div>
            <div>
              <b>Name</b>
            </div>
            <div>
              <input
                value={name}
                placeholder=""
                type="text"
                onChange={(evt) => setName(evt.target.value)}
              />
            </div>
          </div>
          <br></br>
          <div>
            <div>
              <b>Email</b>
            </div>
            <div>
              <input
                value={email}
                placeholder="me@hello.com"
                type="text"
                onChange={(evt) => setEmail(evt.target.value)}
              />
            </div>
          </div>
          <br></br>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
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
      <br></br>
      <hr className="mb-4"></hr>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <div className="mb-2 text-2xl">Browser Sessions</div>
          <div>
            Manage and logout your active sessions on other browsers and
            devices.
          </div>
        </div>
        <div
          style={{
            flex: 1,
            borderLeft: "1px solid #cecece",
            paddingLeft: "20px",
          }}
        >
          <div>
            If necessary, you may logout of all of your other browser sessions
            across all of your devices. Some of your recent sessions are listed
            below; however, this list may not be exhaustive. If you feel your
            account has been compromised, you should also update your password.
          </div>
          <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
            LOGOUT OTHER BROWSER SESSIONS
          </button>
          <br></br>
        </div>
      </div>
      <br></br>
      <hr className="mb-4"></hr>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <div className="mb-2 text-2xl">Delete Account</div>
          <div>Permenantly delete your account.</div>
        </div>
        <div
          style={{
            flex: 1,
            borderLeft: "1px solid #cecece",
            paddingLeft: "20px",
          }}
        >
          <div>
            Once your account is deleted, all of its resources and data will be
            permanently deleted. Before deleting your account, please download
            any data or information that you wish to retain.
          </div>
          <button
            className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-4"
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
          <br></br>
        </div>
      </div>
    </div>
  );
}
