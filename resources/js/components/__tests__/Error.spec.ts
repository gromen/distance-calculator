import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Error from '../Error.vue';

describe('Error', () => {
  it('renders error message correctly', () => {
    const message = 'Test error message';
    const wrapper = mount(Error, {
      props: { message },
    });

    expect(wrapper.text()).toBe(message);
    expect(wrapper.classes()).toContain('text-red-600');
  });
});
