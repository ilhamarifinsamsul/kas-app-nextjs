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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, ChevronLeft } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { TransactionType } from "@prisma/client";
import { ActionResult } from "@/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  createTransaction,
  Transaction,
  updateTransaction,
} from "../data/transactions";
import { getMembers, Member } from "../../members/data/members";
import { Loader2 } from "lucide-react";

const initialState = {
  error: "",
  success: "",
};

interface PropsTransactionForm {
  type?: "ADD" | "EDIT";
  data?: Transaction | null;
}

export default function FormTransaction({
  type = "ADD",
  data = null,
}: PropsTransactionForm) {
  const router = useRouter();

  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState<ActionResult>(initialState);

  const [formState, setFormState] = useState({
    memberId: data?.memberId?.toString() || undefined,
    amount: data?.amount?.toString() || "",
    description: data?.description || "",
    type: data?.type || TransactionType.INCOME,
    date: data?.date ? new Date(data.date).toISOString().slice(0, 16) : "",
  });

  //   fetch members list
  useEffect(() => {
    getMembers()
      .then(setMembers)
      .catch(() => {
        toast.error("Gagal mengambil data member");
      });
  }, []);

  //   isi form ketika di edit
  useEffect(() => {
    if (type === "EDIT" && data) {
      setFormState({
        memberId: data.memberId?.toString() || "",
        amount: data.amount?.toString() || "",
        description: data.description || "",
        type: data.type,
        date: data.date ? new Date(data.date).toISOString().slice(0, 16) : "",
      });
    }
  }, [type, data]);

  //   handle submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setState(initialState);

    try {
      const payload = {
        memberId: formState.memberId ? Number(formState.memberId) : null,
        amount: Number(formState.amount),
        description: formState.description || null,
        type: formState.type,
        date: formState.date ? new Date(formState.date) : undefined,
      };

      if (type === "ADD") {
        await createTransaction(payload);
        toast.success("Transaksi berhasil ditambahkan");
      } else {
        await updateTransaction({
          id: data!.id,
          ...payload,
        });
        toast.success("Transaksi berhasil diperbarui");
      }

      router.push("/dashboard/transactions");
      router.refresh();
    } catch (error: any) {
      setState({
        error: error?.message || "Terjadi kesalahan",
        success: "",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle>{type === "ADD" ? "Tambah" : "Edit"} Transaksi</CardTitle>
        <CardDescription>
          {type === "ADD"
            ? "Fill the form below to add a new transaction."
            : "Update the transaction information below."}
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

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Member */}
          <div className="space-y-2">
            <Label htmlFor="member">Member</Label>
            <Select
              value={formState.memberId}
              onValueChange={(value) =>
                setFormState({
                  ...formState,
                  memberId: value === "-" ? undefined : value,
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a member (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="-">-</SelectItem>

                {members.map((member) => (
                  <SelectItem
                    key={member.id}
                    value={member.id.toString() || "-"}
                  >
                    {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              required
              value={formState.amount}
              onChange={(e) =>
                setFormState({ ...formState, amount: e.target.value })
              }
              placeholder="100000"
            />
          </div>

          {/* Type */}
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select
              value={formState.type}
              onValueChange={(value) =>
                setFormState({ ...formState, type: value as TransactionType })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="INCOME">INCOME</SelectItem>
                <SelectItem value="EXPENSE">EXPENSE</SelectItem>
              </SelectContent>
            </Select>

            {/* DATE */}
            <div className="space-y-2">
              <Label>Date</Label>
              <Input
                type="datetime-local"
                value={formState.date}
                onChange={(e) =>
                  setFormState({ ...formState, date: e.target.value })
                }
              />
            </div>

            {/* DESCRIPTION */}
            <div className="space-y-2">
              <Label>Description</Label>
              <Input
                value={formState.description}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    description: e.target.value,
                  })
                }
                placeholder="Keterangan transaksi"
              />
            </div>

            <div className="flex justify-between pt-4">
              <Link href="/dashboard/transactions">
                <Button variant="outline" type="button">
                  <ChevronLeft className="mr-1 h-4 w-4" />
                </Button>
              </Link>

              <Button type="submit" disabled={isLoading}>
                {isLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>
                )}
                {isLoading
                  ? "Processing..."
                  : type === "ADD"
                  ? "Add Transaction"
                  : "Update Transaction"}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
