import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, BookOpen, LogIn } from "lucide-react";

function StudentLogin() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
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
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
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
        // TODO: connect to API
        await new Promise((res) => setTimeout(res, 1500));
        setIsLoading(false);
    };

    return (
        <main className="min-h-screen flex items-start md:items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-50 px-4 pt-6 sm:pt-10 md:pt-0 pb-4">
            <section className="w-full max-w-md">
                {/* Logo / Brand */}
                <div className="flex flex-col items-center mb-5">
                    <div className="bg-indigo-600 text-white rounded-2xl p-3 shadow-lg mb-3">
                        <BookOpen size={28} />
                    </div>
                    <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                        Library Portal
                    </h1>
                    <p className="text-gray-500 mt-0.5 text-sm">
                        Student access — sign in to continue
                    </p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 px-8 py-6">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">
                        Student Login
                    </h2>

                    <form onSubmit={handleSubmit} noValidate>
                        {/* Email */}
                        <div className="mb-4">
                            <label
                                htmlFor="student-email"
                                className="block text-sm font-semibold text-gray-700 mb-1.5"
                            >
                                Email Address
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400 pointer-events-none">
                                    <Mail size={17} />
                                </span>
                                <input
                                    id="student-email"
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    placeholder="you@university.edu"
                                    value={formData.email}
                                    onChange={handleChange}
                                    aria-describedby={errors.email ? "email-error" : undefined}
                                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm bg-gray-50 text-gray-900 placeholder-gray-400 transition-all duration-200 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                                        errors.email ? "border-red-400 ring-1 ring-red-300" : "border-gray-200"
                                    }`}
                                />
                            </div>
                            {errors.email && (
                                <p id="email-error" className="mt-1 text-xs text-red-500 font-medium">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="mb-3">
                            <label
                                htmlFor="student-password"
                                className="block text-sm font-semibold text-gray-700 mb-1.5"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400 pointer-events-none">
                                    <Lock size={17} />
                                </span>
                                <input
                                    id="student-password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    autoComplete="current-password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    aria-describedby={errors.password ? "password-error" : undefined}
                                    className={`w-full pl-10 pr-11 py-2.5 rounded-xl border text-sm bg-gray-50 text-gray-900 placeholder-gray-400 transition-all duration-200 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                                        errors.password ? "border-red-400 ring-1 ring-red-300" : "border-gray-200"
                                    }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-400 hover:text-indigo-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                                </button>
                            </div>
                            {errors.password && (
                                <p id="password-error" className="mt-1 text-xs text-red-500 font-medium">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Remember Me + Forgot Password */}
                        <div className="flex items-center justify-between mb-5">
                            <label className="flex items-center gap-2 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    id="remember-me"
                                    checked={formData.rememberMe}
                                    onChange={handleChange}
                                    className="w-4 h-4 rounded accent-indigo-600 cursor-pointer"
                                />
                                <span className="text-sm text-gray-600">Remember me</span>
                            </label>
                            <a
                                href="#"
                                className="text-sm text-indigo-600 font-medium hover:text-indigo-800 hover:underline transition-colors"
                            >
                                Forgot password?
                            </a>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-semibold py-2.5 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-indigo-300 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <svg
                                        className="animate-spin h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                                    </svg>
                                    Signing in…
                                </>
                            ) : (
                                <>
                                    <LogIn size={17} />
                                    Sign In
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer link */}
                    <p className="text-center text-sm text-gray-500 mt-4">
                        Don&apos;t have an account?{" "}
                        <Link
                            to="/register"
                            className="text-indigo-600 font-semibold hover:text-indigo-800 hover:underline transition-colors"
                        >
                            Create one
                        </Link>
                    </p>
                </div>
            </section>
        </main>
    );
}

export default StudentLogin;
