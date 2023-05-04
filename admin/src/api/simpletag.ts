import { request } from "@strapi/helper-plugin";

const SimpleTagApiHandler = {
  get: async (id: number) => {
    return await request(`/simple-tag/get/${id}`, {
      method: "GET",
    });
  },
  list: async () => {
    return await request("/simple-tag/list", {
      method: "GET",
    });
  },
  create: async (data: any) => {
    return await request("/simple-tag/create", {
      method: "POST",
      body: { data: data },
    });
  },
  edit: async (id: number, data: any) => {
    return await request(`/simple-tag/update/${id}`, {
      method: "PUT",
      body: { data: data },
    });
  },
  delete: async (id: number) => {
    return await request(`/simple-tag/delete/${id}`, {
      method: "DELETE",
    });
  },
};

export default SimpleTagApiHandler;