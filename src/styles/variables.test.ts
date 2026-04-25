import { describe, it, expect } from 'vitest';
import variablesCss from './variables.css?inline';

describe('Design Tokens', () => {
  it('should export variables.css with color tokens', () => {
    expect(variablesCss).toContain('--color-primary');
    expect(variablesCss).toContain('--color-background');
    expect(variablesCss).toContain('--color-surface');
    expect(variablesCss).toContain('--color-on-surface');
    expect(variablesCss).toContain('--color-primary-container');
  });

  it('should export variables.css with font tokens', () => {
    expect(variablesCss).toContain('--font-headline');
    expect(variablesCss).toContain('--font-body');
    expect(variablesCss).toContain('Inter');
  });

  it('should export variables.css with radius tokens', () => {
    expect(variablesCss).toContain('--radius-DEFAULT');
    expect(variablesCss).toContain('--radius-lg');
    expect(variablesCss).toContain('--radius-xl');
    expect(variablesCss).toContain('--radius-2xl');
  });
});
