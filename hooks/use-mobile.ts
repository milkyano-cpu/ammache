import * as React from "react"

const BREAKPOINTS = {
    md: 768,
    lg: 1024,
}

export function useIsMobile() {
    const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

    React.useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${BREAKPOINTS.md - 1}px)`)
        const onChange = () => setIsMobile(window.innerWidth < BREAKPOINTS.md)
        mql.addEventListener("change", onChange)
        setIsMobile(window.innerWidth < BREAKPOINTS.md)
        return () => mql.removeEventListener("change", onChange)
    }, [])

    return !!isMobile
}

export function useBreakpoint() {
    const [width, setWidth] = React.useState<number | undefined>(undefined)

    React.useEffect(() => {
        const onChange = () => setWidth(window.innerWidth)
        window.addEventListener("resize", onChange)
        setWidth(window.innerWidth)
        return () => window.removeEventListener("resize", onChange)
    }, [])

    if (width === undefined) return "mobile"
    if (width < BREAKPOINTS.md) return "mobile"
    if (width < BREAKPOINTS.lg) return "tablet"
    return "desktop"
}
