"use client";

import { useEffect, useState } from "react";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { ActionResult } from "@/types";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { toast } from "sonner";

const initialState: ActionResult = {
  error: "",
  success: "",
};

interface FormDeleteProps {
  id: number;
}

export default function FormDelete({ id }: FormDeleteProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<ActionResult>(initialState);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    try {
      setLoading(true);

      const res = await fetch("/api/members", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        throw new Error("Gagal menghapus member");
      }

      setState({
        success: "Member berhasil dihapus",
        error: "",
      });

      toast.success("Member berhasil dihapus");
      router.refresh(); // revalidate table
      setOpen(false);
    } catch (error) {
      console.error(error);
      setState({
        success: "",
        error: "Terjadi kesalahan saat menghapus member",
      });
      toast.error("Gagal menghapus member");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Member</DialogTitle>
          <DialogDescription>
            Apakah kamu yakin ingin menghapus member ini? Tindakan ini tidak
            bisa dibatalkan.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Batal
          </Button>

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
