import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ShieldCheck, LogIn } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "admin123";
function AdminLogin() {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role === "admin") {
        return <Navigate to="/dashboard" replace />;
    }

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!formData.email) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Enter a valid email address.";
        }
        if (!formData.password) {
            newErrors.password = "Password is required.";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setIsLoading(true);
        try {
            const res = await new Promise((resolve, reject) => {
                if (formData.email === ADMIN_EMAIL && formData.password === ADMIN_PASSWORD) {

                    resolve({ token: "dummy-jwt-token", role: "admin" });
                } else {
                    reject(new Error("Incorrect credentials"));
                }
            });
            console.log(formData.email, formData.password)
            console.log(ADMIN_EMAIL, ADMIN_PASSWORD)
            localStorage.setItem("token", res.token);
            localStorage.setItem("role", res.role);
            navigate("/dashboard");
        } catch (error) {
            setErrors((prev) => ({ ...prev, password: "Incorrect email or password." }));
        }

        setIsLoading(false);
    };

    return (
        <main className="min-h-screen flex items-start md:items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 px-4 pt-6 sm:pt-10 md:pt-0 pb-4 relative">
            {/* Subtle grid overlay */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                }}
                aria-hidden="true"
            />

            <section className="relative w-full max-w-md z-10">
                {/* Brand */}
                <div className="flex flex-col items-center mb-5">
                    <div className="relative mb-3">
                        <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl blur opacity-60" />
                        <div className="relative bg-gray-900 text-amber-400 rounded-2xl p-3 shadow-2xl border border-amber-500/20">
                            <ShieldCheck size={28} />
                        </div>
                    </div>
                    <h1 className="text-2xl font-extrabold text-white tracking-tight">
                        Admin Portal
                    </h1>
                    <p className="text-gray-400 mt-0.5 text-sm">
                        Restricted access — authorised personnel only
                    </p>
                </div>

                {/* Card */}
                <div className="bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-700/60 px-8 py-6">
                    {/* Admin badge */}
                    <div className="flex items-center gap-2 mb-4">
                        <span className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold px-3 py-1 rounded-full">
                            <ShieldCheck size={12} />
                            ADMIN LOGIN
                        </span>
                    </div>

                    <h2 className="text-lg font-bold text-white mb-4">
                        Sign in to Dashboard
                    </h2>

                    <form onSubmit={handleSubmit} noValidate>
                        {/* Email */}
                        <div className="mb-4">
                            <label
                                htmlFor="admin-email"
                                className="block text-sm font-semibold text-gray-300 mb-1.5"
                            >
                                Admin Email
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500 pointer-events-none">
                                    <Mail size={17} />
                                </span>
                                <input
                                    id="admin-email"
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    placeholder="admin@library.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    aria-describedby={errors.email ? "admin-email-error" : undefined}
                                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm bg-gray-700/60 text-gray-100 placeholder-gray-500 transition-all duration-200 outline-none focus:bg-gray-700 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${errors.email
                                        ? "border-red-500 ring-1 ring-red-500/40"
                                        : "border-gray-600"
                                        }`}
                                />
                            </div>
                            {errors.email && (
                                <p id="admin-email-error" className="mt-1 text-xs text-red-400 font-medium">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="mb-5">
                            <label
                                htmlFor="admin-password"
                                className="block text-sm font-semibold text-gray-300 mb-1.5"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500 pointer-events-none">
                                    <Lock size={17} />
                                </span>
                                <input
                                    id="admin-password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    autoComplete="current-password"
                                    placeholder="Enter admin password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    aria-describedby={errors.password ? "admin-password-error" : undefined}
                                    className={`w-full pl-10 pr-11 py-2.5 rounded-xl border text-sm bg-gray-700/60 text-gray-100 placeholder-gray-500 transition-all duration-200 outline-none focus:bg-gray-700 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${errors.password
                                        ? "border-red-500 ring-1 ring-red-500/40"
                                        : "border-gray-600"
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-500 hover:text-amber-400 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                                </button>
                            </div>
                            {errors.password && (
                                <p id="admin-password-error" className="mt-1 text-xs text-red-400 font-medium">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 active:scale-[0.98] text-gray-900 font-bold py-2.5 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-amber-500/30 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <svg
                                        className="animate-spin h-5 w-5 text-gray-900"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                                    </svg>
                                    Authenticating…
                                </>
                            ) : (
                                <>
                                    <LogIn size={17} />
                                    Access Dashboard
                                </>
                            )}
                        </button>
                    </form>

                    {/* Security note */}
                    <p className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center gap-1.5">
                        <ShieldCheck size={12} className="text-amber-600/60" />
                        Secured with end-to-end encryption
                    </p>
                </div>

                <p className="text-center text-xs text-gray-600 mt-4">
                    Library Management System &copy; {new Date().getFullYear()}
                </p>
            </section>
        </main>
    );
}

export default AdminLogin;
