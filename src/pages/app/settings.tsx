import Link from "next/link";
import Image from "next/Image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUpdateUserMutation } from "../../client/graphql/updateUser.generated";
import toast from "react-hot-toast";
import { useGetCurrentUserQuery } from "../../client/graphql/getCurrentUser.generated";
import { useDeleteUserMutation } from "../../client/graphql/deleteUser.generated";
import { useGetUserEmailMutation } from "../../client/graphql/getUserEmail.generated";
import { useCreateUserMutation } from "../../client/graphql/createUser.generated";
import { useDeleteTranscriptsMutation } from "../../client/graphql/deleteTranscripts.generated";

export default function Dashboard() {
  const [{ data, fetching, error }] = useGetCurrentUserQuery();
  const [, getUserEmail] = useGetUserEmailMutation();
  const router = useRouter();
  const [, updateUser] = useUpdateUserMutation();
  const [, deleteUser] = useDeleteUserMutation();
  const [, deleteTranscripts] = useDeleteTranscriptsMutation();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [profilepic, setProfilepic] = useState(" ");
  const currentUser = data?.currentUser;
  const [, createUser] = useCreateUserMutation();

  useEffect(() => {
    if (
      localStorage.getItem("isloggedin") === null ||
      localStorage.getItem("isloggedin") === undefined
    ) {
      router.push("/signup");
    }
    if (localStorage.getItem("isloggedin") === "false") {
      router.push("/signup");
      // console.log("not logged in");
    }

    const user = getUserEmail({
      id: localStorage.getItem("userid"),
    }).then((data) => {
      if (data.data?.getUserEmail) {
        setEmail(data.data?.getUserEmail.email);
        setName(data.data?.getUserEmail.name);
        localStorage.setItem("name", data.data?.getUserEmail.name);
        setProfilepic(
          data.data?.getUserEmail.profilepic
            ? data.data?.getUserEmail.profilepic
            : " "
        );
      }
    });
  }, [currentUser]);

  const onChangeImage = (e: any) => {
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

  if (fetching) return <p></p>;

  if (error) return <p>{error.message}</p>;

  // if (!currentUser) {
  //   if (process.browser) router.push("/login");
  //   return (
  //     <p>
  //       Redirecting to <Link href="/login">/login</Link>
  //       ...
  //     </p>
  //   );
  // }

  return (
    <div className="mx-72 mt-8">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <br></br>
      <div className="flex">
        <div className="flex-1">
          <div className="mb-2 text-2xl">Profile Information</div>
          <div>
            Update your account's profile information and email address.
          </div>
        </div>
        <div className="flex-1 border-l-2 pl-8">
          <div>
            <div>
              <b>Photo</b>
            </div>
            <div>
              {profilepic === " " ? (
                <div className="bg-blue-200 text-3xl px-3 py-3 rounded-full w-16 h-16 center text-blue-600">
                  NE
                </div>
              ) : (
                <img
                  className="rounded-full"
                  src={profilepic}
                  width={80}
                  height={80}
                ></img>
              )}
            </div>
            <div className="flex bg-grey-lighter mt-4">
              <label className="w-48 flex flex-col items-center px-2 py-4 font-bold bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
                <div className="text-sm pb-0">SELECT A NEW PHOTO</div>
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
            className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
            onClick={() => {
              // console.log(profilepic);
              toast.promise(
                createUser({
                  id: localStorage.getItem("userid"),
                  name: name,
                  email: email,
                  profilepic: profilepic,
                }),
                {
                  loading: `Updating settings...`,
                  success: `Settings updated!`,
                  error: (err) => err,
                }
              );
              localStorage.setItem("name", name);
            }}
          >
            SAVE
          </button>
        </div>
      </div>
      <br></br>
      <hr className="mb-4"></hr>
      <div className="flex">
        <div className="flex-1">
          <div className="mb-2 text-2xl">Browser Sessions</div>
          <div>
            Manage and logout your active sessions on other browsers and
            devices.
          </div>
        </div>
        <div className="flex-1 border-l-2 pl-8">
          <div>
            If necessary, you may logout of all of your other browser sessions
            across all of your devices. Some of your recent sessions are listed
            below; however, this list may not be exhaustive. If you feel your
            account has been compromised, you should also update your password.
          </div>
          <button
            className="mt-4 bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
            onClick={() => {
              localStorage.setItem("isloggedin", "false");
              router.push("/signup");
            }}
          >
            LOGOUT OTHER BROWSER SESSIONS
          </button>
          <br></br>
        </div>
      </div>
      <br></br>
      <hr className="mb-4"></hr>
      <div className="flex">
        <div className="flex-1">
          <div className="mb-2 text-2xl">Delete Account</div>
          <div>Permenantly delete your account.</div>
        </div>
        <div className="flex-1 border-l-2 pl-8">
          <div>
            Once your account is deleted, all of its resources and data will be
            permanently deleted. Before deleting your account, please download
            any data or information that you wish to retain.
          </div>
          <button
            className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-4"
            onClick={async () => {
              await toast.promise(
                deleteTranscripts({
                  userid: localStorage.getItem("userid"),
                }),
                {
                  loading: `Deleting data`,
                  success: `Data deleted!`,
                  error: (err) => {
                    return err;
                  },
                }
              );
              await toast.promise(
                deleteUser({
                  userId: localStorage.getItem("userid"),
                }),
                {
                  loading: `Logging out...`,
                  success: `Account deleted!`,
                  error: (err) => {
                    return err;
                  },
                }
              );
              localStorage.setItem("isloggedin", "false");
              router.push("/signup");
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
