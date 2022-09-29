import React from "react";
import Layout from "../layout/Layout";

export default function Stats() {
  const stats = [
    { name: "Total Subscribers", stat: "71,897" },
    { name: "Avg. Open Rate", stat: "58.16%" },
    { name: "Avg. Click Rate", stat: "24.57%" },
  ];

  return (
    <Layout title="Stats">
      <div className="m-5">
        <h2>Coming Soon!</h2>
      </div>
    </Layout>
  );
}
