import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../supabaseClient';
import './Form.css'; // For custom styling

function Form() {
  const [empId, setEmpId] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [loginTime, setLoginTime] = useState('');
  const [logoutTime, setLogoutTime] = useState('');
  const [workStatus, setWorkStatus] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [photo, setPhoto] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isPresent, setIsPresent] = useState(false); // For the 'Present' button
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0];
    const currentTime = new Date().toTimeString().split(' ')[0];
    setDate(currentDate);
    setLoginTime(currentTime);
  }, []);

  useEffect(() => {
    if (isCameraActive) {
      startCamera();
    } else {
      return () => {
        if (streamRef.current) {
          const tracks = streamRef.current.getTracks();
          tracks.forEach(track => track.stop());
        }
      };
    }
  }, [isCameraActive]);

  const startCamera = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
      }
    }
  };

  const takePhoto = () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    setPhoto(canvas.toDataURL('image/png'));
    setIsCameraActive(false);

    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  const retakePhoto = () => {
    setPhoto(null);
    setIsCameraActive(true);
  };

  const dataURLtoBlob = (dataURL) => {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  const uploadImage = async (blob) => {
    const fileName = `${Date.now()}.png`;
    const { data, error } = await supabase.storage
      .from('images')
      .upload(fileName, blob);

    if (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
    return fileName;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let photoUrl = '';
      if (photo) {
        const blob = dataURLtoBlob(photo);
        const fileName = await uploadImage(blob);
        photoUrl = `https://kidbzlespbhlseivcosi.supabase.co/storage/v1/object/images/${fileName}`;
      }

      const { data, error } = await supabase
        .from('Attendance')
        .insert([{ 
          emp_id: empId, 
          name, 
          date, 
          login_time: loginTime, 
          logout_time: logoutTime, 
          work_status: workStatus, 
          number: Math.floor(Math.random() * 10000), 
          img: photoUrl 
        }]);

      if (error) {
        console.error('Error inserting data:', error);
        setMessage(`Error inserting data: ${error.message}`);
        setMessageType('error');
      } else {
        setMessage('Data submitted successfully!');
        setMessageType('success');
        setEmpId('');
        setName('');
        setLogoutTime('');
        setWorkStatus('');
        setPhoto(null);
        setIsCameraActive(false);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setMessage('Error uploading image. Please try again.');
      setMessageType('error');
    }
  };

  const handlePresentClick = () => {
    setIsPresent(true);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <img src="/Inmac-logo.png" alt="Inmac Logo" className="logo" />
        <h2>Employee Attendance Form</h2>

        <div className="form-group">
          <label>Employee ID:</label>
          <input
            type="text"
            value={empId}
            onChange={(e) => setEmpId(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <button type="button" onClick={handlePresentClick} className="present-button">
          Present
        </button>

        {isPresent && (
          <>
            <div className="form-row">
              <div className="form-group">
                <label>Date:</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  disabled
                />
              </div>
              <div className="form-group">
                <label>Log In Time:</label>
                <input
                  type="time"
                  value={loginTime}
                  onChange={(e) => setLoginTime(e.target.value)}
                  required
                  disabled
                />
              </div>
              <div className="form-group">
                <label>Log Out Time:</label>
                <input
                  type="time"
                  value={logoutTime}
                  onChange={(e) => setLogoutTime(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group work-status-group">
              <label>Work Status:</label>
              <select
                value={workStatus}
                onChange={(e) => setWorkStatus(e.target.value)}
                required
              >
                <option value="">Select Status</option>
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="On Leave">On Leave</option>
              </select>

              {isCameraActive ? (
                <>
                  <video ref={videoRef} autoPlay className="camera-view"></video>
                  <button type="button" onClick={takePhoto} className="capture-button">
                    Capture Photo
                  </button>
                </>
              ) : (
                <>
                  {photo && <img src={photo} alt="Captured" className="captured-photo" />}
                  <button type="button" onClick={retakePhoto} className="retake-button">
                    Retake Photo
                  </button>
                </>
              )}
            </div>

            <button type="submit" className="submit-button">
              Submit
            </button>
          </>
        )}

        {message && (
          <div className={messageType === 'success' ? 'message success' : 'message error'}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
}

export default Form;
