import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Cuento } from '../entity/Cuento';
import { validate } from 'class-validator';

export class CuentoController {

  static getAll = async (req: Request, res: Response) => {
    const cuentoRepository = getRepository(Cuento);
    let cuentos;

    try {
      cuentos = await cuentoRepository.find({ select: ['id', 'tittle', 'history', 'picto_replace'] });
    } catch (e) {
      res.status(404).json({ message: 'Somenthing goes wrong!' });
    }

    if (cuentos.length > 0) {
      res.send(cuentos);
    } else {
      res.status(404).json({ message: 'Not result' });
    }
  };

  static getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const cuentoRepository = getRepository(Cuento);
    try {
      const cuento = await cuentoRepository.findOneOrFail(id);
      res.send(cuento);
    } catch (e) {
      res.status(404).json({ message: 'Not result' });
    }
  };

  static new = async (req: Request, res: Response) => {
    const { tittle, history, picto_replace } = req.body;
    const cuento = new Cuento();

    cuento.tittle = tittle;
    cuento.history = history;
    cuento.picto_replace = picto_replace;

    // Validate
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(cuento, validationOpt);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    const cuentoRepository = getRepository(Cuento);
    try {
      await cuentoRepository.save(cuento);
    } catch (e) {
      return res.status(409).json({ message: 'Cuento already exist' });
    }
    // All ok
    res.send('Cuento created');
  };

  static edit = async (req: Request, res: Response) => {
    let cuento;
    const { id } = req.params;
    const { tittle, history, picto_replace } = req.body;

    const cuentoRepository = getRepository(Cuento);
    // Try get cuento
    try {
      cuento = await cuentoRepository.findOneOrFail(id);
      cuento.tittle = tittle;
      cuento.history = history;
      cuento.picto_replace = picto_replace;
    } catch (e) {
      return res.status(404).json({ message: 'Cuento not found' });
    }
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(cuento, validationOpt);

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // Try to save cuento
    try {
      await cuentoRepository.save(cuento);
    } catch (e) {
      return res.status(409).json({ message: 'Cuento already in use' });
    }

    res.status(201).json({ message: 'Cuento update' });
  };

  static delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const cuentoRepository = getRepository(Cuento);
    let cuento: Cuento;

    try {
      cuento = await cuentoRepository.findOneOrFail(id);
    } catch (e) {
      return res.status(404).json({ message: 'Cuento not found' });
    }

    // Remove cuento
    cuentoRepository.delete(id);
    res.status(201).json({ message: ' Cuento deleted' });
  };
}

export default CuentoController;
