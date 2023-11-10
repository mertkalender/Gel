import {AttendanceRequest} from '../types/attendanceRequest';

export function capitalize(word: string) {
  if (!word) return word;
  return word[0].toUpperCase() + word.substr(1).toLowerCase();
}

export function isAlreadyRequested(attendanceRequests: AttendanceRequest[], userId: string,): boolean {
  console.log(attendanceRequests?.some(request => request.requesterID === userId));
  return attendanceRequests?.some(request => request.requesterID === userId);
}
