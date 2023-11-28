"use client" ;

import { useRouter } from 'next/router'
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
export default function dashboard() {
  const auth = useAuth();
  const router = useRouter();
  return <> 
                {auth ? (
                   <p>DASHBOARD</p>
                ) : (
                  <>
                  <p>Unauthorized Access! </p>
                  <Link href="/login">Login here</Link>
                  </>
                )}
  </>
}