import { assignComponent as assignInputComponent } from './inputs-components.js';

function createComponent(template: HTMLTemplateElement) {
  return (template.content.cloneNode(true) as DocumentFragment)
    .firstElementChild;
}

export function assignComponent(element: HTMLElement) {
  const template = element.querySelector<HTMLTemplateElement>(
    'template.app-tmpl-section',
  );

  if (template === null) {
    throw new Error('template.app-tmpl-input not found');
  }

  const container = template.parentElement;

  if (container === null) {
    throw new Error('cannot found template parent');
  }

  const updateSectionComponent = () => {
    [...container.querySelectorAll('.app-cmp-section')].forEach(
      (sectionComponent, index, sectionComponents) => {
        console.debug(sectionComponents);
        [
          ...sectionComponent.querySelectorAll('.app-elem-section-title-no'),
        ].forEach((element) => (element.textContent = `${index + 1}`));
        [
          ...sectionComponent.querySelectorAll<
            HTMLElement & { disabled: boolean }
          >('.add-cmd-remove-section'),
        ].forEach(
          (element) => (element.disabled = sectionComponents.length === 1),
        );
      },
    );
  };

  const addComponent = () => {
    const sectionComponent = createComponent(template) as HTMLElement;
    if (sectionComponent === null) {
      throw new Error('cannot found sectioncomponent');
    }

    container.append(sectionComponent);
    assignInputComponent(sectionComponent);

    const title = sectionComponent.querySelector('.app-elem-section-title-no');

    if (title === null) {
      throw new Error('app-elem-section-title-no not found');
    }

    sectionComponent.addEventListener('click', (ev) => {
      if (
        (ev.target as HTMLElement | null)?.matches('.add-cmd-remove-section')
      ) {
        sectionComponent.remove();
        updateSectionComponent();
      }
    });

    updateSectionComponent();
  };

  element.addEventListener('click', (ev) => {
    if ((ev.target as HTMLElement | null)?.matches('.app-cmd-add-section')) {
      addComponent();
    }
  });

  addComponent();
}
