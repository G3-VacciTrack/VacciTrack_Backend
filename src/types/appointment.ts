export type AppointmentRequest = {
  memberName: string;
  date: string;
  description: string;
  vaccineName: string;
  diseaseName: string;
  dose: number;
  totalDose: number;
  location: string;
};

export type AppointmentResponse = {
  memberName: string;
  id: string;
  date: Date;
  description: string;
  vaccineName: string;
  diseaseName: string;
  dose: number;
  totalDose: number;
  location: string;
}