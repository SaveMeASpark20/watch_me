import { ChangeEvent, FormEvent, useRef, useState } from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from '../firebase.config';

const Upload =  () => {

  const videoInputRef = useRef<HTMLInputElement | null>(null); 
  const posterInputRef = useRef<HTMLInputElement | null>(null);
  const [videoPerc, setVideoPerc] = useState(0);
  const [videoName, setVideoName] = useState("");
  const [imageName, setImageName] = useState("");
  const [title, setTitle] = useState("");

  const uploadFile = (file : File, type : string) => {
    return new Promise((resolve, reject) => {
      const folder = type === "videos" ? "videos/" : "images/";
      const storage = getStorage(app);
  
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, folder + fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setVideoPerc(Math.round(progress));
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
          reject(error); // Reject the promise if there's an error
        },
        async () => {
          // Upload completed successfully, now we can get the download URL
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);

          resolve(downloadUrl); // Resolve the promise with the download URL
        }
      );
    });
  };
  

  const uploadDetailsOfVideo = async (url : any, title : any, poster?: any) => {
    const body = {url, title, poster}
       
    const response = await fetch("http://localhost:3000/api/movies", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(body),
      credentials: 'include',
    });
    if(response.ok){
      const responseData = await response.json();
      console.log(responseData);
    }
  }

  const handleSubmit = async (event : FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const videoInput = videoInputRef.current;
    const posterInput = posterInputRef.current;
    
    if(videoInput && videoInput.files && videoInput.files.length > 0 
      && posterInput && posterInput.files && posterInput.files.length > 0 ){
      const video  = await uploadFile(videoInput.files[0], "videos");
      const poster = await uploadFile(posterInput.files[0], "images");
        uploadDetailsOfVideo(video, title, poster)
    } 
    else if(videoInput && videoInput.files) {
      const video = await uploadFile(videoInput.files[0], "videos");
      uploadDetailsOfVideo(video, title)
    }
    else{
      console.error('No file selected');
    }
  }

  const handleVideoName = (event : ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if(file){
      setVideoName(file.name);
      console.log("set to file.name");
    }
    else {
      setVideoName('');
      console.log("set to empty string");
    }
  }

  const handleImageName = (event : ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if(file){
      setImageName(file.name);
    }else{
      setImageName('');
    }

  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
          <div className='mb-2'>
            <label className='text-lg mb-2 block text-[#452aba] ' htmlFor="video">Video Upload : {videoPerc > 0 && "Uploading: " + videoPerc + "%"}</label>
              <input 
                type='text'
                placeholder='Title of the Video'
                className='rounded p-2 focus:outline-none min-w-52 border-2 border-[#452aba] max-w-[400px]'
                value={title}
                onChange={(e) => { setTitle(e.currentTarget.value) }}
                required
              />
          </div>
          <div className='flex flex-col'>
            <div className='flex items-center gap-1'>
              <label htmlFor="video" className="custom-file-upload">
                Upload Video
              </label>

              <input
                type="file"
                accept="video/*"
                id="video"
                ref={videoInputRef} 
                hidden
                required
                onChange={handleVideoName}
              />

              <p>{videoName}</p>
            </div>
          <div className='flex items-center gap-2'>
          <label htmlFor="image" className="custom-file-upload">
            Upload Poster of Video
          </label>
          <input
            type="file"
            accept="image/*"
            id="image"
            ref={posterInputRef}
            
            hidden
            onChange={handleImageName}
          />
          <p>{imageName}</p>
          </div>
        </div>
        <button type="submit" className='border border-sky-500 py-2 pl-1 pr-2 rounded bg-[#452aba] text-white'>Upload</button>
      </form>
    </div>
  )
}

export default Upload

