import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getUsername(){

  const token = localStorage.getItem("social-api-auth-token")

  return JSON.parse(atob(token!.split(".")[1])).username; // Decode JWT payload

}


export function cronToHumanReadable(cronExpression: string) {
  // const [minute, hour, dayOfMonth, month, dayOfWeek] = cronExpression.split(" ");

  return cronExpression;
}