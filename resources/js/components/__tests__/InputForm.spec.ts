import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import InputForm from '../InputForm.vue';

describe('InputForm', () => {
  const defaultProps = {
    id: 'testInput',
    label: 'Test Label',
    placeholder: 'Enter value',
    modelValue: 0,
    isValid: true,
    errorMessage: 'Test error',
  };

  it('renders with correct props', () => {
    const wrapper = mount(InputForm, { props: defaultProps });

    expect(wrapper.find('label').text()).toBe('Test Label');
    expect(wrapper.find('input').attributes()).toEqual(
      expect.objectContaining({
        id: 'testInput',
        placeholder: 'Enter value',
        type: 'number',
        step: '0.1',
      })
    );
  });

  it('emits update:modelValue when input changes', async () => {
    const wrapper = mount(InputForm, { props: defaultProps });
    const input = wrapper.find('input');

    await input.setValue('42');

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['42']);
  });

  it('shows error component when input is empty', async () => {
    const wrapper = mount(InputForm, { props: defaultProps });
    const input = wrapper.find('input');

    await input.setValue('');

    expect(wrapper.findComponent({ name: 'Error' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'Error' }).props('message')).toBe(
      'This field cannot be empty'
    );
  });

  it('shows validation error when isValid is false', () => {
    const wrapper = mount(InputForm, {
      props: { ...defaultProps, isValid: false },
    });

    expect(wrapper.findComponent({ name: 'Error' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'Error' }).props('message')).toBe(
      'Test error'
    );
  });

  it('does not show error when input is valid', () => {
    const wrapper = mount(InputForm, { props: defaultProps });

    expect(wrapper.findComponent({ name: 'Error' }).exists()).toBe(false);
  });

  it('handles numeric input correctly', async () => {
    const wrapper = mount(InputForm, { props: defaultProps });
    const input = wrapper.find('input');

    await input.setValue('12.345');

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['12.345']);
  });
});
