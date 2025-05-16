import { useEffect, useState } from "react";
import axios from "axios";
import { getToken, removeToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { LucideClockFading } from "lucide-react";
import { LoaderCircle } from "lucide-react";
import { LogOutIcon } from "lucide-react";

export default function UserPage() {
  const [user, setUser] = useState<any>(null);
  const [editData, setEditData] = useState({ name: "", description: "" });
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/auth/me", {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        setUser(res.data);
        setEditData({ name: res.data.name, description: res.data.description });
      } catch (e: any) {
        console.error(e);
        navigate("/sign-in");
      }
    };
    fetchUser();
  }, []);

  const handleEdit = async () => {
    setLoading(true);
    const res = await axios.put("http://localhost:8000/api/auth/me", editData, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    setUser(res.data);
    setLoading(false);
    setOpen(false);
  };

  const logout = () => {
    removeToken();
    navigate("/sign-in");
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="relative p-6 max-w-10/12 h-11/12 mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-md">
      {/* Top row: Name left, Logout right */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {user.name}
        </h1>
        <Button
          onClick={logout}
          variant="secondary"
          className="text-sm px-3 py-1 cursor-pointer"
        >
          Logout
          <LogOutIcon />
        </Button>
      </div>

      {/* Description */}
      <p className="mb-6 text-gray-700 dark:text-gray-300 italic">
        {user.description.length>0?user.description:"No description provided.Please add a description."}
      </p>

      {/* Edit button bottom right */}
      <div className="flex justify-end">
        <Dialog open={open} onOpenChange={setOpen}>
          <Button variant="ghost" size="sm" className="cursor-pointer">
            <DialogTrigger className="cursor-pointer">Edit</DialogTrigger>
          </Button>
          <DialogContent className="space-y-4 relative fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 shadow-lg rounded-lg w-full max-w-md">
            {/* Close button top-right */}
            <DialogClose className="absolute top-3 right-3 cursor-pointer text-gray-500 hover:text-gray-700"></DialogClose>

            <Input
              className="w-full border border-gray-300 rounded px-3 py-2 dark:bg-gray-800 dark:border-gray-600 p-3 mt-3"
              placeholder="Name here"
              value={editData.name}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
            />
            <Textarea
              placeholder="Description here"
              value={editData.description}
              onChange={(e) =>
                setEditData({ ...editData, description: e.target.value })
              }
              className="w-full h-32 dark:bg-gray-800 dark:border-gray-600 resize-none"
            />
            <Button onClick={handleEdit} className="w-full cursor-pointer shadow-2xl" disabled={loading} variant="outline">
              {loading === true ? <LucideClockFading className="text-bl" /> : " SUBMIT"}
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
