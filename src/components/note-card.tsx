"use client";

import { FileText, Pencil, Trash2, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

type NoteCardProps = {
  id: number;
  title: string;
  content: string | null;
  updatedAt: string;
};

export function NoteCard({ id, title, content, updatedAt }: NoteCardProps) {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editContent, setEditContent] = useState(content ?? "");

  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  async function handleUpdate() {
    setError("");

    if (!editTitle.trim()) {
      setError("Title is required");
      return;
    }
    setLoading(true);

    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editTitle,
          content: editContent,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to update note");
        return;
      }

      setIsEditing(false);
      router.refresh();
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?",
    );

    if (!confirmed) {
      return;
    }
    setError("");
    setDeleting(true);

    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to delete note");
        return;
      }

      router.refresh();
    } catch {
      setError("Something went wrong");
    } finally {
      setDeleting(false);
    }
  }

  if (isEditing) {
    return (
      <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-medium">Edit note</h2>

          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="text-zinc-500 transition hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-5">
          <label
            htmlFor={`title-${id}`}
            className="mb-2 block text-sm text-zinc-400"
          >
            Title
          </label>

          <input
            id={`title-${id}`}
            type="text"
            value={editTitle}
            onChange={(event) => setEditTitle(event.target.value)}
            className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2.5 text-sm outline-none focus:border-zinc-600"
          />
        </div>

        <div className="mt-4">
          <label
            htmlFor={`content-${id}`}
            className="mb-2 block text-sm text-zinc-400"
          >
            Content
          </label>

          <textarea
            id={`content-${id}`}
            value={editContent}
            onChange={(event) => setEditContent(event.target.value)}
            rows={5}
            className="w-full resize-none rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2.5 text-sm outline-none focus:border-zinc-600"
          />
        </div>

        {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="rounded-lg px-4 py-2 text-sm text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleUpdate}
            disabled={loading}
            className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-zinc-200 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <article className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 transition hover:border-zinc-700 hover:bg-zinc-900">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-800">
        <FileText size={16} className="text-zinc-500" />
      </div>

      <h2 className="mt-4 truncate font-medium text-zinc-200">{title}</h2>

      <p className="mt-2 line-clamp-3 text-sm text-zinc-600">
        {content || "No content"}
      </p>

      <p className="mt-5 text-xs text-zinc-700">
        {new Date(updatedAt).toLocaleDateString("en-GB")}
      </p>

      <div className="mt-5 flex gap-2 border-t border-zinc-800 pt-4">
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-zinc-500 transition hover:bg-zinc-800 hover:text-white"
        >
          <Pencil size={14} />
          Edit
        </button>

        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-zinc-500 transition hover:bg-zinc-800 hover:text-red-400 disabled:opacity-50"
        >
          <Trash2 size={14} />
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>

      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
    </article>
  );
}
