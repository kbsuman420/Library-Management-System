import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    User,
    Phone,
    BookOpen,
    UserPlus,
} from "lucide-react";

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        phone: "",
        role: "student"
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    const validate = () => {
        const newErrors = {};
        if (!formData.fullName.trim()) {
            newErrors.fullName = "Full name is required.";
        } else if (formData.fullName.trim().length < 2) {
            newErrors.fullName = "Name must be at least 2 characters.";
        }
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
        if (!formData.phone) {
            newErrors.phone = "Phone number is required.";
        } else if (!/^\+?[\d\s\-()]{7,15}$/.test(formData.phone)) {
            newErrors.phone = "Enter a valid phone number.";
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
        if (formData.fullName.trim() === "" || formData.email.trim() === "" || formData.password.trim() === "" || formData.phone.trim() === "") {
            setErrors("All fields are required")
            return;
        }
        setIsLoading(true);

        // TODO: connect to API
        try {
            const result = await fetch('http://localhost:8001/api/users/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (!result.ok) {
                const errorData = await result.json();
                throw new Error(errorData.message || "Registration failed");
            }
            return navigate("/login")
        } catch (error) {
            setErrorMessage("Registration Error:", error.message)
            console.error(error.message);
        }
        setIsLoading(false);
        
    };

    const fields = [
        {
            id: "register-fullname",
            label: "Full Name",
            name: "fullName",
            type: "text",
            placeholder: "John Doe",
            autoComplete: "name",
            icon: <User size={17} />,
        },
        {
            id: "register-email",
            label: "Email Address",
            name: "email",
            type: "email",
            placeholder: "you@university.edu",
            autoComplete: "email",
            icon: <Mail size={17} />,
        },
        {
            id: "register-phone",
            label: "Phone Number",
            name: "phone",
            type: "tel",
            placeholder: "+91 98765 43210",
            autoComplete: "tel",
            icon: <Phone size={17} />,
        },
    ];

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
                        Create your student account
                    </p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 px-8 py-5">
                    <h2 className="text-lg font-bold text-gray-800 mb-3">
                        Create Account
                    </h2>
                    {errorMessage && <p className="text-red-500">{errorMessage} Email already registered</p>}
                    <form onSubmit={handleSubmit} noValidate>
                        {/* Text / Email / Phone fields */}
                        {fields.map(({ id, label, name, type, placeholder, autoComplete, icon }) => (
                            <div key={name} className="mb-3">
                                <label
                                    htmlFor={id}
                                    className="block text-sm font-semibold text-gray-700 mb-1"
                                >
                                    {label}
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400 pointer-events-none">
                                        {icon}
                                    </span>
                                    <input
                                        id={id}
                                        type={type}
                                        name={name}
                                        autoComplete={autoComplete}
                                        placeholder={placeholder}
                                        value={formData[name]}
                                        onChange={handleChange}
                                        aria-describedby={errors[name] ? `${name}-error` : undefined}
                                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm bg-gray-50 text-gray-900 placeholder-gray-400 transition-all duration-200 outline-none focus:bg-white focus:ring-2 focus:ring-violet-500 focus:border-violet-500 ${errors[name]
                                            ? "border-red-400 ring-1 ring-red-300"
                                            : "border-gray-200"
                                            }`}
                                    />
                                </div>
                                {errors[name] && (
                                    <p id={`${name}-error`} className="mt-1 text-xs text-red-500 font-medium">
                                        {errors[name]}
                                    </p>
                                )}
                            </div>
                        ))}

                        {/* Password */}
                        <div className="mb-4">
                            <label
                                htmlFor="register-password"
                                className="block text-sm font-semibold text-gray-700 mb-1"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400 pointer-events-none">
                                    <Lock size={17} />
                                </span>
                                <input
                                    id="register-password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    autoComplete="new-password"
                                    placeholder="Min. 6 characters"
                                    value={formData.password}
                                    onChange={handleChange}
                                    aria-describedby={errors.password ? "password-error" : undefined}
                                    className={`w-full pl-10 pr-11 py-2.5 rounded-xl border text-sm bg-gray-50 text-gray-900 placeholder-gray-400 transition-all duration-200 outline-none focus:bg-white focus:ring-2 focus:ring-violet-500 focus:border-violet-500 ${errors.password
                                        ? "border-red-400 ring-1 ring-red-300"
                                        : "border-gray-200"
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-400 hover:text-violet-600 transition-colors"
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

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 active:scale-[0.98] text-white font-semibold py-2.5 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-violet-300 disabled:opacity-60 disabled:cursor-not-allowed"
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
                                    Creating account…
                                </>
                            ) : (
                                <>
                                    <UserPlus size={17} />
                                    Create Account
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer link */}
                    <p className="text-center text-sm text-gray-500 mt-3">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-violet-600 font-semibold hover:text-violet-800 hover:underline transition-colors"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </section>
        </main>
    );
}

export default Register;
