import React from "react";

export default function RKAOverview() {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "2rem",
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
      }}
    >
      <h2 style={{ fontSize: "1.75rem", color: "#333", marginBottom: "1rem" }}>
        Apa itu RKA (Rencana Kerja dan Anggaran)?
      </h2>
      <p style={{ fontSize: "1rem", color: "#555", lineHeight: 1.8 }}>
        RKA (Rencana Kerja dan Anggaran) adalah dokumen perencanaan keuangan tahunan
        yang disusun oleh setiap unit kerja sebagai dasar pengelolaan dan penggunaan
        anggaran secara efektif dan efisien. Dokumen ini mencakup rencana kegiatan,
        indikator kinerja, serta estimasi biaya yang diperlukan untuk mencapai target
        yang telah ditetapkan.
      </p>

      <div
        style={{
          marginTop: "2rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem",
        }}
      >
        <div
          style={{
            background: "#667eea",
            color: "white",
            padding: "1.5rem",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
          }}
        >
          <h4 style={{ marginBottom: "0.5rem" }}>
            <i className="fas fa-lightbulb" style={{ marginRight: "8px" }}></i>
            Tujuan
          </h4>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
            Memberikan arahan dalam pelaksanaan program serta memastikan efisiensi
            penggunaan anggaran.
          </p>
        </div>

        <div
          style={{
            background: "#764ba2",
            color: "white",
            padding: "1.5rem",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(118, 75, 162, 0.3)",
          }}
        >
          <h4 style={{ marginBottom: "0.5rem" }}>
            <i className="fas fa-file-alt" style={{ marginRight: "8px" }}></i>
            Komponen
          </h4>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
            Meliputi rincian kegiatan, indikator kinerja, alokasi anggaran, serta
            waktu pelaksanaan.
          </p>
        </div>

        <div
          style={{
            background: "#43cea2",
            color: "white",
            padding: "1.5rem",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(67, 206, 162, 0.3)",
          }}
        >
          <h4 style={{ marginBottom: "0.5rem" }}>
            <i className="fas fa-check-circle" style={{ marginRight: "8px" }}></i>
            Manfaat
          </h4>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
            Menyusun program secara terukur, akuntabel, dan transparan dalam mencapai
            target organisasi.
          </p>
        </div>
      </div>
    </div>
  );
}
