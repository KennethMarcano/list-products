import '@testing-library/jest-dom';  
import { render, screen } from '@testing-library/react';  
import Pagination from '../app/ui/product/pagination';
import { usePathname, useSearchParams } from 'next/navigation';

jest.mock('next/navigation', () => ({  
  usePathname: jest.fn(),  
  useSearchParams: jest.fn(),  
}));  

describe('Pagination', () => {  
  beforeEach(() => {   
    jest.clearAllMocks();  
  });  

  it('renders pagination correctly for given total pages', () => {  
    const totalPages = 5;  
    const mockPathname = '/products';  
    const mockSearchParams = new URLSearchParams({ page: '2' });  

    (usePathname as jest.Mock).mockReturnValue(mockPathname);  
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);  

    render(<Pagination totalPages={totalPages} />);  

    expect(screen.getByText('←')).toBeInTheDocument(); // Flecha izquierda  
    expect(screen.getByText('→')).toBeInTheDocument(); // Flecha derecha  

    expect(screen.getByText('1')).toBeInTheDocument();  
    expect(screen.getByText('2')).toHaveClass('bg-blue-600'); // Página activa  
    expect(screen.getByText('3')).toBeInTheDocument();  
    expect(screen.getByText('4')).toBeInTheDocument();  
    expect(screen.getByText('5')).toBeInTheDocument();    
  });  

  it('disables the left arrow on the first page', () => {  
    const totalPages = 5;  
    const mockPathname = '/products';  
    const mockSearchParams = new URLSearchParams({ page: '1' });  

    (usePathname as jest.Mock).mockReturnValue(mockPathname);  
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);  

    render(<Pagination totalPages={totalPages} />);  

    expect(screen.getByText('←')).toHaveClass('pointer-events-none text-gray-300');  
  });  

  it('disables the right arrow on the last page', () => {  
    const totalPages = 5;  
    const mockPathname = '/products';  
    const mockSearchParams = new URLSearchParams({ page: '5' });  

    (usePathname as jest.Mock).mockReturnValue(mockPathname);  
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);  

    render(<Pagination totalPages={totalPages} />);  

    expect(screen.getByText('→')).toHaveClass('pointer-events-none text-gray-300');  
  });  

  it('handles the page number correctly', () => {  
    const totalPages = 10;  
    const mockPathname = '/products';  
    const mockSearchParams = new URLSearchParams({ page: '4' });  

    (usePathname as jest.Mock).mockReturnValue(mockPathname);  
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);  

    render(<Pagination totalPages={totalPages} />);  

    expect(screen.getByText('3')).toBeInTheDocument(); // Comprueba que el número 3 está presente  
    expect(screen.getByText('4')).toHaveClass('bg-blue-600'); // Página activa  
    expect(screen.getByText('5')).toBeInTheDocument(); // Comprueba que el número 5 está presente  
  });  
});  