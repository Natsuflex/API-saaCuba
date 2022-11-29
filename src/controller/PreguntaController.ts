import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { Pregunta } from '../entity/Pregunta';

export class PreguntaController {

  static getAll = async (req: Request, res: Response) => {Pregunta
    const preguntaRepository = getRepository(Pregunta);
    let preguntas;

    try {
      preguntas = await preguntaRepository.find({ select: ['id', 'test', 'resp', "id_prueba"] });
    } catch (e) {
      res.status(404).json({ message: 'Somenthing goes wrong!' });
    }

    if (preguntas.length > 0) {
      res.send(preguntas);
    } else {
      res.status(404).json({ message: 'Not result' });
    }
  };

  static getAllById = async ( req: Request, res: Response) => {
    const { id } =req.params;
    const preguntaRepository = getRepository(Pregunta);
    try {
      const pregunta = await preguntaRepository.find({
        where:{id_prueba:id}
      });
      res.send(pregunta);
    } catch (e) {
      res.status(404).json({ message: 'Not result' });
    }
  }

  static getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const preguntaRepository = getRepository(Pregunta);
    try {
      const pregunta = await preguntaRepository.findOneOrFail(id);
      res.send(pregunta);
    } catch (e) {
      res.status(404).json({ message: 'Not result' });
    }
  };

  static new = async (req: Request, res: Response) => {
    const { test, resp, id_prueba } = req.body;
    const pregunta = new Pregunta();

    pregunta.test = test;
    pregunta.resp = resp;
    pregunta.id_prueba = id_prueba;

    // Validate
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(pregunta, validationOpt);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }


    const preguntaRepository = getRepository(Pregunta);
    try {
      await preguntaRepository.save(pregunta);
    } catch (e) {
      return res.status(409).json({ message: 'Pregunta already exist' });
    }
    // All ok
    res.send('Pregunta created');
  };

  static edit = async (req: Request, res: Response) => {
    let pregunta;
    const { id } = req.params;
    const { test, resp, id_prueba } = req.body;

    const preguntaRepository = getRepository(Pregunta);
    // Try get pregunta
    try {
      pregunta = await preguntaRepository.findOneOrFail(id);
      pregunta.test = test;
      pregunta.resp = resp;
      pregunta.id_prueba = id_prueba;
    } catch (e) {
      return res.status(404).json({ message: 'Pregunta not found' });
    }
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(pregunta, validationOpt);

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // Try to save pregunta
    try {
      await preguntaRepository.save(pregunta);
    } catch (e) {
      return res.status(409).json({ message: 'Pregunta already in use' });
    }

    res.status(201).json({ message: 'Pregunta update' });
  };

  static delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const preguntaRepository = getRepository(Pregunta);
    let pregunta: Pregunta;

    try {
      pregunta = await preguntaRepository.findOneOrFail(id);
    } catch (e) {
      return res.status(404).json({ message: 'Pregunta not found' });
    }

    // Remove pregunta
    preguntaRepository.delete(id);
    res.status(201).json({ message: ' Pregunta deleted' });
  };
}

export default PreguntaController;
