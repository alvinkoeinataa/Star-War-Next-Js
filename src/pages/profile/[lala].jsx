import { useRouter } from "next/router";
import React from "react";

const User = () => {
  const bom = useRouter();

  console.log(bom);
  return <div>{bom.query.lala}</div>;
};

export default User;
