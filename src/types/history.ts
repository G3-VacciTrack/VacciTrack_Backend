export type HistoryRequest = {
  memberName: string;
  date: string;
  description: string;
  vaccineName: string;
  diseaseName: string;
  dose: number;
  totalDose: number;
  location: string;
}

export type HistoryResponse = {
  id: string
  uid: string
  description: string
  vaccineName: string
  location: string
  createdAt: {
    _seconds: number
    _nanoseconds: number
  }
  updatedAt?: {
    _seconds: number
    _nanoseconds: number
  }
  dose: number
  totalDose: number
  date: Date
  diseaseName: string
}
