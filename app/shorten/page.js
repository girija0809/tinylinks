"use client";
import React, { useState } from "react";
import Link from "next/link";

const Shorten = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [generated, setGenerated] = useState("");

  const generate = async () => {
    if (!url.trim()) {
      alert("Please enter a URL to shorten.");
      return;
    }

    // prepare payload - use actual variables, not string literals
    const payload = {
      url: url.trim(),
      shorturl: shortUrl.trim(), // server may expect "shorturl"; adjust if your API expects a different key
    };

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        // server returned an error status
        alert(result.message || "Failed to generate short URL");
        return;
      }

      // build the final short link:
      // prefer NEXT_PUBLIC_HOST, otherwise use current origin
      const host = process.env.NEXT_PUBLIC_HOST || (typeof window !== "undefined" && window.location.origin) || "";
      // If the API returns a slug/shorturl in result, prefer that
      const slug = result.shorturl || result.slug || shortUrl;
      const final = host ? `${host.replace(/\/$/, "")}/${slug.replace(/^\//, "")}` : `/${slug}`;

      setGenerated(final);
      setUrl("");
      setShortUrl("");
      console.log("API result:", result);
      alert(result.message || "Short URL generated");
    } catch (error) {
      console.error("Network/error:", error);
      alert("An error occurred. Check console for details.");
    }
  };

  return (
    <div className="mx-auto max-w-lg bg-purple-200 my-16 p-8 rounded-lg flex flex-col gap-4">
      <h1 className="font-bold text-2xl">Generate your short URLs</h1>

      <div className="flex flex-col gap-3">
        <input
          type="text"
          value={url}
          className="px-4 py-2 focus:outline-neutral-700 rounded-md"
          placeholder="Enter your URL"
          onChange={(e) => setUrl(e.target.value)}
        />

        <input
          type="text"
          value={shortUrl}
          className="px-4 py-2 focus:outline-neutral-700 rounded-md"
          placeholder="Enter your preferred short URL (optional)"
          onChange={(e) => setShortUrl(e.target.value)}
        />

        <button
          onClick={generate}
          className="bg-neutral-600 rounded-lg shadow-lg p-3 py-1 my-3 text-white"
        >
          Generate
        </button>
      </div>

      {generated && (
        <>
          <span className="font-bold text-lg">Your Link</span>
          <code>
            {" "}
            <Link target="_blank" href={generated}>
              {generated}
            </Link>
          </code>
        </>
      )}
    </div>
  );
};

export default Shorten;
