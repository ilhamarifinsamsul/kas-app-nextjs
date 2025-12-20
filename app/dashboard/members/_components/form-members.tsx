"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Member } from "@prisma/client";
import { ActionResult } from "@/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createMember, updateMember } from "../data/members";

const initialState: ActionResult = {
  error: "",
  success: "",
};

interface PropsMemberForm {
  type?: "ADD" | "EDIT";
  data?: Member | null;
}

export default function FormMembers({
  type = "ADD",
  data = null,
}: PropsMemberForm) {
  const router = useRouter();

  const [formState, setFormState] = useState({
    name: data?.name || "",
    niat: data?.niat || "",
    address: data?.address || "",
    phone: data?.phone || "",
  });

  const [state, setState] = useState<ActionResult>(initialState);
  const [isLoading, setIsLoading] = useState(false);

  // isi form ketika edit data
  useEffect(() => {
    if (type === "EDIT" && data) {
      setFormState({
        name: data.name || "",
        niat: data.niat || "",
        address: data.address || "",
        phone: data.phone || "",
      });
    }
  }, [type, data]);

  // handleChange
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  // handleSubmit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setState(initialState);

    try {
      if (type === "ADD") {
        await createMember(formState);
        toast.success("Member berhasil ditambahkan");
      } else {
        await updateMember({
          id: data!.id,
          ...formState,
        });
        toast.success("Member berhasil diupdate");
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
      router.push("/dashboard/members");
      router.refresh();
    } catch (error: any) {
      setState({
        error: error.message || "Something went wrong",
        success: "",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          {type === "ADD" ? "Add New Member" : "Edit Member"}
        </CardTitle>
        <CardDescription>
          {type === "ADD"
            ? "Fill the form below to add a new member."
            : "Update the member information below."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {state.error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        )}

        <form action="" onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formState.name}
              onChange={handleChange}
              placeholder="Nama Member"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="niat">Niat</Label>
            <Input
              id="niat"
              name="niat"
              value={formState.niat}
              onChange={handleChange}
              placeholder="No Niat Member"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="address">Alamat</Label>
            <Input
              id="address"
              name="address"
              value={formState.address}
              onChange={handleChange}
              placeholder="Alamat Member"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="phone">No HP</Label>
            <Input
              id="phone"
              name="phone"
              value={formState.phone}
              onChange={handleChange}
              placeholder="081xxxxxxxx"
            />
          </div>

          <div className="flex justify-between pt-4">
            <Link href="/dashboard/members">
              <Button variant="outline" type="button">
                <ChevronLeft className="mr-1 h-4 w-4" />
                Kembali
              </Button>
            </Link>

            <Button disabled={isLoading} type="submit">
              {isLoading ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
