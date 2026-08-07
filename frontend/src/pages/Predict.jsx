import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileImage,
  ImagePlus,
  RefreshCcw,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Upload,
  X,
} from "lucide-react";

import { predictFruit } from "../services/api";


const Predict = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  // =====================================================
  // FILE VALIDATION
  // =====================================================

  const validateFile = (file) => {
    if (!file) {
      return false;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError(
        "Please upload a JPG, PNG, or WEBP image."
      );

      return false;
    }

    // 10 MB maximum

    if (file.size > 10 * 1024 * 1024) {
      setError(
        "Image size must be smaller than 10 MB."
      );

      return false;
    }

    setError("");

    return true;
  };


  // =====================================================
  // SELECT FILE
  // =====================================================

  const handleFile = (file) => {
    if (!validateFile(file)) {
      return;
    }

    setSelectedFile(file);

    const objectUrl = URL.createObjectURL(file);

    setPreview(objectUrl);
  };


  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      handleFile(file);
    }
  };


  // =====================================================
  // DRAG & DROP
  // =====================================================

  const handleDragOver = (event) => {
    event.preventDefault();

    setDragActive(true);
  };


  const handleDragLeave = (event) => {
    event.preventDefault();

    setDragActive(false);
  };


  const handleDrop = (event) => {
    event.preventDefault();

    setDragActive(false);

    const file = event.dataTransfer.files?.[0];

    if (file) {
      handleFile(file);
    }
  };


  // =====================================================
  // REMOVE IMAGE
  // =====================================================

  const removeImage = () => {
    setSelectedFile(null);

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setPreview(null);

    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };


  // =====================================================
  // PREDICT
  // =====================================================

  const handlePredict = async () => {
    if (!selectedFile) {
      setError("Please select an image first.");

      return;
    }

    try {
      setLoading(true);

      setError("");

      const result = await predictFruit(
        selectedFile
      );

      console.log("Prediction result:", result);


      /*
        The backend may return:

        {
          prediction: "Fresh",
          confidence: 97.2,
          _id: "..."
        }

        OR

        {
          prediction: "Fresh",
          confidence: 97.2,
          id: "..."
        }
      */


      const predictionId =
        result._id ||
        result.id ||
        result.predictionId;


      if (predictionId) {

        navigate(
          `/analysis/${predictionId}`
        );

        return;
      }


      /*
        If your backend doesn't return an ID yet,
        we temporarily send the result directly
        to the analysis page.
      */

      navigate("/analysis", {
        state: {
          result,
          image: preview,
        },
      });

    } catch (err) {

      console.error(err);

      const backendMessage =
        err.response?.data?.error ||
        err.response?.data?.message;

      setError(
        backendMessage ||
        "Something went wrong while analyzing the image."
      );

    } finally {

      setLoading(false);

    }
  };


  return (
    <main className="min-h-screen px-6 pb-24 pt-36">

      <div className="mx-auto max-w-6xl">

        {/* =================================================
            HEADER
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="text-center"
        >

          <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-lime-200 bg-white/70 px-4 py-2 shadow-sm backdrop-blur">

            <Sparkles
              size={15}
              className="text-lime-600"
            />

            <span className="text-xs font-black uppercase tracking-[0.2em] text-green-900">
              AI Freshness Scanner
            </span>

          </div>


          <h1 className="text-5xl font-black tracking-[-0.04em] text-green-950 sm:text-6xl">

            Analyze your

            <span className="text-lime-600">
              {" "}fruit.
            </span>

          </h1>


          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-500">

            Upload a clear photo and let our CNN
            analyze the visual characteristics of
            your fruit.

          </p>

        </motion.div>


        {/* =================================================
            MAIN AREA
        ================================================= */}

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_320px]">


          {/* =================================================
              UPLOAD CARD
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.15,
            }}
            className="rounded-[2rem] border border-white/80 bg-white/75 p-5 shadow-xl shadow-green-950/5 backdrop-blur-xl sm:p-7"
          >

            <AnimatePresence mode="wait">

              {!preview ? (

                /* =================================================
                    EMPTY UPLOAD
                ================================================= */

                <motion.div
                  key="upload"
                  initial={{
                    opacity: 0,
                    scale: 0.97,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.97,
                  }}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  className={`group relative flex min-h-[460px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[1.5rem] border-2 border-dashed transition ${
                    dragActive
                      ? "border-lime-500 bg-lime-50"
                      : "border-slate-200 bg-slate-50/70 hover:border-lime-400 hover:bg-lime-50/50"
                  }`}
                >

                  {/* Decorative glow */}

                  <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-200/30 blur-3xl transition group-hover:bg-lime-300/40" />


                  {/* Upload icon */}

                  <motion.div
                    animate={{
                      y: [0, -7, 0],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                    }}
                    className="relative z-10 flex h-24 w-24 items-center justify-center rounded-3xl bg-white shadow-xl shadow-green-950/10"
                  >

                    <ImagePlus
                      size={38}
                      strokeWidth={1.5}
                      className="text-green-800"
                    />

                  </motion.div>


                  <div className="relative z-10 mt-7 text-center">

                    <h2 className="text-2xl font-black text-green-950">
                      Drop your fruit image here
                    </h2>

                    <p className="mt-2 text-sm text-slate-400">
                      or click anywhere to browse your device
                    </p>

                  </div>


                  <div className="relative z-10 mt-7 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-400 shadow-sm">

                    <Upload size={14} />

                    JPG • PNG • WEBP
                    <span className="text-slate-300">
                      •
                    </span>
                    MAX 10MB

                  </div>


                  {/* Hidden input */}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                </motion.div>

              ) : (

                /* =================================================
                    IMAGE PREVIEW
                ================================================= */

                <motion.div
                  key="preview"
                  initial={{
                    opacity: 0,
                    scale: 0.97,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.97,
                  }}
                >

                  <div className="relative overflow-hidden rounded-[1.5rem] bg-slate-950">

                    <img
                      src={preview}
                      alt="Selected fruit"
                      className="mx-auto max-h-[500px] w-full object-contain"
                    />


                    {/* Scanner overlay */}

                    <motion.div
                      animate={{
                        top: ["10%", "90%", "10%"],
                      }}
                      transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="pointer-events-none absolute left-[5%] right-[5%] z-10"
                    >

                      <div className="h-[2px] bg-lime-400 shadow-[0_0_20px_rgba(163,230,53,1)]" />

                    </motion.div>


                    {/* Corners */}

                    <div className="absolute left-5 top-5 h-10 w-10 border-l-2 border-t-2 border-lime-400" />

                    <div className="absolute right-5 top-5 h-10 w-10 border-r-2 border-t-2 border-lime-400" />

                    <div className="absolute bottom-5 left-5 h-10 w-10 border-b-2 border-l-2 border-lime-400" />

                    <div className="absolute bottom-5 right-5 h-10 w-10 border-b-2 border-r-2 border-lime-400" />


                    <div className="absolute left-5 top-5 rounded-full bg-green-950/80 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-lime-300 backdrop-blur">
                      Ready to scan
                    </div>


                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-lg backdrop-blur transition hover:bg-white hover:text-red-500"
                    >

                      <X size={18} />

                    </button>

                  </div>


                  {/* File information */}

                  <div className="mt-5 flex items-center justify-between gap-4 rounded-2xl bg-slate-50 p-4">

                    <div className="flex min-w-0 items-center gap-3">

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-lime-100 text-lime-700">
                        <FileImage size={20} />
                      </div>

                      <div className="min-w-0">

                        <p className="truncate text-sm font-bold text-green-950">
                          {selectedFile?.name}
                        </p>

                        <p className="text-xs text-slate-400">
                          {(
                            selectedFile?.size /
                            1024 /
                            1024
                          ).toFixed(2)}
                          {" "}MB
                        </p>

                      </div>

                    </div>


                    <button
                      type="button"
                      onClick={removeImage}
                      className="flex shrink-0 items-center gap-2 text-xs font-bold text-slate-400 transition hover:text-red-500"
                    >

                      <RefreshCcw size={14} />

                      Change

                    </button>

                  </div>

                </motion.div>

              )}

            </AnimatePresence>


            {/* =================================================
                ERROR
            ================================================= */}

            <AnimatePresence>

              {error && (

                <motion.div
                  initial={{
                    opacity: 0,
                    height: 0,
                  }}
                  animate={{
                    opacity: 1,
                    height: "auto",
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                  }}
                  className="mt-4 overflow-hidden"
                >

                  <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                    {error}
                  </div>

                </motion.div>

              )}

            </AnimatePresence>


            {/* =================================================
                PREDICT BUTTON
            ================================================= */}

            <motion.button
              whileHover={
                selectedFile && !loading
                  ? {
                      y: -3,
                    }
                  : {}
              }
              whileTap={
                selectedFile && !loading
                  ? {
                      scale: 0.98,
                    }
                  : {}
              }
              disabled={!selectedFile || loading}
              onClick={handlePredict}
              className={`mt-5 flex w-full items-center justify-center gap-3 rounded-2xl px-6 py-4 font-black transition ${
                selectedFile && !loading
                  ? "bg-green-950 text-white shadow-xl shadow-green-950/20 hover:bg-green-800"
                  : "cursor-not-allowed bg-slate-100 text-slate-300"
              }`}
            >

              {loading ? (

                <>
                  <motion.div
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <ScanLine size={20} />
                  </motion.div>

                  Analyzing your fruit...

                </>

              ) : (

                <>
                  Analyze Freshness

                  <ArrowRight size={19} />

                </>

              )}

            </motion.button>

          </motion.div>


          {/* =================================================
              SIDE INFORMATION
          ================================================= */}

          <motion.aside
            initial={{
              opacity: 0,
              x: 25,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.3,
            }}
            className="space-y-4"
          >

            {/* Accuracy */}

            <div className="rounded-3xl bg-green-950 p-6 text-white">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime-400 text-green-950">
                  <ShieldCheck size={21} />
                </div>

                <div>

                  <p className="text-xs font-bold uppercase tracking-widest text-lime-300">
                    CNN Model
                  </p>

                  <p className="font-black">
                    97% Accuracy
                  </p>

                </div>

              </div>

              <p className="mt-5 text-sm leading-6 text-green-100/50">
                Our trained convolutional neural
                network analyzes visual patterns
                to classify fruit freshness.
              </p>

            </div>


            {/* Tips */}

            <div className="rounded-3xl border border-slate-200 bg-white/70 p-6">

              <p className="text-xs font-black uppercase tracking-[0.2em] text-green-800">
                Better results
              </p>

              <h3 className="mt-3 text-xl font-black text-green-950">
                Image tips
              </h3>


              <div className="mt-5 space-y-4">

                {[
                  "Use good lighting",
                  "Keep the fruit clearly visible",
                  "Avoid excessive blur",
                  "Use a single fruit when possible",
                ].map((tip) => (

                  <div
                    key={tip}
                    className="flex items-start gap-3"
                  >

                    <CheckCircle2
                      size={17}
                      className="mt-0.5 shrink-0 text-lime-600"
                    />

                    <span className="text-sm leading-5 text-slate-500">
                      {tip}
                    </span>

                  </div>

                ))}

              </div>

            </div>


            {/* Supported */}

            <div className="rounded-3xl border border-slate-200 bg-white/70 p-6">

              <div className="flex items-center gap-2">

                <FileImage
                  size={18}
                  className="text-green-700"
                />

                <span className="font-black text-green-950">
                  Supported formats
                </span>

              </div>

              <div className="mt-4 flex flex-wrap gap-2">

                {[
                  "JPG",
                  "JPEG",
                  "PNG",
                  "WEBP",
                ].map((format) => (

                  <span
                    key={format}
                    className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-500"
                  >
                    {format}
                  </span>

                ))}

              </div>

            </div>

          </motion.aside>

        </div>


        {/* =================================================
            BACK LINK
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.8,
          }}
          className="mt-8"
        >

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm font-bold text-slate-400 transition hover:text-green-800"
          >

            <ArrowLeft size={16} />

            Back to home

          </button>

        </motion.div>

      </div>

    </main>
  );
};

export default Predict;