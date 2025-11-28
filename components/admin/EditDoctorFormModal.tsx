"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Doctor, Gender } from "@prisma/client";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select } from "../ui/select";
import { useEffect, useState } from "react";
import { formatPhoneNumber } from "@/lib/utils";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEditDoctor } from "@/hooks/use-doctors";
const EditDoctorFormModal = ({
  open,
  onOpenChange,
  onClose,
  selectedDoctor,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
  selectedDoctor: Doctor | null;
}) => {
  const [newDoctor, setNewDoctor] = useState({
    name: selectedDoctor?.name,
    speciality: selectedDoctor?.speciality,
    email: selectedDoctor?.email,
    phone: selectedDoctor?.phone,
    gender: selectedDoctor?.gender,
    isActive: selectedDoctor?.isActive,
  });

  const handlePhoneChange = (value: string) => {
    setNewDoctor({
      ...newDoctor,
      phone: formatPhoneNumber(value),
    });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDoctor({
      ...newDoctor,
      [e.target.name]: e.target.value,
    });
  };

  const { mutate, isPending } = useEditDoctor();
  const handleSave = () => {
    if (newDoctor) {
      mutate({
        id: selectedDoctor?.id!,
        ...newDoctor,
      });
      onClose();
    }
  };

  useEffect(() => {
    if (selectedDoctor) {
      setNewDoctor({
        name: selectedDoctor.name,
        speciality: selectedDoctor.speciality,
        email: selectedDoctor.email,
        phone: selectedDoctor.phone,
        gender: selectedDoctor.gender,
        isActive: selectedDoctor.isActive,
      });
    }
  }, [selectedDoctor]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Doctor</DialogTitle>
          <DialogDescription>Edit a doctor in your practice.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-[auto_1fr] items-center gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name*</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                name="name"
                value={newDoctor?.name}
                className="w-full"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-speciality">Speciality *</Label>
              <Input
                id="new-speciality"
                value={newDoctor?.speciality}
                name="speciality"
                onChange={(e) => handleChange(e)}
                placeholder="General Dentistry"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-email">Email *</Label>
            <Input
              id="new-email"
              type="email"
              name="email"
              value={newDoctor?.email}
              onChange={(e) => handleChange(e)}
              placeholder="doctor@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-phone">Phone</Label>
            <Input
              id="new-phone"
              value={newDoctor?.phone}
              name="phone"
              onChange={(e) => handlePhoneChange(e.target.value)}
              placeholder="(555) 123-4567"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="new-gender">Gender</Label>
            <Select
              value={newDoctor?.gender || ""}
              onValueChange={(value) =>
                setNewDoctor({ ...newDoctor, gender: value as Gender })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MALE">Male</SelectItem>
                <SelectItem value="FEMALE">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-status">Status</Label>
            <Select
              value={newDoctor?.isActive ? "active" : "inactive"}
              onValueChange={(value) =>
                setNewDoctor({ ...newDoctor, isActive: value === "active" })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>{" "}
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onClose()}>
            Cancel
          </Button>

          <Button
            onClick={handleSave}
            className="bg-primary hover:bg-primary/90"
            disabled={isPending}
          >
            {isPending ? "Updating..." : "Update Doctor"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditDoctorFormModal;
