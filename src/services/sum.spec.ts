import { it, describe, expect } from "vitest";
import { sum, sumCurrency } from "./sum";

describe("sum service", () => {
  it("should calculate the correct sum of two numbers", () => {
    // Setup - Given
    // Execution - When
    // Expectation - Then
    expect(sum(5, 6)).toBe(11);
  });
  describe("sum currency", () => {
    it("should calculate the sum of two currency object", () => {
      expect(
        sumCurrency(
          { amount: 5, currencyName: "USD" },
          { amount: 6, currencyName: "USD" }
        )
      ).toBe(11);
    });
    it("should throw error if a amount is negative", () => {
      expect(() =>
        sumCurrency(
          { amount: -1, currencyName: "USD" },
          { amount: 10, currencyName: "USD" }
        )
      ).toThrowError();
    });
    it("should throw error if b amount is negative", () => {
      expect(() =>
        sumCurrency(
          { amount: 10, currencyName: "USD" },
          { amount: -1, currencyName: "USD" }
        )
      ).toThrowError();
    });
    it("should throw error if b amount is negative", () => {
        expect(() =>
          sumCurrency(
            { amount: 10, currencyName: "EUR" },
            { amount: 20, currencyName: "USD" }
          )
        ).toThrowError();
      });
  });
});
