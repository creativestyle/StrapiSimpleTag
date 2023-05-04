export default {
  type: 'admin',
  routes: [
    {
      method: 'GET',
      path: '/get/:id',
      handler: 'simpletag.get',
      config: {
        policies: [],
      },
    },
    {
      method: 'GET',
      path: '/list',
      handler: 'simpletag.list',
      config: {
        policies: [],
      },
    },
    {
      method: "POST",
      path: "/create",
      handler: "simpletag.create",
      config: {
        policies: [],
      },
    },
    {
      method: "PUT",
      path: "/update/:id",
      handler: "simpletag.update",
      config: {
        policies: [],
      },
    },
    {
      method: "DELETE",
      path: "/delete/:id",
      handler: "simpletag.delete",
      config: {
        policies: [],
      },
    },
  ]
};