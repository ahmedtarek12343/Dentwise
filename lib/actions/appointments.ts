"use server";
import { auth } from "@clerk/nextjs/server";
import prisma from "../prisma";
import { revalidatePath } from "next/cache";

function transformAppointment(appointment: any) {
  return {
    ...appointment,
    patientName: `${appointment.patient.firstName || ""} ${
      appointment.patient.lastName || ""
    }`.trim(),
    patientEmail: appointment.patient.email,
    doctorName: appointment.doctor.name,
    doctorImageUrl: appointment.doctor.imageUrl || "",
    date: appointment.date,
  };
}

export async function getAppointments() {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        patient: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        doctor: {
          select: {
            name: true,
            imageUrl: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return appointments.map((appointment) => {
      return {
        ...appointment,
        patientName: `${appointment.patient.firstName} ${appointment.patient.lastName}`,
        doctorName: appointment.doctor.name,
        doctorImage: appointment.doctor.imageUrl,
      };
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch Appointments");
  }
}

export async function getUserAppointments() {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const appointments = await prisma.appointment.findMany({
      where: {
        patient: {
          clerkId: userId,
        },
      },
      include: {
        patient: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        doctor: {
          select: {
            name: true,
            imageUrl: true,
          },
        },
      },
      orderBy: [{ date: "asc" }, { time: "asc" }],
    });
    return appointments.map((app) => transformAppointment(app));
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch Appointments");
  }
}

export async function getUserAppointmentStats() {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized");
    }
    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const [totalCount, completedCount] = await Promise.all([
      prisma.appointment.count({
        where: {
          patient: {
            clerkId: userId,
          },
        },
      }),
      prisma.appointment.count({
        where: {
          patient: {
            clerkId: userId,
          },
          status: "COMPLETED",
        },
      }),
    ]);

    return {
      totalAppointments: totalCount,
      completedAppointments: completedCount,
    };
  } catch (error) {
    console.error(error);
    return {
      totalAppointments: 0,
      completedAppointments: 0,
    };
  }
}

export async function getBookedTimeSlots(doctorId: string, date: string) {
  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        doctor: {
          id: doctorId,
        },
        date,
        status: {
          in: ["COMPLETED", "CONFIRMED"],
        },
      },
      select: {
        time: true,
      },
    });
    return appointments.map((app) => app.time);
  } catch (error) {
    console.error(error);
    return [];
  }
}

interface bookAppointmentInput {
  doctorId: string;
  date: string;
  time: string;
  duration: number;
  reason?: string;
}

export async function bookAppointment(input: bookAppointmentInput) {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized");
    }
    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const appointment = await prisma.appointment.create({
      data: {
        userId: user.id,
        doctorId: input.doctorId,
        date: input.date,
        time: input.time,
        duration: input.duration,
        reason: input.reason || "General Consultation",
        status: "CONFIRMED",
      },
      include: {
        patient: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        doctor: {
          select: {
            name: true,
            imageUrl: true,
          },
        },
      },
    });
    revalidatePath("/appointments");
    return transformAppointment(appointment);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
