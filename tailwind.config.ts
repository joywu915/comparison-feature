import type { Config } from 'tailwindcss'

// ============================================================
// ViewSonic Corporate Design System → Tailwind CSS Config
// Auto-generated from Figma variables
// ============================================================

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    // ── Containers ─────────────────────────────────────────
    screens: {
      sm:  '375px',
      md:  '720px',
      lg:  '1170px',
      xl:  '1600px',
    },

    extend: {
      // ── Colors ───────────────────────────────────────────
      colors: {
        // Brand primitives
        brand: {
          red:    '#db0025',
          cyan:   '#3ac9cc',
          blue:   '#0057b8',
          yellow: '#fed141',
          black:  '#2a2a2a',
          white:  '#ffffff',
          'light-gray': '#f2f2f2',
        },

        // System semantic
        primary:   '#db0025',
        secondary: '#767676',
        success:   '#28a745',
        info:      '#25a5ac',
        warning:   '#d2a428',
        danger:    '#db0025',

        // Gray scale
        gray: {
          50:  '#ffffff',
          100: '#f6f6f6',
          200: '#f2f2f2',
          300: '#e9e9e9',
          400: '#cfcfcf',
          500: '#b2b2b2',
          600: '#999999',
          700: '#767676',
          800: '#404041',
          900: '#2a2a2a',
          950: '#000000',
        },

        // Blue scale
        blue: {
          50:  '#f2f7fc',
          100: '#e8f2f9',
          200: '#cfe9f7',
          300: '#b6d8f4',
          400: '#7db0ea',
          500: '#3282da',
          600: '#0057b8',
          700: '#004da5',
          800: '#00418c',
          900: '#003067',
        },

        // Cyan scale
        cyan: {
          50:  '#e8fffc',
          100: '#c0f5ef',
          200: '#9bebe4',
          300: '#78e0d8',
          400: '#58d6d4',
          500: '#3ac9cc',
          600: '#25a5ac',
          700: '#14828c',
          800: '#08616c',
          900: '#00414d',
        },

        // Red scale
        red: {
          50:  '#fff5f7',
          100: '#ffecef',
          200: '#ffdfe4',
          300: '#ffbdc8',
          400: '#ff7a91',
          500: '#ef1a3e',
          600: '#db0025',
          700: '#a6011d',
          800: '#6f001e',
          900: '#4d0017',
        },

        // Yellow scale
        yellow: {
          50:  '#fffde8',
          100: '#fff9c7',
          200: '#fff3a5',
          300: '#feea84',
          400: '#fedf62',
          500: '#fed141',
          600: '#d2a428',
          700: '#a57a15',
          800: '#795308',
          900: '#4d3000',
        },

        // Green scale
        green: {
          50:  '#e8ffea',
          100: '#b8edbe',
          200: '#8ddc98',
          300: '#67ca77',
          400: '#45b95c',
          500: '#28a745',
          600: '#1a903a',
          700: '#0f7a2f',
          800: '#066325',
          900: '#004d1c',
        },

        // Sky Blue scale
        sky: {
          50:  '#e8f7ff',
          100: '#bae4ff',
          200: '#8bcfff',
          300: '#5db6ff',
          400: '#2e9aff',
          500: '#0078ff',
          600: '#005fd2',
          700: '#0045a6',
          800: '#002e79',
          900: '#001b4d',
        },

        // Semantic surface tokens
        surface: {
          default:       '#ffffff',
          'subtle-gray': '#f6f6f6',
          'lighter-gray':'#f2f2f2',
          'medium-gray': '#b2b2b2',
          'darker-gray': '#404041',
          disable:       '#e9e9e9',
          brand:         '#db0025',
          'brand-lighter':'#ef1a3e',
          'brand-darker': '#a6011d',
          'brand-subtle': '#ff7a91',
          'subtle-blue':  '#f2f7fc',
          'lighter-blue': '#e8f2f9',
          info:           '#f2f7fc',
          success:        '#e8ffea',
          danger:         '#fff5f7',
        },

        // Semantic text tokens
        text: {
          primary:         '#2a2a2a',
          'primary-inverse':'#ffffff',
          secondary:       '#404041',
          tertiary:        '#767676',
          disable:         '#999999',
          danger:          '#a6011d',
          info:            '#004da5',
          success:         '#0f7a2f',
        },

        // Semantic border tokens
        border: {
          default:        '#cfcfcf',
          darker:         '#767676',
          lighter:        '#b2b2b2',
          disable:        '#e9e9e9',
          black:          '#2a2a2a',
          info:           '#004da5',
          'info-lighter': '#cfe9f7',
          danger:         '#a6011d',
          success:        '#0f7a2f',
        },
      },

      // ── Typography ────────────────────────────────────────
      fontSize: {
        'p-xs': ['12px', { lineHeight: '18px' }],
        'p-sm': ['14px', { lineHeight: '18px' }],
        'p-md': ['16px', { lineHeight: '22px' }],
        'p-lg': ['18px', { lineHeight: '28px' }],
        'h5':   ['14px', { lineHeight: '22px' }],
        'h4':   ['20px', { lineHeight: '24px' }],
        // h3/h2/h1 are responsive — use clamp or md: variants
        'h3-mobile': ['20px', { lineHeight: '22px' }],
        'h3':        ['24px', { lineHeight: '30px' }],
        'h2-mobile': ['24px', { lineHeight: '26px' }],
        'h2':        ['32px', { lineHeight: '36px' }],
        'h1-mobile': ['32px', { lineHeight: '36px' }],
        'h1':        ['48px', { lineHeight: '52px' }],
      },

      // ── Border Radius ─────────────────────────────────────
      borderRadius: {
        xs:   '4px',
        sm:   '8px',
        md:   '16px',
        lg:   '32px',
        full: '9999px',
      },

      // ── Border Width ──────────────────────────────────────
      borderWidth: {
        s: '1px',
        m: '2px',
        l: '4px',
      },

      // ── Spacing (primitive scale) ─────────────────────────
      spacing: {
        '0':   '0px',
        '50':  '4px',
        '100': '8px',
        '150': '12px',
        '200': '16px',
        '250': '20px',
        '300': '24px',
        '400': '32px',
        '500': '40px',
        '600': '48px',
        '700': '56px',
        '800': '64px',
      },

      // ── Box Shadow ────────────────────────────────────────
      boxShadow: {
        sm:  '0 0px 8px rgba(0,0,0,0.10)',
        md:  '0 2px 16px rgba(0,0,0,0.10)',
        lg:  '0 4px 24px rgba(0,0,0,0.10)',
        xlg: '0 8px 32px rgba(0,0,0,0.10)',
      },

      // ── Max Width (container sizes) ───────────────────────
      maxWidth: {
        container: {
          sm:  '375px',
          md:  '720px',
          lg:  '1170px',
          xl:  '1600px',
        },
      },
    },
  },
  plugins: [],
}

export default config
