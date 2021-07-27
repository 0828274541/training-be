import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
  padding: '10px'
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 1,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  boxSizing: 'border-box',
  padding: 1
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

const container = {
  width: '100%',
  marginTop: '10px',
  backgroundColor: 'yellow',
  minHeight: '100px'
};
const text = {
  color: 'black',
  textAlign: 'center',
  marginTop: '20px',
  fontSize: '25px',
  fontWeight: 'bold'
};
export default function Previews({ setCover }) {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setCover(acceptedFiles);
      setFiles(acceptedFiles.map((file) => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} alt="" />
      </div>
    </div>
  ));

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);
  return (
    <section className="container" style={container}>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p style={text}>
          Drag  drop some files here, or click to select files
        </p>
      </div>
      <aside style={thumbsContainer} {...getRootProps({ className: 'dropzone' })}>
        {thumbs}
      </aside>
    </section>
  );
}

Previews.propTypes = {
  setCover: PropTypes.any,
};
