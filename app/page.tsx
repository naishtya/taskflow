"use client";

import Board from "@/components/Board";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <header className="mb-8 text-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          TaskFlow
        </h1>
      </header>

      <Board />
    </main>
  );
}
