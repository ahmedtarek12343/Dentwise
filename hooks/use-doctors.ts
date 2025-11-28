"use client";
import { addDoctor, editDoctor, getDoctors } from "@/lib/actions/doctors";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import type { CreateDoctorInput } from "@/lib/actions/doctors";
import { useQueryClient } from "@tanstack/react-query";
export const useGetDoctors = () => {
  return useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });
};

export const useAddDoctor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateDoctorInput) => addDoctor(data),
    onSuccess: () => {
      toast.success("Doctor added successfully");
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useEditDoctor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editDoctor,
    onSuccess: () => {
      toast.success("Doctor updated successfully");
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
