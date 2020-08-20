import http from "./httpService";

export function getSchools() {
  return http.get("/schools");
}
