import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/auth"; //auth logic stored here
import { LoaderCircle } from "lucide-react";

export default function HomeRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (token) {
      navigate("/user");
    } else {
      navigate("/sign-in");
    }
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <LoaderCircle className="w-10 h-10 animate-spin text-primary" />
    </div>
  );
}
