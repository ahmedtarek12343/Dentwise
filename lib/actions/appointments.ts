"use server";
import prisma from "../prisma";

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
