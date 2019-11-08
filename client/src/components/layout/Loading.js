import React from "react";
import loading from "../../img/loading.gif";
import Layout from "../layout/Layout";

export default function Loading() {
  return (
    <Layout>
      <img
        src={loading}
        style={{
          width: "200px",
          margin: " 0 auto",
          paddingTop: "300px",
          display: "block"
        }}
        alt="Loading..."
      />
    </Layout>
  );
}
