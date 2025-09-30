import clsx from 'clsx';

const Price = ({
  amount,
  className,
  currencyCode = 'USD',
  currencyCodeClassName
}: {
  amount: string | number;
  className?: string;
  currencyCode: string;
  currencyCodeClassName?: string;
} & React.ComponentProps<'p'>) => {
  // Handle both string and number inputs, and handle NaN cases
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  const displayAmount = isNaN(numericAmount) ? 0 : numericAmount;
  
  return (
    <p suppressHydrationWarning={true} className={className}>
      {`${new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: currencyCode,
        currencyDisplay: 'narrowSymbol'
      }).format(displayAmount)}`}
      <span className={clsx('ml-1 inline', currencyCodeClassName)}>{`${currencyCode}`}</span>
    </p>
  );
};

export default Price;
