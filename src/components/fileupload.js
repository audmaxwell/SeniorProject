import React from 'react';
const FileUploader = props => {
    const hiddenFileInput = React.useRef(null);
    const handleClick = event => {
        hiddenFileInput.current.click();

    };
    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        props.handleFile(fileUploaded);
      };
    return (
      <>
        <button onClick={handleClick}>
          Upload file
        </button>
        <input type="file" name= "imageupload" onChange = {handleChange} ref={hiddenFileInput} style={{display:'none'}} /> 
      </>
    );
  };
  export default FileUploader;