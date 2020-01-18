import React, { useState, useEffect, useMemo } from 'react';
import { interpret, StateNode } from 'xstate';

import { StyledApp } from './App';
import { StyledStateChart, toMachine } from './StateChart';
import { StateChartContainer } from './VizTabs';

interface PreviewStateChartProps {
  machine: StateNode<any> | string;
}

export const PreviewStateChart: React.FC<PreviewStateChartProps> = (props) => {
  const [machine, setMachine] = useState(toMachine(props.machine));

  useEffect(() => {
    setMachine(toMachine(props.machine));
  }, [props.machine]);

  const service = useMemo(() => {
    return interpret(machine).start();
  }, [machine]);


  return (
    <StyledApp data-layout="viz">
      <StyledStateChart
        style={{
          background: 'var(--color-app-background)'
        }}
      >
        <StateChartContainer service={service} onReset={() => {}} />
      </StyledStateChart>
    </StyledApp>
  );
}
