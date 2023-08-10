import { ForwardedRef, useEffect, useRef } from "react";

/**
 * Makes a forwarded ref utilizable to see or modify component informatiom
 * @param ref ref to set to the React component
 * @param initialValue Initial value of the ref
 * @returns Returns an utilizable ref to manipulate the object
 */
export const useForwardRef = <T,>(
    ref: ForwardedRef<T>,
    initialValue: any = null
) => {
    const targetRef = useRef<T>(initialValue);

    useEffect(() => {
        if (!ref) return;

        if (typeof ref === "function") {
            ref(targetRef.current);
        } else {
            ref.current = targetRef.current;
        }
    }, [ref]);

    return targetRef;
};
