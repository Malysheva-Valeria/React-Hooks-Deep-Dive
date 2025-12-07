import React, {
    useState,
    useCallback,
    useMemo,
    useRef,
    useEffect,
    forwardRef,
    useImperativeHandle,
    useLayoutEffect,
    useDebugValue,
    useTransition,
    useId,
} from 'react';

// Task 1.1: Create ExpensiveCalculation component with useMemo
export const ExpensiveCalculation = ({ number, multiplier }) => {
    const result = useMemo(() => {
        console.log('[1.1] Performing expensive calculation...');
        return number * multiplier;
    }, [number, multiplier]);

    return (
        <div>
            <p>Result: {result}</p>
        </div>
    );
};

// Task 1.2: Create FilteredList component with useMemo
export const FilteredList = ({ items, filter }) => {
    const filteredItems = useMemo(() => {
        console.log('[1.2] Filtering list...');
        return items.filter(item => item.toLowerCase().includes(filter.toLowerCase()));
    }, [items, filter]);

    return (
        <ul>
            {filteredItems.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
    );
};

// Task 2.1: Create ParentWithCallback component with useCallback
export const ParentWithCallback = () => {
    const [count, setCount] = useState(0);
    const handleClick = useCallback(() => {
        setCount(c => c + 1);
    }, []);

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={handleClick}>Click</button>
        </div>
    );
};

// Task 2.2: Create SearchComponent with useCallback
export const SearchComponent = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearch = useCallback((e) => {
        setSearchTerm(e.target.value);
    }, []);

    return (
        <div>
            <input type="text" onChange={handleSearch} placeholder="Search..." />
            <p>Search: {searchTerm}</p>
        </div>
    );
};

// Task 3.1: Create FocusInput component with useRef
export const FocusInput = () => {
    const inputRef = useRef(null);
    const handleFocus = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <div>
            <input type="text" ref={inputRef} />
            <button onClick={handleFocus}>Focus</button>
        </div>
    );
};

// Task 3.2: Create RenderCounter component with useRef
export const RenderCounter = () => {
    const renderCount = useRef(0);
    const [, setDummyState] = useState(0);
    renderCount.current = renderCount.current + 1;

    const handleReRender = () => {
        setDummyState(prev => prev + 1);
    };

    return (
        <div>
            <p>Render count: {renderCount.current}</p>
            <button onClick={handleReRender}>Re-render</button>
        </div>
    );
};

// Task 3.3: Create PreviousValue component with useRef and useEffect
export const PreviousValue = ({ value }) => {
    const prevValueRef = useRef();
    const prevValue = prevValueRef.current;

    useEffect(() => {
        prevValueRef.current = value;
    }, [value]);

    return (
        <p>
            Current: {value}, Previous: {prevValue === undefined ? 'undefined' : prevValue}
        </p>
    );
};

// Task 4.1: Create CustomInput with forwardRef and useImperativeHandle, and ParentOfCustomInput
const CustomInput = forwardRef((props, ref) => {
    const inputRef = useRef(null);
    useImperativeHandle(ref, () => ({
        focus: () => {
            inputRef.current.focus();
        },
    }));

    return <input type="text" ref={inputRef} placeholder="Я - CustomInput" />;
});

export const ParentOfCustomInput = () => {
    const customInputRef = useRef(null);
    const handleFocus = () => {
        if (customInputRef.current) {
            customInputRef.current.focus();
        }
    };

    return (
        <div>
            <CustomInput ref={customInputRef} />
            <button onClick={handleFocus}>Focus Input</button>
        </div>
    );
};

export { CustomInput };

// Task 5.1: Create MeasureElement component with useLayoutEffect
export const MeasureElement = () => {
    const [width, setWidth] = useState(0);
    const divRef = useRef(null);
    useLayoutEffect(() => {
        if (divRef.current) {
            setWidth(divRef.current.offsetWidth);
        }
    }, []);

    return (
        <div ref={divRef} style={{ border: '1px solid black', display: 'inline-block', padding: '5px' }}>
            Content
            <p>Width: {width}px</p>
        </div>
    );
};

// Task 5.2: Create ScrollToTop component with useLayoutEffect
export const ScrollToTop = () => {
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <p>Scrolled to top</p>
        </div>
    );
};

// Task 6.1: Create useOnlineStatus hook with useDebugValue and OnlineIndicator component
const useOnlineStatus = () => {
    const isOnline = true;
    useDebugValue(isOnline, status => status ? 'Online' : 'Offline');
    return isOnline;
};

export const OnlineIndicator = () => {
    const isOnline = useOnlineStatus();
    const statusText = isOnline ? 'Online' : 'Offline';

    return (
        <p>Status: {statusText}</p>
    );
};

export { useOnlineStatus };

// Task 7.1: Create TabSwitcher component with useTransition
export const TabSwitcher = () => {
    const [tab, setTab] = useState('Tab 1');
    const [isPending, startTransition] = useTransition();
    const handleTabChange = (newTab) => {
        startTransition(() => {
            setTab(newTab);
        });
    };

    const content = (
        <p>Content of {tab}</p>
    );

    return (
        <div>
            <button
                onClick={() => handleTabChange('Tab 1')}
                disabled={tab === 'Tab 1'}
            >
                Tab 1
            </button>
            <button
                onClick={() => handleTabChange('Tab 2')}
                disabled={tab === 'Tab 2'}
            >
                Tab 2
            </button>
            <div style={{ marginTop: '10px', border: '1px dashed gray', padding: '10px' }}>
                {isPending ? <p>Loading content...</p> : content}
            </div>
        </div>
    );
};

// Task 8.1: Create FormWithId component with useId
export const FormWithId = () => {
    const id = useId();
    const inputId = `name-input-${id}`;

    return (
        <div>
            <label htmlFor={inputId}>Name:</label>
            <input type="text" id={inputId} />
        </div>
    );
};

// Task 9.1: Create useFetch hook and DataFetcher component
const useFetch = (url) => {
    console.log(`[9.1] Simulating fetch for: ${url}`);
    return { data: 'test data', loading: false, error: null };
};

export const DataFetcher = () => {
    const { data, loading, error } = useFetch("https://api.example.com");

    if (loading) return <p>Data: Loading...</p>;
    if (error) return <p>Data: Error: {error}</p>;

    return (
        <p>Data: {data}</p>
    );
};

export { useFetch };

// Task 9.2: Create useToggle hook and ToggleComponent
const useToggle = (initialState = false) => {
    const [state, setState] = useState(initialState);

    const toggle = useCallback(() => {
        setState(s => !s);
    }, []);

    return [state, toggle];
};

export const ToggleComponent = () => {
    const [isOn, toggle] = useToggle(false);

    return (
        <div>
            <p>{isOn ? 'ON' : 'OFF'}</p>
            <button onClick={toggle}>Toggle</button>
        </div>
    );
};

export { useToggle };

