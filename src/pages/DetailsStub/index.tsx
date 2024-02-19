import React from "react";
import { useRouter } from 'next/router';

export const DetailsStub = ({ mode }: { mode:string }) => {
  const router = useRouter();
  const { id } = router.query;

  return <div>Now {mode} car: {id}</div>;
};

