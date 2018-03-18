export interface Doctor {
  id: string;
  displayName: string;
  photoURL: string;
  location: string;
  google_lat: number;
  google_lng: number;
  District: {
    id: number;
    name: string;
  };
  Specialty: {
    id: number;
    name: string;
  };
}

export interface HealthRank {
  sleep: number;
  step: number;
  distance: number;
  bmi: number;
  total: number;
}

export interface ScanRecord {
  id: string;
  doctorID: string;
  patientId: string;
}

export interface Step {
  date: Date;
  step: number;
  currentProgress?: number;
}
export interface Record {
  id: string;
  visitDate: Date;
  startDate: Date;
  endDate: Date;
  factor: any[];
  medicine: any[];
  rate: number;
  title: string;
  description: string;
  Doctor: Doctor;
  Patient: Patient;
}

export interface InsurancePlan {
  id: number;
  name: string;
  daliy_colver: number;
  surgery_colver: number;
  provider: string;
  provider_photo_url: string;
  miscellaneous_benefit: number;
}

export interface InsuranceSearch {
  provider: string;
  surgery_cover: number;
  daliy_cover: number;
}

export interface Patient {
  id: number;
  hkid: string;
  gender: string;
  age: number;
  uid: string;
  photoURL?: string;
  displayName?: string;
  weight: number;
  height: number;
  bmi: number;
}

export interface GoogleUser {
  userId: number;
  email: string;
  displayName: string;
  imageUrl: string;
  gender: string;
  ageRange: {
    min: number;
    max: number;
  };
}

export interface facebookUser {
  email: string;
  uid: string;
  token: string;
  image: string;
  displayName: string;
  gender: string;
}

export interface Patient {
  id: number;
  hkid: string;
  gender: string;
  uid: string;
  photoURL?: string;
  displayName?: string;
  weight: number;
  height: number;
  bmi: number;
}

export interface facebookUser {
  email: string;
  uid: string;
  token: string;
  image: string;
  displayName: string;
}

export interface Feed {
  id: number;
  doctorID: string;
  content: string;
  title: string;
  photoURL: string;
  createDt: Date;
  updateDt: Date;
}
