import { AnimatePresence, motion } from "framer-motion";

export function AnimatedCheckIcon() {
    return (
        <AnimatePresence initial={true}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#4caf50"
                className="CheckIcon"
            >
                <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    exit={{ pathLength: 0 }}
                    transition={{
                        type: "tween",
                        duration: 1,
                        ease: "easeIn"
                    }}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
            </svg>
        </AnimatePresence>
    );
}
