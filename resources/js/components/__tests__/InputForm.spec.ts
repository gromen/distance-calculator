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
        step: '0.000001',
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

  it('validates latitude range correctly', async () => {
    const wrapper = mount(InputForm, {
      props: { ...defaultProps, id: 'startLat' },
    });
    const input = wrapper.find('input');

    expect(input.attributes('min')).toBe('-90');
    expect(input.attributes('max')).toBe('90');
  });

  it('validates longitude range correctly', async () => {
    const wrapper = mount(InputForm, {
      props: { ...defaultProps, id: 'startLong' },
    });
    const input = wrapper.find('input');

    expect(input.attributes('min')).toBe('-180');
    expect(input.attributes('max')).toBe('180');
  });

  it('shows appropriate error message for invalid latitude', async () => {
    const wrapper = mount(InputForm, {
      props: { ...defaultProps, id: 'startLat', modelValue: 91 },
    });

    expect(wrapper.findComponent({ name: 'Error' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'Error' }).props('message')).toBe(
      'Latitude should be range from (-90, 90)'
    );
  });

  it('shows appropriate error message for invalid longitude', () => {
    const wrapper = mount(InputForm, {
      props: {
        ...defaultProps,
        modelValue: -181,
      },
    });

    console.log('Props:', wrapper.props());

    expect(wrapper.findComponent({ name: 'Error' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'Error' }).props('message')).toBe(
      'Longitude should be range from (-180, 180)'
    );
  });
});
