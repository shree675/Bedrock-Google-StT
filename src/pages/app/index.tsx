import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useMutation } from "urql";
import { CreateProjectDocument } from "../../client/graphql/createProject.generated";
import { useGetCurrentUserQuery } from "../../client/graphql/getCurrentUser.generated";
import axios from "axios";
import { FileDrop } from "react-file-drop";
import { event } from "next/dist/build/output/log";

export default function Dashboard() {
  const router = useRouter();
  const [{ data, fetching, error }] = useGetCurrentUserQuery();
  const [, createProject] = useMutation(CreateProjectDocument);
  const [name, setName] = useState("");
  const [uploadedFile, setUploadedFile] = useState("");
  const [bb, setbb] = useState("");
  const [filename, setFileName] = useState("");

  const styles = {
    border: "1px solid black",
    width: 600,
    color: "black",
    padding: 20,
  };

  useEffect(() => {}, [filename]);

  function getBase64(file) {
    if (!file) {
      setbb("");
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setbb(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }

  const upload = async () => {
    var formData = new FormData();
    console.log(uploadedFile);

    getBase64(uploadedFile);

    // formData.append("file", bb);
    formData.append("file", uploadedFile);

    // fetch("/api/uploadfile", {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));

    // fetch("/api/uploadfile", {
    //   method: "POST",
    //   body: { formData },
    // })
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));

    // axios.post("/api/uploadfile", { formData }).then((res) => {
    //   console.log(res);
    // });

    axios.post("/api/uploadfile", formData).then((res) => {
      console.log(res);
    });
  };

  const hasDropped = (files, event) => {
    setUploadedFile(files[0]);
    getBase64(files[0]);
    console.log(files[0]);
    setFileName(files[0].name);
  };

  const hasUploaded = (event) => {
    setUploadedFile(event.target.files[0]);
    getBase64(event.target.files[0]);
  };

  if (fetching) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  if (!data?.currentUser) {
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
      <h1>Hello {data.currentUser.name}!</h1>
      <h3>Upload Files for Transcription</h3>
      <br></br>
      <input type="file" onChange={hasUploaded}></input>
      <button onClick={upload}>Upload</button>

      <div>Or</div>
      <div styles={styles}>
        <FileDrop
          onFrameDragEnter={(event) => {}}
          onFrameDragLeave={(event) => {}}
          onFrameDrop={(event) => {}}
          onDragOver={(event) => {}}
          onDragLeave={(event) => {}}
          onDrop={(files, event) => {
            hasDropped(files, event);
          }}
        >
          {filename === ""
            ? "Drop some files here!"
            : `${filename} (or) Drop a different file`}
        </FileDrop>
      </div>
      <br></br>
      <h3>Create Projects</h3>
      <ul>
        {data.currentUser.projects.map((project) => (
          <li key={project.slug}>
            <Link href={`/app/${project.slug}`}>{project.name}</Link>
          </li>
        ))}
      </ul>
      <input
        placeholder="Hooli Inc."
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      />
      <button
        disabled={!name}
        onClick={() => {
          createProject({
            name,
          }).then((result) => {
            const slug = result.data?.createProject?.slug;
            if (slug) router.push(`/app/${slug}`);
          });
        }}
      >
        Create project
      </button>
      <br></br>
      <Link href="/app/settings">Settings</Link>
      <br></br>
      <Link href="/api/auth/logout">Logout</Link>
    </>
  );
}
