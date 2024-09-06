'use client'
import { useEffect, useState, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ContentFilter } from "@/types/allTypes";

interface Props {
    typeFilter: 'category' | 'brand';
    infoFilter: ContentFilter;
}

export default function Filter({ typeFilter, infoFilter }: Props) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [selected, setSelected] = useState<string>(configSelected());
    const [items, setItems] = useState<string[]>([])
    const [isOpen, setIsOpen] = useState(false);

    const { replace } = useRouter();
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    function configSelected() {
        if (searchParams.get(typeFilter)) return searchParams.get(typeFilter) as string
        return typeFilter === 'category' ? 'Categoria' : 'Marca'
    }

    const handleClickOutside = (e: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        let newItems: string[] = [];
        if (typeFilter === 'category') {
            for (const category in infoFilter) {
                newItems.push(category);
            }
        }
        if (typeFilter === 'brand') {
            if (searchParams.get('category')) {
                infoFilter[searchParams.get('category') as string].map((brandCategory: string) => newItems.push(brandCategory))
            }
            else {
                for (const category in infoFilter) {
                    infoFilter[category].map((brandCategory: string) => newItems.push(brandCategory))
                }
            }
        }


        setItems(newItems)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams])


    const handleSelectItem = (item: string) => {
        const params = new URLSearchParams(searchParams);
        params.delete('page');
        if (selected === item) {
            params.delete(typeFilter, item);
            typeFilter === 'category' ? setSelected('Categoria') : setSelected('Marca')
        } else {
            params.set(typeFilter, item);
            setSelected(item);
        }
        replace(`${pathname}?${params.toString()}`);
    };
    
    return (
        <div ref={dropdownRef} className="relative inline-block text-left">
            <div>
                <button
                    type="button"
                    className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {('Categoria-Marca').includes(selected) ?
                        ''
                        :
                        <svg onClick={() => handleSelectItem(selected)} xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-2 mt-1 text-red-600 bg-gray-200 rounded-full hover:bg-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    }


                    {selected}

                    <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.3 7.3a1.013 1.013 0 011.42 0l4.3 4.3 4.3-4.3a1.013 1.013 0 111.42 1.42l-5 5a1 1 0 01-1.42 0l-5-5a1.013 1.013 0 010-1.42z" clipRule="evenodd" />
                    </svg>

                </button>

            </div>

            {isOpen && (
                <div className="absolute left-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="max-h-60 overflow-y-auto py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {items.map((item, index) => (
                            <div
                                key={index}
                                className={`text-gray-900  cursor-pointer block px-4 py-2 text-sm ${selected === item ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
                                role="menuitem"
                                onClick={() => {
                                    handleSelectItem(item);
                                    setIsOpen(false);
                                }}
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}