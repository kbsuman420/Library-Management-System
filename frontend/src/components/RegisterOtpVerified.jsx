import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    BookOpen,
    Mail,
    Key,
    CheckCircle,
    XCircle,
    ArrowRight,
    Loader
} from "lucide-react";

function RegisterOtpVerified() {
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState("idle"); // idle, loading, success, error
    const [message, setMessage] = useState("");


    const { email } = useLocation().state;
    console.log(email);

    const handleVerify = async () => {
        if (!otp || otp.trim() === "") {
            setStatus("error");
            setMessage("Please enter a valid verification code.");
            return;
        }

        setIsLoading(true);
        setStatus("loading");
        setMessage("Verifying your email token...");

        try {
            const response = await fetch("http://localhost:8001/api/users/verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ otp: otp.trim(), email: email }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Verification failed");
            }

            setStatus("success");
            setMessage("Your email has been verified successfully!");

            // Redirect to login after 3 seconds
            setTimeout(() => {
                navigate("/login");
            }, 3000);

        } catch (error) {
            setStatus("error");
            setMessage(error.message || "Invalid or expired verification token.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleVerify(otp);
    };

    return (
        <main className="min-h-screen flex items-start md:items-center justify-center bg-gradient-to-br from-violet-50 via-white to-purple-50 px-4 pt-6 sm:pt-10 md:pt-0 pb-4">
            <section className="w-full max-w-md">
                {/* Brand */}
                <div className="flex flex-col items-center mb-4">
                    <div className="bg-violet-600 text-white rounded-2xl p-3 shadow-lg mb-2.5">
                        <BookOpen size={26} />
                    </div>
                    <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                        Library Portal
                    </h1>
                    <p className="text-gray-500 mt-0.5 text-sm">
                        Account Verification
                    </p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 px-8 py-6">
                    <h2 className="text-lg font-bold text-gray-800 mb-4 text-center">
                        Verify Your Email
                    </h2>

                    {status === "loading" && (
                        <div className="flex flex-col items-center justify-center py-6">
                            <Loader className="animate-spin text-violet-600 mb-3" size={36} />
                            <p className="text-sm text-gray-600 font-medium text-center">
                                {message}
                            </p>
                        </div>
                    )}

                    {status === "success" && (
                        <div className="flex flex-col items-center justify-center py-6 text-center animate-fade-in">
                            <CheckCircle className="text-emerald-500 mb-3" size={48} />
                            <p className="text-emerald-600 font-bold text-base mb-1">
                                Success!
                            </p>
                            <p className="text-sm text-gray-600 font-medium mb-4">
                                {message}
                            </p>
                            <p className="text-xs text-gray-400">
                                Redirecting to login in a moment...
                            </p>
                            <Link
                                to="/login"
                                className="mt-4 flex items-center justify-center gap-2 text-violet-600 font-semibold hover:text-violet-800 hover:underline transition-colors"
                            >
                                Login now <ArrowRight size={16} />
                            </Link>
                        </div>
                    )}

                    {status === "error" && (
                        <div className="mb-4 p-3.5 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 text-red-700 animate-shake">
                            <XCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
                            <div>
                                <h4 className="text-sm font-bold">Verification Failed</h4>
                                <p className="text-xs font-medium text-red-600 mt-0.5 leading-relaxed">
                                    {message}
                                </p>
                            </div>
                        </div>
                    )}

                    {status !== "loading" && status !== "success" && (
                        <>
                            <div className="mb-5 text-center bg-violet-50 rounded-2xl p-4 border border-violet-100/50">
                                <Mail className="text-violet-500 mx-auto mb-2" size={24} />
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    We have sent a verification Code to your registered email address.
                                    Please verify your student account.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} noValidate className="space-y-4">
                                <div>
                                    <label
                                        htmlFor="verification-token"
                                        className="block text-sm font-semibold text-gray-700 mb-1"
                                    >
                                        Verification Token / Code
                                    </label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400 pointer-events-none">
                                            <Key size={17} />
                                        </span>
                                        <input
                                            id="verification-token"
                                            type="text"
                                            placeholder="Paste Your Verification Code"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 text-gray-900 placeholder-gray-400 transition-all duration-200 outline-none focus:bg-white focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading || !otp}
                                    className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 active:scale-[0.98] text-white font-semibold py-2.5 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-violet-300 disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    Verify Code
                                </button>
                            </form>
                        </>
                    )}

                    {status !== "success" && (
                        <p className="text-center text-sm text-gray-500 mt-5 pt-3 border-t border-gray-100">
                            Need another account?{" "}
                            <Link
                                to="/register"
                                className="text-violet-600 font-semibold hover:text-violet-800 hover:underline transition-colors"
                            >
                                Register
                            </Link>
                        </p>
                    )}
                </div>
            </section>
        </main>
    );
}

export default RegisterOtpVerified;
