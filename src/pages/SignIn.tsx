import { useState } from "react";
import axios from "axios";
import { setToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";
import { LoaderCircle } from "lucide-react";

export default function SignIn() {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    setError(null);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/sign-in",
        data
      );
      setToken(res.data.token);
      navigate("/user");
    } catch (err: any) {
      console.error(
        "Login failed:",
        err.response?.data?.message || err.message
      );
      setError("Login failed. Please check your credentials.");
       setTimeout(()=>{
        setError(null);
    }, 1500);
    } finally {
      setLoading(false);
    }
  };

  return (
  <>
    <Card className="max-w-md mx-auto mt-20">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full cursor-pointer "
            variant="outline"
          >
            {loading ? (
              <LoaderCircle className="w-10 h-10 animate-spin text-white" />
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
        <div className="mt-4">
          <span className="m-5 text">
            {`Don't have an account?     `}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => navigate("/sign-up")}
            >
              <b>Sign Up</b>
            </span>
          </span>
        </div>
      </CardContent>
    </Card>
    {error && (
          <div className="fixed bottom-4 right-8 z-50 toast-slide-in w-1/12 bg-red-400">
            <Alert variant="destructive" className="shadow-2xs">
              <AlertCircle className="h-4 w-4" /><span>Login Failed.</span>
            </Alert>
          </div>
        )}
  </>
  );
}

