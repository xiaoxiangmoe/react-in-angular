import type { Injector } from '@angular/core';
import { useContext, createContext } from 'react';

export const AngularInjectorContext = createContext<Injector>(null!);

export const useAngularInjector = () => useContext(AngularInjectorContext);
