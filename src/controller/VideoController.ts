import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { Video } from '../entity/Video';

export class VideoController {

  static getAll = async (req: Request, res: Response) => {
    const videoRepository = getRepository(Video);
    let videos;

    try {
      videos = await videoRepository.find({ select: ['id', 'video', 'descript'] });
    } catch (e) {
      res.status(404).json({ message: 'Somenthing goes wrong!' });
    }

    if (videos.length > 0) {
      res.send(videos);
    } else {
      res.status(404).json({ message: 'Not result' });
    }
  };

  static getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const videoRepository = getRepository(Video);
    try {
      const video = await videoRepository.findOneOrFail(id);
      res.send(video);
    } catch (e) {
      res.status(404).json({ message: 'Not result' });
    }
  };

  static new = async (req: Request, res: Response) => {
    const { video, descript } = req.body;
    const vid = new Video();

    vid.video = video;
    vid.descript = descript;

    // Validate
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(vid, validationOpt);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }


    const videoRepository = getRepository(Video);
    try {
      await videoRepository.save(vid);
    } catch (e) {
      return res.status(409).json({ message: 'Video already exist' });
    }
    // All ok
    res.send('Video created');
  };

  static edit = async (req: Request, res: Response) => {
    let vid;
    const { id } = req.params;
    const { video, descript } = req.body;

    const videoRepository = getRepository(Video);
    // Try get Video
    try {
      vid = await videoRepository.findOneOrFail(id);
      vid.video = video;
      vid.descript = descript;
    } catch (e) {
      return res.status(404).json({ message: 'Video not found' });
    }
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(vid, validationOpt);

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // Try to save video
    try {
      await videoRepository.save(vid);
    } catch (e) {
      return res.status(409).json({ message: 'Video already in use' });
    }

    res.status(201).json({ message: 'Video update' });
  };

  static delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const videoRepository = getRepository(Video);
    let video: Video;

    try {
      video = await videoRepository.findOneOrFail(id);
    } catch (e) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Remove video
    videoRepository.delete(id);
    res.status(201).json({ message: ' Video deleted' });
  };
}

export default VideoController;
