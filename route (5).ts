@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --pink-primary: #ffc0c0;
  --brown-primary: #c45f3f;
  --yellow-accent: #d6d35f;
  --bg: #fff6f3;
}

@layer base {
  body {
    background-color: var(--bg);
    font-family: 'Prompt', 'Noto Sans Thai', sans-serif;
  }

  * {
    -webkit-tap-highlight-color: transparent;
  }
}

@layer components {
  .card {
    @apply bg-white rounded-3xl shadow-card p-5;
  }

  .btn-primary {
    @apply bg-brown-primary text-white font-medium py-3 px-6 rounded-2xl 
           shadow-soft active:scale-95 transition-all duration-150 
           hover:bg-brown-dark text-base;
  }

  .btn-secondary {
    @apply bg-pink-primary text-brown-primary font-medium py-3 px-6 rounded-2xl 
           active:scale-95 transition-all duration-150 text-base;
  }

  .btn-danger {
    @apply bg-red-500 text-white font-medium py-3 px-6 rounded-2xl 
           active:scale-95 transition-all duration-150 text-base;
  }

  .input-field {
    @apply w-full bg-bg border-2 border-pink-light rounded-2xl px-4 py-3 
           text-base text-brown-dark placeholder-pink-dark/50
           focus:outline-none focus:border-brown-primary transition-colors;
  }

  .status-badge {
    @apply inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border;
  }

  .page-header {
    @apply sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-pink-light px-4 py-3;
  }
}

@layer utilities {
  .safe-bottom {
    padding-bottom: env(safe-area-inset-bottom, 1rem);
  }

  .safe-top {
    padding-top: env(safe-area-inset-top, 0px);
  }
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse-soft {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

.animate-fade-in-up {
  animation: fadeInUp 0.3s ease-out;
}

.animate-pulse-soft {
  animation: pulse-soft 2s ease-in-out infinite;
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: var(--bg);
}
::-webkit-scrollbar-thumb {
  background: var(--pink-primary);
  border-radius: 3px;
}
