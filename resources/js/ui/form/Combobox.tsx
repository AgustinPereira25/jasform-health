import type { ComponentPropsWithoutRef, ForwardedRef } from 'react';
import { useEffect, useState } from 'react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'

import { forwardRef } from '@/utils'

interface Item {
    id: number,
    name: string
};

interface ComboBoxProps extends ComponentPropsWithoutRef<"input"> {
    items: Item[],
    defaultValue?: string,
    onValueChange: (value: Item) => void
}

function classNames(...classes: (string | boolean)[]) {
    return classes.filter(Boolean).join(' ')
}

const ComboBox = forwardRef(
    (
        { items, defaultValue, onValueChange }: ComboBoxProps,
        ref: ForwardedRef<HTMLInputElement>
    ) => {
        const defaultItem: Item = items.find(item => item.name.toUpperCase() === defaultValue?.toUpperCase())!;

        const [selectedItem, setSelectedItem] = useState(defaultItem);

        useEffect(() => {
            setSelectedItem(defaultItem ?? '');
        }, [defaultItem]);

        const handleChange = (e: Item) => {
            setSelectedItem(e);
            onValueChange(e);
        }
        return (
            <Combobox as="div" value={selectedItem} onChange={(e: Item) => handleChange(e)} ref={ref}>
                <div className="relative">
                    <Combobox.Input
                        className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        // onChange={(event) => setQuery(event.target.value)}
                        displayValue={(item: Item) => item?.name}
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                        <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </Combobox.Button>

                    {items.length > 0 && (
                        <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {items.map((item) => (
                                <Combobox.Option
                                    key={item.id ?? item.name}
                                    value={item}
                                    className={({ active }) =>
                                        classNames(
                                            'relative cursor-default select-none py-2 pl-3 pr-9',
                                            active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                                        )
                                    }
                                >
                                    {({ active, selected }) => (
                                        <>
                                            <span className={classNames('block truncate', selected && 'font-semibold')}>{item.name}</span>

                                            {selected && (
                                                <span
                                                    className={classNames(
                                                        'absolute inset-y-0 right-0 flex items-center pr-4',
                                                        active ? 'text-white' : 'text-indigo-600'
                                                    )}
                                                >
                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            )}
                                        </>
                                    )}
                                </Combobox.Option>
                            ))}
                        </Combobox.Options>
                    )}
                </div>
            </Combobox>
        )
    });
export default ComboBox;