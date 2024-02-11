export function isValidImageUrl(url: string) {
  const imageExtensions = ["png", "jpg", "jpeg", "webp"];

  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  const urlIsValid = urlRegex.test(url);

  if (urlIsValid) {
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
