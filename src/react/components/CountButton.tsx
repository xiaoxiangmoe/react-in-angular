import { Button } from 'antd';
import { useState } from 'react';

type CountButtonProps = {
  readonly color: string;
  readonly onSyncCount: (count: number) => void;
};

export function CountButton({ color, onSyncCount }: CountButtonProps) {
  const [count, setCount] = useState(0);
  return (
    <>
      <Button
        style={{ color }}
        onClick={() => {
          setCount(count => 1 + count);
        }}
      >
        This is CountButton, count is {count}
      </Button>
      <Button
        type="primary"
        onClick={() => {
          onSyncCount(count);
        }}
      >
        Sync count
      </Button>
    </>
  );
}
