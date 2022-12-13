import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello(): string {
    return '<h1>vland api</h1><p>running...</p>';
  }
  
  @Get('/swag')
  getSwag(): string {
    return '<iframe width="100%" height="100%" autoplay src="https://www.youtube.com/embed/drmXWo8ttrM?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
  }

  @Get('/gimu')
  getGimu(): string {
    return '<iframe width="100%" height="100%" autoplay src="https://www.youtube.com/embed/uepXPftPTaU?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
  }
}
