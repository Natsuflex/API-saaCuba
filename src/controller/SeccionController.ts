import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { Seccion } from '../entity/Seccion';

export class SeccionController {

  static getAll = async (req: Request, res: Response) => {
    const seccionRepository = getRepository(Seccion);
    let secciones;

    try {
      secciones = await seccionRepository.find({ select: ['id', 'tematic'] });
    } catch (e) {
      res.status(404).json({ message: 'Somenthing goes wrong!' });
    }

    if (secciones.length > 0) {
      res.send(secciones);
    } else {
      res.status(404).json({ message: 'Not result' });
    }
  };

  static getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const seccionRepository = getRepository(Seccion);
    try {
      const seccion = await seccionRepository.findOneOrFail(id);
      res.send(seccion);
    } catch (e) {
      res.status(404).json({ message: 'Not result' });
    }
  };

  static new = async (req: Request, res: Response) => {
    const { tematic } = req.body;
    const seccion = new Seccion();

    seccion.tematic = tematic;
   

    // Validate
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(seccion, validationOpt);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }


    const seccionRepository = getRepository(Seccion);
    try {
      await seccionRepository.save(seccion);
    } catch (e) {
      return res.status(409).json({ message: 'Seccion already exist' });
    }
    // All ok
    res.send('Seccion created');
  };

  static edit = async (req: Request, res: Response) => {
    let seccion;
    const { id } = req.params;
    const { tematic } = req.body;

    const seccionRepository = getRepository(Seccion);
    // Try get Seccion
    try {
      seccion = await seccionRepository.findOneOrFail(id);
      seccion.tematic = tematic;
      
    } catch (e) {
      return res.status(404).json({ message: 'Seccion not found' });
    }
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(seccion, validationOpt);

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // Try to save Seccion
    try {
      await seccionRepository.save(seccion);
    } catch (e) {
      return res.status(409).json({ message: 'Seccion already in use' });
    }

    res.status(201).json({ message: 'Seccion update' });
  };

  static delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const seccionRepository = getRepository(Seccion);
    let seccion: Seccion;

    try {
      seccion = await seccionRepository.findOneOrFail(id);
    } catch (e) {
      return res.status(404).json({ message: 'Seccion not found' });
    }

    // Remove Seccion
    seccionRepository.delete(id);
    res.status(201).json({ message: ' Seccion deleted' });
  };
}

export default SeccionController;
