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

  // Search functionality tests
  it('renders search input', () => {
    render(<App />);
    expect(screen.getAllByLabelText('Notlarda ara')).toHaveLength(2);
  });

  it('filters notes when typing in search box', async () => {
    localStorage.setItem(
      'setfarm-notlar',
      JSON.stringify([
        {
          id: 'note-1',
          title: 'Market Alışverişi',
          content: 'Süt, ekmek, yumurta al.',
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 'note-2',
          title: 'Proje Sunumu',
          content: 'Pazartesi saat 10:00.',
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ])
    );
    render(<App />);

    const searchInput = screen.getByTestId('search-input-desktop');
    fireEvent.change(searchInput, { target: { value: 'Market' } });

    await waitFor(() => {
      const titles = screen.getAllByTestId('note-title');
      expect(titles).toHaveLength(1);
      expect(titles[0]).toHaveTextContent('Market Alışverişi');
    });
  });

  it('filters notes by content', async () => {
    localStorage.setItem(
      'setfarm-notlar',
      JSON.stringify([
        {
          id: 'note-1',
          title: 'Market Alışverişi',
          content: 'Süt, ekmek, yumurta al.',
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 'note-2',
          title: 'Proje Sunumu',
          content: 'Pazartesi saat 10:00.',
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ])
    );
    render(<App />);

    const searchInput = screen.getByTestId('search-input-desktop');
    fireEvent.change(searchInput, { target: { value: 'Pazartesi' } });

    await waitFor(() => {
      const titles = screen.getAllByTestId('note-title');
      expect(titles).toHaveLength(1);
      expect(titles[0]).toHaveTextContent('Proje Sunumu');
    });
  });

  it('shows no results state when search has no matches', async () => {
    localStorage.setItem(
      'setfarm-notlar',
      JSON.stringify([
        {
          id: 'note-1',
          title: 'Market Alışverişi',
          content: 'Süt, ekmek, yumurta al.',
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ])
    );
    render(<App />);

    const searchInput = screen.getByTestId('search-input-desktop');
    fireEvent.change(searchInput, { target: { value: 'olmayan bir not' } });

    await waitFor(() => {
      expect(screen.getByText('Sonuç bulunamadı.')).toBeInTheDocument();
      expect(screen.getByText(/olmayan bir not/)).toBeInTheDocument();
    });
  });

  it('clears search when clear button is clicked', async () => {
    localStorage.setItem(
      'setfarm-notlar',
      JSON.stringify([
        {
          id: 'note-1',
          title: 'Market Alışverişi',
          content: 'Süt, ekmek, yumurta al.',
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ])
    );
    render(<App />);

    const searchInput = screen.getByTestId('search-input-desktop');
    fireEvent.change(searchInput, { target: { value: 'test' } });

    await waitFor(() => {
      expect(screen.getByLabelText('Aramayı temizle')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByLabelText('Aramayı temizle'));

    await waitFor(() => {
      expect(searchInput).toHaveValue('');
      expect(screen.getByTestId('note-card')).toBeInTheDocument();
    });
  });

  it('shows all notes when search is cleared', async () => {
    localStorage.setItem(
      'setfarm-notlar',
      JSON.stringify([
        {
          id: 'note-1',
          title: 'Market Alışverişi',
          content: 'Süt, ekmek, yumurta al.',
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 'note-2',
          title: 'Proje Sunumu',
          content: 'Pazartesi saat 10:00.',
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ])
    );
    render(<App />);

    const searchInput = screen.getByTestId('search-input-desktop');
    fireEvent.change(searchInput, { target: { value: 'Market' } });

    await waitFor(() => {
      expect(screen.getAllByTestId('note-title')).toHaveLength(1);
    });

    fireEvent.click(screen.getByLabelText('Aramayı temizle'));

    await waitFor(() => {
      expect(screen.getAllByTestId('note-title')).toHaveLength(2);
    });
  });

  it('clears search via "Aramayı Temizle" button in no results state', async () => {
    localStorage.setItem(
      'setfarm-notlar',
      JSON.stringify([
        {
          id: 'note-1',
          title: 'Market Alışverişi',
          content: 'Süt, ekmek, yumurta al.',
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ])
    );
    render(<App />);

    const searchInput = screen.getByTestId('search-input-desktop');
    fireEvent.change(searchInput, { target: { value: 'olmayan bir not' } });

    await waitFor(() => {
      expect(screen.getByText('Sonuç bulunamadı.')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Aramayı Temizle'));

    await waitFor(() => {
      expect(searchInput).toHaveValue('');
      expect(screen.getByTestId('note-card')).toBeInTheDocument();
      expect(screen.queryByText('Sonuç bulunamadı.')).not.toBeInTheDocument();
    });
  });

  it('search is case-insensitive', async () => {
    localStorage.setItem(
      'setfarm-notlar',
      JSON.stringify([
        {
          id: 'note-1',
          title: 'Market Alışverişi',
          content: 'Süt, ekmek, yumurta al.',
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ])
    );
    render(<App />);

    const searchInput = screen.getByTestId('search-input-desktop');
    fireEvent.change(searchInput, { target: { value: 'MARKET' } });

    await waitFor(() => {
      const titles = screen.getAllByTestId('note-title');
      expect(titles).toHaveLength(1);
      expect(titles[0]).toHaveTextContent('Market Alışverişi');
    });
  });
});
