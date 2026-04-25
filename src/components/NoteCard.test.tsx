import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NoteCard } from './NoteCard';
import type { Note } from '../types';
import styles from './NoteCard.module.css';

const mockNote: Note = {
  id: 'note-1',
  title: 'Proje Toplantısı',
  content: 'Sprint planlaması için hedefler belirlendi.',
  status: 'active',
  createdAt: '2024-04-26T10:30:00.000Z',
  updatedAt: '2024-04-26T10:30:00.000Z',
};

const mockCompletedNote: Note = {
  id: 'note-2',
  title: 'E-postaları Yanıtla',
  content: 'Müşteri maillerine geri dönüş yapılacak.',
  status: 'completed',
  createdAt: '2024-04-25T09:00:00.000Z',
  updatedAt: '2024-04-25T09:00:00.000Z',
};

describe('NoteCard', () => {
  it('renders note title, content and date', () => {
    render(<NoteCard note={mockNote} onToggle={vi.fn()} onDelete={vi.fn()} />);

    expect(screen.getByTestId('note-title')).toHaveTextContent('Proje Toplantısı');
    expect(screen.getByTestId('note-content')).toHaveTextContent('Sprint planlaması için hedefler belirlendi.');
    expect(screen.getByTestId('note-date')).toBeInTheDocument();
  });

  it('checkbox toggles completed status on click', () => {
    const onToggle = vi.fn();
    render(<NoteCard note={mockNote} onToggle={onToggle} onDelete={vi.fn()} />);

    const toggleButton = screen.getByTestId('note-toggle');
    fireEvent.click(toggleButton);

    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(onToggle).toHaveBeenCalledWith('note-1');
  });

  it('completed card has line-through title and opacity 0.6', () => {
    render(<NoteCard note={mockCompletedNote} onToggle={vi.fn()} onDelete={vi.fn()} />);

    const card = screen.getByTestId('note-card');
    const title = screen.getByTestId('note-title');

    expect(card).toHaveAttribute('data-status', 'completed');
    expect(title).toHaveClass(styles.titleCompleted);
  });

  it('completed card checkbox shows check_circle icon', () => {
    render(<NoteCard note={mockCompletedNote} onToggle={vi.fn()} onDelete={vi.fn()} />);

    const icon = screen.getByTestId('toggle-icon');
    expect(icon).toHaveTextContent('check_circle');
  });

  it('active card checkbox shows radio_button_unchecked icon', () => {
    render(<NoteCard note={mockNote} onToggle={vi.fn()} onDelete={vi.fn()} />);

    const icon = screen.getByTestId('toggle-icon');
    expect(icon).toHaveTextContent('radio_button_unchecked');
  });

  it('delete button calls onDelete after fade-out animation', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const onDelete = vi.fn();
    render(<NoteCard note={mockNote} onToggle={vi.fn()} onDelete={onDelete} />);

    const deleteButton = screen.getByTestId('note-delete');
    fireEvent.click(deleteButton);

    // onDelete should NOT be called immediately
    expect(onDelete).not.toHaveBeenCalled();

    // Advance timers by 200ms (fade-out duration) and run all pending timers
    await vi.advanceTimersByTimeAsync(200);

    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledWith('note-1');

    vi.useRealTimers();
  });

  it('card has deleting class during fade-out', () => {
    vi.useFakeTimers();
    render(<NoteCard note={mockNote} onToggle={vi.fn()} onDelete={vi.fn()} />);

    const deleteButton = screen.getByTestId('note-delete');
    fireEvent.click(deleteButton);

    const card = screen.getByTestId('note-card');
    expect(card).toHaveClass(styles.deleting);

    vi.useRealTimers();
  });

  it('delete button has aria-label for accessibility', () => {
    render(<NoteCard note={mockNote} onToggle={vi.fn()} onDelete={vi.fn()} />);

    const deleteButton = screen.getByTestId('note-delete');
    expect(deleteButton).toHaveAttribute('aria-label', 'Notu sil');
  });

  it('toggle button has correct aria-label for active note', () => {
    render(<NoteCard note={mockNote} onToggle={vi.fn()} onDelete={vi.fn()} />);

    const toggleButton = screen.getByTestId('note-toggle');
    expect(toggleButton).toHaveAttribute('aria-label', 'Notu tamamla');
    expect(toggleButton).toHaveAttribute('aria-pressed', 'false');
  });

  it('toggle button has correct aria-label for completed note', () => {
    render(<NoteCard note={mockCompletedNote} onToggle={vi.fn()} onDelete={vi.fn()} />);

    const toggleButton = screen.getByTestId('note-toggle');
    expect(toggleButton).toHaveAttribute('aria-label', 'Notu aktifleştir');
    expect(toggleButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('touch targets are at least 44x44px', () => {
    render(<NoteCard note={mockNote} onToggle={vi.fn()} onDelete={vi.fn()} />);

    const toggleButton = screen.getByTestId('note-toggle');
    const deleteButton = screen.getByTestId('note-delete');

    expect(toggleButton).toHaveStyle({ minWidth: '44px', minHeight: '44px' });
    expect(deleteButton).toHaveStyle({ minWidth: '44px', minHeight: '44px' });
  });

  it('logs error to console when delete callback throws', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const onDelete = vi.fn(async () => {
      throw new Error('Delete failed');
    });

    render(<NoteCard note={mockNote} onToggle={vi.fn()} onDelete={onDelete} />);

    const deleteButton = screen.getByTestId('note-delete');
    fireEvent.click(deleteButton);

    await vi.advanceTimersByTimeAsync(200);

    expect(consoleSpy).toHaveBeenCalledWith('Not silinemedi, lütfen tekrar deneyin.');

    consoleSpy.mockRestore();
    vi.useRealTimers();
  });

  it('renders Turkish date format', () => {
    render(<NoteCard note={mockNote} onToggle={vi.fn()} onDelete={vi.fn()} />);

    const date = screen.getByTestId('note-date');
    const expectedDate = new Intl.DateTimeFormat('tr-TR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(mockNote.createdAt));

    expect(date.textContent).toBe(expectedDate);
  });
});
