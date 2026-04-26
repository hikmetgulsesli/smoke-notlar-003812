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
    expect(screen.getAllByLabelText('Notlarda ara')).toHaveLength(1);
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
      expect(screen.getByTestId('search-clear-desktop')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('search-clear-desktop'));

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

    fireEvent.click(screen.getByTestId('search-clear-desktop'));

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

    fireEvent.click(screen.getByTestId('clear-search-button'));

    await waitFor(() => {
      const inputs = screen.getAllByTestId('search-input-desktop');
      expect(inputs[0]).toHaveValue('');
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

  // Bottom navigation tests
  it('renders bottom navigation', () => {
    render(<App />);
    expect(screen.getByLabelText('Alt navigasyon')).toBeInTheDocument();
    expect(screen.getByTestId('bottom-nav-notes')).toBeInTheDocument();
    expect(screen.getByTestId('bottom-nav-archive')).toBeInTheDocument();
    expect(screen.getByTestId('bottom-nav-profile')).toBeInTheDocument();
  });

  it('switches to archive view when archive tab is clicked', async () => {
    localStorage.setItem(
      'setfarm-notlar',
      JSON.stringify([
        {
          id: 'note-1',
          title: 'Tamamlanan Not',
          content: 'İçerik',
          status: 'completed',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 'note-2',
          title: 'Aktif Not',
          content: 'İçerik 2',
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ])
    );
    render(<App />);

    const archiveTab = screen.getByTestId('bottom-nav-archive');
    fireEvent.click(archiveTab);

    await waitFor(() => {
      expect(screen.getByText('Arşivlenen Notlar')).toBeInTheDocument();
      expect(screen.getByText('Tamamlanan Not')).toBeInTheDocument();
      expect(screen.queryByText('Aktif Not')).not.toBeInTheDocument();
    });
  });

  it('switches to profile view when profile tab is clicked', async () => {
    localStorage.setItem(
      'setfarm-notlar',
      JSON.stringify([
        {
          id: 'note-1',
          title: 'Not 1',
          content: 'İçerik',
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 'note-2',
          title: 'Not 2',
          content: 'İçerik 2',
          status: 'completed',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ])
    );
    render(<App />);

    const profileTab = screen.getByTestId('bottom-nav-profile');
    fireEvent.click(profileTab);

    await waitFor(() => {
      expect(screen.getByText('Toplam Not')).toBeInTheDocument();
      expect(screen.getByText('Aktif')).toBeInTheDocument();
      expect(screen.getByText('Tamamlanan')).toBeInTheDocument();
    });
  });

  it('shows archive empty state when no completed notes exist', async () => {
    localStorage.setItem(
      'setfarm-notlar',
      JSON.stringify([
        {
          id: 'note-1',
          title: 'Aktif Not',
          content: 'İçerik',
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ])
    );
    render(<App />);

    const archiveTab = screen.getByTestId('bottom-nav-archive');
    fireEvent.click(archiveTab);

    await waitFor(() => {
      expect(screen.getByText('Henüz arşivlenmiş not yok.')).toBeInTheDocument();
    });
  });

  it('shows mobile search toggle button', () => {
    render(<App />);
    expect(screen.getByTestId('mobile-search-toggle')).toBeInTheDocument();
  });

  it('toggles mobile search bar when mobile search button is clicked', async () => {
    render(<App />);

    const toggleButton = screen.getByTestId('mobile-search-toggle');

    // Initially hidden
    expect(screen.queryByTestId('search-input-mobile')).not.toBeInTheDocument();

    // Show search
    fireEvent.click(toggleButton);
    await waitFor(() => {
      expect(screen.getByTestId('search-input-mobile')).toBeInTheDocument();
    });

    // Hide search
    fireEvent.click(toggleButton);
    await waitFor(() => {
      expect(screen.queryByTestId('search-input-mobile')).not.toBeInTheDocument();
    });
  });

  it('returns to notes view when notes tab is clicked from another view', async () => {
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

    // Go to profile
    fireEvent.click(screen.getByTestId('bottom-nav-profile'));
    await waitFor(() => {
      expect(screen.getByText('Toplam Not')).toBeInTheDocument();
    });

    // Return to notes
    fireEvent.click(screen.getByTestId('bottom-nav-notes'));
    await waitFor(() => {
      expect(screen.getByText('Son Notlar')).toBeInTheDocument();
      expect(screen.getByTestId('note-card')).toBeInTheDocument();
    });
  });

  it('archived notes can be toggled back to active from archive view', async () => {
    localStorage.setItem(
      'setfarm-notlar',
      JSON.stringify([
        {
          id: 'note-1',
          title: 'Arşiv Notu',
          content: 'İçerik',
          status: 'completed',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ])
    );
    render(<App />);

    fireEvent.click(screen.getByTestId('bottom-nav-archive'));
    await waitFor(() => {
      expect(screen.getByText('Arşivlenen Notlar')).toBeInTheDocument();
    });

    const toggleButton = screen.getByTestId('note-toggle');
    fireEvent.click(toggleButton);

    await waitFor(() => {
      // After toggling to active, it disappears from archive view
      expect(screen.getByText('Henüz arşivlenmiş not yok.')).toBeInTheDocument();
    });
  });

  it('displays error state when localStorage has corrupted data', () => {
    localStorage.setItem('setfarm-notlar', 'not-valid-json');
    render(<App />);

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Bir Sorun Oluştu')).toBeInTheDocument();
  });

  it('clears error state when close button is clicked', () => {
    localStorage.setItem('setfarm-notlar', 'not-valid-json');
    render(<App />);

    expect(screen.getByRole('alert')).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: /kapat/i });
    fireEvent.click(closeButton);

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('does not show error banner when localStorage is valid', () => {
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

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
