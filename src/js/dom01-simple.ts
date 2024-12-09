document.addEventListener('DOMContentLoaded', () => {
  const inputConponents = [
    ...document.querySelectorAll<HTMLInputElement>(
      'input[type="number"].app-elem-input',
    ),
  ];

  const computeResult = () => {
    const result = inputConponents.reduce(
      (result, inputConponent) => result + inputConponent.valueAsNumber,
      0,
    );
    const output = document.querySelector<HTMLOutputElement>(
      'output.app-elem-result',
    );

    if (output !== null) {
      output.value = `${result}`;
    } else {
      console.error('output.app-elem-result not found');
    }
  };

  inputConponents.forEach((inputConponents) => {
    inputConponents.addEventListener('change', computeResult);
  });

  computeResult();
});
