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

type Token = {
  type: TokenType;
  value: number | Op | Paren;
};

type Tokens = Array<Token>;

export function lexer(input: string): Tokens {
  let position: number = 0;
  let lastToken: TokenType | undefined;
  const stack: Tokens = [];
  const parens: Array<Paren> = [];

  while (position < input.length) {
    let char = input[position];

    if (/\s/.test(char)) {
      // space
    } else if (/\d/.test(char)) {
      if (lastToken === TokenType.NUMBER) {
        stack[stack.length - 1].value =
          +stack[stack.length - 1].value * 10 + +char;
      } else stack.push({ type: TokenType.NUMBER, value: +char });

      lastToken = TokenType.NUMBER;
    } else if (Object.values(Op).includes(char as any)) {
      stack.push({ type: TokenType.OPERATOR, value: char as Op });
      lastToken = TokenType.OPERATOR;
    } else if (char === Paren.OPEN) {
      stack.push({ type: TokenType.PAREN, value: Paren.OPEN });
      parens.push(Paren.OPEN);
      lastToken = TokenType.PAREN;
    } else if (char === Paren.CLOSE) {
      if (parens.pop() !== Paren.OPEN) {
        throw "brackets don't balance";
      }
      stack.push({ type: TokenType.PAREN, value: Paren.CLOSE });
      lastToken = TokenType.PAREN;
    } else {
      throw "Invalid character";
    }

    position++;
  }

  if (parens.length) {
    throw "brackets don't balance";
  }

  return stack;
}
