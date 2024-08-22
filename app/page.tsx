"use client";
import Image from "next/image";
import Pagination from "./components/Pagination";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const queryParameters = useSearchParams();
  return (
    <Pagination
      itemCount={100}
      pageSize={10}
      currentPage={parseInt(queryParameters.get("page")!) || 1}
    />
  );
}
