
import axios from "axios";
import { ApiUrl } from "./lib";
export const UpdateTodolist = async (id, payload) => {
  const res = await axios.put(`${ApiUrl}/updateTodo/${id}`, payload);
  return res.data;
};
