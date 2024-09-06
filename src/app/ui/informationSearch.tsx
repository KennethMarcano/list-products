'use client'
import { useSearchParams } from "next/navigation";

interface Props {
    totalProducts: number
}

export default function InformationSearch(props: Props) {
    const { totalProducts } = props;
    const searchParams = useSearchParams();
    const productSelect = searchParams.get('category') || 'Todos'
    return(
        <div className="pt-8">
            <h1 className="text-2xl font-extrabold">{productSelect}</h1>
            <p> {`${totalProducts} produtos encontrados`} </p>
        </div>
    )
}