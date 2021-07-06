import { useRouter } from "next/router";
import React, {useState} from 'react'

const EditTemplate = () => {

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [textcolor, setTextcolor] = useState('');
  const [backgroundcolor, setBackgroundcolor] = useState('');
  const [image, setImage] = useState('');
  const [imageurl, setImageURL] = useState('');

  const onChangeImage = (e) => {

    setImage(e.target.files[0]);
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = function (ev) {
        setImageURL(ev.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeSubTitle = (e) => {
    setSubtitle(e.target.value);
  };

  const onChangeTextColor = (e) => {
    setTextcolor(e.target.value);
  };

  const onChangeBackgroundColor = (e) => {
    setBackgroundcolor(e.target.value);
  };

  const router = useRouter();
  const {
    query: { transcript },
  } = router;
  return (
  <div>
    <label for="img">Select image:</label>
    <br/>
    <input type="file" id="img" name="img" accept="image/*" onChange={onChangeImage} />
    <br/>
    
    <label>Title</label>
    <input type="text" name="title" onChange={onChangeTitle} value={title}/>
    <br/>

    <label>Subtitle</label>
    <input type="text" name="subtitle" onChange={onChangeSubTitle} value={subtitle}/>
    <br/>

    <label>text color</label>
    <input type="text" name="textcolor" onChange={onChangeTextColor} value={textcolor}/>
    <br/>

    <label>background color</label>
    <input type="text" name="backgroundcolor" onChange={onChangeBackgroundColor} value={backgroundcolor}/>
    <br/>
    
    {transcript}
  </div>
  )
};

export default EditTemplate;
