import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente !");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
  console.log(`Accede en: http://localhost:${PORT}`);
});

export default app;
