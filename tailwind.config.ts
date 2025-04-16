import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				pixel: ['"Press Start 2P"', 'cursive'],
				retro: ['"VT323"', 'monospace'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom retro theme colors
				retro: {
					dark: '#1A1F2C',
					purple: '#9b87f5',
					pink: '#D946EF',
					blue: '#33C3F0',
					orange: '#F97316',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				'neon-pulse': {
					'0%, 100%': { 
						textShadow: '0 0 7px #fff, 0 0 10px #fff, 0 0 21px #9b87f5, 0 0 42px #9b87f5',
					},
					'50%': { 
						textShadow: '0 0 5px #fff, 0 0 7px #fff, 0 0 15px #9b87f5, 0 0 30px #9b87f5',
					},
				},
				'flicker': {
					'0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
						opacity: '0.99',
						filter: 'drop-shadow(0 0 1px rgba(252, 211, 77, 0.8)) drop-shadow(0 0 4px rgba(252, 211, 77, 0.4)) drop-shadow(0 0 8px rgba(252, 211, 77, 0.2))',
					},
					'20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
						opacity: '0.4',
						filter: 'none',
					},
				},
				'score-increase': {
					'0%': { transform: 'translateY(0)', opacity: '0' },
					'50%': { transform: 'translateY(-15px)', opacity: '1' },
					'100%': { transform: 'translateY(-30px)', opacity: '0' },
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'scan': {
					'0%': { transform: 'translateY(0)', opacity: '0' },
					'50%': { transform: 'translateY(50vh)', opacity: '0.5' },
					'100%': { transform: 'translateY(100vh)', opacity: '0' },
				},
				'twinkle': {
					'0%, 100%': { opacity: '1', transform: 'scale(1)' },
					'50%': { opacity: '0.2', transform: 'scale(0.5)' },
				},
				'gradient-xy': {
					'0%, 100%': {
						'background-size': '400% 400%',
						'background-position': 'left center'
					},
					'50%': {
						'background-size': '200% 200%',
						'background-position': 'right center'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'neon-pulse': 'neon-pulse 1.5s infinite alternate',
				'flicker': 'flicker 3s linear infinite',
				'score-increase': 'score-increase 2s forwards',
				'float': 'float 3s ease-in-out infinite',
				'scan': 'scan 2s linear infinite',
				'twinkle': 'twinkle 3s ease-in-out infinite',
				'gradient-xy': 'gradient-xy 15s ease infinite',
			},
			backgroundImage: {
				'retro-grid': 'linear-gradient(rgba(155, 135, 245, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(155, 135, 245, 0.3) 1px, transparent 1px)',
				'synthwave': 'linear-gradient(to bottom, #1A1F2C 0%, #9b87f5 100%)',
				'scanline': 'repeating-linear-gradient(to bottom, transparent 0%, rgba(155, 135, 245, 0.05) 0.5%, transparent 1%)',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
