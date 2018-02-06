export interface Doctor {
    id: string;
    displayName: string;
    photoURL: string;
    location: string;
    google_lat: number;
    google_lng: number;
}

export interface Step {
  date: Date;
  value : number;
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

export interface Patient {
    id: number;
    hkid: String;
    gender: String;
    uid: String;
    photoURL?: String;
    displayName?: String;
    weight: number;
    height: number;
    bmi: number;
}
export interface facebookUser {
    email: String;
    uid: String;
    token: String;
    image: String;
    displayName: String;
}

export interface Patient {
    id: number;
    hkid: String;
    gender: String;
    uid: String;
    photoURL?: String;
    displayName?: String;
    weight: number;
    height: number;
    bmi: number;
}

export interface facebookUser {
    email: String;
    uid: String;
    token: String;
    image: String;
    displayName: String;
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
