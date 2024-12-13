export interface Profile {
  id: number;
  name: string;
  photo: File | string;
  description: string;
  address: string;
  lat: number;
  lng: number;
  contactInfo: string;
  interests: string[];
}

