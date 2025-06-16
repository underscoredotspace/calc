import { lexer, Op, Paren, TokenType } from "./lexer";

test("should tokenise simple addition", () => {
  const tokens = lexer("1+2");

  expect(tokens).toStrictEqual([
    { type: TokenType.NUMBER, value: 1 },
    { type: TokenType.OPERATOR, value: Op.PLUS },
    { type: TokenType.NUMBER, value: 2 },
  ]);
});

test("should tokenise simple subtraction", () => {
  const tokens = lexer("1-2");

  expect(tokens).toStrictEqual([
    { type: TokenType.NUMBER, value: 1 },
    { type: TokenType.OPERATOR, value: Op.MINUS },
    { type: TokenType.NUMBER, value: 2 },
  ]);
});

test("should tokenise simple multiplication", () => {
  const tokens = lexer("1*2");

  expect(tokens).toStrictEqual([
    { type: TokenType.NUMBER, value: 1 },
    { type: TokenType.OPERATOR, value: Op.MULT },
    { type: TokenType.NUMBER, value: 2 },
  ]);
});

test("should tokenise simple division", () => {
  const tokens = lexer("1/2");

  expect(tokens).toStrictEqual([
    { type: TokenType.NUMBER, value: 1 },
    { type: TokenType.OPERATOR, value: Op.DIV },
    { type: TokenType.NUMBER, value: 2 },
  ]);
});

test("should ignore spaces", () => {
  const tokens = lexer("1 + 2");

  expect(tokens).toStrictEqual([
    { type: TokenType.NUMBER, value: 1 },
    { type: TokenType.OPERATOR, value: Op.PLUS },
    { type: TokenType.NUMBER, value: 2 },
  ]);
});

test("should handle multi-digit numbers", () => {
  const tokens = lexer("11 + 402");

  expect(tokens).toStrictEqual([
    { type: TokenType.NUMBER, value: 11 },
    { type: TokenType.OPERATOR, value: Op.PLUS },
    { type: TokenType.NUMBER, value: 402 },
  ]);
});

test("should handle brackets", () => {
  const tokens = lexer("11 + 402 + (1-2)");

  expect(tokens).toStrictEqual([
    { type: TokenType.NUMBER, value: 11 },
    { type: TokenType.OPERATOR, value: Op.PLUS },
    { type: TokenType.NUMBER, value: 402 },
    { type: TokenType.OPERATOR, value: Op.PLUS },
    { type: TokenType.PAREN, value: Paren.OPEN },
    { type: TokenType.NUMBER, value: 1 },
    { type: TokenType.OPERATOR, value: Op.MINUS },
    { type: TokenType.NUMBER, value: 2 },
    { type: TokenType.PAREN, value: Paren.CLOSE },
  ]);
});

test("should throw when brackets don't balance", () => {
  expect(() => lexer("())")).toThrowError("brackets don't balance");
  expect(() => lexer("(()")).toThrowError("brackets don't balance");
});
