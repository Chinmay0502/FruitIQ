import { motion } from "motion/react";
import { Apple, BrainCircuit } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-24 bg-green-950 px-6 py-14 text-white">
      <div className="mx-auto max-w-7xl">

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="flex flex-col justify-between gap-8 md:flex-row"
        >

          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-400 text-green-950">
                <Apple size={20} />
              </div>

              <span className="text-xl font-black">
                FRUITIQ
              </span>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-6 text-green-100/60">
              AI-powered fruit freshness detection using a
              convolutional neural network.
            </p>
          </div>


          <div className="flex items-center gap-3 text-green-100/70">
            <BrainCircuit size={18} />
            <span className="text-sm">
              Powered by CNN • 97% Accuracy
            </span>
          </div>

        </motion.div>


        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-green-100/40">
          © 2026 FRUITIQ. AI Freshness Intelligence.
        </div>

      </div>
    </footer>
  );
};

export default Footer;