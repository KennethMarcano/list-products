import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Search from '../app/ui/search';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
  useRouter: jest.fn(),
}));

describe('Component Search', () => {
  const replaceMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (usePathname as jest.Mock).mockReturnValue('/search');
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
    (useRouter as jest.Mock).mockReturnValue({ replace: replaceMock });
  });

  it('renders the input with correct placeholder', () => {
    render(<Search placeholder='Search items...' />);
    expect(screen.getByLabelText('Search items...')).toBeInTheDocument();
    expect(screen.getByLabelText('Search items...')).toHaveAttribute('placeholder', 'Search items...');
  });

  it('calls replace with correct parameters when typing in the input', async () => {
    render(<Search placeholder="Search items..." />);

    fireEvent.change(screen.getByLabelText('Search items...'), { target: { value: 'apple' } });

    await waitFor(() => {
      expect(replaceMock).toHaveBeenCalledWith('/search?name=apple');
    });
  });
  it('calls replace without name parameter when input is cleared', async () => {
    const { getByLabelText } = render(<Search placeholder="Search items..." />);
    const input = getByLabelText('Search items...');
    fireEvent.change(input, { target: { value: 'banana' } });
    fireEvent.change(input, { target: { value: '' } });
    await waitFor(() => {
      expect(replaceMock).toHaveBeenCalledWith('/search?');
    });
  });

})