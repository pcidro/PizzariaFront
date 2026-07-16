export interface AuthResponse {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "STAFF";
  token: string;
}
