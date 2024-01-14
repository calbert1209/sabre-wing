const baseUrl = import.meta.env.BASE_URL;
// In dev environment BASE_URL is "/", prod it's set to "/sabre-wing"
const base = baseUrl.length > 1 ? baseUrl : "";

export const Routes = {
  pour: `${base}/pour`,
  root: `${base}/`,
} as const;
