import { Imagen } from './../entity/Imagen';
import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { validate } from 'class-validator';

export class ImagenController {

  static getAll = async (req: Request, res: Response) => {
    const imagenRepository = getRepository(Imagen);
    let imagenes;

    try {
      imagenes = await imagenRepository.find({ select: ['id', 'imagen', 'descript'] });
    } catch (e) {
      res.status(404).json({ message: 'Somenthing goes wrong!' });
    }

    if (imagenes.length > 0) {
      res.send(imagenes);
    } else {
      res.status(404).json({ message: 'Not result' });
    }
  };

  static getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const imagenRepository = getRepository(Imagen);
    try {
      const imagen = await imagenRepository.findOneOrFail(id);
      res.send(imagen);
    } catch (e) {
      res.status(404).json({ message: 'Not result' });
    }
  };

  static new = async (req: Request, res: Response) => {
    const { imagen, descript } = req.body;
    const img = new Imagen();

    img.imagen = imagen;
    img.descript = descript;

    // Validate
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(img, validationOpt);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    const imagenRepository = getRepository(Imagen);
    try {
      await imagenRepository.save(img);
    } catch (e) {
      return res.status(409).json({ message: 'Imagen already exist' });
    }
    // All ok
    res.send('Imagen created');
  };

  static edit = async (req: Request, res: Response) => {
    let img;
    const { id } = req.params;
    const { imagen, descript } = req.body;

    const imagenRepository = getRepository(Imagen);
    // Try get imagen
    try {
      img = await imagenRepository.findOneOrFail(id);
      img.imagen = imagen;
      img.descript = descript;
    } catch (e) {
      return res.status(404).json({ message: 'Imagen not found' });
    }
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(img, validationOpt);

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // Try to save imagen
    try {
      await imagenRepository.save(img);
    } catch (e) {
      return res.status(409).json({ message: 'Imagen already in use' });
    }

    res.status(201).json({ message: 'Imagen update' });
  };

  static delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const imagenRepository = getRepository(Imagen);
    let img: Imagen;

    try {
      img = await imagenRepository.findOneOrFail(id);
    } catch (e) {
      return res.status(404).json({ message: 'Imagen not found' });
    }

    // Remove imagen
    imagenRepository.delete(id);
    res.status(201).json({ message: ' Imagen deleted' });
  };
}

export default ImagenController;
