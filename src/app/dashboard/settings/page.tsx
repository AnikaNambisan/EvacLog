"use client";

import { useState } from "react";
import Link from "next/link";
import { useToast } from "@/components/Toast";
import { useInventory } from "@/lib/inventory-store";
import { exportInventoryPDF } from "@/lib/export-pdf";

/* ═══════════════════ Types ═══════════════════ */

interface ConnectedCard {
  id: string;
  brand: string;
  last4: string;
  expiry: string;
}

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

/* ═══════════════════ Page ═══════════════════ */

export default function Settings() {
  const { addToast } = useToast();
  const { items } = useInventory();

  /* ── Account ── */
  const [displayName, setDisplayName] = useState("Anika");
  const [email, setEmail] = useState("anika@example.com");

  /* ── Connected cards ── */
  const [cards, setCards] = useState<ConnectedCard[]>([
    { id: "1", brand: "Visa", last4: "4242", expiry: "09/27" },
    { id: "2", brand: "Mastercard", last4: "8888", expiry: "03/26" },
  ]);

  /* ── Photo sync ── */
  const [cloudSync, setCloudSync] = useState(false);
  const [autoBackup, setAutoBackup] = useState(true);
  const [photoQuality, setPhotoQuality] = useState<"original" | "optimized">(
    "optimized"
  );

  /* ── Notifications ── */
  const [notifyReminders, setNotifyReminders] = useState(true);
  const [notifyUpdates, setNotifyUpdates] = useState(false);
  const [notifyEmergency, setNotifyEmergency] = useState(true);

  /* ── Emergency contacts ── */
  const [contacts, setContacts] = useState<EmergencyContact[]>([
    {
      id: "1",
      name: "Mom",
      phone: "(555) 123-4567",
      relationship: "Parent",
    },
  ]);
  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    relationship: "",
  });
  const [showAddContact, setShowAddContact] = useState(false);

  /* ── Handlers ── */

  const handleSaveAccount = () => {
    addToast("success", "Account settings saved.");
  };

  const handleRemoveCard = (id: string) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
    addToast("info", "Card disconnected.");
  };

  const handleConnectCard = () => {
    const newCard: ConnectedCard = {
      id: Date.now().toString(),
      brand: "Amex",
      last4: String(Math.floor(1000 + Math.random() * 9000)),
      expiry: "12/28",
    };
    setCards((prev) => [...prev, newCard]);
    addToast("success", "Card connected via Plaid.");
  };

  const handleAddContact = () => {
    if (!newContact.name || !newContact.phone) {
      addToast("error", "Name and phone are required.");
      return;
    }
    setContacts((prev) => [
      ...prev,
      { ...newContact, id: Date.now().toString() },
    ]);
    setNewContact({ name: "", phone: "", relationship: "" });
    setShowAddContact(false);
    addToast("success", "Emergency contact added.");
  };

  const handleRemoveContact = (id: string) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
    addToast("info", "Contact removed.");
  };

  const handleExport = (format: string) => {
    if (format === "PDF") {
      try {
        exportInventoryPDF(items, { displayName, email });
        addToast("success", "Inventory exported as PDF.");
      } catch {
        addToast("error", "Failed to generate PDF. Please try again.");
      }
      return;
    }
    addToast("success", `Inventory exported as ${format}.`);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="text-neutral-400 hover:text-accent transition-colors p-1 -ml-1 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Back to dashboard"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </Link>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">
                Settings
              </h1>
              <p className="mt-0.5 text-sm text-neutral-500">
                Manage your account, privacy, and preferences.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* ═══════════════════ Account Settings ═══════════════════ */}
        <Section title="Account" icon={<UserIcon />}>
          <div className="space-y-4">
            <Field label="Display name">
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="input-field"
              />
            </Field>
            <Field label="Email address">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
              />
            </Field>
            <div className="flex justify-end pt-2">
              <button onClick={handleSaveAccount} className="btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </Section>

        {/* ═══════════════════ Connected Cards ═══════════════════ */}
        <Section title="Connected Cards" icon={<CardIcon />}>
          <p className="text-sm text-neutral-500 mb-4">
            Cards are connected securely through Plaid. We never see your full
            card number.
          </p>
          <div className="space-y-3">
            {cards.map((card) => (
              <div
                key={card.id}
                className="flex items-center justify-between bg-neutral-50 rounded-lg px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-7 bg-neutral-200 rounded flex items-center justify-center text-[10px] font-bold text-neutral-500">
                    {card.brand.slice(0, 4).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-900">
                      {card.brand} ending in {card.last4}
                    </p>
                    <p className="text-xs text-neutral-500">
                      Expires {card.expiry}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveCard(card.id)}
                  className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  Disconnect
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={handleConnectCard}
            className="mt-4 btn-secondary w-full sm:w-auto"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Connect a card
          </button>
        </Section>

        {/* ═══════════════════ Photo Sync ═══════════════════ */}
        <Section title="Photo Sync" icon={<CameraIcon />}>
          <div className="space-y-5">
            <Toggle
              label="Cloud sync"
              description="Sync encrypted photos to the cloud for backup"
              checked={cloudSync}
              onChange={setCloudSync}
            />
            <Toggle
              label="Auto-backup on Wi-Fi"
              description="Automatically back up new photos when connected to Wi-Fi"
              checked={autoBackup}
              onChange={setAutoBackup}
            />
            <div>
              <label className="block text-sm font-medium text-neutral-900 mb-1.5">
                Photo quality
              </label>
              <div className="flex gap-3">
                {(["original", "optimized"] as const).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setPhotoQuality(opt)}
                    className={`flex-1 text-sm font-medium px-4 py-2.5 rounded-lg border transition-colors min-h-[44px] ${
                      photoQuality === opt
                        ? "border-accent bg-accent/5 text-accent"
                        : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                    }`}
                  >
                    {opt.charAt(0).toUpperCase() + opt.slice(1)}
                  </button>
                ))}
              </div>
              <p className="text-xs text-neutral-500 mt-1.5">
                Optimized saves storage while keeping photos clear.
              </p>
            </div>
          </div>
        </Section>

        {/* ═══════════════════ Notifications ═══════════════════ */}
        <Section title="Notifications" icon={<BellIcon />}>
          <div className="space-y-5">
            <Toggle
              label="Inventory reminders"
              description="Remind you to update your inventory periodically"
              checked={notifyReminders}
              onChange={setNotifyReminders}
            />
            <Toggle
              label="App updates"
              description="Get notified about new features and improvements"
              checked={notifyUpdates}
              onChange={setNotifyUpdates}
            />
            <Toggle
              label="Emergency alerts"
              description="Receive local emergency and weather alerts"
              checked={notifyEmergency}
              onChange={setNotifyEmergency}
            />
          </div>
        </Section>

        {/* ═══════════════════ Export Data ═══════════════════ */}
        <Section title="Export Data" icon={<DownloadIcon />}>
          <p className="text-sm text-neutral-500 mb-4">
            Download your full inventory in a standard format. Useful for
            insurance claims or switching services.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            {["PDF", "CSV", "JSON"].map((fmt) => (
              <button
                key={fmt}
                onClick={() => handleExport(fmt)}
                className="btn-secondary flex-1"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Export as {fmt}
              </button>
            ))}
          </div>
        </Section>

        {/* ═══════════════════ Emergency Contacts ═══════════════════ */}
        <Section title="Emergency Contacts" icon={<PhoneIcon />}>
          <p className="text-sm text-neutral-500 mb-4">
            People to notify in case of an emergency. They can receive a copy of
            your evacuation checklist.
          </p>
          <div className="space-y-3">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center justify-between bg-neutral-50 rounded-lg px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-neutral-900">
                    {contact.name}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {contact.phone}
                    {contact.relationship && ` · ${contact.relationship}`}
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveContact(contact.id)}
                  className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {showAddContact ? (
            <div className="mt-4 bg-neutral-50 rounded-lg p-4 space-y-3">
              <Field label="Name">
                <input
                  type="text"
                  value={newContact.name}
                  onChange={(e) =>
                    setNewContact((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="e.g. Jane Doe"
                  className="input-field"
                />
              </Field>
              <Field label="Phone">
                <input
                  type="tel"
                  value={newContact.phone}
                  onChange={(e) =>
                    setNewContact((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                  placeholder="(555) 000-0000"
                  className="input-field"
                />
              </Field>
              <Field label="Relationship (optional)">
                <input
                  type="text"
                  value={newContact.relationship}
                  onChange={(e) =>
                    setNewContact((prev) => ({
                      ...prev,
                      relationship: e.target.value,
                    }))
                  }
                  placeholder="e.g. Sibling, Neighbor"
                  className="input-field"
                />
              </Field>
              <div className="flex gap-3 pt-1">
                <button onClick={handleAddContact} className="btn-primary">
                  Add contact
                </button>
                <button
                  onClick={() => setShowAddContact(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowAddContact(true)}
              className="mt-4 btn-secondary w-full sm:w-auto"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add emergency contact
            </button>
          )}
        </Section>

        {/* ═══════════════════ Danger Zone ═══════════════════ */}
        <Section title="Danger Zone" icon={<AlertIcon />} danger>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-neutral-900">
                Delete account
              </p>
              <p className="text-xs text-neutral-500 mt-0.5">
                Permanently delete your account and all server-side data. Local
                data will remain until you uninstall the app.
              </p>
            </div>
            <button className="shrink-0 text-sm font-medium text-red-600 hover:text-white hover:bg-red-600 border border-red-200 hover:border-red-600 rounded-lg px-4 py-2.5 transition-colors min-h-[44px]">
              Delete account
            </button>
          </div>
        </Section>

        {/* Privacy link */}
        <div className="text-center pb-8">
          <Link
            href="/privacy"
            className="text-sm text-accent hover:underline"
          >
            View Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════ Sub-components ═══════════════════ */

function Section({
  title,
  icon,
  danger,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  danger?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`bg-white rounded-xl border shadow-sm p-5 sm:p-6 ${
        danger ? "border-red-200" : "border-neutral-200"
      }`}
    >
      <div className="flex items-center gap-2.5 mb-5">
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            danger ? "bg-red-50 text-red-500" : "bg-accent/10 text-accent"
          }`}
        >
          {icon}
        </div>
        <h2 className="text-base font-semibold text-neutral-900">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-neutral-700 mb-1">
        {label}
      </label>
      {children}
    </div>
  );
}

function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (val: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex-1">
        <p className="text-sm font-medium text-neutral-900">{label}</p>
        <p className="text-xs text-neutral-500 mt-0.5">{description}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 min-w-[44px] min-h-[44px] ${
          checked ? "bg-accent" : "bg-neutral-200"
        }`}
        role="switch"
        aria-checked={checked}
        aria-label={label}
      >
        <span
          className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
            checked ? "translate-x-[26px]" : "translate-x-[3px]"
          }`}
        />
      </button>
    </div>
  );
}

/* ═══════════════════ Inline SVG Icons ═══════════════════ */

function UserIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function CardIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}
