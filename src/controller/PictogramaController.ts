import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Picto } from '../entity/Pictograma';
import { validate } from 'class-validator';

export class PictogramaController {

  static getAll = async (req: Request, res: Response) => {
    const pictoRepository = getRepository(Picto);
    let pictos;

    try {
      pictos = await pictoRepository.find({ select: ['id', 'valor', 'pictograma'] });
    } catch (e) {
      res.status(404).json({ message: 'Somenthing goes wrong!' });
    }

    if (pictos.length > 0) {
      res.send(pictos);
    } else {
      res.status(404).json({ message: 'Not result' });
    }
  };

  static getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const pictoRepository = getRepository(Picto);
    try {
      const picto = await pictoRepository.findOneOrFail(id);
      res.send(picto);
    } catch (e) {
      res.status(404).json({ message: 'Not result' });
    }
  };

  static new = async (req: Request, res: Response) => {
    const { valor, pictograma, id_user } = req.body;
    const picto = new Picto();

    picto.valor = valor;
    picto.pictograma = pictograma;
    picto.id_user = id_user;

    // Validate
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(picto, validationOpt);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // TODO: direccion del pictograma

    const pictoRepository = getRepository(Picto);
    try {
      await pictoRepository.save(picto);
    } catch (e) {
      return res.status(409).json({ message: 'Pictogram already exist' });
    }
    // All ok
    res.send('Pictogram created');
  };

  static edit = async (req: Request, res: Response) => {
    let picto;
    const { id } = req.params;
    const { valor, pictograma } = req.body;

    const pictoRepository = getRepository(Picto);
    // Try get picto
    try {
      picto = await pictoRepository.findOneOrFail(id);
      picto.valor = valor;
      picto.pictograma = pictograma;
    } catch (e) {
      return res.status(404).json({ message: 'Pictogram not found' });
    }
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(picto, validationOpt);

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // Try to save picto
    try {
      await pictoRepository.save(picto);
    } catch (e) {
      return res.status(409).json({ message: 'Pictogram already in use' });
    }

    res.status(201).json({ message: 'Pictogram update' });
  };

  static delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const pictoRepository = getRepository(Picto);
    let picto: Picto;

    try {
      picto = await pictoRepository.findOneOrFail(id);
    } catch (e) {
      return res.status(404).json({ message: 'Pictogram not found' });
    }

    // Remove picto
    pictoRepository.delete(id);
    res.status(201).json({ message: ' Pictogram deleted' });
  };
}

export default PictogramaController;
