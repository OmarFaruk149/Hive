import React, { useState } from 'react';

const FileInputComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*, video/*"
        onChange={handleFileChange}
      />
      <p>Selected File: {selectedFile ? selectedFile.name : 'None'}</p>
      {selectedFile && (
        <>
          {selectedFile.type.startsWith('image/') && (
            <img src={URL.createObjectURL(selectedFile)} alt="Selected" />
          )}
          {selectedFile.type.startsWith('video/') && (
            <video width="320" height="240" controls>
              <source src={URL.createObjectURL(selectedFile)} type={selectedFile.type} />
              Your browser does not support the video tag.
            </video>
          )}
        </>
      )}
    </div>
  );
};

export default FileInputComponent;
