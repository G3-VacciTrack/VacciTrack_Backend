export type AppointmentRequest = {
  date: string;
  description: string;
  vaccineName: string;
  diseaseName: string;
  dose: number;
  totalDose: number;
  location: string;
};

export type AppointmentResponse = {
    id: string;
    date: Date;
    description: string;
    vaccineName: string;
    diseaseName: string;
    dose: number;
    totalDose: number;
    location: string;
}