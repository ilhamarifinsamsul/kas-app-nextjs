"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { PlusCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { getTransactions, Transaction } from "./data/transactions";
import { TColumn } from "./columns";

export default function TransactionPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const data = await getTransactions();

      setTransactions(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleted = (id: number) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  //   tableData
  const tableData: TColumn[] = transactions.map((trx) => ({
    id: trx.id,
    member_name: trx.member?.name || "-",
    amount:
      typeof trx.amount === "string" ? parseFloat(trx.amount) : trx.amount,
    description: trx.description || "-",
    type: trx.type,
    date: new Date(trx.date),
    createdAt: new Date(trx.createdAt),
    updatedAt: new Date(trx.updatedAt),
  }));

  return (
    <div className="flex flex-col gap-4">
      {/* Header Section */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Daftar Transaksi
          </h1>
          <p className="text-sm text-muted-foreground">
            Kelola data transaksi TAGANA
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/dashboard/transactions/create">
            <Button className="w-full sm:w-auto">
              <PlusCircle className="mr-2 h-4 w-4" />
              Tambah Transaksi
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Transaksi</CardTitle>
          <CardDescription>
            Total transaksi yang terdaftar : {transactions.length}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <DataTable
              columns={columns(handleDeleted)}
              data={tableData}
              searchPlaceholder="Search Transaksi"
              label="Transaksi"
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
