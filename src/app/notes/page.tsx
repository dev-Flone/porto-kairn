import { FileText, Plus } from "lucide-react";

import { getCurrentUser } from "@/lib/auth";
import { db } from "@/prisma/db";
import { NewNoteForm } from "@/components/new-note-form";
import { NoteCard } from "@/components/note-card";

export default async function NotesPage() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const notes = await db.orm.public.Note.where({ userId: user.id }).all();

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 md:px-8">
      {" "}
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        {" "}
        <div>
          {" "}
          <p className="text-sm text-zinc-600"> Your knowledge </p>{" "}
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">
            {" "}
            Notes{" "}
          </h1>{" "}
          <p className="mt-2 text-sm text-zinc-500">
            {" "}
            Capture and organize your knowledge.{" "}
          </p>{" "}
        </div>{" "}
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200"
        >
          {" "}
          <Plus size={17} /> New note{" "}
        </button>{" "}
      </div>{" "}
      <div className="mt-8">
        <NewNoteForm />
      </div>
      <div className="mt-8">
        {" "}
        {notes.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-800 px-6 py-16 text-center">
            {" "}
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900">
              {" "}
              <FileText size={20} className="text-zinc-600" />{" "}
            </div>{" "}
            <h2 className="mt-4 font-medium"> No notes yet </h2>{" "}
            <p className="mx-auto mt-2 max-w-sm text-sm text-zinc-600">
              {" "}
              Start capturing your knowledge by creating your first note.{" "}
            </p>{" "}
            <button
              type="button"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200"
            >
              {" "}
              <Plus size={16} /> Create your first note{" "}
            </button>{" "}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
              <NoteCard
                key={note.id}
                id={note.id}
                title={note.title}
                content={note.content}
                updatedAt={note.updatedAt}
              />
            ))}
          </div>
        )}{" "}
      </div>{" "}
    </div>
  );
}
