export const options = {
  weekday: 'long',     // "Monday"
  year: 'numeric',     // "2025"
  month: 'long',       // "May"
  day: 'numeric',      // "24"
  hour: 'numeric',     // "9"
  minute: '2-digit',   // "30"
  hour12: true         // AM/PM format
};

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const day = date.getDate();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

export function calculateAge(dateStr: string): number {
    const dob = new Date(dateStr)
    const today = new Date()
    let age = today.getFullYear() - dob.getFullYear()
    const m = today.getMonth() - dob.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--
    }
    return age
}