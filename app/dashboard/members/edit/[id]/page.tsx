"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import FormMembers from "../../_components/form-members";
import { getMemberById } from "../../data/members";
import { Member } from "@prisma/client";

export default function EditMemberPage() {
  const params = useParams();
  const router = useRouter();

  const id = Number(params.id);
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id || isNaN(id)) {
      router.push("/dashboard/members");
      return;
    }

    const fetchMember = async () => {
      try {
        const data = await getMemberById(id);
        setMember(data);
      } catch (error) {
        console.error("Error fetching member:", error);
        router.push("/dashboard/members");
      } finally {
        setLoading(false);
      }
    };
    fetchMember();
  }, [id, router]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!member) {
    return null;
  }

  return <FormMembers type="EDIT" data={member} />;
}
