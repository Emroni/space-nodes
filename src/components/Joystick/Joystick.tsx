import { Box } from '@mui/material';
import { TouchEvent, useEffect, useRef, useState } from 'react';
import useResizeObserver from 'use-resize-observer';

export default function Joystick({ onChange }: JoystickProps) {

    const [bounds, setBounds] = useState<DOMRect | null>(null);
    const [left, setLeft] = useState(0);
    const [top, setTop] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const containerObserver = useResizeObserver<HTMLDivElement>({
        ref: containerRef,
    });

    useEffect(() => {
        if (containerRef.current) {
            // Get container bounds
            const newBounds = containerRef.current.getBoundingClientRect();
            newBounds.x += newBounds.width / 2;
            newBounds.y += newBounds.height / 2;
            setBounds(newBounds);
        }
    }, [
        containerObserver.width,
        containerRef,
    ]);

    function handleTouchMove(e: TouchEvent) {
        if (bounds) {
            // Get angle and radius
            const touch = e.touches[0];
            const dX = touch.clientX - bounds.x;
            const dY = touch.clientY - bounds.y;
            const angle = Math.atan2(dY, dX);
            const radius = Math.min(Math.sqrt(dX * dX + dY * dY) / (bounds.width / 2) * 50, 30);

            // Get left
            const newLeft = radius * Math.sin(-angle + Math.PI / 2);
            setLeft(newLeft);

            // Get top
            const newTop = radius * Math.cos(angle - Math.PI / 2);
            setTop(newTop);

            // Trigger change
            const amount = Math.max(0, ((radius / 30) - 0.3) / 0.7);
            onChange(amount, angle);
        }
    }

    function handleTouchEnd() {
        // Reset position
        setLeft(0);
        setTop(0);
    }

    return <Box paddingBottom="100%" position="relative" ref={containerRef} onTouchEnd={handleTouchEnd} onTouchMove={handleTouchMove} onTouchStart={handleTouchMove}>
        <Box bgcolor="rgba(255, 255, 255, 0.2)" border="solid #FFFFFF 5px" borderRadius="50%" height="100%" left={0} position="absolute" top={0} width="100%" zIndex={1} />
        <Box bgcolor="rgba(0, 0, 0, 0.2)" borderRadius="50%" height="60%" left="20%" position="absolute" top="20%" width="60%" zIndex={2} />
        <Box bgcolor="#FFFFFF" borderRadius="50%" height="40%" left={`calc(30% + ${left}%)`} position="absolute" top={`calc(30% + ${top}%)`} width="40%" zIndex={3} />
    </Box>;

}