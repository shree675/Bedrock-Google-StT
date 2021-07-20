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
    <div className="ml-72 mr-32 mt-8">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <br></br>
      <div className="flex">
        <div style={{flex:"0.4"}}>
          <div className="mb-2 text-2xl">Profile Information</div>
          <div className="mr-8 text-gray-500">
            Update your account's profile information and email address.
          </div>
        </div>
        <div style={{flex:"0.6"}} className=" shadow-lg rounded">
          <div className="pl-8">
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
              <label className="w-48 flex flex-col items-center px-2 py-2 font-bold bg-white text-gray-600 rounded tracking-wide uppercase border border-black cursor-pointer hover:bg-blue">
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
              <b className="text-gray-600">Name</b>
            </div>
            <div>
              <input
                className="rounded w-3/5"
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
              <b className="text-gray-600">Email</b>
            </div>
            <div>
              <input
                className="rounded w-3/5"
                value={email}
                placeholder="me@hello.com"
                type="text"
                onChange={(evt) => setEmail(evt.target.value)}
              />
            </div>
          </div>
          <br></br>
          </div>
          <div className="flex justify-end w-full pr-4 bg-gray-200">
          <button
            className="bg-gray-900 hover:bg-black text-white text-sm py-1 px-4 font-bold mt-3 rounded mb-4"
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
      </div>
      <br></br>
      <hr className="mb-4"></hr>
      <div className="flex mt-8">
        <div style={{flex:"0.4"}}>
          <div className="mb-2 text-2xl">Browser Sessions</div>
          <div className="text-gray-500">
            Manage and logout your active sessions on other browsers and
            devices.
          </div>
        </div>
        <div style={{flex:"0.6"}} className="pl-8 shadow-lg">
          <div className="text-gray-500">
            If necessary, you may logout of all of your other browser sessions
            across all of your devices. Some of your recent sessions are listed
            below; however, this list may not be exhaustive. If you feel your
            account has been compromised, you should also update your password.
          </div>
          <button
            className="mt-4 bg-gray-900 hover:bg-black text-white font-bold py-2 px-4 rounded mb-4"
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
      <div className="flex mb-24 mt-8">
        <div style={{flex:"0.4"}}>
          <div className="mb-2 text-2xl">Delete Account</div>
          <div className="text-gray-500">Permenantly delete your account.</div>
        </div>
        <div style={{flex:"0.6"}} className="shadow-lg pl-8">
          <div className="text-gray-500">
            Once your account is deleted, all of its resources and data will be
            permanently deleted. Before deleting your account, please download
            any data or information that you wish to retain.
          </div>
          <button
            className="mt-4 bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded mb-4"
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
