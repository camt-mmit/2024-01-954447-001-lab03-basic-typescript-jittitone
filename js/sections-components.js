import { assignComponent as assignInputComponent } from './inputs-components.js';
function createComponent(template) {
    return template.content.cloneNode(true)
        .firstElementChild;
}
export function assignComponent(element) {
    const template = element.querySelector('template.app-tmpl-section');
    if (template === null) {
        throw new Error('template.app-tmpl-input not found');
    }
    const container = template.parentElement;
    if (container === null) {
        throw new Error('cannot found template parent');
    }
    const updateSectionComponent = () => {
        [...container.querySelectorAll('.app-cmp-section')].forEach((sectionComponent, index, sectionComponents) => {
            console.debug(sectionComponents);
            [
                ...sectionComponent.querySelectorAll('.app-elem-section-title-no'),
            ].forEach((element) => (element.textContent = `${index + 1}`));
            [
                ...sectionComponent.querySelectorAll('.add-cmd-remove-section'),
            ].forEach((element) => (element.disabled = sectionComponents.length === 1));
        });
    };
    const addComponent = () => {
        const sectionComponent = createComponent(template);
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
            if (ev.target?.matches('.add-cmd-remove-section')) {
                sectionComponent.remove();
                updateSectionComponent();
            }
        });
        updateSectionComponent();
    };
    element.addEventListener('click', (ev) => {
        if (ev.target?.matches('.app-cmd-add-section')) {
            addComponent();
        }
    });
    addComponent();
}
