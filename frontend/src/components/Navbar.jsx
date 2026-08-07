import { Link, NavLink } from "react-router-dom";
import { motion } from "motion/react";
import { Apple, ArrowUpRight } from "lucide-react";

const Navbar = () => {
  return (
    <motion.header
      initial={{
        y: -30,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.6,
      }}
      className="fixed left-0 right-0 top-0 z-50 px-4 pt-4"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/60 bg-white/75 px-5 py-3 shadow-lg shadow-black/5 backdrop-blur-xl">
        
        <Link
          to="/"
          className="flex items-center gap-2"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-400 text-green-950 shadow-lg shadow-lime-200">
            <Apple size={20} />
          </div>

          <div>
            <p className="text-lg font-black tracking-tight text-green-950">
              FRUITIQ
            </p>

            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-green-700">
              AI Freshness
            </p>
          </div>
        </Link>


        <div className="hidden items-center gap-8 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-semibold transition ${
                isActive
                  ? "text-green-800"
                  : "text-slate-500 hover:text-green-800"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/predict"
            className={({ isActive }) =>
              `text-sm font-semibold transition ${
                isActive
                  ? "text-green-800"
                  : "text-slate-500 hover:text-green-800"
              }`
            }
          >
            Predict
          </NavLink>

          <NavLink
            to="/history"
            className={({ isActive }) =>
              `text-sm font-semibold transition ${
                isActive
                  ? "text-green-800"
                  : "text-slate-500 hover:text-green-800"
              }`
            }
          >
            Analytics
          </NavLink>
        </div>


        <Link
          to="/predict"
          className="group flex items-center gap-2 rounded-xl bg-green-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-green-800"
        >
          Analyze
          <ArrowUpRight
            size={16}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>

      </nav>
    </motion.header>
  );
};

export default Navbar;