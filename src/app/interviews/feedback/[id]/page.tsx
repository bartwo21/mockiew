import React from "react";

export default function page({ params: { id } }: { params: { id: string } }) {
  console.log(id);
  return <div>page</div>;
}
