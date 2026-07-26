export function buildThankYouUrl(
  formType: string,
  utmParams: Record<string, string>,
): string {
  const searchParams = new URLSearchParams({
    form_type: formType,
    conversion: "true",
  });

  for (const [key, value] of Object.entries(utmParams)) {
    if (value) {
      searchParams.append(key, value);
    }
  }

  return `/thank-you?${searchParams.toString()}`;
}
