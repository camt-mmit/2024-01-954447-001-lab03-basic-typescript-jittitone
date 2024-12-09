import { assignComponent } from './sections-components.js';

const element = document.querySelector<HTMLTemplateElement>('.app-cmp-main');

if (element === null) {
  throw new Error('app-cmp-main not found');
}

assignComponent(element);
