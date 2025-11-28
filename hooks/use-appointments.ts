"use client";

import { getAppointments } from "@/lib/actions/appointments";
import { useQuery } from "@tanstack/react-query";

export function useGetAppointments() {
  return useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
  });
}
