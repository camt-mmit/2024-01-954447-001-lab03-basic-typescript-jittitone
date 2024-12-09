function createComponent(template: HTMLTemplateElement) {
  return (template.content.cloneNode(true) as DocumentFragment)
    .firstElementChild;
}

export function assignComponent(element: HTMLElement) {
  const template = element.querySelector<HTMLTemplateElement>(
    'template.app-tmpl-input',
  );

  if (template === null) {
    throw new Error('template.app-tmpl-input not found');
  }

  const container = template.parentElement;

  if (container === null) {
    throw new Error('cannot found template parent');
  }

  const computeResult = () => {
    const inputElements = [
      ...container.querySelectorAll<HTMLInputElement>(
        'input[type="number"].app-elem-input',
      ),
    ];

    const result = inputElements.reduce(
      (result, inputElement) => result + inputElement.valueAsNumber,
      0,
    );

    [
      ...element.querySelectorAll<HTMLOutputElement>('output.app-elem-result'),
    ].forEach((output) => (output.value = `${result.toLocaleString()}`));
  };

  const updateComponent = () => {
    [...container.querySelectorAll('.app-cmp-input')].forEach(
      (inputComponent, index, inputComponents) => {
        [
          ...inputComponent.querySelectorAll('.app-elem-input-title-no'),
        ].forEach((element) => (element.textContent = `${index + 1}`));
        [
          ...inputComponent.querySelectorAll<
            HTMLElement & { disabled: boolean }
          >('.add-cmd-remove-input'),
        ].forEach(
          (element) => (element.disabled = inputComponents.length === 1),
        );
      },
    );
  };

  const addComponent = () => {
    const inputComponent = createComponent(template);

    if (inputComponent === null) {
      throw new Error('app-cmp-input not found');
    }

    const title = inputComponent.querySelector('.app-elem-input-title-no');

    if (title === null) {
      throw new Error('app-elem-input-title-no not found');
    }

    title.textContent = `${
      container.querySelectorAll('.app-cmp-input').length + 1
    }`;
    container.append(inputComponent);

    inputComponent.addEventListener('change', (ev) => {
      if (
        (ev.target as HTMLElement | null)?.matches(
          'input[type="number"].app-elem-input',
        )
      ) {
        computeResult();
      }
    });

    inputComponent.addEventListener('click', (ev) => {
      if ((ev.target as HTMLElement | null)?.matches('.add-cmd-remove-input')) {
        inputComponent.remove();
        updateComponent();
        computeResult();
      }
    });

    updateComponent();
    computeResult();
  };

  element.addEventListener('click', (ev) => {
    if ((ev.target as HTMLElement | null)?.matches('.app-cmd-add-input')) {
      addComponent();
    }
  });

  addComponent();
}
