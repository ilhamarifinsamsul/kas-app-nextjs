"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import FormTransaction from "../../_components/form-transactions";
import { getTransactionById, Transaction } from "../../data/transactions";

export default function EditTransactionPage() {
  const params = useParams();
  const router = useRouter();

  const id = Number(params.id);
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id || isNaN(id)) {
      router.push("/dashboard/transactions");
      return;
    }

    // fetch Transaction
    const fetchTransaction = async () => {
      try {
        const data = await getTransactionById(id);
        setTransaction(data);
      } catch (error) {
        console.error("Error fetching transaction:", error);
        router.push("/dashboard/transactions");
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [id, router]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!transaction) {
    return null;
  }

  return <FormTransaction type="EDIT" data={transaction} />;
}
