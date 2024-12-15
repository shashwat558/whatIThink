import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import {jwtDecode} from 'jwt-decode';

interface DecodedToken {
  id: string;
  email: string;
  role: string; // assuming the role is a string
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export function formateDate(dateString: string):string {
  return new Date(dateString).toLocaleDateString('en-US',{
    year: 'numeric',
    month: "long",
    day: "numeric"
  })

}


export const isAdmin = (): boolean => {
    const token = localStorage.getItem('authToken');
    if (!token) return false;

    try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        return decodedToken.role === 'admin';
    } catch (error) {
        console.error('Invalid token', error);
        return false;
    }
};