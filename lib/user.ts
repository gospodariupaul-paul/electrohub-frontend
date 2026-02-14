import axios from "@/lib/axios";

export interface User {
  id: number;
  name: string;
  email: string;
}

export const getUser = () => axios.get("/user");
export const updateUser = (data: Partial<User>) =>
  axios.put("/user", data);
export const deleteUser = () => axios.delete("/user");
