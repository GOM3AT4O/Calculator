package com.example.calculator.controller;

import org.springframework.web.bind.annotation.*;
import java.util.Stack;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class CalculatorController {

    @PostMapping("/evaluate")
    public String evaluate(@RequestBody String expression) {
        try {
            double result = evaluateExpression(expression.trim());
            if (Double.isNaN(result) || Double.isInfinite(result)) {
                return "E";
            }
            return String.valueOf(result);
        } catch (Exception e) {
            System.out.println("Error evaluating expression: " + e.getMessage());
            return "E";
        }
    }

    private double evaluateExpression(String expression) {
        Stack<Double> values = new Stack<>();
        Stack<Character> operators = new Stack<>();
        int i = 0;

        while (i < expression.length()) {
            char ch = expression.charAt(i);

            if (Character.isWhitespace(ch)) {
                i++;
                continue;
            }

            if (Character.isDigit(ch) || (ch == '-' && isUnaryMinus(expression, i))) {
                StringBuilder sb = new StringBuilder();


                if (ch == '-') {
                    sb.append(ch);
                    i++;
                }

                while (i < expression.length() &&
                        (Character.isDigit(expression.charAt(i)) || expression.charAt(i) == '.')) {
                    sb.append(expression.charAt(i));
                    i++;
                }
                values.push(Double.valueOf(sb.toString()));
                continue;
            }

            if (ch == '(') {
                operators.push(ch);
            } else if (ch == ')') {
                while (!operators.isEmpty() && operators.peek() != '(') {
                    values.push(applyOp(operators.pop(), values.pop(), values.pop()));
                }
                if (!operators.isEmpty()) {
                    operators.pop();
                }
            } else if (ch == '+' || ch == '-' || ch == '*' || ch == '/') {
                while (!operators.isEmpty() && hasPrecedence(ch, operators.peek())) {
                    values.push(applyOp(operators.pop(), values.pop(), values.pop()));
                }
                operators.push(ch);
            }
            i++;
        }

        while (!operators.isEmpty()) {
            values.push(applyOp(operators.pop(), values.pop(), values.pop()));
        }

        return values.pop();
    }

    private boolean isUnaryMinus(String expression, int index) {
        if (expression.charAt(index) != '-') {
            return false;
        }

        if (index == 0)  {
            return true ;
        }

        int prevId = index - 1;
        while (prevId >= 0 && Character.isWhitespace(expression.charAt(prevId))) {
            prevId--;
        }

        if (prevId < 0) {
            return true;
        }

        char prevChar = expression.charAt(prevId);

        return prevChar == '(' || prevChar == '+' || prevChar == '-' ||
                prevChar == '*' || prevChar == '/';
    }

    private boolean hasPrecedence(char ch1, char ch2) {
        if (ch2 == '(' || ch2 == ')') return false;
        if ((ch1 == '*' || ch1 == '/') && (ch2 == '+' || ch2 == '-')) return false;
        return true;
    }

    private double applyOp(char op, double b, double a) {
        switch (op) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': return b == 0 ? Double.POSITIVE_INFINITY : a / b;
        }
        return 0;
    }
}