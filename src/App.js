import './App.css';
import React from 'react';
//import Axios from 'axios';
import Tesseract from 'tesseract.js';

function App() {
  const [file, setFile] = React.useState();
  const [resText, setResText] = React.useState("");
  const [loader, setLoader] = React.useState(false);

  const convertToText = (e) => {
    e.preventDefault();
    
    Tesseract.recognize(
    file,
    'eng',
    { logger: m => {
      if (m.status === "recognizing text" && m.progress !== 1) {
        setLoader(true);
      }else{
        setLoader(false);
      }
    } }
    ).then(({ data: { text } }) => {
      console.log(text);
      setResText(text);
    })
  }
  return (
    <div className="App">
      <h1>Image 2 Text</h1>
      <form method="post" onSubmit={(e) => {convertToText(e)}}>
        <input type="file" accept="image/JPEG image/PNG" onChange={(e) => {setFile(e.target.files[0])}}/>
        <button type="submit">convert</button>
        {loader && <div className='loader'></div>}
      </form>
      <textarea name="result" id="result" defaultValue={resText}></textarea>
    </div>
  );
}

export default App;
