import { Injectable, NotFoundException } from '@nestjs/common';
import { Note } from '@prisma/client';
import { db } from 'src/config/db';


@Injectable()
export class NotesService {
  async create(title: string, content: string): Promise<Note> {
    return db.note.create({
      data: { title, content },
    });
  }

  async findAll(): Promise<Note[]> {
    return db.note.findMany({
      where: { archived: false },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findArchived(): Promise<Note[]> {
    return db.note.findMany({
      where: { archived: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  // async update(id: string, title: string, content: string): Promise<Note> {
  //   return db.note.update({
  //     where: { id },
  //     data: { title, content },
  //   });
  // }
  async update(id: string, title?: string, content?: string): Promise<Note> {
    const note = await db.note.findUnique({ where: { id } });
    if (!note) throw new NotFoundException('Nota no encontrada');

    return db.note.update({
      where: { id },
      data: { title, content },
    });
  }


  async archive(id: string, archived: boolean): Promise<Note> {
    const note = await db.note.findUnique({ where: { id } });

    if (!note) throw new NotFoundException(`Nota con ID ${id} no encontrada`);

    return db.note.update({
      where: { id },
      data: { archived },
    });
  }


  // async delete(id: string): Promise<Note> {
  //   return db.note.delete({
  //     where: { id },
  //   });
  // }
  async delete(id: string): Promise<Note> {
    const note = await db.note.findUnique({ where: { id } });
    if (!note) throw new NotFoundException('Nota no encontrada');

    return db.note.delete({ where: { id } });
  }
}
