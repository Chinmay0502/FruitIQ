import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    AreaChart,
    Area
} from "recharts";

import {
    getAllPredictions,
    getAnalytics,
    getPredictionImageUrl
} from "../services/api";


// ======================================================
// ANIMATION VARIANTS
// ======================================================

const containerVariants = {
    hidden: {
        opacity: 0
    },

    visible: {
        opacity: 1,

        transition: {
            staggerChildren: 0.08
        }
    }
};


const itemVariants = {
    hidden: {
        opacity: 0,
        y: 25
    },

    visible: {
        opacity: 1,
        y: 0,

        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};


// ======================================================
// COLORS
// ======================================================

const COLORS = {
    fresh: "#22c55e",
    rotten: "#ef4444",
    purple: "#8b5cf6",
    cyan: "#06b6d4",
    yellow: "#f59e0b",
    blue: "#3b82f6"
};


// ======================================================
// CUSTOM TOOLTIP
// ======================================================

const ChartTooltip = ({ active, payload, label }) => {

    if (!active || !payload || !payload.length) {
        return null;
    }

    return (
        <div className="rounded-2xl border border-white/10 bg-slate-950/95 px-4 py-3 shadow-2xl backdrop-blur-xl">

            {label && (
                <p className="mb-2 text-xs font-medium text-slate-400">
                    {label}
                </p>
            )}

            {payload.map((entry, index) => (
                <div
                    key={index}
                    className="flex items-center gap-2 text-sm"
                >

                    <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{
                            backgroundColor: entry.color
                        }}
                    />

                    <span className="text-slate-300">
                        {entry.name}:
                    </span>

                    <span className="font-semibold text-white">
                        {entry.value}
                    </span>

                </div>
            ))}

        </div>
    );
};


// ======================================================
// STAT CARD
// ======================================================

const StatCard = ({
    title,
    value,
    subtitle,
    icon,
    gradient
}) => {

    return (
        <motion.div
            variants={itemVariants}
            whileHover={{
                y: -6,
                scale: 1.015
            }}
            transition={{
                duration: 0.2
            }}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] p-6 shadow-xl backdrop-blur-xl"
        >

            <div
                className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${gradient} opacity-20 blur-3xl transition-opacity duration-300 group-hover:opacity-40`}
            />

            <div className="relative">

                <div className="mb-5 flex items-center justify-between">

                    <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-xl shadow-lg`}
                    >
                        {icon}
                    </div>

                    <span className="text-xs font-medium uppercase tracking-widest text-slate-500">
                        Live
                    </span>

                </div>

                <p className="text-sm font-medium text-slate-400">
                    {title}
                </p>

                <h3 className="mt-2 text-3xl font-bold tracking-tight text-white">
                    {value}
                </h3>

                <p className="mt-2 text-xs text-slate-500">
                    {subtitle}
                </p>

            </div>

        </motion.div>
    );
};


// ======================================================
// HISTORY PAGE
// ======================================================

const History = () => {

    const [predictions, setPredictions] = useState([]);
    const [analytics, setAnalytics] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");
    const [confidenceFilter, setConfidenceFilter] = useState("All");


    // ==================================================
    // FETCH DASHBOARD DATA
    // ==================================================

    const fetchDashboard = async () => {

        try {

            setLoading(true);
            setError("");

            const [
                predictionsResponse,
                analyticsResponse
            ] = await Promise.all([
                getAllPredictions(),
                getAnalytics()
            ]);


            if (predictionsResponse?.success) {

                setPredictions(
                    predictionsResponse.data || []
                );

            }


            if (analyticsResponse?.success) {

                setAnalytics(
                    analyticsResponse.data
                );

            }

        } catch (err) {

            console.error(
                "Dashboard error:",
                err
            );

            setError(
                "Unable to load prediction analytics."
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        fetchDashboard();

    }, []);


    // ==================================================
    // FILTER PREDICTIONS
    // ==================================================

    const filteredPredictions = useMemo(() => {

        return predictions.filter((item) => {

            const prediction =
                String(
                    item.prediction || ""
                );


            const matchesSearch =
                prediction
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    );


            const matchesPrediction =
                filter === "All" ||
                prediction === filter;


            const confidence =
                Number(
                    item.confidence || 0
                );


            let matchesConfidence = true;


            if (confidenceFilter === "High") {

                matchesConfidence =
                    confidence >= 90;

            }


            if (confidenceFilter === "Medium") {

                matchesConfidence =
                    confidence >= 70 &&
                    confidence < 90;

            }


            if (confidenceFilter === "Low") {

                matchesConfidence =
                    confidence < 70;

            }


            return (
                matchesSearch &&
                matchesPrediction &&
                matchesConfidence
            );

        });

    }, [
        predictions,
        search,
        filter,
        confidenceFilter
    ]);


    // ==================================================
    // CHART DATA
    // ==================================================

    const pieData = analytics
        ? [
            {
                name: "Fresh",
                value: analytics.fresh || 0
            },
            {
                name: "Rotten",
                value: analytics.rotten || 0
            }
        ]
        : [];


    const confidenceData =
        analytics?.confidenceDistribution || [];


    const dailyData =
        analytics?.dailyAnalytics || [];


    // ==================================================
    // FORMAT DATE
    // ==================================================

    const formatDate = (date) => {

        if (!date) {
            return "Unknown";
        }

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    };


    const formatTime = (date) => {

        if (!date) {
            return "";
        }

        return new Date(date).toLocaleTimeString(
            "en-IN",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );

    };


    // ==================================================
    // LOADING SCREEN
    // ==================================================

    if (loading) {

        return (

            <div className="min-h-screen bg-[#050816] px-6 pb-10 pt-28 text-white sm:pt-32">

                <div className="mx-auto max-w-7xl">

                    <div className="animate-pulse">

                        <div className="h-10 w-72 rounded-xl bg-white/10" />

                        <div className="mt-3 h-5 w-96 rounded-lg bg-white/5" />


                        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

                            {[1, 2, 3, 4].map(
                                (item) => (

                                    <div
                                        key={item}
                                        className="h-40 rounded-3xl bg-white/5"
                                    />

                                )
                            )}

                        </div>


                        <div className="mt-6 grid gap-6 lg:grid-cols-2">

                            <div className="h-96 rounded-3xl bg-white/5" />

                            <div className="h-96 rounded-3xl bg-white/5" />

                        </div>

                    </div>

                </div>

            </div>

        );

    }


    // ==================================================
    // ERROR SCREEN
    // ==================================================

    if (error) {

        return (

            <div className="flex min-h-screen items-center justify-center bg-[#050816] px-6 py-20">

                <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-10 text-center">

                    <div className="text-5xl">
                        ⚠️
                    </div>

                    <h2 className="mt-4 text-xl font-bold text-white">
                        Analytics unavailable
                    </h2>

                    <p className="mt-2 text-sm text-slate-400">
                        {error}
                    </p>

                    <button
                        onClick={fetchDashboard}
                        className="mt-6 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-105"
                    >
                        Try Again
                    </button>

                </div>

            </div>

        );

    }


    // ==================================================
    // MAIN UI
    // ==================================================

    return (

        <div className="min-h-screen overflow-hidden bg-[#050816] pb-10 text-white">

            {/* ==========================================
                BACKGROUND
            ========================================== */}

            <div className="pointer-events-none fixed inset-0 overflow-hidden">

                <div className="absolute left-[10%] top-[10%] h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px]" />

                <div className="absolute right-[10%] top-[25%] h-96 w-96 rounded-full bg-violet-500/10 blur-[120px]" />

                <div className="absolute bottom-[5%] left-[35%] h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />

            </div>


            {/* ==========================================
                CONTENT
            ========================================== */}

            <motion.main
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative mx-auto max-w-7xl px-5 pb-10 pt-28 sm:px-8 sm:pt-32 lg:px-10 lg:pt-32"
            >

                {/* ======================================
                    HEADER
                ====================================== */}

                <motion.div
                    variants={itemVariants}
                    className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end"
                >

                    <div>

                        <div className="mb-3 flex items-center gap-2">

                            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

                            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
                                Live Intelligence
                            </span>

                        </div>

                        <h1 className="text-4xl font-black tracking-tight sm:text-5xl">

                            Prediction
                            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
                                {" "}Analytics
                            </span>

                        </h1>

                        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                            Explore every CNN prediction, confidence
                            score and freshness trend stored in your
                            prediction database.
                        </p>

                    </div>


                    <button
                        onClick={fetchDashboard}
                        className="w-fit rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-emerald-400/30 hover:bg-emerald-400/10"
                    >
                        ↻ Refresh Data
                    </button>

                </motion.div>


                {/* ======================================
                    STAT CARDS
                ====================================== */}

                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

                    <StatCard
                        title="Total Predictions"
                        value={analytics?.total || 0}
                        subtitle="Images analyzed"
                        icon="🧠"
                        gradient="from-violet-500 to-purple-600"
                    />

                    <StatCard
                        title="Fresh Fruits"
                        value={analytics?.fresh || 0}
                        subtitle={`${analytics?.freshPercentage || 0}% of all predictions`}
                        icon="🍏"
                        gradient="from-emerald-400 to-green-600"
                    />

                    <StatCard
                        title="Rotten Fruits"
                        value={analytics?.rotten || 0}
                        subtitle={`${analytics?.rottenPercentage || 0}% of all predictions`}
                        icon="🍎"
                        gradient="from-red-400 to-rose-600"
                    />

                    <StatCard
                        title="Average Confidence"
                        value={`${analytics?.averageConfidence || 0}%`}
                        subtitle="CNN prediction confidence"
                        icon="🎯"
                        gradient="from-cyan-400 to-blue-600"
                    />

                </div>


                {/* ======================================
                    CHART GRID
                ====================================== */}

                <div className="mt-6 grid gap-6 lg:grid-cols-2">

                    {/* FRESH VS ROTTEN */}

                    <motion.section
                        variants={itemVariants}
                        className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl"
                    >

                        <div className="mb-5">

                            <h2 className="text-lg font-bold">
                                Fresh vs Rotten
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Overall classification distribution
                            </p>

                        </div>


                        <div className="h-[320px]">

                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >

                                <PieChart>

                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={80}
                                        outerRadius={115}
                                        paddingAngle={5}
                                        dataKey="value"
                                        stroke="none"
                                    >

                                        <Cell
                                            fill={COLORS.fresh}
                                        />

                                        <Cell
                                            fill={COLORS.rotten}
                                        />

                                    </Pie>

                                    <Tooltip
                                        content={<ChartTooltip />}
                                    />

                                    <Legend
                                        verticalAlign="bottom"
                                        height={36}
                                        formatter={(value) => (
                                            <span className="text-slate-300">
                                                {value}
                                            </span>
                                        )}
                                    />

                                </PieChart>

                            </ResponsiveContainer>

                        </div>

                    </motion.section>


                    {/* CONFIDENCE DISTRIBUTION */}

                    <motion.section
                        variants={itemVariants}
                        className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl"
                    >

                        <div className="mb-5">

                            <h2 className="text-lg font-bold">
                                Confidence Distribution
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                How confident the CNN has been
                            </p>

                        </div>


                        <div className="h-[320px]">

                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >

                                <BarChart
                                    data={confidenceData}
                                    margin={{
                                        top: 10,
                                        right: 10,
                                        left: -15,
                                        bottom: 5
                                    }}
                                >

                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke="rgba(255,255,255,0.06)"
                                    />

                                    <XAxis
                                        dataKey="range"
                                        tick={{
                                            fill: "#64748b",
                                            fontSize: 11
                                        }}
                                        axisLine={false}
                                        tickLine={false}
                                    />

                                    <YAxis
                                        allowDecimals={false}
                                        tick={{
                                            fill: "#64748b",
                                            fontSize: 11
                                        }}
                                        axisLine={false}
                                        tickLine={false}
                                    />

                                    <Tooltip
                                        content={<ChartTooltip />}
                                    />

                                    <Bar
                                        dataKey="count"
                                        name="Predictions"
                                        fill={COLORS.purple}
                                        radius={[
                                            8,
                                            8,
                                            0,
                                            0
                                        ]}
                                    />

                                </BarChart>

                            </ResponsiveContainer>

                        </div>

                    </motion.section>

                </div>


                {/* ======================================
                    PREDICTION ACTIVITY
                ====================================== */}

                <motion.section
                    variants={itemVariants}
                    className="mt-6 rounded-3xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl"
                >

                    <div className="mb-6">

                        <h2 className="text-lg font-bold">
                            Prediction Activity
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Fresh, rotten and total predictions over time
                        </p>

                    </div>


                    <div className="h-[350px]">

                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >

                            <AreaChart
                                data={dailyData}
                                margin={{
                                    top: 10,
                                    right: 10,
                                    left: -10,
                                    bottom: 5
                                }}
                            >

                                <defs>

                                    <linearGradient
                                        id="freshGradient"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >

                                        <stop
                                            offset="5%"
                                            stopColor={COLORS.fresh}
                                            stopOpacity={0.35}
                                        />

                                        <stop
                                            offset="95%"
                                            stopColor={COLORS.fresh}
                                            stopOpacity={0}
                                        />

                                    </linearGradient>


                                    <linearGradient
                                        id="rottenGradient"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >

                                        <stop
                                            offset="5%"
                                            stopColor={COLORS.rotten}
                                            stopOpacity={0.35}
                                        />

                                        <stop
                                            offset="95%"
                                            stopColor={COLORS.rotten}
                                            stopOpacity={0}
                                        />

                                    </linearGradient>

                                </defs>


                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="rgba(255,255,255,0.06)"
                                />

                                <XAxis
                                    dataKey="date"
                                    tick={{
                                        fill: "#64748b",
                                        fontSize: 11
                                    }}
                                    axisLine={false}
                                    tickLine={false}
                                />

                                <YAxis
                                    allowDecimals={false}
                                    tick={{
                                        fill: "#64748b",
                                        fontSize: 11
                                    }}
                                    axisLine={false}
                                    tickLine={false}
                                />

                                <Tooltip
                                    content={<ChartTooltip />}
                                />

                                <Legend
                                    formatter={(value) => (
                                        <span className="text-slate-300">
                                            {value}
                                        </span>
                                    )}
                                />


                                <Area
                                    type="monotone"
                                    dataKey="fresh"
                                    name="Fresh"
                                    stroke={COLORS.fresh}
                                    strokeWidth={3}
                                    fill="url(#freshGradient)"
                                />


                                <Area
                                    type="monotone"
                                    dataKey="rotten"
                                    name="Rotten"
                                    stroke={COLORS.rotten}
                                    strokeWidth={3}
                                    fill="url(#rottenGradient)"
                                />

                            </AreaChart>

                        </ResponsiveContainer>

                    </div>

                </motion.section>


                {/* ======================================
                    PREDICTION HISTORY
                ====================================== */}

                <motion.section
                    variants={itemVariants}
                    className="mt-6 rounded-3xl border border-white/10 bg-white/[0.045] backdrop-blur-xl"
                >

                    <div className="border-b border-white/10 p-6">

                        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">

                            <div>

                                <h2 className="text-lg font-bold">
                                    Prediction History
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Every image analyzed by your CNN model
                                </p>

                            </div>


                            <div className="flex flex-col gap-3 sm:flex-row">

                                <div className="relative">

                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                                        ⌕
                                    </span>

                                    <input
                                        type="text"
                                        placeholder="Search predictions..."
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-xl border border-white/10 bg-black/20 py-2.5 pl-9 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-emerald-400/40 sm:w-52"
                                    />

                                </div>


                                <select
                                    value={filter}
                                    onChange={(e) =>
                                        setFilter(
                                            e.target.value
                                        )
                                    }
                                    className="rounded-xl border border-white/10 bg-slate-900 px-4 py-2.5 text-sm text-slate-300 outline-none focus:border-emerald-400/40"
                                >

                                    <option value="All">
                                        All Results
                                    </option>

                                    <option value="Fresh">
                                        Fresh
                                    </option>

                                    <option value="Rotten">
                                        Rotten
                                    </option>

                                </select>


                                <select
                                    value={confidenceFilter}
                                    onChange={(e) =>
                                        setConfidenceFilter(
                                            e.target.value
                                        )
                                    }
                                    className="rounded-xl border border-white/10 bg-slate-900 px-4 py-2.5 text-sm text-slate-300 outline-none focus:border-cyan-400/40"
                                >

                                    <option value="All">
                                        All Confidence
                                    </option>

                                    <option value="High">
                                        High · 90%+
                                    </option>

                                    <option value="Medium">
                                        Medium · 70–89%
                                    </option>

                                    <option value="Low">
                                        Low · &lt;70%
                                    </option>

                                </select>

                            </div>

                        </div>

                    </div>


                    <div className="overflow-x-auto">

                        <table className="w-full min-w-[750px]">

                            <thead>

                                <tr className="border-b border-white/10 text-left">

                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Image
                                    </th>

                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Result
                                    </th>

                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Confidence
                                    </th>

                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Date
                                    </th>

                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Time
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {filteredPredictions.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="5"
                                            className="px-6 py-16 text-center"
                                        >

                                            <div className="text-4xl">
                                                🔍
                                            </div>

                                            <p className="mt-3 font-medium text-slate-300">
                                                No predictions found
                                            </p>

                                            <p className="mt-1 text-sm text-slate-600">
                                                Try changing your filters.
                                            </p>

                                        </td>

                                    </tr>

                                ) : (

                                    filteredPredictions.map(
                                        (item, index) => {

                                            const isFresh =
                                                String(
                                                    item.prediction
                                                ).toLowerCase() ===
                                                "fresh";


                                            const confidence =
                                                Number(
                                                    item.confidence ||
                                                    0
                                                );


                                            return (

                                                <motion.tr
                                                    key={
                                                        item.id ||
                                                        item._id
                                                    }
                                                    initial={{
                                                        opacity: 0,
                                                        y: 10
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0
                                                    }}
                                                    transition={{
                                                        delay:
                                                            index *
                                                            0.03
                                                    }}
                                                    className="border-b border-white/[0.06] transition hover:bg-white/[0.025]"
                                                >

                                                    <td className="px-6 py-4">

                                                        <div className="flex items-center gap-4">

                                                            <div className="h-14 w-14 overflow-hidden rounded-2xl border border-white/10 bg-slate-900">

                                                                <img
                                                                    src={
                                                                        getPredictionImageUrl(
                                                                            item.id ||
                                                                            item._id
                                                                        )
                                                                    }
                                                                    alt={
                                                                        item.prediction
                                                                    }
                                                                    className="h-full w-full object-cover transition duration-500 hover:scale-110"
                                                                    onError={(
                                                                        e
                                                                    ) => {
                                                                        e.currentTarget.style.display =
                                                                            "none";
                                                                    }}
                                                                />

                                                            </div>


                                                            <div>

                                                                <p className="text-sm font-semibold text-white">
                                                                    {item.originalName ||
                                                                        "Fruit image"}
                                                                </p>

                                                                <p className="mt-1 text-xs text-slate-600">
                                                                    #
                                                                    {String(
                                                                        item.id ||
                                                                        item._id
                                                                    ).slice(
                                                                        -8
                                                                    )}
                                                                </p>

                                                            </div>

                                                        </div>

                                                    </td>


                                                    <td className="px-6 py-4">

                                                        <span
                                                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${
                                                                isFresh
                                                                    ? "bg-emerald-400/10 text-emerald-400 ring-1 ring-emerald-400/20"
                                                                    : "bg-red-400/10 text-red-400 ring-1 ring-red-400/20"
                                                            }`}
                                                        >

                                                            <span
                                                                className={`h-1.5 w-1.5 rounded-full ${
                                                                    isFresh
                                                                        ? "bg-emerald-400"
                                                                        : "bg-red-400"
                                                                }`}
                                                            />

                                                            {isFresh
                                                                ? "Fresh"
                                                                : "Rotten"}

                                                        </span>

                                                    </td>


                                                    <td className="px-6 py-4">

                                                        <div className="w-40">

                                                            <div className="mb-2 flex items-center justify-between">

                                                                <span className="text-sm font-bold text-white">
                                                                    {confidence.toFixed(
                                                                        1
                                                                    )}
                                                                    %
                                                                </span>

                                                                <span className="text-[10px] uppercase tracking-wider text-slate-600">
                                                                    confidence
                                                                </span>

                                                            </div>


                                                            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">

                                                                <motion.div
                                                                    initial={{
                                                                        width: 0
                                                                    }}
                                                                    animate={{
                                                                        width: `${Math.min(
                                                                            confidence,
                                                                            100
                                                                        )}%`
                                                                    }}
                                                                    transition={{
                                                                        duration: 0.8,
                                                                        delay:
                                                                            index *
                                                                            0.04
                                                                    }}
                                                                    className={`h-full rounded-full ${
                                                                        isFresh
                                                                            ? "bg-gradient-to-r from-emerald-500 to-green-300"
                                                                            : "bg-gradient-to-r from-red-500 to-orange-400"
                                                                    }`}
                                                                />

                                                            </div>

                                                        </div>

                                                    </td>


                                                    <td className="px-6 py-4 text-sm text-slate-400">

                                                        {formatDate(
                                                            item.createdAt
                                                        )}

                                                    </td>


                                                    <td className="px-6 py-4 text-sm text-slate-500">

                                                        {formatTime(
                                                            item.createdAt
                                                        )}

                                                    </td>

                                                </motion.tr>

                                            );

                                        }
                                    )

                                )}

                            </tbody>

                        </table>

                    </div>


                    <div className="flex flex-col justify-between gap-3 border-t border-white/10 px-6 py-4 text-xs text-slate-600 sm:flex-row sm:items-center">

                        <span>
                            Showing{" "}
                            <span className="font-semibold text-slate-400">
                                {filteredPredictions.length}
                            </span>{" "}
                            of{" "}
                            <span className="font-semibold text-slate-400">
                                {predictions.length}
                            </span>{" "}
                            predictions
                        </span>

                        <span>
                            CNN-powered fruit freshness analysis
                        </span>

                    </div>

                </motion.section>


                {/* ======================================
                    MODEL INFORMATION
                ====================================== */}

                <motion.section
                    variants={itemVariants}
                    className="mt-6 overflow-hidden rounded-3xl border border-emerald-400/10 bg-gradient-to-br from-emerald-500/[0.08] via-transparent to-violet-500/[0.08] p-6"
                >

                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                        <div>

                            <div className="flex items-center gap-3">

                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400/10 text-xl">
                                    🧠
                                </div>

                                <div>

                                    <h3 className="font-bold text-white">
                                        CNN Classification Engine
                                    </h3>

                                    <p className="text-xs text-slate-500">
                                        Fresh vs Rotten binary classification
                                    </p>

                                </div>

                            </div>

                        </div>


                        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">

                            <div>

                                <p className="text-xs uppercase tracking-wider text-slate-600">
                                    Input
                                </p>

                                <p className="mt-1 font-semibold text-slate-300">
                                    224 × 224
                                </p>

                            </div>


                            <div>

                                <p className="text-xs uppercase tracking-wider text-slate-600">
                                    Classes
                                </p>

                                <p className="mt-1 font-semibold text-slate-300">
                                    2
                                </p>

                            </div>


                            <div>

                                <p className="text-xs uppercase tracking-wider text-slate-600">
                                    Model Accuracy
                                </p>

                                <p className="mt-1 font-semibold text-emerald-400">
                                    97%
                                </p>

                            </div>

                        </div>

                    </div>

                </motion.section>


            </motion.main>

        </div>

    );

};


export default History;