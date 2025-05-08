// Animation variants for Framer Motion

// Page transitions
export const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

// Fade in animations
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.5 }
  },
  exit: { opacity: 0 }
};

// Slide in animations
export const slideInLeft = {
  initial: { x: -50, opacity: 0 },
  animate: { 
    x: 0, 
    opacity: 1,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 15 
    }
  },
  exit: { 
    x: -50, 
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

export const slideInRight = {
  initial: { x: 50, opacity: 0 },
  animate: { 
    x: 0, 
    opacity: 1,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 15 
    }
  },
  exit: { 
    x: 50, 
    opacity: 0,
    transition: { duration: 0.3 } 
  }
};

export const slideInUp = {
  initial: { y: 50, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 15 
    }
  },
  exit: { 
    y: 50, 
    opacity: 0,
    transition: { duration: 0.3 } 
  }
};

export const slideInDown = {
  initial: { y: -50, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 15 
    }
  },
  exit: { 
    y: -50, 
    opacity: 0,
    transition: { duration: 0.3 } 
  }
};

// Scale animations
export const scaleUp = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 15 
    }
  },
  exit: { 
    scale: 0.8, 
    opacity: 0,
    transition: { duration: 0.3 } 
  }
};

// Staggered children animation
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 }
  },
  exit: { opacity: 0, y: 20 }
};

// Hover effects for cards
export const cardHover = {
  whileHover: { 
    scale: 1.02,
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.2 } 
  },
  whileTap: { scale: 0.98 }
};

// Button hover effects
export const buttonHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 }
};

// Looping animations
export const pulse = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "loop"
    }
  }
};

export const float = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut"
    }
  }
};

// Reveal animations for sections
export const revealUp = {
  initial: { opacity: 0, y: 50 },
  whileInView: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  },
  viewport: { once: true, margin: "-50px" }
};

export const revealLeft = {
  initial: { opacity: 0, x: -50 },
  whileInView: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6 }
  },
  viewport: { once: true, margin: "-50px" }
};

export const revealRight = {
  initial: { opacity: 0, x: 50 },
  whileInView: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6 }
  },
  viewport: { once: true, margin: "-50px" }
}; 