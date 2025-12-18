import { Component } from '@angular/core';
import { Calculator } from './calculator/calculator';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Calculator],
  template: `<app-calculator></app-calculator>`
})
export class App {}