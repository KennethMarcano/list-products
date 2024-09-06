import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ProductCard from '../app/ui/product/cards' 

jest.mock('next/image', () => {
    // eslint-disable-next-line react/display-name
    return ({ src, alt, className }: any) => {
        // eslint-disable-next-line @next/next/no-img-element
        return <img src={src} alt={alt} className={className} />;
    };
});

describe('ProductCard', () => {
    const props = {
        imageUrl: 'https://via.placeholder.com/150',
        brand: 'Brand Name',
        productName: 'Sample Product',
        price: 29.99,
    };

    it('renders correctly with given props', () => {
        render(<ProductCard {...props} />);

        expect(screen.getByRole('img')).toHaveAttribute('src', props.imageUrl);
        expect(screen.getByRole('img')).toHaveAttribute('alt', props.productName);
        expect(screen.getByText(props.brand)).toBeInTheDocument();
        expect(screen.getByText(props.productName)).toBeInTheDocument();
        expect(screen.getByText(`$${props.price}`)).toBeInTheDocument();
    });

    it('should render correctly with a different product', () => {
        const newProps = {
            imageUrl: 'https://placehold.co/150',
            brand: 'New Brand',
            productName: 'New Product',
            price: 39.99,
        };

        render(<ProductCard {...newProps} />);

        expect(screen.getByRole('img')).toHaveAttribute('src', newProps.imageUrl);
        expect(screen.getByRole('img')).toHaveAttribute('alt', newProps.productName);
        expect(screen.getByText(newProps.brand)).toBeInTheDocument();
        expect(screen.getByText(newProps.productName)).toBeInTheDocument();
        expect(screen.getByText(`$${newProps.price}`)).toBeInTheDocument();
    });

    it('should render correctly with a large price', () => {
        const largePriceProps = {
            ...props,
            price: 9999.99,
        };

        render(<ProductCard {...largePriceProps} />);

        expect(screen.getByText(`$${largePriceProps.price}`)).toBeInTheDocument();
    });
});  