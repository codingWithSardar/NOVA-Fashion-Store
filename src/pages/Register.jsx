import React, { useContext, useState } from "react";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";

const Register = () => {
  const [currentState, setCurrentState] = useState("Create");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { navigate, setUser } = useContext(UserContext);

  const submitFormData = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    if (currentState === "Create" && !name) {
      toast.error("Please enter your name");
      return;
    }

    try {
      setLoading(true);

      await new Promise((resolve) =>
        setTimeout(resolve, 700)
      );

      if (currentState === "Create") {
        const newUser = {
          _id: `u${Date.now()}`,
          name,
          email,
          phone: "0300-0000000",
          address: {
            street: "Main Boulevard",
            city: "Rawalpindi",
            state: "Punjab",
            zipcode: "46000",
            country: "Pakistan",
          },
        };

        localStorage.setItem(
          "dummyUser",
          JSON.stringify(newUser)
        );

        setUser(newUser);

        toast.success(
          "Account created successfully"
        );
      } else {
        const savedUser =
          localStorage.getItem("dummyUser");

        const loggedUser = savedUser
          ? JSON.parse(savedUser)
          : {
              _id: "u001",
              name: "Sardar Abdullah",
              email,
              phone: "0300-0000000",
              address: {
                street: "Main Boulevard",
                city: "Rawalpindi",
                state: "Punjab",
                zipcode: "46000",
                country: "Pakistan",
              },
            };

        setUser(loggedUser);

        toast.success("Signed in successfully");
      }

      setName("");
      setEmail("");
      setPassword("");

      navigate("/");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md bg-white border border-neutral-200/60 rounded-3xl shadow-sm p-8 sm:p-10">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-black tracking-[0.25em]">
            NOVA
          </h1>

          <h2 className="font-serif text-2xl mt-6 mb-2">
            {currentState} Your Account
          </h2>

          <p className="text-sm text-neutral-500">
            Join us and start your journey with premium
            fashion.
          </p>
        </div>

        <form
          className="space-y-5"
          onSubmit={submitFormData}
        >
          {currentState === "Create" && (
            <div>
              <label className="block text-xs font-semibold tracking-wide uppercase text-neutral-500 mb-2">
                Full Name
              </label>

              <div className="relative">
                <User
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                />

                <input
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 pl-11 pr-4 py-3 text-sm outline-none focus:border-[#C9A227] transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold tracking-wide uppercase text-neutral-500 mb-2">
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
              />

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 pl-11 pr-4 py-3 text-sm outline-none focus:border-[#C9A227] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold tracking-wide uppercase text-neutral-500 mb-2">
              Password
            </label>

            <div className="relative">
              <Lock
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
              />

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Create a password"
                className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 pl-11 pr-4 py-3 text-sm outline-none focus:border-[#C9A227] transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-neutral-900 text-white py-3.5 text-sm font-semibold tracking-wide cursor-pointer hover:bg-[#C9A227] hover:text-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2
                size={22}
                className="animate-spin"
              />
            ) : (
              <>
                {currentState} Account
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-neutral-200" />

          <span className="text-xs text-neutral-400 uppercase tracking-wide">
            Or
          </span>

          <div className="flex-1 h-px bg-neutral-200" />
        </div>

        <button
          type="button"
          onClick={() => {
            toast.success(
              "Google sign in is available in demo mode"
            );

            const googleUser = {
              _id: "google-demo-user",
              name: "NOVA Customer",
              email: "customer@nova.demo",
              phone: "0300-0000000",
              address: {
                street: "Main Boulevard",
                city: "Rawalpindi",
                state: "Punjab",
                zipcode: "46000",
                country: "Pakistan",
              },
            };

            localStorage.setItem(
              "dummyUser",
              JSON.stringify(googleUser)
            );

            setUser(googleUser);
            navigate("/");
          }}
          className="w-full flex items-center justify-center gap-3 rounded-xl border border-neutral-200 bg-white py-3.5 text-sm font-semibold text-neutral-700 shadow-sm hover:border-[#C9A227] hover:shadow-lg hover:shadow-[#C9A227]/10 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>

        <div>
          {currentState === "Create" ? (
            <p className="text-center text-sm text-neutral-500 mt-8">
              Already have an account?{" "}
              <span
                onClick={() =>
                  setCurrentState("Sign In")
                }
                className="text-[#C9A227] font-semibold cursor-pointer hover:text-neutral-900 transition-colors"
              >
                Sign In
              </span>
            </p>
          ) : (
            <p className="text-center text-sm text-neutral-500 mt-8">
              New account?{" "}
              <span
                onClick={() =>
                  setCurrentState("Create")
                }
                className="text-[#C9A227] font-semibold cursor-pointer hover:text-neutral-900 transition-colors"
              >
                Create Account
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;