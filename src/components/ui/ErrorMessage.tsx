"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  const [visible, setVisible] = useState(true);
  const pathname = usePathname();
  const prevPathname = useRef<string | null>(null);

  useEffect(() => {
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

  useEffect(() => {
    if (prevPathname.current !== null && prevPathname.current !== pathname) {
      setVisible(false);
    }
    prevPathname.current = pathname;
  }, [pathname]);

  if (!visible) return null;

  return <p className="text-red-500">{message}</p>;
}
