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
import { DashboardHeader } from "../_components/header";
import { toast } from "sonner";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface Member {
  id: number;
  name: string;
  niat: string;
  address: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function MemberPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/members");

      if (!res.ok) {
        throw new Error("Gagal mengambil data member");
      }

      const data = await res.json();
      setMembers(data);
    } catch (error) {
      console.error(error);
      toast.error("Gagal memuat data members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {/* Header Section */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Daftar Anggota
          </h1>
          <p className="text-sm text-muted-foreground">
            Kelola data anggota TAGANA
          </p>
        </div>

        <Button asChild className="w-full sm:w-auto">
          <Link href="/dashboard/members/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Tambah Anggota
          </Link>
        </Button>
      </div>

      {/* Content */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Anggota</CardTitle>
          <CardDescription>
            Total anggota yang terdaftar : {members.length}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <DataTable columns={columns} data={members} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
