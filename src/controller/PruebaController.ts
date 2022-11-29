import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { Prueba } from '../entity/Prueba';

export class PruebaController {

  static getAll = async (req: Request, res: Response) => {
    const pruebaRepository = getRepository(Prueba);
    let pruebas;

    try {
      pruebas = await pruebaRepository.find({ select: ['id', 'tipo', 'cant_test', "result"] });
    } catch (e) {
      res.status(404).json({ message: 'Somenthing goes wrong!' });
    }

    if (pruebas.length > 0) {
      res.send(pruebas);
    } else {
      res.status(404).json({ message: 'Not result' });
    }
  };

  static getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const pruebaRepository = getRepository(Prueba);
    try {
      const prueba = await pruebaRepository.findOneOrFail(id);
      res.send(prueba);
    } catch (e) {
      res.status(404).json({ message: 'Not result' });
    }
  };

  

  static new = async (req: Request, res: Response) => {
    const { tipo, cant_test, result } = req.body;
    const prueba = new Prueba();

    prueba.tipo = tipo;
    prueba.cant_test = cant_test;
    prueba.result = result;

    // Validate
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(prueba, validationOpt);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }


    const pruebaRepository = getRepository(Prueba);
    try {
      await pruebaRepository.save(prueba);
    } catch (e) {
      return res.status(409).json({ message: 'Prueba already exist' });
    }
    // All ok
    res.send('Prueba created');
  };

  static edit = async (req: Request, res: Response) => {
    let prueba;
    const { id } = req.params;
    const { tipo, cant_test, result } = req.body;

    const pruebaRepository = getRepository(Prueba);
    // Try get Prueba
    try {
      prueba = await pruebaRepository.findOneOrFail(id);
      prueba.tipo = tipo;
      prueba.cant_test = cant_test;
      prueba.result = result;
    } catch (e) {
      return res.status(404).json({ message: 'Prueba not found' });
    }
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(prueba, validationOpt);

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // Try to save prueba
    try {
      await pruebaRepository.save(prueba);
    } catch (e) {
      return res.status(409).json({ message: 'Prueba already in use' });
    }

    res.status(201).json({ message: 'Prueba update' });
  };

  static delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const pruebaRepository = getRepository(Prueba);
    let prueba: Prueba;

    try {
      prueba = await pruebaRepository.findOneOrFail(id);
    } catch (e) {
      return res.status(404).json({ message: 'Prueba not found' });
    }

    // Remove Prueba
    pruebaRepository.delete(id);
    res.status(201).json({ message: ' Prueba deleted' });
  };
}

export default PruebaController;
