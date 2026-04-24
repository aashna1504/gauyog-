"use client";

import { useState } from "react";
import { Eye } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useContacts } from "@/hooks/useContacts";
import { formatDate } from "@/lib/utils";
import type { ContactMessage } from "@/types";


// ─── DETAIL DIALOG ─────────────────────────────────────────

function ContactDetailDialog({
  contact,
  open,
  onClose,
}: {
  contact: ContactMessage | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!contact) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-0 overflow-hidden border-none rounded-[2rem] shadow-xl">
        
        {/* Header */}
        <div className="bg-[#4a703f] p-5 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {contact.name}
            </DialogTitle>
            <p className="text-sm text-[#e9aa43] uppercase tracking-wide">
              {contact.role || "General Visitor"}
            </p>
          </DialogHeader>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          
          {/* Info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="font-medium break-all">{contact.email}</p>
            </div>

            {contact.phone && (
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="font-medium">{contact.phone}</p>
              </div>
            )}

            <div>
              <p className="text-xs text-muted-foreground">Interest</p>
              <p className="font-medium">
                {contact.interest || "—"}
              </p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Received</p>
              <p className="font-medium">
                {formatDate(contact.createdAt)}
              </p>
            </div>
          </div>

          {/* Message */}
          <div>
            <p className="text-xs text-muted-foreground mb-1">Message</p>
            <div className="bg-gray-50 p-4 rounded-lg text-sm italic text-gray-700">
              "{contact.message}"
            </div>
          </div>

          {/* Status */}
          <div className="flex justify-end">
            <Badge>{contact.status}</Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}


// ─── MAIN COMPONENT ─────────────────────────────────────────

export function ContactsTable() {
  const { data, isLoading } = useContacts();
  const messages = data?.messages ?? [];

  const [selected, setSelected] = useState<ContactMessage | null>(null);

  if (isLoading) {
    return (
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-32 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <>
      {/* Card Grid (All Screens) */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {messages.map((contact) => (
          <div
            key={contact.id}
            className="border rounded-xl p-4 bg-white shadow-sm hover:shadow-md hover:scale-[1.02] transition cursor-pointer"
            onClick={() => setSelected(contact)}
          >
            {/* Top */}
            <div className="flex justify-between items-start gap-2">
              <div className="min-w-0">
                <p className="font-semibold text-sm truncate">
                  {contact.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {contact.email}
                </p>
                {contact.phone && (
                  <p className="text-xs text-muted-foreground truncate">
                    {contact.phone}
                  </p>
                )}
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 shrink-0"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected(contact);
                }}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-2">
              {contact.role && (
                <Badge variant="outline" className="text-[10px]">
                  {contact.role}
                </Badge>
              )}
              {contact.interest && (
                <Badge variant="secondary" className="text-[10px]">
                  {contact.interest}
                </Badge>
              )}
            </div>

            {/* Message */}
            <p className="text-xs text-muted-foreground mt-2 line-clamp-1">
              {contact.message}
            </p>

            {/* Bottom */}
            <div className="flex justify-between items-center mt-3">
              <span className="text-[10px] text-muted-foreground">
                {formatDate(contact.createdAt)}
              </span>

              <span className="text-[10px] font-semibold text-[#4a703f] uppercase">
                {contact.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Dialog */}
      <ContactDetailDialog
        contact={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
      />
    </>
  );
}