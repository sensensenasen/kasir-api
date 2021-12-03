const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    version: "1.0.0",
    title: "Kasir API",
    description: "Ini adalah dokumentasi dari Kasir API, digunakan untuk kebutuhan aplikasi kasir",
  },
  host: "http://kasir-api.app.senas.xyz",
  basePath: "/",
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    {
      name: "User",
      description: "Endpoint User & Login",
    },
    {
      name: "Gate",
      description: "Endpoint untuk Barcode Pintu",
    },
  ],
  securityDefinitions: {
    apiKeyAuth: {
      type: "apiKey",
      in: "header", // can be "header", "query" or "cookie"
      name: "X-API-KEY", // name of the header, query parameter or cookie
      description: "any description...",
    },
  },
  definitions: {
    User: {
      userName: "sena",
      password: "password",
      email: "email@mail.com",
      userRole: "kasir",
      doorKey: "703ef48b-574f-4335-9590-cddc4daa70b4",
      fullName: "Muhamad Septiana",
      phone: "08121XXXXXXXX",
      gender: "laki-laki",
      profileImage: "link url",
      bio: "deskripsi bio",
      saldo: 1500000,
    },
  },
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./app.js"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./app");
});
