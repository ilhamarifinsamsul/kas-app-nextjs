import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #090979 0%, #00D4FF 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "8rem", margin: 0 }}>404</h1>
      <h2 style={{ margin: 0 }}>Oops! Halaman tidak ditemukan</h2>
      <p style={{ marginTop: 20, fontSize: "1.2rem" }}>
        Sepertinya kamu tersesat di galaksi yang salah.
      </p>

      <Link
        href="/"
        style={{
          marginTop: 30,
          padding: "10px 30px",
          background: "#fff",
          color: "#090979",
          borderRadius: 30,
          textDecoration: "none",
          fontWeight: "bold",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
