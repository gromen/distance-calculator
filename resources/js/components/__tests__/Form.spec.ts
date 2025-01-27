import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import Form from '../Form.vue';
import { useDistanceCalculator } from '../../composables/useDistanceCalculator';
import { ref, computed } from 'vue';

// Mock useDistanceCalculator
vi.mock('../../composables/useDistanceCalculator', () => ({
  useDistanceCalculator: vi.fn(),
}));

describe('Form', () => {
  const mockCalculateDistance = vi.fn();

  const setupMock = (overrides = {}) => {
    const defaultValues = {
      coordinates: ref({
        startLat: 0,
        startLng: 0,
        endLat: 0,
        endLng: 0,
      }),
      startLocation: ref(null),
      endLocation: ref(null),
      distance: ref(null),
      validationResult: computed(() => ({
        isValid: true,
        errors: {
          startLat: true,
          startLng: true,
          endLat: true,
          endLng: true,
        },
      })),
      isLoading: ref(false),
      error: ref(null),
      calculateDistance: mockCalculateDistance,
    };

    vi.mocked(useDistanceCalculator).mockReturnValue({
      ...defaultValues,
      ...overrides,
    });
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders form with input fields', () => {
    setupMock();
    const wrapper = mount(Form);

    expect(wrapper.findAllComponents({ name: 'InputForm' })).toHaveLength(4);
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
  });

  it('disables submit button when validation fails', () => {
    setupMock({
      validationResult: computed(() => ({ isValid: false, errors: {} })),
    });
    const wrapper = mount(Form);

    expect(
      wrapper.find('button[type="submit"]').attributes('disabled')
    ).toBeDefined();
  });

  it('shows loading spinner when isLoading is true', () => {
    setupMock({
      isLoading: ref(true),
    });
    const wrapper = mount(Form);

    expect(wrapper.findComponent({ name: 'LoadingSpinner' }).exists()).toBe(
      true
    );
  });

  it('shows error message when error exists', () => {
    const errorMessage = 'Test error';
    setupMock({
      error: ref(errorMessage),
    });
    const wrapper = mount(Form);

    expect(wrapper.text()).toContain(errorMessage);
  });

  it('calls calculateDistance on form submit', async () => {
    setupMock();
    const wrapper = mount(Form);

    await wrapper.find('form').trigger('submit.prevent');

    expect(mockCalculateDistance).toHaveBeenCalled();
  });
});
