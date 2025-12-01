"use client";

import {
  bookAppointment,
  getAppointments,
  getBookedTimeSlots,
  getUserAppointments,
} from "@/lib/actions/appointments";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useGetAppointments() {
  return useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
  });
}

export function useBookedTimeSlots(doctorId: string, date: string) {
  return useQuery({
    queryKey: ["getBookedTimeSlots", doctorId, date],
    queryFn: () => getBookedTimeSlots(doctorId!, date),
    enabled: !!doctorId && !!date, // only run query if both doctorId and date are provided
  });
}

export function useBookAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bookAppointment,
    onSuccess: () => {
      toast.success("Appointment booked successfully");
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      queryClient.invalidateQueries({ queryKey: ["getBookedTimeSlots"] });
      queryClient.invalidateQueries({ queryKey: ["available-doctors"] });
    },
    onError: (error) => console.error("Failed to book appointment:", error),
  });
}

export function useGetUserAppointments() {
  return useQuery({
    queryKey: ["user-appointments"],
    queryFn: getUserAppointments,
  });
}
