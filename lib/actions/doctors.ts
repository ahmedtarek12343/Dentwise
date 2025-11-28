"use server";
import { Gender } from "@prisma/client";
import prisma from "../prisma";
import { generateAvatar } from "../utils";
import { revalidatePath } from "next/cache";

export async function getDoctors() {
  try {
    const doctors = await prisma.doctor.findMany({
      include: {
        _count: {
          select: {
            Appointments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return doctors.map((doctor) => {
      return {
        ...doctor,
        appointmentCount: doctor._count.Appointments,
      };
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch Appointments");
  }
}

export interface CreateDoctorInput {
  name: string;
  email: string;
  phone: string;
  speciality: string;
  gender: Gender;
  isActive: boolean;
}

export async function addDoctor(data: CreateDoctorInput) {
  try {
    if (!data.name || !data.email)
      throw new Error("Name and email are required");
    const doctor = await prisma.doctor.create({
      data: {
        ...data,
        imageUrl: generateAvatar(data.name, data.gender),
      },
    });
    revalidatePath("/admin");
    return doctor;
  } catch (err) {
    console.error(err);
    if ((await getDoctors()).find((doctor) => doctor.email === data.email)) {
      throw new Error("Doctor with this email already exists");
    }
    throw new Error("Failed to add doctor");
  }
}

interface UpdateDoctorInput extends Partial<CreateDoctorInput> {
  id: string;
}

export async function editDoctor(data: UpdateDoctorInput) {
  try {
    if (!data.name || !data.email)
      throw new Error("Name and email are required");

    const currentDoctor = await prisma.doctor.findUnique({
      where: {
        id: data.id,
      },
      select: {
        email: true,
      },
    });
    if (!currentDoctor) throw new Error("Doctor not found");
    if (data.email !== currentDoctor.email) {
      const existingDoctor = await prisma.doctor.findUnique({
        where: { email: data.email },
      });

      if (existingDoctor) {
        throw new Error("A doctor with this email already exists");
      }
    }
    const doctor = await prisma.doctor.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        speciality: data.speciality,
        gender: data.gender,
        isActive: data.isActive,
      },
    });
    return doctor;
  } catch (err: any) {
    console.error(err);
    throw new Error(err.message || "Failed to edit doctor");
  }
}
