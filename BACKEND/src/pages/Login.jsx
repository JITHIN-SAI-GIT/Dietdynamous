
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Activity, Mail, Lock, ArrowRight, Github, Chrome } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import api from "../services/api";

export default function Login({ setUserData }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const { data } = await api.post("/auth/login", formData);
            setUserData(data.user);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-slate-50 text-slate-900 selection:bg-emerald-500/30">

            {/* LEFT PANEL (Visuals) */}
            <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-slate-900 items-center justify-center p-12">
                {/* Background FX */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 to-slate-900 opacity-90"></div>
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px]"></div>
                <div className="absolute top-1/2 right-0 w-80 h-80 bg-teal-500/20 rounded-full blur-[80px]"></div>

                <div className="relative z-10 max-w-md text-white text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(52,211,153,0.3)] mx-auto mb-8 animate-bounce">
                        <Activity className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-5xl font-bold mb-6 tracking-tight">Welcome Back</h1>
                    <p className="text-xl text-emerald-100/80 leading-relaxed font-light">
                        "The only bad workout is the one that didn't happen."
                    </p>

                    <div className="mt-12 flex gap-4 justify-center">
                        <div className="w-2 h-2 rounded-full bg-white opacity-100"></div>
                        <div className="w-2 h-2 rounded-full bg-white opacity-40"></div>
                        <div className="w-2 h-2 rounded-full bg-white opacity-40"></div>
                    </div>
                </div>
            </div>

            {/* RIGHT PANEL (Form) */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative">
                <div className="w-full max-w-md space-y-8 animate-slide-up">

                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">Sign In to FitAura</h2>
                        <p className="text-slate-500">
                            Don't have an account?{" "}
                            <Link to="/signup" className="text-emerald-600 font-bold hover:underline transition-all">
                                Create one for free
                            </Link>
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm flex items-center gap-2 animate-pulse">
                                <span className="font-bold">Error:</span> {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <Input
                                label="Email Address"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                icon={Mail}
                                required
                            />
                            <div className="relative">
                                <Input
                                    label="Password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    icon={Lock}
                                    required
                                />
                                <Link to="/forgot-password" className="absolute top-0 right-0 text-xs font-bold text-emerald-600 hover:text-emerald-700">
                                    Forgot?
                                </Link>
                            </div>

                            <Button
                                type="submit"
                                variant="primary"
                                className="w-full py-4 text-lg shadow-lg shadow-emerald-500/20"
                                loading={loading}
                            >
                                Sign In <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </form>

                        <div className="my-8 flex items-center gap-4">
                            <div className="h-px bg-slate-200 flex-1"></div>
                            <span className="text-slate-400 text-xs uppercase font-bold tracking-wider">Or continue with</span>
                            <div className="h-px bg-slate-200 flex-1"></div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Button variant="outline" className="w-full border-slate-200 hover:bg-slate-50 text-slate-600" onClick={() => window.location.href = `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/auth/google`}>
                                <GoogleIcon className="w-5 h-5 mr-2" /> Google
                            </Button>
                            <Button variant="outline" className="w-full border-slate-200 hover:bg-slate-50 text-slate-600">
                                <Github className="w-5 h-5 mr-2" /> GitHub
                            </Button>
                        </div>
                    </div>

                    <p className="text-center text-xs text-slate-400">
                        By signing in, you agree to our Terms of Service and Privacy Policy.
                    </p>
                </div>
            </div>
        </div>
    );
}

function GoogleIcon(props) {
    return (
        <svg {...props} viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
            <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.734 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
                <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
            </g>
        </svg>
    )
}

