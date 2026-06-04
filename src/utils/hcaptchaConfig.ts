// hCaptcha Configuration
export const HCAPTCHA_CONFIG = {
  SITE_KEY: "0x4AAAAAADerCTa7APLUSgQU",
  SECRET_KEY: "0x4AAAAAADerCe-MWORNvq12fEOB9kvp-W0",
  THEME: "dark" as const,
};

// Note: SITE_KEY is for frontend, SECRET_KEY is for backend verification
// Backend verification would be done on the server side with Formspree
