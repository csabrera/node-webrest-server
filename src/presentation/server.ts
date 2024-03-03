import express from "express";

interface Options {
  port: number;
  public_path?: string;
}

export class Server {
  private app = express();
  private readonly port: number;
  private readonly publicPath: string;

  constructor(options: Options) {
    const { port, public_path = "public" } = options;
    this.port = port;
    this.publicPath = public_path;
  }

  async start() {
    //* Middlewares -> Funciones que se ejecutan en todo momento que se pase por una ruta

    //* Public Folder
    this.app.use(express.static(this.publicPath));

    this.app.listen(3000, () => {
      console.log(`Server running on port ${3000}`);
    });
  }
}
