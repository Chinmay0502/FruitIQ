import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowRight,
  BrainCircuit,
  Camera,
  CheckCircle2,
  CircleDot,
  ScanLine,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    value: "97%",
    label: "Model Accuracy",
    description: "CNN validation accuracy",
    icon: ShieldCheck,
  },
  {
    value: "3",
    label: "Supported Fruits",
    description: "Apple, banana & orange",
    icon: CircleDot,
  },
  {
    value: "224×224",
    label: "Vision Input",
    description: "Image resolution analyzed",
    icon: Camera,
  },
  {
    value: "< 1s",
    label: "Prediction Time",
    description: "Fast AI classification",
    icon: TrendingUp,
  },
];

const Home = () => {
  return (
    <main className="overflow-hidden pt-20">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative min-h-[calc(100vh-80px)]">

        {/* Background glow */}

        <div className="pointer-events-none absolute inset-0">

          <motion.div
            animate={{
              x: [0, 40, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-[5%] top-[15%] h-72 w-72 rounded-full bg-lime-300/20 blur-3xl"
          />

          <motion.div
            animate={{
              x: [0, -50, 0],
              y: [0, 40, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute right-[5%] top-[20%] h-96 w-96 rounded-full bg-orange-300/20 blur-3xl"
          />

        </div>


        <div className="relative mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-2">

          {/* =================================================
              LEFT
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
          >

            {/* Badge */}

            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.2,
              }}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-lime-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur"
            >

              <span className="relative flex h-2.5 w-2.5">

                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-75" />

                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-lime-500" />

              </span>

              <span className="text-xs font-bold uppercase tracking-[0.18em] text-green-900">
                CNN Powered Vision
              </span>

            </motion.div>


            {/* Heading */}

            <h1 className="max-w-3xl text-6xl font-black leading-[0.95] tracking-[-0.05em] text-green-950 sm:text-7xl lg:text-8xl">

              Know your fruit.

              <br />

              <span className="relative inline-block">

                <span className="relative z-10 text-lime-600">
                  Before you bite.
                </span>

                <motion.span
                  initial={{
                    width: 0,
                  }}
                  animate={{
                    width: "100%",
                  }}
                  transition={{
                    delay: 1,
                    duration: 0.8,
                  }}
                  className="absolute bottom-1 left-0 z-0 h-3 rounded-full bg-lime-200"
                />

              </span>

            </h1>


            {/* Description */}

            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.45,
              }}
              className="mt-8 max-w-xl text-lg leading-8 text-slate-600"
            >
              FRUITIQ uses a convolutional neural network to
              analyze fruit images and identify whether your
              fruit is fresh or rotten — in seconds.
            </motion.p>


            {/* =================================================
                SUPPORTED FRUITS
            ================================================= */}

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
                delay: 0.52,
              }}
              className="mt-6"
            >

              <div className="mb-3 flex items-center gap-2">

                <span className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                  Supported fruits
                </span>

                <span className="h-px w-8 bg-slate-200" />

              </div>


              <div className="flex flex-wrap gap-3">

                {/* Apple */}

                <motion.div
                  whileHover={{
                    y: -3,
                    scale: 1.03,
                  }}
                  className="flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-bold text-red-800 shadow-sm"
                >

                  <span className="text-lg">
                    🍎
                  </span>

                  Apple

                </motion.div>


                {/* Banana */}

                <motion.div
                  whileHover={{
                    y: -3,
                    scale: 1.03,
                  }}
                  className="flex items-center gap-2 rounded-full border border-yellow-200 bg-yellow-50 px-4 py-2 text-sm font-bold text-yellow-800 shadow-sm"
                >

                  <span className="text-lg">
                    🍌
                  </span>

                  Banana

                </motion.div>


                {/* Orange */}

                <motion.div
                  whileHover={{
                    y: -3,
                    scale: 1.03,
                  }}
                  className="flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-bold text-orange-800 shadow-sm"
                >

                  <span className="text-lg">
                    🍊
                  </span>

                  Orange

                </motion.div>

              </div>


              <p className="mt-3 text-sm text-slate-400">
                Fresh or Rotten detection powered by CNN
              </p>

            </motion.div>


            {/* Buttons */}

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
                delay: 0.65,
              }}
              className="mt-9 flex flex-wrap gap-4"
            >

              <Link
                to="/predict"
                className="group flex items-center gap-3 rounded-2xl bg-green-950 px-6 py-4 font-bold text-white shadow-xl shadow-green-950/20 transition hover:-translate-y-1 hover:bg-green-800"
              >

                Analyze My Fruit

                <ArrowRight
                  size={19}
                  className="transition-transform group-hover:translate-x-1"
                />

              </Link>


              <a
                href="#technology"
                className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/70 px-6 py-4 font-bold text-slate-700 backdrop-blur transition hover:border-lime-300 hover:bg-white"
              >

                <BrainCircuit size={19} />

                How it works

              </a>

            </motion.div>


            {/* Accuracy */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.9,
              }}
              className="mt-10 flex items-center gap-4"
            >

              <div className="flex -space-x-2">

                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-lime-200">
                  🍎
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-yellow-100">
                  🍌
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-orange-100">
                  🍊
                </div>

              </div>


              <div>

                <div className="flex items-center gap-1">

                  <span className="font-black text-green-950">
                    97%
                  </span>

                  <span className="text-sm text-slate-500">
                    accuracy
                  </span>

                </div>

                <p className="text-xs text-slate-400">
                  CNN validation performance
                </p>

              </div>

            </motion.div>

          </motion.div>


          {/* =================================================
              AI VISUAL
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.9,
              delay: 0.2,
            }}
            className="relative mx-auto w-full max-w-xl"
          >

            {/* Main card */}

            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/75 p-5 shadow-2xl shadow-green-950/10 backdrop-blur-xl"
            >

              {/* Image-like visual */}

              <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-[2rem] bg-gradient-to-br from-lime-100 via-green-50 to-orange-50">

                {/* Decorative circles */}

                <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-lime-300/30 blur-2xl" />

                <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-orange-300/30 blur-2xl" />


                {/* Fruit */}

                <motion.div
                  animate={{
                    rotate: [-3, 3, -3],
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative z-10 text-[13rem] drop-shadow-2xl"
                >
                  🍎
                </motion.div>


                {/* Scanner */}

                <motion.div
                  animate={{
                    top: ["18%", "75%", "18%"],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute left-[10%] right-[10%] z-20"
                >

                  <div className="h-[2px] bg-lime-400 shadow-[0_0_20px_rgba(163,230,53,0.9)]" />

                  <div className="absolute -top-2 left-0 h-5 w-5 border-l-2 border-t-2 border-lime-500" />

                  <div className="absolute -top-2 right-0 h-5 w-5 border-r-2 border-t-2 border-lime-500" />

                </motion.div>


                {/* Scan corners */}

                <div className="absolute left-8 top-8 h-10 w-10 border-l-2 border-t-2 border-green-700/50" />

                <div className="absolute right-8 top-8 h-10 w-10 border-r-2 border-t-2 border-green-700/50" />

                <div className="absolute bottom-8 left-8 h-10 w-10 border-b-2 border-l-2 border-green-700/50" />

                <div className="absolute bottom-8 right-8 h-10 w-10 border-b-2 border-r-2 border-green-700/50" />


                {/* Scanning label */}

                <div className="absolute left-1/2 top-7 flex -translate-x-1/2 items-center gap-2 rounded-full bg-green-950/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-lime-300 backdrop-blur">

                  <ScanLine size={12} />

                  AI scanning

                </div>

              </div>


              {/* Result */}

              <div className="mt-4 flex items-center justify-between rounded-2xl bg-green-950 p-5 text-white">

                <div>

                  <p className="text-xs font-bold uppercase tracking-widest text-lime-300">
                    AI prediction
                  </p>

                  <p className="mt-1 text-2xl font-black">
                    Fresh Apple
                  </p>

                </div>


                <div className="text-right">

                  <p className="text-3xl font-black text-lime-300">
                    97.4%
                  </p>

                  <p className="text-xs text-white/50">
                    confidence
                  </p>

                </div>

              </div>

            </motion.div>


            {/* Floating accuracy card */}

            <motion.div
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: 1,
              }}
              className="absolute -left-8 top-16 hidden rounded-2xl border border-white bg-white/90 p-4 shadow-xl backdrop-blur md:block"
            >

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-100 text-lime-700">
                  <CheckCircle2 size={20} />
                </div>

                <div>

                  <p className="text-xs font-bold text-slate-400">
                    STATUS
                  </p>

                  <p className="font-black text-green-950">
                    Fresh detected
                  </p>

                </div>

              </div>

            </motion.div>


            {/* Floating CNN card */}

            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
              className="absolute -right-8 bottom-24 hidden rounded-2xl border border-white bg-white/90 p-4 shadow-xl backdrop-blur md:block"
            >

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                  <Sparkles size={19} />
                </div>

                <div>

                  <p className="text-xs font-bold text-slate-400">
                    MODEL
                  </p>

                  <p className="font-black text-green-950">
                    CNN Vision
                  </p>

                </div>

              </div>

            </motion.div>

          </motion.div>

        </div>

      </section>


      {/* =====================================================
          STATS
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-16">

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >

          {stats.map((stat, index) => {

            const Icon = stat.icon;

            return (

              <motion.div
                key={stat.label}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -6,
                }}
                className="group rounded-3xl border border-slate-200/70 bg-white/70 p-6 shadow-sm backdrop-blur transition-shadow hover:shadow-xl hover:shadow-green-950/5"
              >

                <div className="flex items-center justify-between">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-700 transition group-hover:bg-lime-100">
                    <Icon size={20} />
                  </div>

                  <span className="text-xs font-bold text-slate-300">
                    0{index + 1}
                  </span>

                </div>

                <p className="mt-6 text-3xl font-black tracking-tight text-green-950">
                  {stat.value}
                </p>

                <p className="mt-1 font-bold text-slate-700">
                  {stat.label}
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  {stat.description}
                </p>

              </motion.div>

            );

          })}

        </motion.div>

      </section>


      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}

      <section
        id="technology"
        className="bg-green-950 px-6 py-24 text-white"
      >

        <div className="mx-auto max-w-7xl">

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
          >

            <p className="text-sm font-bold uppercase tracking-[0.25em] text-lime-400">
              The intelligence
            </p>

            <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-6xl">
              From a simple photo
              <br />
              to an AI decision.
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-green-100/60">
              Our computer vision pipeline transforms an uploaded
              fruit image into a freshness classification using a
              convolutional neural network.
            </p>

          </motion.div>


          <div className="mt-16 grid gap-5 md:grid-cols-3">

            {[
              {
                number: "01",
                title: "Capture",
                text: "Upload a clear image of an apple, banana, or orange you want to analyze.",
                icon: Camera,
              },
              {
                number: "02",
                title: "Analyze",
                text: "The CNN processes visual features from the 224×224 image.",
                icon: BrainCircuit,
              },
              {
                number: "03",
                title: "Decide",
                text: "FRUITIQ returns a Fresh or Rotten classification with confidence.",
                icon: CheckCircle2,
              },
            ].map((item, index) => {

              const Icon = item.icon;

              return (

                <motion.div
                  key={item.number}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: index * 0.12,
                  }}
                  whileHover={{
                    y: -8,
                  }}
                  className="group rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition hover:border-lime-400/30 hover:bg-white/[0.07]"
                >

                  <div className="flex items-center justify-between">

                    <span className="text-sm font-black text-lime-400">
                      {item.number}
                    </span>

                    <Icon
                      size={23}
                      className="text-green-100/40 transition group-hover:text-lime-400"
                    />

                  </div>

                  <h3 className="mt-12 text-2xl font-black">
                    {item.title}
                  </h3>

                  <p className="mt-3 leading-7 text-green-100/50">
                    {item.text}
                  </p>

                </motion.div>

              );

            })}

          </div>

        </div>

      </section>


      {/* =====================================================
          MODEL SECTION
      ===================================================== */}

      <section className="px-6 py-24">

        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">

          <motion.div
            initial={{
              opacity: 0,
              x: -30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
          >

            <p className="text-sm font-bold uppercase tracking-[0.25em] text-lime-600">
              Built with computer vision
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-tight text-green-950 sm:text-5xl">
              Small image.
              <br />
              Serious analysis.
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-500">
              The model learns visual patterns associated with
              fresh and rotten fruit through convolutional
              layers, pooling, and dense classification.
            </p>


            <div className="mt-8 space-y-4">

              {[
                "224 × 224 RGB image input",
                "Three convolutional feature extraction blocks",
                "Deep visual feature representation",
                "Binary Fresh / Rotten classification",
              ].map((text) => (

                <div
                  key={text}
                  className="flex items-center gap-3"
                >

                  <CheckCircle2
                    size={19}
                    className="shrink-0 text-lime-600"
                  />

                  <span className="font-medium text-slate-700">
                    {text}
                  </span>

                </div>

              ))}

            </div>

          </motion.div>


          {/* Neural network visual */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            className="relative overflow-hidden rounded-[2rem] bg-slate-950 p-8"
          >

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(163,230,53,0.12),transparent_60%)]" />

            <div className="relative">

              <div className="mb-8 flex items-center justify-between">

                <span className="text-xs font-bold uppercase tracking-widest text-lime-400">
                  CNN Architecture
                </span>

                <span className="rounded-full bg-white/5 px-3 py-1 text-[10px] text-white/40">
                  LIVE MODEL
                </span>

              </div>


              <div className="space-y-5">

                {[
                  ["INPUT", "224 × 224 × 3"],
                  ["CONV", "32 filters"],
                  ["CONV", "64 filters"],
                  ["CONV", "128 filters"],
                  ["DENSE", "128 neurons"],
                  ["OUTPUT", "Fresh / Rotten"],
                ].map(([layer, value], index) => (

                  <motion.div
                    key={layer + value}
                    initial={{
                      opacity: 0,
                      x: 20,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay: index * 0.1,
                    }}
                    className="flex items-center gap-4"
                  >

                    <div className="h-3 w-3 rounded-full bg-lime-400 shadow-[0_0_15px_rgba(163,230,53,0.8)]" />

                    <div className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">

                      <div className="flex justify-between">

                        <span className="text-xs font-black text-white">
                          {layer}
                        </span>

                        <span className="text-xs text-white/40">
                          {value}
                        </span>

                      </div>

                    </div>

                  </motion.div>

                ))}

              </div>

            </div>

          </motion.div>

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="px-6 pb-24">

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.96,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: true,
          }}
          className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-lime-400 p-8 sm:p-12 lg:p-16"
        >

          <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">

            <div>

              <p className="text-sm font-black uppercase tracking-[0.2em] text-green-950/50">
                Ready to inspect?
              </p>

              <h2 className="mt-3 max-w-2xl text-4xl font-black tracking-tight text-green-950 sm:text-5xl">
                Give your fruit a second opinion.
              </h2>

            </div>


            <Link
              to="/predict"
              className="group flex shrink-0 items-center gap-3 rounded-2xl bg-green-950 px-7 py-4 font-bold text-white transition hover:-translate-y-1 hover:bg-green-800"
            >

              Start Prediction

              <ArrowRight
                size={19}
                className="transition-transform group-hover:translate-x-1"
              />

            </Link>

          </div>

        </motion.div>

      </section>

    </main>
  );
};

export default Home;