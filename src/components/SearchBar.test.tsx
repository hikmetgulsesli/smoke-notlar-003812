import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  it('renders with placeholder', () => {
    render(
      <SearchBar
        value=""
        onChange={vi.fn()}
        onClear={vi.fn()}
        placeholder="Notlarda ara..."
      />
    );
    expect(screen.getByPlaceholderText('Notlarda ara...')).toBeInTheDocument();
  });

  it('displays the current value', () => {
    render(
      <SearchBar
        value="test arama"
        onChange={vi.fn()}
        onClear={vi.fn()}
      />
    );
    expect(screen.getByDisplayValue('test arama')).toBeInTheDocument();
  });

  it('calls onChange when user types', () => {
    const onChange = vi.fn();
    render(
      <SearchBar
        value=""
        onChange={onChange}
        onClear={vi.fn()}
      />
    );

    const input = screen.getByLabelText('Notlarda ara');
    fireEvent.change(input, { target: { value: 'yeni arama' } });

    expect(onChange).toHaveBeenCalledWith('yeni arama');
  });

  it('shows clear button when value is not empty', () => {
    render(
      <SearchBar
        value="test"
        onChange={vi.fn()}
        onClear={vi.fn()}
      />
    );

    expect(screen.getByLabelText('Aramayı temizle')).toBeInTheDocument();
  });

  it('does not show clear button when value is empty', () => {
    render(
      <SearchBar
        value=""
        onChange={vi.fn()}
        onClear={vi.fn()}
      />
    );

    expect(screen.queryByLabelText('Aramayı temizle')).not.toBeInTheDocument();
  });

  it('calls onClear when clear button is clicked', () => {
    const onClear = vi.fn();
    render(
      <SearchBar
        value="test"
        onChange={vi.fn()}
        onClear={onClear}
      />
    );

    const clearButton = screen.getByLabelText('Aramayı temizle');
    fireEvent.click(clearButton);

    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it('renders desktop variant by default', () => {
    render(
      <SearchBar
        value=""
        onChange={vi.fn()}
        onClear={vi.fn()}
      />
    );

    const input = screen.getByTestId('search-input-desktop');
    expect(input).toHaveClass('py-2');
    expect(input).toHaveClass('rounded-xl');
  });

  it('renders mobile variant when specified', () => {
    render(
      <SearchBar
        value=""
        onChange={vi.fn()}
        onClear={vi.fn()}
        variant="mobile"
      />
    );

    const input = screen.getByTestId('search-input-mobile');
    expect(input).toHaveClass('py-4');
    expect(input).toHaveClass('rounded-2xl');
    expect(input).toHaveClass('text-lg');
  });

  it('has correct aria attributes', () => {
    render(
      <SearchBar
        value="test"
        onChange={vi.fn()}
        onClear={vi.fn()}
      />
    );

    expect(screen.getByLabelText('Notlarda ara')).toBeInTheDocument();
    expect(screen.getByLabelText('Aramayı temizle')).toBeInTheDocument();
  });
});
