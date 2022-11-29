import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Coment } from '../entity/Comentario';
import { validate } from 'class-validator';

export class ComentarioController {

  static getAll = async (req: Request, res: Response) => {
    const comentRepository = getRepository(Coment);
    let comentarios;

    try {
      comentarios = await comentRepository.find({ select: ['id', 'content', 'valid', 'user_info'] });
    } catch (e) {
      res.status(404).json({ message: 'Somenthing goes wrong!' });
    }

    if (comentarios.length > 0) {
      res.send(comentarios);
    } else {
      res.status(404).json({ message: 'Not result' });
    }
  };

  static getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const comentRepository = getRepository(Coment);
    try {
      const coment = await comentRepository.findOneOrFail(id);
      res.send(coment);
    } catch (e) {
      res.status(404).json({ message: 'Not result' });
    }
  };

  static new = async (req: Request, res: Response) => {
    const { content, user_info } = req.body;
    const coment = new Coment();

    coment.content = content;
    coment.valid = false;
    coment.user_info = user_info;

    // Validate
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(coment, validationOpt);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    const comentRepository = getRepository(Coment);
    try {
      await comentRepository.save(coment);
    } catch (e) {
      return res.status(409).json({ message: 'Coment already exist' });
    }
    // All ok
    res.send('Coment created');
  };

  static edit = async (req: Request, res: Response) => {
    let coment;
    const { id } = req.params;
    const { valid } = req.body;

    const comentRepository = getRepository(Coment);
    // Try get cuento
    try {
      coment = await comentRepository.findOneOrFail(id);
      coment.valid = valid;
    } catch (e) {
      return res.status(404).json({ message: 'Coment not found' });
    }
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(coment, validationOpt);

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // Try to save cuento
    try {
      await comentRepository.save(coment);
    } catch (e) {
      return res.status(409).json({ message: 'Coment already in use' });
    }

    res.status(201).json({ message: 'Coment update' });
  };

  static delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const comentRepository = getRepository(Coment);
    let coment: Coment;

    try {
      coment = await comentRepository.findOneOrFail(id);
    } catch (e) {
      return res.status(404).json({ message: 'Coment not found' });
    }

    // Remove cuento
    comentRepository.delete(id);
    res.status(201).json({ message: ' Coment deleted' });
  };
}

export default ComentarioController;
