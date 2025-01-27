import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import LocationNames from '../LocationNames.vue';

describe('LocationNames', () => {
  const defaultProps = {
    startLocation: 'Warsaw',
    endLocation: 'Berlin',
    distance: {
      meters: 1000,
      kilometers: 1,
    },
  };

  it('renders all location information when provided', () => {
    const wrapper = mount(LocationNames, { props: defaultProps });

    expect(wrapper.text()).toContain('Start location: Warsaw');
    expect(wrapper.text()).toContain('End location: Berlin');
    expect(wrapper.text()).toContain('Distance: 1000 m, 1 km');
  });

  it('does not render information when props are null', () => {
    const wrapper = mount(LocationNames, {
      props: {
        startLocation: null,
        endLocation: null,
        distance: null,
      },
    });

    expect(wrapper.text()).not.toContain('Start location');
    expect(wrapper.text()).not.toContain('End location');
    expect(wrapper.text()).not.toContain('Distance');
  });
});
