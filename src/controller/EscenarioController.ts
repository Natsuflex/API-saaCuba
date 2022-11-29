import { Escenario } from './../entity/Escenario';
import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { validate } from 'class-validator';

export class EscenarioController {

  static getAll = async (req: Request, res: Response) => {
    const escenarioRepository = getRepository(Escenario);
    let escenarios;

    try {
      escenarios = await escenarioRepository.find({ select: ['id','content', 'represent', 'id_seccion'] });
    } catch (e) {
      res.status(404).json({ message: 'Somenthing goes wrong!' });
    }

    if (escenarios.length > 0) {
      res.send(escenarios);
    } else {
      res.status(404).json({ message: 'Not result' });
    }
  };

  static getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const escenarioRepository = getRepository(Escenario);
    try {
      const escenario = await escenarioRepository.findOneOrFail(id);
      res.send(escenario);
    } catch (e) {
      res.status(404).json({ message: 'Not result' });
    }
  };

  static getBySec = async (req: Request,res: Response)=>{
    const { id } = req.params;
    const escenarioRepository = getRepository(Escenario);
    try {
      const escenario = await escenarioRepository.find({
        where:{id_seccion:id}
      });
      res.send(escenario);
    } catch (e) {
      res.status(404).json({ message: 'Not result' });
    }
  }

  static new = async (req: Request, res: Response) => {
    const { content, represent, id_seccion } = req.body;
    const escenario = new Escenario();

    escenario.content = content;
    escenario.represent = represent;
    escenario.id_seccion = id_seccion;

    // Validate
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(escenario, validationOpt);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    const escenarioRepository = getRepository(Escenario);
    try {
      await escenarioRepository.save(escenario);
    } catch (e) {
      return res.status(409).json({ message: 'Escenario already exist' });
    }
    // All ok
    res.send('Escenario created');
  };

  static edit = async (req: Request, res: Response) => {
    let escenario;
    const { id } = req.params;
    const { content, reprecent, id_seccion } = req.body;

    const escenarioRepository = getRepository(Escenario);
    // Try get escenario
    try {
      escenario = await escenarioRepository.findOneOrFail(id);
      escenario.content = content;
      escenario.reprecent = reprecent;
      escenario.id_seccion = id_seccion;
    } catch (e) {
      return res.status(404).json({ message: 'Escenario not found' });
    }
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(escenario, validationOpt);

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // Try to save user
    try {
      await escenarioRepository.save(escenario);
    } catch (e) {
      return res.status(409).json({ message: 'Escenario already in use' });
    }

    res.status(201).json({ message: 'Escenario update' });
  };

  static delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const escenarioRepository = getRepository(Escenario);
    let escenario: Escenario;

    try {
      escenario = await escenarioRepository.findOneOrFail(id);
    } catch (e) {
      return res.status(404).json({ message: 'Escenario not found' });
    }

    // Remove escenario
    escenarioRepository.delete(id);
    res.status(201).json({ message: ' Escenario deleted' });
  };
}

export default EscenarioController;
