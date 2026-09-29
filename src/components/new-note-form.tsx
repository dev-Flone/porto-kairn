"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function NewNoteForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    setLoading(true);

    try {
      const response = await fetch("api/notes", {
        method: "POST",
        headers: {
          "Contend-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Error to create note");
        return;
      }

      setTitle("");
      setContent("");

      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5"
    >
      {" "}
      <div>
        {" "}
        <label htmlFor="note-title" className="mb-2 block text-sm font-medium">
          {" "}
          Title{" "}
        </label>{" "}
        <input
          id="note-title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="What are you learning?"
          className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
        />{" "}
      </div>{" "}
      <div className="mt-4">
        {" "}
        <label
          htmlFor="note-content"
          className="mb-2 block text-sm font-medium"
        >
          {" "}
          Content{" "}
        </label>{" "}
        <textarea
          id="note-content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Write your thoughts..."
          rows={6}
          className="w-full resize-none rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
        />{" "}
      </div>{" "}
      {error && (
        <p className="mt-4 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-500">
          {" "}
          {error}{" "}
        </p>
      )}{" "}
      <div className="mt-5 flex justify-end">
        {" "}
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {" "}
          {loading ? "Creating..." : "Create note"}{" "}
        </button>{" "}
      </div>{" "}
    </form>
  );
}
