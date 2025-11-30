"use server";
import { auth } from "@clerk/nextjs/server";
import prisma from "../prisma";

function transformAppointment(appointment: any) {
  return {
    ...appointment,
    patientName: `${appointment.user.firstName || ""} ${
      appointment.user.lastName || ""
    }`.trim(),
    patientEmail: appointment.user.email,
    doctorName: appointment.doctor.name,
    doctorImageUrl: appointment.doctor.imageUrl || "",
    date: appointment.date.toISOString().split("T")[0],
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
