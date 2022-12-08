import React from 'react';
import { ModuleContent, ModuleComponent, ModuleTitle } from '../Styles';

interface Props {
  title: string;
  children?: React.ReactNode;
}

export const ModulePlaceholder = ({ children, title }: Props) => {
  return (
    <ModuleComponent>
      <ModuleContent>{children}</ModuleContent>
      <ModuleTitle>{title}</ModuleTitle>
    </ModuleComponent>
  );
};
