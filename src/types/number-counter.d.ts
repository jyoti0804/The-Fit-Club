declare module 'number-counter' {
  interface NumberCounterProps {
    start?: number;
    end: number;
    delay?: number;
    preFix?: string;
    postFix?: string;
  }

  const NumberCounter: React.FC<NumberCounterProps>;
  export default NumberCounter;
}


