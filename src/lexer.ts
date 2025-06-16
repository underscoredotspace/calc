export enum TokenType {
  "NUMBER" = "NUMBER",
  "OPERATOR" = "OPERATOR",
  "PAREN" = "PAREN",
}

export enum Op {
  PLUS = "+",
  MINUS = "-",
  MULT = "*",
  DIV = "/",
}
export enum Paren {
  OPEN = "(",
  CLOSE = ")",
}

type NumberToken = {
  type: TokenType.NUMBER;
  value: string;
};

type OperatorToken = {
  type: TokenType.OPERATOR;
  value: Op;
};

type ParenToken = {
  type: TokenType.PAREN;
  value: Paren;
};

type Token = NumberToken | OperatorToken | ParenToken;

type Tokens = Array<Token>;

export function lexer(input: string): Tokens {
  let position: number = 0;
  const stack: Tokens = [];
  const parens: Array<Paren> = [];

  while (position < input.length) {
    let char = input[position];

    if (/\s/.test(char)) {
      //
    } else if (/[\d.]/.test(char)) {
      let num = char;
      while (/[\d.]/.test(input[position + 1])) {
        num += input[++position];
      }
      stack.push({ type: TokenType.NUMBER, value: String(parseFloat(num)) });
    } else if (Object.values(Op).includes(char as any)) {
      stack.push({ type: TokenType.OPERATOR, value: char as Op });
    } else if (char === Paren.OPEN) {
      stack.push({ type: TokenType.PAREN, value: Paren.OPEN });
      parens.push(Paren.OPEN);
    } else if (char === Paren.CLOSE) {
      if (parens.pop() !== Paren.OPEN) {
        throw "Brackets don't balance";
      }
      stack.push({ type: TokenType.PAREN, value: Paren.CLOSE });
    } else {
      throw "Invalid character";
    }

    position++;
  }

  if (parens.length) {
    throw "Brackets don't balance";
  }

  return stack;
}
