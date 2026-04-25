import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('renders header with app title', () => {
    render(<App />);
    expect(screen.getByText('smoke-notlar')).toBeInTheDocument();
  });

  it('renders NoteForm', () => {
    render(<App />);
    expect(screen.getByLabelText('Not başlığı')).toBeInTheDocument();
    expect(screen.getByLabelText('Not içeriği')).toBeInTheDocument();
  });

  it('shows empty state when there are no notes', () => {
    render(<App />);
    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
    expect(screen.getByText('Henüz not eklemediniz.')).toBeInTheDocument();
    expect(screen.getByText('Yukarıdaki formu kullanarak ilk notunuzu hemen ekleyin.')).toBeInTheDocument();
  });

  it('does not show empty state when notes exist', () => {
    localStorage.setItem(
      'setfarm-notlar',
      JSON.stringify([
        {
          id: 'note-1',
          title: 'Test Notu',
          content: 'İçerik',
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ])
    );
    render(<App />);
    expect(screen.queryByTestId('empty-state')).not.toBeInTheDocument();
    expect(screen.getByTestId('note-card')).toBeInTheDocument();
  });

  it('adds a new note and renders it in the list', async () => {
    render(<App />);

    const titleInput = screen.getByLabelText('Not başlığı');
    const contentInput = screen.getByLabelText('Not içeriği');
    const submitButton = screen.getByRole('button', { name: /ekle/i });

    fireEvent.change(titleInput, { target: { value: 'Yeni Not' } });
    fireEvent.change(contentInput, { target: { value: 'Bu bir test notudur.' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByTestId('empty-state')).not.toBeInTheDocument();
      expect(screen.getByTestId('note-card')).toBeInTheDocument();
      expect(screen.getByTestId('note-title')).toHaveTextContent('Yeni Not');
      expect(screen.getByTestId('note-content')).toHaveTextContent('Bu bir test notudur.');
    });
  });

  it('toggles note status when checkbox is clicked', async () => {
    localStorage.setItem(
      'setfarm-notlar',
      JSON.stringify([
        {
          id: 'note-1',
          title: 'Test Notu',
          content: 'İçerik',
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ])
    );
    render(<App />);

    const toggleButton = screen.getByTestId('note-toggle');
    const card = screen.getByTestId('note-card');

    expect(card).toHaveAttribute('data-status', 'active');

    fireEvent.click(toggleButton);

    await waitFor(() => {
      expect(card).toHaveAttribute('data-status', 'completed');
    });
  });

  it('deletes a note when delete button is clicked', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    localStorage.setItem(
      'setfarm-notlar',
      JSON.stringify([
        {
          id: 'note-1',
          title: 'Silinecek Not',
          content: 'İçerik',
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ])
    );
    render(<App />);

    expect(screen.getByTestId('note-card')).toBeInTheDocument();

    const deleteButton = screen.getByTestId('note-delete');
    fireEvent.click(deleteButton);

    await vi.advanceTimersByTimeAsync(200);

    await waitFor(() => {
      expect(screen.queryByTestId('note-card')).not.toBeInTheDocument();
      expect(screen.getByTestId('empty-state')).toBeInTheDocument();
    });

    vi.useRealTimers();
  });

  it('renders notes in chronological order (newest first)', () => {
    localStorage.setItem(
      'setfarm-notlar',
      JSON.stringify([
        {
          id: 'note-old',
          title: 'Eski Not',
          content: 'İçerik 1',
          status: 'active',
          createdAt: '2024-04-20T10:00:00.000Z',
          updatedAt: '2024-04-20T10:00:00.000Z',
        },
        {
          id: 'note-new',
          title: 'Yeni Not',
          content: 'İçerik 2',
          status: 'active',
          createdAt: '2024-04-26T10:00:00.000Z',
          updatedAt: '2024-04-26T10:00:00.000Z',
        },
      ])
    );
    render(<App />);

    const titles = screen.getAllByTestId('note-title');
    expect(titles[0]).toHaveTextContent('Yeni Not');
    expect(titles[1]).toHaveTextContent('Eski Not');
  });

  it('shows "Son Notlar" heading when notes exist', () => {
    localStorage.setItem(
      'setfarm-notlar',
      JSON.stringify([
        {
          id: 'note-1',
          title: 'Test',
          content: 'İçerik',
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ])
    );
    render(<App />);
    expect(screen.getByText('Son Notlar')).toBeInTheDocument();
  });
});
