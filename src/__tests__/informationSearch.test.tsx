import '@testing-library/jest-dom'; 
import { render, screen } from '@testing-library/react';  
import InformationSearch from '../app/ui/informationSearch';
import { useSearchParams } from 'next/navigation';  
 
jest.mock('next/navigation', () => ({  
  useSearchParams: jest.fn(),  
}));  

describe('InformationSearch', () => {  
  beforeEach(() => {   
    jest.clearAllMocks();  
  });  

  it('renders correctly with totalProducts and category', () => {  
    (useSearchParams as jest.Mock).mockReturnValue({  
      get: jest.fn().mockReturnValue('Notebooks')  
    });  

    render(<InformationSearch totalProducts={10} />);  
    expect(screen.getByText('Notebooks')).toBeInTheDocument();  
    expect(screen.getByText('10 produtos encontrados')).toBeInTheDocument();  
  });  

  it('renders correctly with default category', () => {  
    (useSearchParams as jest.Mock).mockReturnValue({  
      get: jest.fn().mockReturnValue(null)  
    });  

    const { getByText } = render(<InformationSearch totalProducts={5} />);  
    expect(screen.getByText('Todos')).toBeInTheDocument();  
    expect(screen.getByText('5 produtos encontrados')).toBeInTheDocument();   
  });  
});  