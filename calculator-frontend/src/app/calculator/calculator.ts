// src/app/calculator/calculator.ts

import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './calculator.html',
  styleUrls: ['./calculator.css']
})
export class Calculator {
  expression: string = '0';
  
  
  buttons: string[] = [
    '%', 'CE', 'C', '⌫',      
    '¹⁄ₓ', 'x²', '√', '÷',    
    '7', '8', '9', '×',       
    '4', '5', '6', '-',       
    '1', '2', '3', '+',       
    '+/-', '0', '.', '='      
  ];

  private apiURL = 'http://localhost:8080/api/evaluate';

  constructor(private http: HttpClient) {}

  onButtonClick(value: string) {
    
    if (this.expression === '0' || this.expression === 'E') {
      if (value >= '0' && value <= '9') {
        this.expression = value;
        return;
      }
    }

    switch(value) {
      case 'C':
      case 'CE':
        this.expression = '0';
        break;
      
      case '⌫':
        if (this.expression.length > 1) {
          this.expression = this.expression.slice(0, -1);
        } else {
          this.expression = '0';
        }
        break;
      
      case '=':
        this.calculate();
        break;
      
      
      case '×':
        this.expression += '*';
        break;
      
      case '÷':
        this.expression += '/';
        break;
      
      case '%':
        if(this.expression !== '0' && this.expression !=='E'){
          this.expression ='(' + this.expression +')/100' ; 
          this.calculate();
        }
        break;
      
      case 'x²':
        this.expression = '(' + this.expression + ')*(' + this.expression +')';
        this.calculate();
        break;
      
      case '√':
        this.evaluateApply((num:number)=> {
        if (num < 0 ) return NaN ; 
        return Math.sqrt(num) ; 
        });
        break ;
      
      case '¹⁄ₓ':
        this.expression = '1/(' + this.expression + ')';
        this.calculate();
        break;
      
      case '+/-':
        if (this.expression.startsWith('-')) {
          this.expression = this.expression.substring(1);
        } else if (this.expression !== '0') {
          this.expression = '-' + this.expression;
        }
        break;
      
      default:
        if (this.expression === '0' && value !== '.') {
          this.expression = value;
        } else {
          this.expression += value;
        }
    }
  }

  calculate() {
    const expr = this.expression.replace(/×/g, '*').replace(/÷/g, '/');

    this.http.post(this.apiURL, expr, { responseType: 'text' })
      .subscribe({
        next: (res) => {
          this.expression = res;
        },
        error: () => {
          this.expression = 'E';
        }
      });
  }

  private evaluateApply(fn: (n: number) => number) {
    const expr = this.expression.replace(/×/g, '*').replace(/÷/g, '/');

    this.http.post(this.apiURL, expr, { responseType: 'text' })
      .subscribe({
        next: (res) => {
          const n = Number(res);
          if (isNaN(n)) {
            this.expression = 'E';
            return;
          }
          const out = fn(n);
          if (!isFinite(out) || isNaN(out)) {
            this.expression = 'E';
            return;
          }
          // Format result to remove trailing ".0" if integer-like
          this.expression = this.formatResult(out);
        },
        error: () => {
          this.expression = 'E';
        }
      });
  }


  private formatResult(n: number): string {
    // if integer-like, show as integer; otherwise show raw
    if (Number.isInteger(n)) return n.toString();
    // limit precision to avoid long repeating decimals
    return parseFloat(n.toFixed(12)).toString();
  }

}