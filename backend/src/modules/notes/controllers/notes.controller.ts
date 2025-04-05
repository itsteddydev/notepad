import { Controller, Get, Post, Body, Param, Patch, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { NotesService } from '../services/notes.service';
import { CreateNoteDto } from '../dto/create-note.dto';
import { UpdateNoteDto } from '../dto/update-note.dto';


@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) { }

  // @Post()
  // create(@Body() body: { title: string; content: string }) {
  //   return this.notesService.create(body.title, body.content);
  // }
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto.title, createNoteDto.content);
  }

  @Get()
  findAll() {
    return this.notesService.findAll();
  }

  @Get('archived')
  findArchived() {
    return this.notesService.findArchived();
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() body: { title: string; content: string }) {
  //   return this.notesService.update(id, body.title, body.content);
  // }
  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(id, updateNoteDto.title, updateNoteDto.content);
  }

  @Patch(':id/archive')
  archive(@Param('id') id: string, @Body() body: { archived: boolean }) {
    return this.notesService.archive(id, body.archived);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notesService.delete(id);
  }
}
