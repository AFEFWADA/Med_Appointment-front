import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the toastify CSS
import "./BrainTumorPredictor.css";
import Side from "../Layouts/Side";
import Navbar from "../../../Layout/Navbar";

const TumorDetector = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setPrediction("");
  };

  const handleSubmit = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    setLoading(true);
    setPrediction("");

    try {
      const res = await axios.post("http://127.0.0.1:5000/predict?image", formData);
      setPrediction(res.data.prediction);

      // Show the toast notification based on the prediction result
      if (res.data.prediction === "YES") {
        toast.error("Tumor Detected! ", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeButton: false,
        });
      } else {
        toast.success("No Tumor Detected! You're safe.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeButton: false,
        });
      }
    } catch (err) {
      console.error("Error during prediction:", err);
      setPrediction("Erreur lors de la prédiction");
      toast.error("There was an error with the prediction. Please try again.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeButton: false,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main">
      <Side />
      <div className="contents">
        <div className="nav">
          <Navbar />
        </div>
        <div className="tumor-container">
          <h2 className="title">🧠 Prédiction de Tumeur Cérébrale</h2>

          <div className="upload-box">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              id="fileInput"
              hidden
            />
            <label htmlFor="fileInput" className="upload-label">
              Choisir une image
            </label>

            {preview && (
              <div className="preview">
                <img src={preview} alt="Preview" />
              </div>
            )}
          </div>

          <button
            onClick={handleSubmit}
            className="submit-btn"
            disabled={loading}
            style={{ opacity: loading ? 0.6 : 1, cursor: loading ? "not-allowed" : "pointer" }}
          >
            {loading ? "Analyse en cours..." : "Lancer la prédiction"}
          </button>

          {loading && <div className="loader"></div>}

          {prediction && (
            <div className={`result ${prediction === "YES" ? "danger" : "safe"}`}>
              Résultat : <strong>{prediction === "YES" ? "Tumor Detected" : "Safe"}</strong>
            </div>
          )}
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default TumorDetector;
