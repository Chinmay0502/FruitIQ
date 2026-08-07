import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Leaf,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  XCircle,
} from "lucide-react";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { motion } from "motion/react";

import {
  getPrediction,
  getPredictionImage,
} from "../services/api";


const Analysis = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  // =====================================================
  // STATE
  // =====================================================

  const [result, setResult] = useState(
    location.state?.result || null
  );

  const [image, setImage] = useState(
    location.state?.image || null
  );

  const [loading, setLoading] = useState(
    Boolean(id && !location.state?.result)
  );

  const [error, setError] = useState("");


  // =====================================================
  // LOAD PREDICTION
  // =====================================================

  useEffect(() => {

    const loadPrediction = async () => {

      // If Predict.jsx already passed the result,
      // don't request it again.
      if (!id || result) {
        setLoading(false);
        return;
      }

      try {

        setLoading(true);

        const response = await getPrediction(id);

        console.log(
          "Prediction loaded from backend:",
          response
        );


        /*
         * Your backend returns:
         *
         * {
         *   success: true,
         *   message: "...",
         *   data: {
         *      id: "...",
         *      prediction: "Fresh",
         *      confidence: 100,
         *      createdAt: "..."
         *   }
         * }
         */

        const predictionData =
          response?.data || response;


        setResult(predictionData);


        // -------------------------------------------------
        // IMAGE
        // -------------------------------------------------

        if (predictionData?.imageUrl) {

          setImage(
            predictionData.imageUrl
          );

        } else if (id) {

          setImage(
            getPredictionImage(id)
          );

        }

      } catch (err) {

        console.error(
          "Failed to load prediction:",
          err
        );

        setError(
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.message ||
          "Unable to load prediction."
        );

      } finally {

        setLoading(false);

      }

    };


    loadPrediction();

  }, [id]);


  // =====================================================
  // LOADING SCREEN
  // =====================================================

  if (loading) {

    return (
      <main className="flex min-h-screen items-center justify-center px-6">

        <div className="text-center">

          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-950 text-lime-300"
          >
            <Sparkles size={28} />
          </motion.div>

          <h2 className="mt-6 text-2xl font-black text-green-950">
            Loading analysis...
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Retrieving your CNN prediction
          </p>

        </div>

      </main>
    );

  }


  // =====================================================
  // ERROR SCREEN
  // =====================================================

  if (error) {

    return (
      <main className="flex min-h-screen items-center justify-center px-6">

        <div className="max-w-md text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-500">
            <XCircle size={30} />
          </div>

          <h2 className="mt-6 text-2xl font-black text-green-950">
            Analysis unavailable
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            {error}
          </p>

          <button
            onClick={() => navigate("/predict")}
            className="mt-7 rounded-xl bg-green-950 px-6 py-3 font-bold text-white transition hover:bg-green-800"
          >
            Try another image
          </button>

        </div>

      </main>
    );

  }


  // =====================================================
  // NO RESULT
  // =====================================================

  if (!result) {

    return (
      <main className="flex min-h-screen items-center justify-center px-6">

        <div className="text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
            <Leaf size={28} />
          </div>

          <h2 className="mt-6 text-2xl font-black text-green-950">
            No analysis found
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Upload an image to start a new analysis.
          </p>

          <button
            onClick={() => navigate("/predict")}
            className="mt-6 rounded-xl bg-green-950 px-6 py-3 font-bold text-white transition hover:bg-green-800"
          >
            Analyze an image
          </button>

        </div>

      </main>
    );

  }


  // =====================================================
  // IMPORTANT:
  // NORMALIZE BACKEND RESPONSE
  // =====================================================

  /*
   * Your backend response:
   *
   * {
   *   success: true,
   *   message: "Prediction completed successfully",
   *   data: {
   *      id: "6a7579fed3d42c823361690b",
   *      prediction: "Fresh",
   *      confidence: 100,
   *      createdAt: "2026-08-07T06:23:58.321Z"
   *   }
   * }
   *
   * Therefore we MUST read result.data first.
   */

  const predictionData =
    result?.data || result;


  // =====================================================
  // PREDICTION
  // =====================================================

  const rawPrediction =
    predictionData?.prediction ||
    predictionData?.label ||
    predictionData?.result ||
    "";


  const predictionText =
    String(rawPrediction)
      .toLowerCase()
      .trim();


  /*
   * Fresh is explicitly detected.
   *
   * This is important because we don't want:
   *
   * "Fresh" → Rotten
   */

  const isFresh =
    predictionText === "fresh" ||
    predictionText.includes("fresh");


  const displayPrediction =
    isFresh
      ? "Fresh"
      : "Rotten";


  // =====================================================
  // CONFIDENCE
  // =====================================================

  /*
   * Backend currently sends:
   *
   * confidence: 100
   *
   * We also support:
   *
   * confidence: 0.97
   */

  let confidence =
    Number(
      predictionData?.confidence ?? 0
    );


  if (confidence <= 1) {
    confidence *= 100;
  }


  confidence = Math.min(
    Math.max(confidence, 0),
    100
  );


  // =====================================================
  // DATE
  // =====================================================

  const analyzedAt =
    predictionData?.createdAt ||
    predictionData?.timestamp;


  const formattedDate =
    analyzedAt
      ? new Date(
          analyzedAt
        ).toLocaleString()
      : new Date().toLocaleString();


  // =====================================================
  // ID
  // =====================================================

  const predictionId =
    predictionData?.id ||
    predictionData?._id ||
    id;


  // =====================================================
  // CHART DATA
  // =====================================================

  const confidenceData = [
    {
      name: "CNN",
      confidence: Number(
        confidence.toFixed(2)
      ),
    },
  ];


  // =====================================================
  // UI
  // =====================================================

  return (
    <main className="min-h-screen px-6 pb-24 pt-32">

      <div className="mx-auto max-w-7xl">


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
          className="flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >

          <div>

            <div className="mb-4 flex w-fit items-center gap-2 rounded-full border border-lime-200 bg-white/70 px-4 py-2">

              <Sparkles
                size={15}
                className="text-lime-600"
              />

              <span className="text-xs font-black uppercase tracking-[0.2em] text-green-900">
                AI Analysis Report
              </span>

            </div>


            <h1 className="text-4xl font-black tracking-[-0.04em] text-green-950 sm:text-5xl">

              Fruit

              <span className="text-lime-600">
                {" "}analysis
              </span>

            </h1>


            <p className="mt-3 text-slate-500">
              CNN-powered freshness assessment
            </p>

          </div>


          <button
            onClick={() => navigate("/predict")}
            className="flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-600 shadow-sm transition hover:border-lime-300 hover:text-green-800"
          >

            <RotateCcw size={16} />

            Analyze another

          </button>

        </motion.div>


        {/* =================================================
            RESULT HERO
        ================================================= */}

        <motion.section
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
          className="mt-10 overflow-hidden rounded-[2rem] border border-white bg-white shadow-xl shadow-green-950/5"
        >

          <div className="grid lg:grid-cols-2">


            {/* =================================================
                IMAGE
            ================================================= */}

            <div className="relative min-h-[360px] overflow-hidden bg-slate-950">

              {image ? (

                <img
                  src={image}
                  alt="Analyzed fruit"
                  className="absolute inset-0 h-full w-full object-cover"
                />

              ) : (

                <div className="flex h-full min-h-[360px] items-center justify-center text-slate-600">
                  <Leaf size={70} />
                </div>

              )}


              <div className="absolute inset-0 bg-gradient-to-t from-green-950/80 via-transparent to-transparent" />


              <div className="absolute bottom-6 left-6">

                <div className="rounded-full bg-white/15 px-4 py-2 text-xs font-black uppercase tracking-widest text-white backdrop-blur-md">
                  CNN Vision Analysis
                </div>

              </div>

            </div>


            {/* =================================================
                RESULT
            ================================================= */}

            <div className="flex flex-col justify-center p-8 sm:p-12">

              <div className="flex items-center gap-3">

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                    isFresh
                      ? "bg-lime-100 text-lime-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >

                  {isFresh ? (
                    <CheckCircle2 size={24} />
                  ) : (
                    <XCircle size={24} />
                  )}

                </div>


                <div>

                  <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                    Prediction
                  </p>

                  <p
                    className={`text-sm font-bold ${
                      isFresh
                        ? "text-lime-700"
                        : "text-red-600"
                    }`}
                  >
                    {displayPrediction}
                  </p>

                </div>

              </div>


              <h2
                className={`mt-7 text-6xl font-black tracking-[-0.05em] ${
                  isFresh
                    ? "text-green-950"
                    : "text-red-950"
                }`}
              >

                {confidence.toFixed(2)}

                <span className="text-3xl">
                  %
                </span>

              </h2>


              <p className="mt-2 text-lg font-bold text-slate-500">
                model confidence
              </p>


              <div className="mt-8 h-3 overflow-hidden rounded-full bg-slate-100">

                <motion.div
                  initial={{
                    width: 0,
                  }}
                  animate={{
                    width: `${confidence}%`,
                  }}
                  transition={{
                    duration: 1.2,
                    delay: 0.5,
                  }}
                  className={`h-full rounded-full ${
                    isFresh
                      ? "bg-lime-500"
                      : "bg-red-500"
                  }`}
                />

              </div>


              <div className="mt-5 flex items-center gap-2 text-sm text-slate-400">

                <ShieldCheck
                  size={16}
                  className={
                    isFresh
                      ? "text-lime-600"
                      : "text-red-500"
                  }
                />

                Prediction generated by your
                trained CNN model.

              </div>

            </div>

          </div>

        </motion.section>


        {/* =================================================
            STAT CARDS
        ================================================= */}

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            icon={<TrendingUp size={20} />}
            title="Confidence"
            value={`${confidence.toFixed(2)}%`}
            subtitle="CNN certainty"
            delay={0.2}
          />


          <StatCard
            icon={<Leaf size={20} />}
            title="Result"
            value={displayPrediction}
            subtitle="Freshness class"
            delay={0.3}
            positive={isFresh}
          />


          <StatCard
            icon={<ShieldCheck size={20} />}
            title="Model"
            value="CNN"
            subtitle="Computer vision"
            delay={0.4}
          />


          <StatCard
            icon={<Clock3 size={20} />}
            title="Analyzed"
            value="Now"
            subtitle={formattedDate}
            delay={0.5}
          />

        </div>


        {/* =================================================
            ANALYTICS
        ================================================= */}

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.5fr_1fr]">


          {/* =================================================
              CONFIDENCE CHART
          ================================================= */}

          <motion.section
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.35,
            }}
            className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          >

            <div className="flex items-start justify-between">

              <div>

                <p className="text-xs font-black uppercase tracking-[0.2em] text-lime-600">
                  Analytics
                </p>

                <h3 className="mt-2 text-2xl font-black text-green-950">
                  Confidence score
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  How strongly the model supports this prediction.
                </p>

              </div>


              <div className="rounded-xl bg-green-50 p-3 text-green-700">
                <TrendingUp size={20} />
              </div>

            </div>


            <div className="mt-8 h-[280px]">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <AreaChart
                  data={confidenceData}
                >

                  <defs>

                    <linearGradient
                      id="confidenceGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >

                      <stop
                        offset="0%"
                        stopOpacity={0.4}
                      />

                      <stop
                        offset="100%"
                        stopOpacity={0}
                      />

                    </linearGradient>

                  </defs>


                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e2e8f0"
                  />


                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                  />


                  <YAxis
                    domain={[0, 100]}
                    axisLine={false}
                    tickLine={false}
                    unit="%"
                  />


                  <Tooltip
                    formatter={(value) => [
                      `${value}%`,
                      "Confidence",
                    ]}
                  />


                  <Area
                    type="monotone"
                    dataKey="confidence"
                    stroke={
                      isFresh
                        ? "#65a30d"
                        : "#ef4444"
                    }
                    fill="url(#confidenceGradient)"
                    strokeWidth={3}
                  />

                </AreaChart>

              </ResponsiveContainer>

            </div>

          </motion.section>


          {/* =================================================
              MODEL DETAILS
          ================================================= */}

          <motion.section
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.45,
            }}
            className="rounded-[2rem] bg-green-950 p-7 text-white"
          >

            <p className="text-xs font-black uppercase tracking-[0.2em] text-lime-300">
              Model details
            </p>


            <h3 className="mt-3 text-2xl font-black">
              CNN Vision Engine
            </h3>


            <p className="mt-4 text-sm leading-7 text-green-100/60">
              The image is resized to 224 × 224 pixels
              and evaluated by the convolutional neural
              network trained to distinguish fresh and
              rotten fruit.
            </p>


            <div className="mt-8 space-y-4">

              <ModelDetail
                label="Input size"
                value="224 × 224"
              />

              <ModelDetail
                label="Architecture"
                value="CNN"
              />

              <ModelDetail
                label="Classification"
                value="Binary"
              />

              <ModelDetail
                label="Reported accuracy"
                value="97%"
              />

            </div>

          </motion.section>

        </div>


        {/* =================================================
            INTERPRETATION
        ================================================= */}

        <motion.section
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            delay: 0.55,
          }}
          className={`mt-8 rounded-[2rem] border p-7 ${
            isFresh
              ? "border-lime-200 bg-lime-50"
              : "border-red-200 bg-red-50"
          }`}
        >

          <div className="flex gap-4">

            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                isFresh
                  ? "bg-lime-200 text-lime-700"
                  : "bg-red-200 text-red-600"
              }`}
            >

              {isFresh ? (
                <CheckCircle2 size={23} />
              ) : (
                <XCircle size={23} />
              )}

            </div>


            <div>

              <h3
                className={`text-xl font-black ${
                  isFresh
                    ? "text-green-950"
                    : "text-red-950"
                }`}
              >

                {isFresh
                  ? "The fruit appears fresh."
                  : "The fruit appears rotten."}

              </h3>


              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">

                {isFresh
                  ? "Based on the visual patterns detected by the CNN, the uploaded fruit is classified as fresh."
                  : "Based on the visual patterns detected by the CNN, the uploaded fruit is classified as rotten."}

              </p>

            </div>

          </div>

        </motion.section>


        {/* =================================================
            FOOTER ACTION
        ================================================= */}

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm font-bold text-slate-400 transition hover:text-green-800"
          >

            <ArrowLeft size={16} />

            Back to home

          </button>


          <button
            onClick={() => navigate("/predict")}
            className="flex items-center gap-2 rounded-xl bg-green-950 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-green-950/10 transition hover:bg-green-800"
          >

            Analyze another fruit

            <RotateCcw size={16} />

          </button>

        </div>


        {/* =================================================
            DEBUG INFO
            Remove later if you don't want it.
        ================================================= */}

        {import.meta.env.DEV && (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4">

            <p className="mb-2 text-xs font-black uppercase tracking-widest text-slate-400">
              Development data
            </p>

            <pre className="overflow-auto text-xs text-slate-500">
              {JSON.stringify(
                {
                  id: predictionId,
                  prediction: rawPrediction,
                  confidence,
                  createdAt: analyzedAt,
                },
                null,
                2
              )}
            </pre>

          </div>
        )}

      </div>

    </main>
  );
};


// =====================================================
// STAT CARD
// =====================================================

const StatCard = ({
  icon,
  title,
  value,
  subtitle,
  delay,
  positive,
}) => {

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
        delay,
      }}
      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
    >

      <div className="flex items-center justify-between">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-50 text-lime-700">
          {icon}
        </div>

      </div>


      <p className="mt-5 text-xs font-black uppercase tracking-widest text-slate-400">
        {title}
      </p>


      <p
        className={`mt-1 text-2xl font-black ${
          positive === false
            ? "text-red-600"
            : "text-green-950"
        }`}
      >
        {value}
      </p>


      <p className="mt-1 text-xs text-slate-400">
        {subtitle}
      </p>

    </motion.div>
  );
};


// =====================================================
// MODEL DETAIL
// =====================================================

const ModelDetail = ({
  label,
  value,
}) => {

  return (
    <div className="flex items-center justify-between border-b border-white/10 pb-3">

      <span className="text-sm text-green-100/50">
        {label}
      </span>

      <span className="text-sm font-black text-lime-300">
        {value}
      </span>

    </div>
  );
};


export default Analysis;