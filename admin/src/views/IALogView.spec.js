import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import IALogView from './IALogView.vue';

describe('IALogView', () => {
  it('renderiza corretamente o título', () => {
    const wrapper = mount(IALogView);
    expect(wrapper.find('.ia-title').text()).toBe('Central de IAs');
  });

  it('exibe sugestões inteligentes', () => {
    const wrapper = mount(IALogView);
    expect(wrapper.find('.ia-suggestions-panel').exists()).toBe(true);
  });
});
