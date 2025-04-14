import React from 'react';
import { Grid as MuiGrid } from '@mui/material';

interface GridProps {
  children: React.ReactNode;
  container?: boolean;
  item?: boolean;
  xs?: number | boolean | 'auto';
  sm?: number | boolean | 'auto';
  md?: number | boolean | 'auto';
  lg?: number | boolean | 'auto';
  xl?: number | boolean | 'auto';
  spacing?: number;
  [key: string]: any; // Allow any other props
}

const Grid: React.FC<GridProps> = (props) => {
  return <MuiGrid {...props} />;
};

export default Grid; 