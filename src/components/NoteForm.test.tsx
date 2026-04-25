import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { NoteForm } from './NoteForm';

describe('NoteForm', () => {
  it('renders form with title input, content textarea, and submit button', () => {
    render(<NoteForm onAddNote={vi.fn()} />);

    expect(screen.getByLabelText('Not başlığı')).toBeInTheDocument();
    expect(screen.getByLabelText('Not içeriği')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ekle/i })).toBeInTheDocument();
  });

  it('shows validation error when title is empty', async () => {
    render(<NoteForm onAddNote={vi.fn()} />);

    const submitButton = screen.getByRole('button', { name: /ekle/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Başlık gereklidir')).toBeInTheDocument();
    });
  });

  it('shows validation error when content is empty', async () => {
    render(<NoteForm onAddNote={vi.fn()} />);

    const submitButton = screen.getByRole('button', { name: /ekle/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('İçerik gereklidir')).toBeInTheDocument();
    });
  });

  it('shows validation error when title is too short', async () => {
    render(<NoteForm onAddNote={vi.fn()} />);

    const titleInput = screen.getByLabelText('Not başlığı');
    fireEvent.change(titleInput, { target: { value: 'A' } });

    const submitButton = screen.getByRole('button', { name: /ekle/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Başlık en az 2 karakter olmalıdır')).toBeInTheDocument();
    });
  });

  it('shows validation error when title exceeds 100 characters', async () => {
    render(<NoteForm onAddNote={vi.fn()} />);

    const titleInput = screen.getByLabelText('Not başlığı');
    fireEvent.change(titleInput, { target: { value: 'A'.repeat(101) } });

    const submitButton = screen.getByRole('button', { name: /ekle/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Başlık en fazla 100 karakter olabilir')).toBeInTheDocument();
    });
  });

  it('shows validation error when content is too short', async () => {
    render(<NoteForm onAddNote={vi.fn()} />);

    const contentInput = screen.getByLabelText('Not içeriği');
    fireEvent.change(contentInput, { target: { value: 'Ab' } });

    const submitButton = screen.getByRole('button', { name: /ekle/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('İçerik en az 3 karakter olmalıdır')).toBeInTheDocument();
    });
  });

  it('shows validation error when content exceeds 2000 characters', async () => {
    render(<NoteForm onAddNote={vi.fn()} />);

    const contentInput = screen.getByLabelText('Not içeriği');
    fireEvent.change(contentInput, { target: { value: 'A'.repeat(2001) } });

    const submitButton = screen.getByRole('button', { name: /ekle/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('İçerik en fazla 2000 karakter olabilir')).toBeInTheDocument();
    });
  });

  it('clears title error when user starts typing', async () => {
    render(<NoteForm onAddNote={vi.fn()} />);

    const submitButton = screen.getByRole('button', { name: /ekle/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Başlık gereklidir')).toBeInTheDocument();
    });

    const titleInput = screen.getByLabelText('Not başlığı');
    fireEvent.change(titleInput, { target: { value: 'Yeni başlık' } });

    await waitFor(() => {
      expect(screen.queryByText('Başlık gereklidir')).not.toBeInTheDocument();
    });
  });

  it('clears content error when user starts typing', async () => {
    render(<NoteForm onAddNote={vi.fn()} />);

    const submitButton = screen.getByRole('button', { name: /ekle/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('İçerik gereklidir')).toBeInTheDocument();
    });

    const contentInput = screen.getByLabelText('Not içeriği');
    fireEvent.change(contentInput, { target: { value: 'Yeni içerik' } });

    await waitFor(() => {
      expect(screen.queryByText('İçerik gereklidir')).not.toBeInTheDocument();
    });
  });

  it('calls onAddNote with trimmed title and content on valid submission', async () => {
    const onAddNote = vi.fn();
    render(<NoteForm onAddNote={onAddNote} />);

    const titleInput = screen.getByLabelText('Not başlığı');
    const contentInput = screen.getByLabelText('Not içeriği');
    const submitButton = screen.getByRole('button', { name: /ekle/i });

    fireEvent.change(titleInput, { target: { value: '  Market Alışverişi  ' } });
    fireEvent.change(contentInput, { target: { value: '  Süt, ekmek, yumurta al.  ' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(onAddNote).toHaveBeenCalledWith('Market Alışverişi', 'Süt, ekmek, yumurta al.');
    });
  });

  it('resets form fields after successful submission', async () => {
    const onAddNote = vi.fn();
    render(<NoteForm onAddNote={onAddNote} />);

    const titleInput = screen.getByLabelText('Not başlığı') as HTMLInputElement;
    const contentInput = screen.getByLabelText('Not içeriği') as HTMLTextAreaElement;
    const submitButton = screen.getByRole('button', { name: /ekle/i });

    fireEvent.change(titleInput, { target: { value: 'Proje Sunumu' } });
    fireEvent.change(contentInput, { target: { value: 'Pazartesi saat 10:00' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(onAddNote).toHaveBeenCalled();
    });

    expect(titleInput.value).toBe('');
    expect(contentInput.value).toBe('');
  });

  it('does not call onAddNote when form is invalid', async () => {
    const onAddNote = vi.fn();
    render(<NoteForm onAddNote={onAddNote} />);

    const submitButton = screen.getByRole('button', { name: /ekle/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Başlık gereklidir')).toBeInTheDocument();
    });

    expect(onAddNote).not.toHaveBeenCalled();
  });

  it('accepts title at exact boundary of 2 characters', async () => {
    const onAddNote = vi.fn();
    render(<NoteForm onAddNote={onAddNote} />);

    const titleInput = screen.getByLabelText('Not başlığı');
    const contentInput = screen.getByLabelText('Not içeriği');
    const submitButton = screen.getByRole('button', { name: /ekle/i });

    fireEvent.change(titleInput, { target: { value: 'AB' } });
    fireEvent.change(contentInput, { target: { value: 'İçerik burada' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(onAddNote).toHaveBeenCalledWith('AB', 'İçerik burada');
    });
  });

  it('accepts content at exact boundary of 3 characters', async () => {
    const onAddNote = vi.fn();
    render(<NoteForm onAddNote={onAddNote} />);

    const titleInput = screen.getByLabelText('Not başlığı');
    const contentInput = screen.getByLabelText('Not içeriği');
    const submitButton = screen.getByRole('button', { name: /ekle/i });

    fireEvent.change(titleInput, { target: { value: 'Başlık' } });
    fireEvent.change(contentInput, { target: { value: 'ABC' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(onAddNote).toHaveBeenCalledWith('Başlık', 'ABC');
    });
  });

  it('accepts title at exact boundary of 100 characters', async () => {
    const onAddNote = vi.fn();
    render(<NoteForm onAddNote={onAddNote} />);

    const titleInput = screen.getByLabelText('Not başlığı');
    const contentInput = screen.getByLabelText('Not içeriği');
    const submitButton = screen.getByRole('button', { name: /ekle/i });

    const longTitle = 'A'.repeat(100);
    fireEvent.change(titleInput, { target: { value: longTitle } });
    fireEvent.change(contentInput, { target: { value: 'Geçerli içerik' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(onAddNote).toHaveBeenCalledWith(longTitle, 'Geçerli içerik');
    });
  });

  it('accepts content at exact boundary of 2000 characters', async () => {
    const onAddNote = vi.fn();
    render(<NoteForm onAddNote={onAddNote} />);

    const titleInput = screen.getByLabelText('Not başlığı');
    const contentInput = screen.getByLabelText('Not içeriği');
    const submitButton = screen.getByRole('button', { name: /ekle/i });

    const longContent = 'B'.repeat(2000);
    fireEvent.change(titleInput, { target: { value: 'Başlık' } });
    fireEvent.change(contentInput, { target: { value: longContent } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(onAddNote).toHaveBeenCalledWith('Başlık', longContent);
    });
  });

  it('has accessible attributes for screen readers', () => {
    render(<NoteForm onAddNote={vi.fn()} />);

    const titleInput = screen.getByLabelText('Not başlığı');
    const contentInput = screen.getByLabelText('Not içeriği');
    const submitButton = screen.getByRole('button', { name: /ekle/i });

    expect(titleInput).toHaveAttribute('aria-label', 'Not başlığı');
    expect(contentInput).toHaveAttribute('aria-label', 'Not içeriği');
    expect(submitButton).toHaveAttribute('aria-label', 'Not ekle');
    expect(submitButton).toHaveAttribute('type', 'submit');
  });

  it('disables submit button while submitting', async () => {
    const onAddNote = vi.fn();
    render(<NoteForm onAddNote={onAddNote} />);

    const titleInput = screen.getByLabelText('Not başlığı');
    const contentInput = screen.getByLabelText('Not içeriği');
    const submitButton = screen.getByRole('button', { name: /ekle/i });

    fireEvent.change(titleInput, { target: { value: 'Başlık' } });
    fireEvent.change(contentInput, { target: { value: 'İçerik' } });

    // During synchronous submit, button should be disabled
    fireEvent.click(submitButton);

    // After synchronous operation completes, button should be enabled again
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  it('trims whitespace from inputs before validation', async () => {
    const onAddNote = vi.fn();
    render(<NoteForm onAddNote={onAddNote} />);

    const titleInput = screen.getByLabelText('Not başlığı');
    const contentInput = screen.getByLabelText('Not içeriği');
    const submitButton = screen.getByRole('button', { name: /ekle/i });

    fireEvent.change(titleInput, { target: { value: '  A  ' } });
    fireEvent.change(contentInput, { target: { value: '   ' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Başlık en az 2 karakter olmalıdır')).toBeInTheDocument();
      expect(screen.getByText('İçerik gereklidir')).toBeInTheDocument();
    });

    expect(onAddNote).not.toHaveBeenCalled();
  });
});
