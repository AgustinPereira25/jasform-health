import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

export function isValidImageUrl(url: string) {
  const imageExtensions = ["png", "jpg", "jpeg", "webp"];

  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  const urlIsValid = urlRegex.test(url);

  if (urlIsValid && url !== "") {
    const urlParts = url.split(".");
    const extension = urlParts[urlParts.length - 1]?.toLowerCase() ?? "";

    return imageExtensions.includes(extension);
  } else {
    return false;
  }
}

export function truncateText(text: string, maxLength: number) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + " (...)";
  }
  return text;
}

export const parseDate = (date: string | undefined) => {
  let finalDate = '';

  if (date){
    dayjs.extend(utc)
    dayjs.extend(timezone)
    dayjs.tz.guess()

    // Get timezone from browser
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    finalDate = dayjs.utc(date).tz(tz).format('MM/DD/YYYY hh:mm A');
  }

  return finalDate;
}

export function isURL(str: string) {
  // Regular expression for a basic URL validation
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
  return urlRegex.test(str);
}

export function isValidEmail(email: string) {
  // Regular expression for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function getColorContrast(hexColor = '') {
  let hexColorDefinitive = hexColor;
  if (hexColorDefinitive === '') hexColorDefinitive = '#ffffff';

    // Convert hex to RGB
    const r = parseInt(hexColorDefinitive.slice(1, 3), 16);
    const g = parseInt(hexColorDefinitive.slice(3, 5), 16);
    const b = parseInt(hexColorDefinitive.slice(5, 7), 16);

    // Calculate relative luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Choose white or black text based on luminance
    return luminance > 0.5 ? '#000000' : '#ffffff';
}

export function adjustHoverColor(hexColor = ''){
  let hexColorDefinitive = hexColor;
  if (hexColorDefinitive === '') hexColorDefinitive = '#ffffff';

  // Convert hex to RGB
  const r = parseInt(hexColorDefinitive.slice(1, 3), 16);
  const g = parseInt(hexColorDefinitive.slice(3, 5), 16);
  const b = parseInt(hexColorDefinitive.slice(5, 7), 16);

  // Calculate luminance (perceived brightness)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Define a threshold for determining light or dark color
  const threshold = 0.5;

  // Adjust hover color based on luminance
  let hoverColor;
  if (luminance > threshold) {
      // If the color is light, make it darker
      hoverColor = `#${Math.max(0, Math.round(r * 0.8)).toString(16).padStart(2, '0')}${Math.max(0, Math.round(g * 0.8)).toString(16).padStart(2, '0')}${Math.max(0, Math.round(b * 0.8)).toString(16).padStart(2, '0')}`;
  } else {
      // If the color is dark, make it lighter
      hoverColor = `#${Math.min(255, Math.round(r + (255 - r) * 0.2)).toString(16).padStart(2, '0')}${Math.min(255, Math.round(g + (255 - g) * 0.2)).toString(16).padStart(2, '0')}${Math.min(255, Math.round(b + (255 - b) * 0.2)).toString(16).padStart(2, '0')}`;
  }

  return hoverColor;
}
