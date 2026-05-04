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


// ─── HELPERS ──────────────────────────────────────────────────

/** Resolve roles: prefer the new array, fall back to splitting the legacy string */
function resolveRoles(c: ContactMessage): string[] {
  if (c.roles?.length) return c.roles;
  if (c.role) return c.role.split(',').map((s) => s.trim()).filter(Boolean);
  return [];
}

/** Resolve interests: prefer the new array, fall back to splitting the legacy string */
function resolveInterests(c: ContactMessage): string[] {
  if (c.interests?.length) return c.interests;
  if (c.interest) return c.interest.split(',').map((s) => s.trim()).filter(Boolean);
  return [];
}

/** Resolve products: prefer the new array, then try to parse the first line of message */
function resolveProducts(c: ContactMessage): string[] {
  if (c.products?.length) return c.products;
  const firstLine = c.message?.split('\n')[0] ?? '';
  if (firstLine.startsWith('Products:')) {
    return firstLine.replace('Products:', '').split(',').map((s) => s.trim()).filter(Boolean);
  }
  return [];
}

/**
 * Parse location and clean message:
 * The service prepends "village, district, state\nProducts: ...\n" to the message.
 * Extract those lines so we can display them cleanly.
 */
function parseMessageMeta(c: ContactMessage): { location: string; products: string[]; cleanMessage: string } {
  if (!c.message) return { location: '', products: [], cleanMessage: '' };

  const lines = c.message.split('\n');
  let location = '';
  let products: string[] = [];
  let messageStart = 0;

  // First non-empty line might be the location (if it doesn't start with a label)
  if (lines[0] && !lines[0].startsWith('Products:') && !lines[0].includes(':')) {
    location = lines[0];
    messageStart = 1;
  }

  // Next line might be "Products: x, y"
  if (lines[messageStart]?.startsWith('Products:')) {
    products = lines[messageStart].replace('Products:', '').split(',').map((s) => s.trim()).filter(Boolean);
    messageStart += 1;
  }

  // Skip blank separator line
  if (!lines[messageStart]?.trim()) messageStart += 1;

  return {
    location,
    products,
    cleanMessage: lines.slice(messageStart).join('\n').trim(),
  };
}


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

  const roles = resolveRoles(contact);
  const interests = resolveInterests(contact);
  const products = resolveProducts(contact);
  const { location, cleanMessage } = parseMessageMeta(contact);
  const displayProducts = products.length ? products : contact.products ?? [];
  const displayMessage = cleanMessage || contact.message;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-0 overflow-hidden border-none rounded-[2rem] shadow-xl">

        {/* Header */}
        <div className="bg-[#4a703f] p-5 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {contact.name}
            </DialogTitle>
            <p className="text-sm text-[#e9aa43] uppercase tracking-wider">
              {roles[0] ?? "General Visitor"}
            </p>
          </DialogHeader>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">

          {/* Section 1 – Basic Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="font-medium break-all">{contact.email}</p>
            </div>
            {contact.phone && (
              <div>
                <p className="text-xs text-muted-foreground">Mobile</p>
                <p className="font-medium">{contact.phone}</p>
              </div>
            )}
            {/* village/district from new columns OR parsed from message location line */}
            {(contact.village || location) && (
              <div>
                <p className="text-xs text-muted-foreground">Village / City</p>
                <p className="font-medium">{contact.village || location.split(',')[0]?.trim()}</p>
              </div>
            )}
            {(contact.district || location) && (
              <div>
                <p className="text-xs text-muted-foreground">District &amp; State</p>
                <p className="font-medium">
                  {contact.district
                    ? [contact.district, (contact as any).state].filter(Boolean).join(', ')
                    : location.split(',').slice(1).join(',').trim()}
                </p>
              </div>
            )}
            <div>
              <p className="text-xs text-muted-foreground">Received</p>
              <p className="font-medium">{formatDate(contact.createdAt)}</p>
            </div>
          </div>

          {/* Section 2 – You Are A */}
          {roles.length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground mb-2">You Are A</p>
              <div className="flex flex-wrap gap-1.5">
                {roles.map((r) => (
                  <Badge key={r} variant="outline" className="text-[10px]">{r}</Badge>
                ))}
              </div>
            </div>
          )}

          {/* Section 3 – Area of Interest */}
          {interests.length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground mb-2">Area of Interest</p>
              <div className="flex flex-wrap gap-1.5">
                {interests.map((i) => (
                  <Badge key={i} variant="secondary" className="text-[10px]">{i}</Badge>
                ))}
              </div>
            </div>
          )}

          {/* Section 4 – Product Interest */}
          {displayProducts.length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground mb-2">Product Interest</p>
              <div className="flex flex-wrap gap-1.5">
                {displayProducts.map((p) => (
                  <Badge key={p} className="text-[10px] bg-[#4a703f]/10 text-[#4a703f] border border-[#4a703f]/20">{p}</Badge>
                ))}
              </div>
            </div>
          )}

          {/* Section 5 – Message */}
          <div>
            <p className="text-xs text-muted-foreground mb-1">Message / Requirement</p>
            <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700 whitespace-pre-wrap">
              {displayMessage}
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
      {/* Card Grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {messages.map((contact) => {
          const roles = resolveRoles(contact);
          const interests = resolveInterests(contact);

          return (
            <div
              key={contact.id}
              className="border rounded-xl p-4 bg-white shadow-sm hover:shadow-md hover:scale-[1.02] transition cursor-pointer"
              onClick={() => setSelected(contact)}
            >
              {/* Top */}
              <div className="flex justify-between items-start gap-2">
                <div className="min-w-0">
                  <p className="font-semibold text-sm truncate">{contact.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{contact.email}</p>
                  {contact.phone && (
                    <p className="text-xs text-muted-foreground truncate">{contact.phone}</p>
                  )}
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 shrink-0"
                  onClick={(e) => { e.stopPropagation(); setSelected(contact); }}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {roles.slice(0, 2).map((r) => (
                  <Badge key={r} variant="outline" className="text-[10px]">{r}</Badge>
                ))}
                {interests.slice(0, 1).map((i) => (
                  <Badge key={i} variant="secondary" className="text-[10px]">{i}</Badge>
                ))}
              </div>

              {/* Message preview — show clean message without meta lines */}
              <p className="text-xs text-muted-foreground mt-2 line-clamp-1">
                {parseMessageMeta(contact).cleanMessage || contact.message}
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
          );
        })}
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
