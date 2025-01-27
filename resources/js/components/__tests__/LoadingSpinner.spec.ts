import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import LoadingSpinner from '../LoadingSpinner.vue';

describe('LoadingSpinner', () => {
  it('renders spinner with correct classes', () => {
    const wrapper = mount(LoadingSpinner);

    expect(wrapper.find('[role="status"]').exists()).toBe(true);
    expect(wrapper.find('.animate-spin').exists()).toBe(true);
  });
});
