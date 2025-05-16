import { useState } from "react";
import axios from "axios";
import { setToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

export default function SignUp() {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/sign-up",
        data
      );
      setToken(res.data.token);
      navigate("/user");
    } catch (err: any) {
      console.error(
        "Sign up failed:",
        err.response?.data?.message || err.message
      );
      alert("Sign up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-10 shadow-xl">
      <CardContent className="p-6 space-y-4">
        <h2 className="text-xl font-semibold text-center">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          <Input
            placeholder="Email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <Input
            type="password"
            placeholder="Password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <Button type="submit" className="w-full cursor-pointer" variant="outline">
            {loading ? (
              <LoaderCircle className="w-10 h-10 animate-spin text-white shadow-2xl" />
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>
        <div className="mt-4 justify-end items-center flex">
          <span className="">
            {"   "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => navigate("/sign-in")}
            >
              <b>Sign In</b>
            </span>
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
